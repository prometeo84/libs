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

function loadTableSearch(offset_pag, active_pag) {
    var s_id_number = $('#s_id_number').val();
    var s_lastname = $('#s_lastname').val();
    var s_name = $('#s_name').val();
    var funcion = '../controller/anamnesis_controller.php';
    var limite_pag = 5;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableSearchPatients', limit: limite_pag, offset: offset_pag, active_p: active_pag, id_number: s_id_number, name: s_name, lastname: s_lastname },
        cache: false,
        beforeSend: function (xhr) {
            if (s_id_number == '' && s_lastname == '' && s_name == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
            } else {
                $('#loading').show();
            }
        },
        success: function (data) {
            $('#loading').hide();
            $('#tablaSearchPatient').html(data);
        },
        error: function (xhr, status) {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
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
