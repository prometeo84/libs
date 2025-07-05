/**
 * @file Gestiona la lógica de la interfaz de usuario para la sección de Examen Físico Ocular.
 * Incluye la creación, edición y visualización de exámenes,
 * así como la búsqueda en catálogos de diagnóstico.
 */

/**
 * Abre un modal para crear un nuevo registro de examen físico ocular.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEyePhysicalExam() {
    var funcion = '../controller/eye_physical_exam_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEyePhysicalExam' },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formEyePhysicalExam', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEyePhysicalExam').modal('show');
    return false;
}

/**
 * Carga la tabla con el historial de exámenes físicos oculares para el paciente seleccionado.
 * La tabla incluye paginación.
 */
function loadTableEyePhysicalExam() {
    var funcion = '../controller/eye_physical_exam_controller.php';
    var id = $('#patient_id').val();
    if (id != '') {
        $('#btnModNewEyePhysicalExam').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableEyePhysicalExam', patient_id: id, limit: 50, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                sanitizeAndSetHTML('#tab-content-3', data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        $('#btnModNewEyePhysicalExam').hide();
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}

/**
 * Recopila todos los datos del formulario de examen físico y los envía al servidor
 * para crear un nuevo registro.
 */
function saveEyePhysicalExam() {
    var funcion = '../controller/eye_physical_exam_controller.php';
    var patient_id = $('#patient_id').val();
    var user_name = $('#user_name').val();
    var intraocular_pressure = $('#ep_intraocular_pressure').val();
    var ocular_biomicroscopy_right_eye = $('#ep_ocular_biomicroscopy_right_eye').val();
    var ocular_biomicroscopy_left_eye = $('#ep_ocular_biomicroscopy_left_eye').val();
    var ophthalmoscopy_right_eye = $('#ep_ophthalmoscopy_right_eye').val();
    var ophthalmoscopy_left_eye = $('#ep_ophthalmoscopy_left_eye').val();
    var gonioscopy = $('#ep_gonioscopy').val();
    var eye_movements = $('#ep_eye_movements').val();
    var primary_gaze_position = $('#ep_primary_gaze_position').val();
    var diagnosis_right_eye = $('#ep_diagnosis_right_eye').val();
    var diagnosis_left_eye = $('#ep_diagnosis_left_eye').val();
    var complementary_diagnosis = $('#ep_complementary_diagnosis').val();
    var amsler_primer = $('#ep_amsler_primer').val();
    var ishihara_test = $('#ep_ishihara_test').val();
    var treatment = $('#ep_treatment').val();
    var values = {};
    values['function'] = 'newEyePhysicalExam';
    values['patient_id'] = patient_id;
    values['intraocular_pressure'] = intraocular_pressure;
    values['ocular_biomicroscopy_right_eye'] = ocular_biomicroscopy_right_eye;
    values['ocular_biomicroscopy_left_eye'] = ocular_biomicroscopy_left_eye;
    values['ophthalmoscopy_right_eye'] = ophthalmoscopy_right_eye;
    values['ophthalmoscopy_left_eye'] = ophthalmoscopy_left_eye;
    values['gonioscopy'] = gonioscopy;
    values['eye_movements'] = eye_movements;
    values['primary_gaze_position'] = primary_gaze_position;
    values['diagnosis_right_eye'] = diagnosis_right_eye;
    values['diagnosis_left_eye'] = diagnosis_left_eye;
    values['complementary_diagnosis'] = complementary_diagnosis;
    values['amsler_primer'] = amsler_primer;
    values['ishihara_test'] = ishihara_test;
    values['treatment'] = treatment;
    values['user_name'] = user_name;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modEyePhysicalExam').modal('hide');
            loadTableEyePhysicalExam();
        }
    });
}

/**
 * Recopila todos los datos del formulario de examen físico y los envía al servidor
 * para actualizar un registro existente.
 * @param {string|number} id - El ID del registro de examen a editar.
 */
