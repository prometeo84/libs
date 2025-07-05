/**
 * @file Gestiona la lógica de la interfaz de usuario para la generación y visualización de certificados y otros documentos PDF.
 */

/**
 * Carga la interfaz para un tipo de certificado específico en la pestaña de certificados.
 * Realiza una llamada AJAX para obtener el HTML del formulario del certificado y lo inserta en el DOM.
 * @param {string} type - El tipo de certificado a cargar (ej. 'ATTENDANCE', 'VISUAL').
 */
function loadCertificate(type) {
    var patient_id = $('#patient_id').val();
    if (patient_id != '') {
        var funcion = '../controller/certificate_controller.php';
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableCertificate', patient_id: patient_id, type: type },
            cache: false,
            success: function (data) {
                sanitizeAndSetHTML('#tab-content-6', data);
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
 * Carga y muestra un modal con el contenido de un documento en formato PDF.
 * Esta es una función genérica utilizada por varios módulos para visualizar PDFs generados.
 * @param {string|number} pdf_id - El ID del documento PDF a cargar.
 * @param {string} type - El tipo de documento (ej. 'ATTENDANCE', 'VISUAL'), usado por el controlador para encontrar la plantilla correcta.
 * @param {string} op - Un parámetro de operación multipropósito, a menudo el nombre de la firma.
 * @param {string|number} id_number - El número de identificación del paciente, pasado al controlador del PDF.
 */
function loadDocumentPDF(pdf_id, type, op, id_number) {
    var funcion = '../controller/certificate_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalCertificate', id: pdf_id, type: type, op: op, id_number: id_number },
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