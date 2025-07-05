/**
 * @file Gestiona la lógica de la interfaz de usuario para la administración de los ítems de catálogos.
 * Este archivo se enfoca en los valores "hijos" de un catálogo padre.
 */

/**
 * Carga la tabla de ítems de catálogo con filtros y paginación.
 * Los resultados se basan en el catálogo padre seleccionado y otros criterios de búsqueda.
 * @param {number} offset_pag - El desplazamiento para la consulta de paginación.
 * @param {number} active_pag - El número de la página activa para resaltarla en la UI.
 */
function loadTable(offset_pag, active_pag) {
    var limite_pag = 10;
    var c_catalogs = $('#c_catalogs').val();
    var c_search_term = $('#c_search_term').val();
    var c_type_medication = $('#c_type_medication').val();
    var c_medication_name = $('#c_medication_name').val();
    var c_medication_presentation = $('#c_medication_presentation').val();
    var c_active = $('#c_active').val();
    var funcion = '../controller/ophthalmological_medications_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableMedications', limit: limite_pag, offset: offset_pag, active_p: active_pag, catalog_id: c_catalogs, search_term: c_search_term, type_medication: c_type_medication, medication_name: c_medication_name, medication_presentation: c_medication_presentation, active: c_active },
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            sanitizeAndSetHTML('#tableMedications', data);
            $('#loading').hide();
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

/**
 * Abre un modal para crear un nuevo ítem dentro del catálogo padre actualmente seleccionado.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modNewMedications() {
    var catalog_id = $('#c_catalogs').val();
    var funcion = '../controller/ophthalmological_medications_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalNewMedicationss', catalog_id: catalog_id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formNewMedications', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            $('#catalog').prop('required', true);
        }
    });
    $('#modNewMedications').modal('show');
    return false;
}

/**
 * Recopila los datos del formulario de nuevo ítem y los envía al servidor para ser guardados.
 * Realiza una validación de campos requeridos antes de enviar.
 */
function saveMedications() {
    var n_catalog_id = $('#n_catalog_id').val();
    var n_search_term = $('#n_search_term').val();
    var n_type_medication = $('#n_type_medication').val();
    var n_medication_name = $('#n_medication_name').val();
    var n_medication_presentation = $('#n_medication_presentation').val();
    var funcion = '../controller/ophthalmological_medications_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'newMedications', catalog_id: n_catalog_id, search_term: n_search_term, type_medication: n_type_medication, medication_name: n_medication_name, medication_presentation: n_medication_presentation },
        cache: false,
        beforeSend: function (xhr) {
            if (n_catalog_id == '') {
                alertPopUp(translate['advertice'], translate['catalogs_father_null'], 'warning');
                xhr.abort();
                return false;
            }
            if (n_search_term == '' || n_medication_name == '' || n_medication_presentation == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modNewMedications').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modNewMedications').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
            loadTable(0, 1);
        }
    });
}

/**
 * Abre un modal para editar un ítem de catálogo existente, precargando sus datos.
 * @param {string|number} id - El ID del ítem de catálogo a editar.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEditCatalogs(id) {
    $('#catalog_id').val(id);
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalEditCatalogs', id: id },
        cache: false,
        beforeSend: function () {
            $('#e_catalog').val('');
            $('#e_active').val('');
        },
        success: function (data) {
            sanitizeAndSetHTML('#formEditCatalogs', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEditCatalogs').modal('show');
    return false;
}

/**
 * Recopila los datos del formulario de edición y los envía al servidor para actualizar el ítem.
 */
function editCatalogs() {
    var e_catalog_id = $('#c_catalogs').val();
    var e_id = $('#e_id').val();
    var e_name = $('#e_name').val();
    var e_value = $('#e_value').val();
    var e_active = $('#e_active').val();
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'editCatalogs', id: e_id, catalog_id: e_catalog_id, name: e_name, value: e_value, active: e_active },
        cache: false,
        beforeSend: function (xhr) {
            if (e_catalog_id == '' || e_name == '' || e_value == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modEditCatalogs').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modEditCatalogs').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
        }
    });
}

/**
 * Envía una solicitud al servidor para eliminar un ítem de catálogo, previa confirmación.
 * @param {string|number} id - El ID del ítem de catálogo a eliminar.
 */
function deleteCatalogs(id) {
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'deleteCatalogs', id: id },
        cache: false,
        beforeSend: function () {
            return confirm(translate['confirm_delete_register']);
        },
        success: function () {
            $('#loading').hide();
            loadTable(0, 1);
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            $('#loading').hide();
            alertPopUp(translate['success'], translate['delete_register'], 'success');
            window.setTimeout('location.reload()', 4000);
        }
    });
}

/**
 * Cierra el modal de creación de nuevos ítems de catálogo.
 */
function closeModalNewMedications() {
    $('#modNewMedications').modal('hide');
}

/**
 * Cierra el modal de edición de ítems de catálogo.
 */
function closeModalEditMedications() {
    $('#modEditMedications').modal('hide');
}
