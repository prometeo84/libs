/**
 * @file Gestiona la lógica de la interfaz de usuario para el agendamiento de citas.
 */

/**
 * Abre un modal para crear una nueva cita.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modAppointmentScheduling() {
    var funcion = '../controller/appointment_scheduling_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modAppointmentScheduling' },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formAppointmentScheduling', data);

        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modAppointmentScheduling').modal('show');
    return false;
}

/**
 * Carga la tabla con el historial de citas para el paciente seleccionado.
 * La tabla incluye paginación.
 */
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
                sanitizeAndSetHTML('#tab-content-4', data);
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

/**
 * Recopila los datos del formulario de agendamiento y los envía al servidor
 * para crear una nueva cita.
 * Realiza una validación de campos requeridos antes de enviar.
 */
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

/**
 * Recopila los datos del formulario de agendamiento y los envía al servidor
 * para actualizar una cita existente.
 * Realiza una validación de campos requeridos antes de enviar.
 * @param {string|number} id - El ID de la cita a editar.
 */
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

/**
 * Abre un modal para editar una cita existente, precargando sus datos.
 * @param {string|number} id - El ID de la cita a editar.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEditAppointmentScheduling(id) {
    var funcion = '../controller/appointment_scheduling_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditAppointmentScheduling', id: id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formAppointmentScheduling', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modAppointmentScheduling').modal('show');
    return false;
}

/**
 * Cierra el modal de agendamiento de citas.
 */
function closeModalAppointmentScheduling() {
    $('#modAppointmentScheduling').modal('hide');
}

/**
 * Abre un modal que presumiblemente muestra un calendario o una vista de fechas
 * para facilitar la selección de la fecha de la cita.
 */
function modScheduleDate() {
    $('#modScheduleDate').modal('show');
}