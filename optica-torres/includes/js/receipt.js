// recipe.js - Autocomplete robusto para textareas de recetas
/* Copiado del código proporcionado por el usuario. */

/**
 * Carga la tabla de recetas para un paciente específico.
 * Realiza una llamada AJAX para obtener el HTML de la tabla y lo inserta en el DOM.
 * Muestra un error si no se ha seleccionado un paciente.
 */
function loadRecipe() {
    var patient_id = $('#patient_id').val();
    if (patient_id != '') {
        var funcion = '../controller/recipe_controller.php';
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableRecipe', patient_id: patient_id },
            cache: false,
            success: function (data) {
                sanitizeAndSetHTML('#tab-content-5', data);
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    } else {
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}
/**
 * Carga y muestra un modal con el contenido de una receta en formato PDF.
 */
function loadRecipePDF(pdf_id, op) {
    var funcion = '../controller/recipe_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalRecipe', id: pdf_id, op: op },
        cache: false,
        success: function (data) {
            $('#modPDFDocument').modal('show');
            sanitizeAndSetHTML('#formPDF', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function openModalEmailAttachment(id) {
    var funcion = '../controller/recipe_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modUploadEmailAttachment', id: id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formUploadAttachment', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modUploadEmailAttachment').modal('show');
    return false;
}

function uploadFileAttachment() {
    var funcion = '../controller/recipe_controller.php';
    var anamnesis_id = $('#anamnesis_id').val();
    var form_data = new FormData();
    var totalfiles = document.getElementById('files').files.length;
    for (var index = 0; index < totalfiles; index++) {
        form_data.append("files[]", document.getElementById('files').files[index]);
        form_data.append("function", "sendMailAttachment");
        form_data.append("recipe_anamnesis_id", anamnesis_id);
    }
    $.ajax({
        type: 'POST',
        url: funcion,
        data: form_data,
        dataType: 'json',
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
            if (form_data == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            alertPopUp(translate['success'], translate['information_success'], 'success');
            $('#modUploadEmailAttachment').modal('hide');
        },
        error: function (xhr) {
            alertPopUp(translate['error'], xhr.responseText, 'error');
        }
    });
}

function closeModalEmailAttachment() {
    $('#modUploadEmailAttachment').modal('hide');
}

$(document).ready(function () {
    var mirror = $('<div id="autocomplete-mirror"></div>').css({
        position: 'absolute',
        left: -9999,
        top: -9999,
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        visibility: 'hidden'
    }).appendTo('body');

    function getCaretCoordinates(element) {
        var $element = $(element);
        var position = $element.prop('selectionStart');
        var text = $element.val().substring(0, position);
        mirror.css({
            'box-sizing': $element.css('box-sizing'),
            'font-family': $element.css('font-family'),
            'font-size': $element.css('font-size'),
            'font-weight': $element.css('font-weight'),
            'line-height': $element.css('line-height'),
            'letter-spacing': $element.css('letter-spacing'),
            'padding-top': $element.css('padding-top'),
            'padding-right': $element.css('padding-right'),
            'padding-bottom': $element.css('padding-bottom'),
            'padding-left': $element.css('padding-left'),
            'border-width': $element.css('border-width'),
            'width': $element.width()
        });
        var sanitizedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');
        mirror.html(sanitizedText + '<span id="caret-marker"></span>');
        var $marker = $('#caret-marker', mirror);
        var markerPos = $marker.position();
        var elementOffset = $element.offset();
        return {
            top: elementOffset.top + markerPos.top - $element.scrollTop(),
            left: elementOffset.left + markerPos.left - $element.scrollLeft()
        };
    }

    function setupAutocomplete(selector, catalogName) {
        function split(val) {
            // Separar por comas o saltos de línea para obtener el segmento actual
            return val.split(/[,\n]+/);
        }
        function extractLast(term) {
            // Toma el último segmento (línea o parte separada por comas)
            var segment = split(term).pop();
            if (!segment) return '';
            segment = segment.trim();
            if (segment === '') return '';
            // Quitar caracteres de puntuación al inicio (p. ej. '-', '*')
            segment = segment.replace(/^[^\p{L}\p{N}]+/u, '');
            // Dividir por cualquier espacio en blanco (incluye saltos de línea)
            var words = segment.split(/\s+/);
            // Devolver la última palabra (token) limpio de signos finales
            var last = (words.pop() || '').replace(/[^\p{L}\p{N}]+$/u, '');
            return last;
        }
        $(selector)
            .on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 2,
                source: function (request, response) {
                    var term = extractLast(request.term);
                    // Evita solicitudes cuando el token actual es muy corto
                    if (!term || term.length < 2) {
                        response([]);
                        return;
                    }
                    $.ajax({
                        url: "../controller/autocomplete_controller.php",
                        dataType: "json",
                        data: {
                            term: term,
                            catalog: catalogName
                        },
                        success: function (data) {
                            if (!data || data.length === 0) {
                                response([]);
                            } else {
                                response(data);
                            }
                        },
                        error: function () {
                            response([{ label: "Error al buscar sugerencias", value: "" }]);
                        }
                    });
                },
                open: function () {
                    var $input = $(this);
                    var $widget = $input.autocomplete("widget");
                    var coords = getCaretCoordinates($input[0]);
                    $widget.position({
                        of: document.body,
                        my: "left top",
                        at: "left+" + coords.left + " top+" + (coords.top + parseInt($input.css('font-size'), 10) + 2)
                    });
                    setTimeout(function () {
                        var inputWidth = $input.outerWidth();
                        var maxItemWidth = 0;
                        $widget.find('li').each(function () {
                            var $item = $(this);
                            var $clone = $item.clone().css({ 'position': 'absolute', 'left': '-9999px', 'width': 'auto', 'white-space': 'nowrap' }).appendTo('body');
                            var itemWidth = $clone.outerWidth();
                            $clone.remove();
                            if (itemWidth > maxItemWidth) { maxItemWidth = itemWidth; }
                        });
                        var finalWidth = Math.max(inputWidth, maxItemWidth);
                        $widget.css('width', finalWidth + 'px');
                    }, 0);
                },
                focus: function () { return false; },
                select: function (event, ui) {
                    if (!ui.item.value) { event.preventDefault(); return false; }
                    var terms = split(this.value);
                    var currentSegment = terms.pop();
                    var words = currentSegment.trim().split(' ');
                    words.pop();
                    words.push(ui.item.value);
                    var newSegment = words.join(' ');
                    terms.push(newSegment);
                    this.value = terms.join(", ");
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                if (item.value === "") { return $("<li>").text(item.label).appendTo(ul); }
                var label = item.label;
                var safeLabel = $("<div>").text(label).html();
                var finalHtml = safeLabel.replace(/(Marca:|Genérico:)/gi, '<b>$1</b>');
                return $("<li>").append('<div>' + finalHtml + '</div>').appendTo(ul);
            };
    }

    $('body').on('focus', '#r_indications, #r_rp', function () {
        setupAutocomplete(this, 'MEDICAMENTO_OFTALMOLOGIA');
    });
});