function editEyePhysicalExam(id) {
    var funcion = '../controller/eye_physical_exam_controller.php';
    var patient_id = $('#patient_id').val();
    var intraocular_pressure = $('#ep_intraocular_pressure').val();
    var ocular_biomicroscopy_right_eye = $('#ep_ocular_biomicroscopy_right_eye').val();
    var ocular_biomicroscopy_left_eye = $('#ep_ocular_biomicroscopy_left_eye').val();
    var ophthalmoscopy_right_eye = $('#ep_ophthalmoscopy_right_eye').val();
    var ophthalmoscopy_left_eye = $('#ep_ophthalmoscopy_left_eye').val();
    var gonioscopy = $('#ep_gonioscopy').val();
    var eye_movements = $('#ep_eye_movements').val();
    var primary_gaze_position = $('#ep_primary_gaze_position').val();
    var diagnosis_right_eye = $('#ep_diagnosis_right_eye').val();
    var diagnosis_left_eye = $('#ep_diagnosis_left_eye').val();
    var complementary_diagnosis = $('#ep_complementary_diagnosis').val();
    var amsler_primer = $('#ep_amsler_primer').val();
    var ishihara_test = $('#ep_ishihara_test').val();
    var treatment = $('#ep_treatment').val();
    var values = {};
    values['function'] = 'editEyePhysicalExam';
    values['id'] = id;
    values['patient_id'] = patient_id;
    values['intraocular_pressure'] = intraocular_pressure;
    values['ocular_biomicroscopy_right_eye'] = ocular_biomicroscopy_right_eye;
    values['ocular_biomicroscopy_left_eye'] = ocular_biomicroscopy_left_eye;
    values['ophthalmoscopy_right_eye'] = ophthalmoscopy_right_eye;
    values['ophthalmoscopy_left_eye'] = ophthalmoscopy_left_eye;
    values['gonioscopy'] = gonioscopy;
    values['eye_movements'] = eye_movements;
    values['primary_gaze_position'] = primary_gaze_position;
    values['diagnosis_right_eye'] = diagnosis_right_eye;
    values['diagnosis_left_eye'] = diagnosis_left_eye;
    values['complementary_diagnosis'] = complementary_diagnosis;
    values['amsler_primer'] = amsler_primer;
    values['ishihara_test'] = ishihara_test;
    values['treatment'] = treatment;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modEyePhysicalExam').modal('hide');
            loadTableEyePhysicalExam();
        }
    });
}

/**
 * Abre un modal para editar un registro de examen físico existente, precargando sus datos.
 * @param {string|number} id - El ID del registro a editar.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEditEyePhysicalExam(id) {
    var funcion = '../controller/eye_physical_exam_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditEyePhysicalExam', id: id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formEyePhysicalExam', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEyePhysicalExam').modal('show');
    return false;
}

/**
 * Cierra el modal del examen físico ocular.
 */
function closeModalEyePhysicalExam() {
    $('#modEyePhysicalExam').modal('hide');
}

/**
 * Abre un modal de búsqueda de catálogo para un campo de diagnóstico (ej. CIE-10).
 * Oculta temporalmente el modal del examen físico para mostrar el de búsqueda.
 * @param {string} id - El ID del campo de entrada que inició la búsqueda.
 * @param {string} name - El nombre del catálogo a buscar (ej. 'CIE_10').
 */
function searchCatalogPhysicalExam(id, name) {
    var funcion = '../controller/eye_physical_exam_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modSearchCatalog', id: id, op: name },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formSearchCatalog', data);
            $('#tablaSearchCatalog').html('');
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchCatalog').modal('show');
    $('#modEyePhysicalExam').modal('hide');
}

/**
 * Carga la tabla de resultados en el modal de búsqueda de catálogo (CIE-10).
 * Incluye paginación y filtros basados en los valores introducidos por el usuario.
 * @param {number} offset_pag - El desplazamiento para la consulta de paginación.
 * @param {number} active_pag - El número de la página activa para resaltarla en la UI.
 */
function loadTableCIESearchPhysicalExam(offset_pag, active_pag) {
    var op = $('#op').val();
    var code_cie = $('#s_code_cie').val();
    var text_cie = $('#s_text_cie').val();
    var funcion = '../controller/eye_physical_exam_controller.php';
    var limite_pag = 10;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableCIESearch', limit: limite_pag, offset: offset_pag, active_p: active_pag, name: code_cie, value: text_cie, op: op },
        cache: false,
        beforeSend: function (xhr) {
            if (code_cie == '' && text_cie == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            } else {
                $('#loading').show();
            }
        },
        success: function (data) {
            $('#loading').hide();
            sanitizeAndSetHTML('#tablaSearchCatalog', data);
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

/**
 * Transfiere el valor seleccionado del catálogo (ej. código CIE-10) al campo de formulario
 * correspondiente en el modal del examen físico y vuelve a mostrar dicho modal.
 * @param {string} value - El valor del ítem de catálogo seleccionado.
 * @param {string} title - El título o descripción del ítem seleccionado.
 */
function showCatalogFramePhysicalExam(value, title) {
    var id = $('#input_id').val();
    $('#' + id).val(value);
    $('#' + id).prop('title', title);
    $('#modSearchCatalog').modal('hide');
    $('#input_id').val('');
    $('#op').val('');
    $('#modEyePhysicalExam').modal('show');
}

/**
 * Permite insertar un nuevo valor de catálogo si no se encontró en la búsqueda.
 * Transfiere el código buscado al campo de formulario y vuelve al modal del examen físico.
 */
function showCatalogInsertFramePhysicalExam() {
    var id = $('#input_id').val();
    var code_cie = $('#s_code_cie').val();
    $('#' + id).val(code_cie);
    $('#' + id).prop('title', '');
    $('#modSearchCatalog').modal('hide');
    $('#input_id').val('');
    $('#op').val('');
    $('#modEyePhysicalExam').modal('show');
}

/**
 * Cierra el modal de búsqueda de catálogo y vuelve a mostrar el modal del examen físico.
 */
function closeModalSearchCatalogPhysicalExam() {
    $('#s_code_cie').val('');
    $('#s_text_cie').val('');
    $('#input_id').val('');
    $('#op').val('');
    $('#modSearchCatalog').modal('hide');
    $('#modEyePhysicalExam').modal('show');
}