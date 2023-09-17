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
                $('#tab-content-6').html(data);
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
function loadDocumentPDF(pdf_id, type, op, id_number) {
    var funcion = '../controller/certificate_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalCertificate', id: pdf_id, type: type, op: op, id_number: id_number },
        cache: false,
        success: function (data) {
            $('#modPDFDocument').modal('show');
            $('#formPDF').html(data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}