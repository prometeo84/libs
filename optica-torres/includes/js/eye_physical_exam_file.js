/**
 * @file Gestiona la lógica de la interfaz de usuario para la subida y gestión de archivos
 * asociados a un Examen Físico Ocular.
 */

/**
 * Abre un modal para subir y ver archivos adjuntos a un examen físico ocular.
 * Oculta el modal principal del examen para mostrar el de archivos.
 * @param {string|number} id - El ID del examen físico ocular al que se adjuntarán los archivos.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function openModalEyePhysicalFileExam(id) {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalUploadFile', id: id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formUploadFile', data);
            loadTableEyePhysicalExamFile();
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEyePhysicalExam').modal('hide');
    $('#modUploadFile').modal('show');
    return false;
}

/**
 * Recopila los archivos seleccionados en el formulario y los envía al servidor
 * para ser guardados y asociados con el examen físico ocular correspondiente.
 * Utiliza FormData para manejar la subida de archivos.
 */
function uploadEyePhysicalFileExam() {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    var exam_id = $('#exam_id').val();
    var form_data = new FormData();
    // Read selected files
    var totalfiles = document.getElementById('files').files.length;
    for (var index = 0; index < totalfiles; index++) {
        form_data.append("files[]", document.getElementById('files').files[index]);
        form_data.append("function", "newEyePhysicalExamFile");
        form_data.append("eye_physical_exam_id", exam_id);
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
            openModalEyePhysicalFileExam(exam_id);
            loadTableEyePhysicalExamFile();
        },
        error: function (xhr) {
            alertPopUp(translate['error'], xhr.responseText, 'error');
        }
    });
}

/**
 * Carga y muestra una tabla con la lista de archivos que ya han sido adjuntados
 * al examen físico ocular actual.
 */
function loadTableEyePhysicalExamFile() {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    var exam_id = $('#exam_id').val();
    if (exam_id != '') {
        $('#modUploadFile').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableEyePhysicalExamFile', eye_physical_exam_id: exam_id, limit: 5, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                sanitizeAndSetHTML('#tablaEyePhysicalExamFile', data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        data = translate['optometry_no_register'];
        sanitizeAndSetHTML('#tab-content-3', data);
    }
}

/**
 * Envía una solicitud al servidor para eliminar un archivo adjunto específico.
 * Tras la eliminación, recarga la tabla de archivos.
 * @param {string|number} id - El ID del registro del archivo a eliminar.
 */
function deleteEyePhysicalExamFile(id) {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'deleteEyePhysicalExamFile', id: id },
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function () {
            loadTableEyePhysicalExamFile();
        },
        complete: function () {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

/**
 * Cierra el modal de subida de archivos y vuelve a mostrar el modal principal
 * de edición del examen físico ocular, restaurando el contexto anterior.
 */
function closeModalEyePhysicalFileExam() {
    $('#modUploadFile').modal('hide');
    var id = $('#exam_id').val();
    modEditEyePhysicalExam(id);
}