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
 * @param {number|string} pdf_id - El ID del documento PDF a cargar.
 * @param {string} op - Un parámetro de operación, que según el contexto de pdf.js, es el nombre de la firma.
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

/**
 * Abre un modal que permite al usuario adjuntar archivos para enviar por correo electrónico.
 * @param {number|string} id - El ID de la anamnesis asociada a la receta.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
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

/**
 * Procesa y sube los archivos seleccionados en el modal de adjuntos.
 * Envía los archivos junto con el ID de la anamnesis a un script del servidor
 * para que sean enviados por correo electrónico.
 */
function uploadFileAttachment() {
    var funcion = '../controller/recipe_controller.php';
    var anamnesis_id = $('#anamnesis_id').val();
    var form_data = new FormData();
    // Read selected files
    var totalfiles = document.getElementById('files').files.length;
    for (var index = 0; index < totalfiles; index++) {
        form_data.append("files[]", document.getElementById('files').files[index]);
        form_data.append("function", "sendMailAttachment");
        form_data.append("recipe_anamnesis_id", anamnesis_id);
    }
    // AJAX request
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

/**
 * Cierra el modal para adjuntar archivos por correo electrónico.
 */
function closeModalEmailAttachment() {
    $('#modUploadEmailAttachment').modal('hide');
}

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Contiene la lógica para inicializar el autocompletado en campos de texto
 * que se cargan dinámicamente.
 */
$(document).ready(function () {
    // 1. Crear un div "espejo" oculto para calcular la posición del cursor.
    // Este div imitará los estilos del textarea para que el cálculo sea preciso.
    var mirror = $('<div id="autocomplete-mirror"></div>').css({
        position: 'absolute',
        left: -9999, // Ocultarlo fuera de la pantalla
        top: -9999,
        whiteSpace: 'pre-wrap', // Respetar espacios y saltos de línea
        wordWrap: 'break-word', // Igualar el ajuste de línea del textarea
        visibility: 'hidden' // Hacerlo invisible
    }).appendTo('body');

    /**
     * Calcula las coordenadas (top, left) del cursor de texto (caret) dentro de un elemento.
     * @param {HTMLElement} element - El textarea o input.
     * @returns {{top: number, left: number}} - Las coordenadas del cursor.
     */
    function getCaretCoordinates(element) {
        var $element = $(element);
        var position = $element.prop('selectionStart');
        var text = $element.val().substring(0, position);

        // Copiar los estilos relevantes del textarea al div espejo
        // Se añaden más propiedades para una imitación más precisa.
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
            'width': $element.width() // Importante: igualar el ancho
        });

        // Sanitizar el texto para HTML (reemplazar saltos de línea) y añadir un marcador al final
        var sanitizedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');
        mirror.html(sanitizedText + '<span id="caret-marker"></span>');

        // Obtener la posición del marcador dentro del div espejo
        var $marker = $('#caret-marker', mirror);
        var markerPos = $marker.position();
        var elementOffset = $element.offset();

        // Calcular las coordenadas finales.
        // Se resta el scroll del textarea para obtener la posición visible del cursor.
        return {
            top: elementOffset.top + markerPos.top - $element.scrollTop(),
            left: elementOffset.left + markerPos.left - $element.scrollLeft()
        };
    }

    /**
     * Configura la funcionalidad de autocompletado de jQuery UI para un campo de texto específico.
     * Está diseñado para manejar múltiples valores separados por comas.
     * @param {string|HTMLElement} selector - El selector del elemento de entrada (e.g., '#miInput').
     * @param {string} catalogName - El nombre del catálogo a consultar para obtener las sugerencias de autocompletado.
     */
    function setupAutocomplete(selector, catalogName) {
        function split(val) {
            return val.split(/,\s*/);
        }
        function extractLast(term) {
            // Devuelve el último término después de la última coma,
            // y de ese término, devuelve la última palabra para la búsqueda.
            // Esto permite que la búsqueda sea más flexible (p.ej. "ejemplo hylo" buscará "hylo").
            return split(term).pop().trim().split(' ').pop();
        }
        $(selector)
            // previene el comportamiento por defecto de la tecla TAB dentro del menú de autocompletado
            .on("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 2, // Empezar a buscar después de 2 caracteres
                source: function (request, response) {
                    // Extrae el último término después de la última coma para la búsqueda
                    var term = extractLast(request.term);
                    $.ajax({
                        url: "../controller/autocomplete_controller.php",
                        dataType: "json",
                        data: {
                            term: term,
                            catalog: catalogName
                        },
                        success: function (data) {
                            // Si no hay datos o la matriz está vacía, muestra un mensaje.
                            if (!data || data.length === 0) {
                                /*response([{
                                    label: "No se encontraron resultados",
                                    value: "" // Un valor vacío para que no se inserte nada al seleccionar.
                                }]);*/
                            } else {
                                response(data);
                            }
                        },
                        error: function () {
                            // En caso de error en el servidor, también informa al usuario.
                            response([{
                                label: "Error al buscar sugerencias",
                                value: ""
                            }]);
                        }
                    });
                },
                // 2. Usar el evento 'open' para reposicionar el menú en el cursor
                open: function () {
                    var $input = $(this);
                    var $widget = $input.autocomplete("widget");
                    var coords = getCaretCoordinates($input[0]);

                    // Posicionar el menú en las coordenadas del cursor.
                    // Se añade un offset vertical igual al tamaño de la fuente para que aparezca justo debajo de la línea de texto.
                    $widget.position({
                        of: document.body,
                        my: "left top",
                        at: "left+" + coords.left + " top+" + (coords.top + parseInt($input.css('font-size'), 10) + 2)
                    });

                    // Usamos un setTimeout para que el código se ejecute después de que el menú se haya renderizado,
                    // permitiendo un cálculo de ancho correcto.
                    setTimeout(function () {
                        var inputWidth = $input.outerWidth();
                        var maxItemWidth = 0;

                        // Iteramos sobre cada item para encontrar el más ancho.
                        // Medimos un clon del item fuera del DOM visible para obtener su ancho natural.
                        $widget.find('li').each(function () {
                            var $item = $(this);
                            var $clone = $item.clone()
                                .css({
                                    'position': 'absolute',
                                    'left': '-9999px',
                                    'width': 'auto',
                                    'white-space': 'nowrap'
                                })
                                .appendTo('body');
                            var itemWidth = $clone.outerWidth();
                            $clone.remove();
                            if (itemWidth > maxItemWidth) {
                                maxItemWidth = itemWidth;
                            }
                        });

                        // El ancho final será el mayor entre el ancho del input y el del item más largo.
                        var finalWidth = Math.max(inputWidth, maxItemWidth);
                        $widget.css('width', finalWidth + 'px');
                    }, 0);
                },
                focus: function () { // Previene que se inserte el valor al enfocar un item con el ratón
                    // Prevenir que se inserte el valor al pasar el ratón por encima
                    return false;
                },
                select: function (event, ui) {
                    // Si el item seleccionado no tiene valor (como en "No resultados" o "Error"), no hagas nada.
                    if (!ui.item.value) {
                        event.preventDefault();
                        return false;
                    }

                    var terms = split(this.value);
                    // Obtiene el segmento actual que se está escribiendo (ej: "utilizar hylo")
                    var currentSegment = terms.pop();
                    // Divide el segmento en palabras
                    var words = currentSegment.trim().split(' ');
                    // Remueve la última palabra (la que activó el autocompletado)
                    words.pop();
                    // Añade el valor seleccionado del autocompletado
                    words.push(ui.item.value);
                    // Vuelve a unir las palabras para formar el segmento corregido
                    var newSegment = words.join(' ');
                    // Añade el segmento corregido de nuevo a la lista de términos
                    terms.push(newSegment);
                    // añadir un espacio y coma al final para el siguiente item
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                // Si es un mensaje informativo (ej. "No resultados"), no lo proceses con HTML.
                if (item.value === "") {
                    return $("<li>").text(item.label).appendTo(ul);
                }

                var label = item.label;
                var prefixHtml = '';
                var mainText = label;

                // Expresión regular para encontrar "Marca:" o "Generico:" al inicio, con espacios opcionales.
                var prefixRegex = /^(Marca:|Genérico:)(\s*)/i;
                var match = label.match(prefixRegex);

                // 1. Si se encuentra un prefijo, lo separamos y lo ponemos en negrita.
                if (match) {
                    // match[1] es "Marca:" o "Generico:"
                    // match[2] es el espacio que le sigue, ej. " "
                    var safePrefix = $("<div>").text(match[1]).html();
                    var safeSpace = $("<div>").text(match[2]).html();
                    prefixHtml = '<b>' + safePrefix + '</b>' + safeSpace;
                    // El resto del texto es lo que se mostrará normalmente.
                    mainText = label.substring(match[0].length);
                }

                // 2. Sanitizar el texto principal.
                // El resaltado del término de búsqueda se ha eliminado por petición del usuario,
                // para que solo el prefijo ("Marca:", "Generico:") aparezca en negrita.
                var safeMainText = $("<div>").text(mainText).html();

                // 3. Construir el HTML final y añadirlo a la lista.
                var finalHtml = prefixHtml + safeMainText;
                return $("<li>").append('<div>' + finalHtml + '</div>').appendTo(ul);
            };
    }

    // Activa el autocompletado en los textareas de indicaciones y rp.
    // Se utiliza delegación de eventos ('body' y 'focus') para asegurar que funcione en contenido cargado dinámicamente vía AJAX.
    $('body').on('focus', '#r_indications, #r_rp', function () {
        setupAutocomplete(this, 'MEDICAMENTO_OFTALMOLOGIA');
    });
});