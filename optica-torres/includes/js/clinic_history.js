function modSearchPatient() {
    var funcion = '../controller/anamnesis_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalSearchPatient' },
        cache: false,
        beforeSend: function () {
            $('#s_id_number').val('');
            $('#s_lastname').val('');
            $('#s_name').val('');
            $('#tablaSearchPatient').html('');
        },
        success: function (data) {
            $('#formSearchPatient').html(data)
        },
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchPatient').modal('show');
    return false;
}

function showPatientEditFrame(id) {
    $('#modSearchPatient').modal('hide');
    $('#patient_id').val(id);
    loadTablePatient(id);
    $('#TableAnamnesis').show();
}

function loadTablePatient(id) {
    var funcion = '../controller/anamnesis_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTablePatient', id: id, mode: mode },
        cache: false,
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            $('#tab-content-1').html(data);
        },
        complete: function (xhr, status) {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

function closeModalSearchPatient() {
    $('#modSearchPatient').modal('hide');
}
