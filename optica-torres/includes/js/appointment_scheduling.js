function modAppointmentScheduling() {
    var funcion = '../controller/appointment_scheduling_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modAppointmentScheduling' },
        cache: false,
        success: function (data) {
            $('#formAppointmentScheduling').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modAppointmentScheduling').modal('show');
    return false;
}

function loadTableAppointmentScheduling() {
    var funcion = '../controller/appointment_scheduling_controller.php';
    var id = $('#patient_id').val();
    if (id != '') {
        $('#btnModNewAppointmentScheduling').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableAppointmentScheduling', patient_id: id, limit: 50, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                $('#tab-content-4').html(data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        $('#btnAppointmentScheduling').hide();
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}

function saveAppointmentScheduling() {
    var funcion = '../controller/appointment_scheduling_controller.php';
    var patient_id = $('#patient_id').val();
    var branch_id = $('#s_branch').val();
    var appointment_date = $('#s_date').val();
    var appointment_hour = $('#s_hour').val();
    var values = {};
    values['function'] = 'newAppointmentScheduling';
    values['patient_id'] = patient_id;
    values['branch_id'] = branch_id;
    values['appointment_date'] = appointment_date;
    values['appointment_hour'] = appointment_hour;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        beforeSend: function (xhr) {
            if (branch_id == '' || appointment_date == '' || appointment_hour == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modAppointmentScheduling').modal('hide');
            loadTableAppointmentScheduling();
        }
    });
}

function editAppointmentScheduling(id) {
    var funcion = '../controller/appointment_scheduling_controller.php';
    var patient_id = $('#patient_id').val();
    var branch_id = $('#s_branch').val();
    var appointment_date = $('#s_date').val();
    var appointment_hour = $('#s_hour').val();
    var values = {};
    values['function'] = 'editAppointmentScheduling';
    values['id'] = id;
    values['patient_id'] = patient_id;
    values['branch_id'] = branch_id;
    values['appointment_date'] = appointment_date;
    values['appointment_hour'] = appointment_hour;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        beforeSend: function (xhr) {
            if (branch_id == '' || appointment_date == '' || appointment_hour == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modAppointmentScheduling').modal('hide');
            loadTableAppointmentScheduling();
        }
    });
}

function modEditAppointmentScheduling(id) {
    var funcion = '../controller/appointment_scheduling_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditAppointmentScheduling', id: id },
        cache: false,
        success: function (data) {
            $('#formAppointmentScheduling').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modAppointmentScheduling').modal('show');
    return false;
}

function closeModalAppointmentScheduling() {
    $('#modAppointmentScheduling').modal('hide');
}

function modScheduleDate() {
    $('#modScheduleDate').modal('show');
}