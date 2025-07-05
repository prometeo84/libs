/**
 * @file Gestiona la lógica de la interfaz de usuario para la visualización del historial clínico completo de un paciente.
 */

/**
 * Abre un modal para buscar pacientes existentes.
 * Esta función es idéntica a la de otros archivos (ej. patient.js) y es candidata a ser centralizada.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
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
            sanitizeAndSetHTML('#formSearchPatient', data);
        },
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchPatient').modal('show');
    return false;
}

/**
 * Carga la tabla de resultados de búsqueda de pacientes con paginación.
 * Esta función es idéntica a la de otros archivos (ej. patient.js) y es candidata a ser centralizada.
 * @param {number} offset_pag - El desplazamiento para la consulta de paginación.
 * @param {number} active_pag - El número de la página activa para resaltarla en la UI.
 */
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
            sanitizeAndSetHTML('#tablaSearchPatient', data);
        },
        error: function (xhr, status) {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

/**
 * Maneja la selección de un paciente desde el modal de búsqueda.
 * Oculta el modal y llama a la función para cargar el historial clínico del paciente seleccionado.
 * @param {string|number} id - El ID del paciente seleccionado.
 */
function showPatientEditFrame(id) {
    $('#modSearchPatient').modal('hide');
    $('#patient_id').val(id);
    loadTablePatient(id);
}

/**
 * Carga el historial clínico completo de un paciente específico.
 * @param {string|number} id - El ID del paciente cuyo historial se va a cargar.
 */
function loadTablePatient(id) {
    var funcion = '../controller/clinic_history_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableClinicHistory', id: id },
        cache: false,
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            sanitizeAndSetHTML('#tableClinicHistory', data);
        },
        complete: function (xhr, status) {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

/**
 * Cierra el modal de búsqueda de pacientes.
 */
function closeModalSearchPatient() {
    $('#modSearchPatient').modal('hide');
}
