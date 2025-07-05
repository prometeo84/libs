/**
 * @file Gestiona la lógica de la interfaz de usuario para la sección de Optometría.
 * Incluye la creación, edición, y visualización de exámenes de optometría,
 * así como la búsqueda en catálogos de diagnóstico.
 */

// file deepcode ignore DOMXSS: Sanitize in Class
/**
 * Abre un modal para crear un nuevo registro de optometría.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modOptometry() {
    var funcion = '../controller/optometry_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modOptometry' },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formOptometry', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modOptometry').modal('show');
    return false;
}

/**
 * Carga la tabla con el historial de exámenes de optometría para el paciente seleccionado.
 * La tabla incluye paginación.
 */
function loadTableOptometry() {
    var funcion = '../controller/optometry_controller.php';
    var id = $('#patient_id').val();
    if (id != '') {
        $('#btnModNewOptometry').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableOptometry', patient_id: id, limit: 50, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                sanitizeAndSetHTML('#tab-content-2', data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        $('#btnModNewOptometry').hide();
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}

/**
 * Recopila todos los datos del formulario de optometría y los envía al servidor
 * para crear un nuevo registro.
 */
function saveOptometry() {
    var funcion = '../controller/optometry_controller.php';
    var patient_id = $('#patient_id').val();
    var user_name = $('#user_name').val();
    var uncorrected_visual_acuity_right_eye = $('#op_uncorrected_visual_acuity_right_eye').val();
    var uncorrected_visual_acuity_left_eye = $('#op_uncorrected_visual_acuity_left_eye').val();
    var uncorrected_visual_acuity_both_eyes = $('#op_uncorrected_visual_acuity_both_eyes').val();
    var corrected_visual_acuity_right_eye = $('#op_corrected_visual_acuity_right_eye').val();
    var corrected_visual_acuity_left_eye = $('#op_corrected_visual_acuity_left_eye').val();
    var corrected_visual_acuity_both_eyes = $('#op_corrected_visual_acuity_both_eyes').val();
    var len_optometry_right_eye = $('#op_len_optometry_right_eye').val();
    var len_optometry_left_eye = $('#op_len_optometry_left_eye').val();
    var dil_corrected_visual_acuity_right_eye = $('#op_dil_corrected_visual_acuity_right_eye').val();
    var dil_corrected_visual_acuity_left_eye = $('#op_dil_corrected_visual_acuity_left_eye').val();
    var far_optometry_right_eye = $('#op_far_optometry_right_eye').val();
    var far_optometry_left_eye = $('#op_far_optometry_left_eye').val();
    var far_optometry_sphere_right_eye = $('#op_far_optometry_sphere_right_eye').val();
    var far_optometry_sphere_left_eye = $('#op_far_optometry_sphere_left_eye').val();
    var far_optometry_cylinder_right_eye = $('#op_far_optometry_cylinder_right_eye').val();
    var far_optometry_cylinder_left_eye = $('#op_far_optometry_cylinder_left_eye').val();
    var far_optometry_axis_right_eye = $('#op_far_optometry_axis_right_eye').val();
    var far_optometry_axis_left_eye = $('#op_far_optometry_axis_left_eye').val();
    var far_optometry_naso_pupil_distance_right_eye = $('#op_far_optometry_naso_pupil_distance_right_eye').val();
    var far_optometry_naso_pupil_distance_left_eye = $('#op_far_optometry_naso_pupil_distance_left_eye').val();
    var far_optometry_pupil_distance = $('#op_far_optometry_pupil_distance').val();
    var nea_optometry_right_eye = $('#op_nea_optometry_right_eye').val();
    var nea_optometry_left_eye = $('#op_nea_optometry_left_eye').val();
    var nea_optometry_sphere_right_eye = $('#op_nea_optometry_sphere_right_eye').val();
    var nea_optometry_sphere_left_eye = $('#op_nea_optometry_sphere_left_eye').val();
    var nea_optometry_naso_pupil_distance_right_eye = $('#op_nea_optometry_naso_pupil_distance_right_eye').val();
    var nea_optometry_naso_pupil_distance_left_eye = $('#op_nea_optometry_naso_pupil_distance_left_eye').val();
    var nea_optometry_pupil_distance = $('#op_nea_optometry_pupil_distance').val();
    var dia_optometry_right_eye = $('#op_dia_optometry_right_eye').val();
    var dia_optometry_left_eye = $('#op_dia_optometry_left_eye').val();
    var dia_complementary_diagnosis = $('#op_dia_complementary_diagnosis').val();
    var dia_treatment = $('#op_dia_treatment').val();
    var con_optometry_brand = $('#op_con_optometry_brand').val();
    var con_optometry_type = $('#op_con_optometry_type').val();
    var con_optometry_color = $('#op_con_optometry_color').val();
    var par_optometry_right_eye = $('#op_par_optometry_right_eye').val();
    var par_optometry_left_eye = $('#op_par_optometry_left_eye').val();
    var mea_optometry_right_eye = $('#op_mea_optometry_right_eye').val();
    var mea_optometry_left_eye = $('#op_mea_optometry_left_eye').val();
    var obs_optometry_right_eye = $('#op_obs_optometry_right_eye').val();
    var obs_optometry_left_eye = $('#op_obs_optometry_left_eye').val();
    var responsible = $('#op_responsible').val();
    var receive = $('#op_receive').val();
    var reason_for_consultation = $('#op_reason_for_consultation').val();
    var current_illness = $('#op_current_illness').val();
    var indications = $('#op_indications').val();
    var occupational = $('#op_occupational').val();
    var examination_place = $('#op_examination_place').val();
    var values = {};
    values['function'] = 'newOptometry';
    values['patient_id'] = patient_id;
    values['uncorrected_visual_acuity_right_eye'] = uncorrected_visual_acuity_right_eye;
    values['uncorrected_visual_acuity_left_eye'] = uncorrected_visual_acuity_left_eye;
    values['uncorrected_visual_acuity_both_eyes'] = uncorrected_visual_acuity_both_eyes;
    values['corrected_visual_acuity_right_eye'] = corrected_visual_acuity_right_eye;
    values['corrected_visual_acuity_left_eye'] = corrected_visual_acuity_left_eye;
    values['corrected_visual_acuity_both_eyes'] = corrected_visual_acuity_both_eyes;
    values['len_optometry_right_eye'] = len_optometry_right_eye;
    values['len_optometry_left_eye'] = len_optometry_left_eye;
    values['dil_corrected_visual_acuity_right_eye'] = dil_corrected_visual_acuity_right_eye;
    values['dil_corrected_visual_acuity_left_eye'] = dil_corrected_visual_acuity_left_eye;
    values['far_optometry_right_eye'] = far_optometry_right_eye;
    values['far_optometry_left_eye'] = far_optometry_left_eye;
    values['far_optometry_sphere_right_eye'] = far_optometry_sphere_right_eye;
    values['far_optometry_sphere_left_eye'] = far_optometry_sphere_left_eye;
    values['far_optometry_cylinder_right_eye'] = far_optometry_cylinder_right_eye;
    values['far_optometry_cylinder_left_eye'] = far_optometry_cylinder_left_eye;
    values['far_optometry_axis_right_eye'] = far_optometry_axis_right_eye;
    values['far_optometry_axis_left_eye'] = far_optometry_axis_left_eye;
    values['far_optometry_naso_pupil_distance_right_eye'] = far_optometry_naso_pupil_distance_right_eye;
    values['far_optometry_naso_pupil_distance_left_eye'] = far_optometry_naso_pupil_distance_left_eye;
    values['far_optometry_pupil_distance'] = far_optometry_pupil_distance;
    values['nea_optometry_right_eye'] = nea_optometry_right_eye;
    values['nea_optometry_left_eye'] = nea_optometry_left_eye;
    values['nea_optometry_sphere_right_eye'] = nea_optometry_sphere_right_eye;
    values['nea_optometry_sphere_left_eye'] = nea_optometry_sphere_left_eye;
    values['nea_optometry_naso_pupil_distance_right_eye'] = nea_optometry_naso_pupil_distance_right_eye;
    values['nea_optometry_naso_pupil_distance_left_eye'] = nea_optometry_naso_pupil_distance_left_eye;
    values['nea_optometry_pupil_distance'] = nea_optometry_pupil_distance;
    values['dia_optometry_right_eye'] = dia_optometry_right_eye;
    values['dia_optometry_left_eye'] = dia_optometry_left_eye;
    values['dia_complementary_diagnosis'] = dia_complementary_diagnosis;
    values['dia_treatment'] = dia_treatment;
    values['con_optometry_brand'] = con_optometry_brand;
    values['con_optometry_type'] = con_optometry_type;
    values['con_optometry_color'] = con_optometry_color;
    values['par_optometry_right_eye'] = par_optometry_right_eye;
    values['par_optometry_left_eye'] = par_optometry_left_eye;
    values['mea_optometry_right_eye'] = mea_optometry_right_eye;
    values['mea_optometry_left_eye'] = mea_optometry_left_eye;
    values['obs_optometry_right_eye'] = obs_optometry_right_eye;
    values['obs_optometry_left_eye'] = obs_optometry_left_eye;
    values['responsible'] = responsible;
    values['user_name'] = user_name;
    values['receive'] = receive;
    values['reason_for_consultation'] = reason_for_consultation;
    values['current_illness'] = current_illness;
    values['indications'] = indications;
    values['occupational'] = occupational;
    values['examination_place'] = examination_place;
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
            $('#modOptometry').modal('hide');
            loadTableOptometry();
        }
    });
}

/**
 * Recopila todos los datos del formulario de optometría y los envía al servidor
 * para actualizar un registro existente.
 * @param {string|number} id - El ID del registro de optometría a editar.
 */
function editOptometry(id) {
    var funcion = '../controller/optometry_controller.php';
    var patient_id = $('#patient_id').val();
    var uncorrected_visual_acuity_right_eye = $('#op_uncorrected_visual_acuity_right_eye').val();
    var uncorrected_visual_acuity_left_eye = $('#op_uncorrected_visual_acuity_left_eye').val();
    var uncorrected_visual_acuity_both_eyes = $('#op_uncorrected_visual_acuity_both_eyes').val();
    var corrected_visual_acuity_right_eye = $('#op_corrected_visual_acuity_right_eye').val();
    var corrected_visual_acuity_left_eye = $('#op_corrected_visual_acuity_left_eye').val();
    var corrected_visual_acuity_both_eyes = $('#op_corrected_visual_acuity_both_eyes').val();
    var len_optometry_right_eye = $('#op_len_optometry_right_eye').val();
    var len_optometry_left_eye = $('#op_len_optometry_left_eye').val();
    var dil_corrected_visual_acuity_right_eye = $('#op_dil_corrected_visual_acuity_right_eye').val();
    var dil_corrected_visual_acuity_left_eye = $('#op_dil_corrected_visual_acuity_left_eye').val();
    var far_optometry_right_eye = $('#op_far_optometry_right_eye').val();
    var far_optometry_left_eye = $('#op_far_optometry_left_eye').val();
    var far_optometry_sphere_right_eye = $('#op_far_optometry_sphere_right_eye').val();
    var far_optometry_sphere_left_eye = $('#op_far_optometry_sphere_left_eye').val();
    var far_optometry_cylinder_right_eye = $('#op_far_optometry_cylinder_right_eye').val();
    var far_optometry_cylinder_left_eye = $('#op_far_optometry_cylinder_left_eye').val();
    var far_optometry_axis_right_eye = $('#op_far_optometry_axis_right_eye').val();
    var far_optometry_axis_left_eye = $('#op_far_optometry_axis_left_eye').val();
    var far_optometry_naso_pupil_distance_right_eye = $('#op_far_optometry_naso_pupil_distance_right_eye').val();
    var far_optometry_naso_pupil_distance_left_eye = $('#op_far_optometry_naso_pupil_distance_left_eye').val();
    var far_optometry_pupil_distance = $('#op_far_optometry_pupil_distance').val();
    var nea_optometry_right_eye = $('#op_nea_optometry_right_eye').val();
    var nea_optometry_left_eye = $('#op_nea_optometry_left_eye').val();
    var nea_optometry_sphere_right_eye = $('#op_nea_optometry_sphere_right_eye').val();
    var nea_optometry_sphere_left_eye = $('#op_nea_optometry_sphere_left_eye').val();
    var nea_optometry_naso_pupil_distance_right_eye = $('#op_nea_optometry_naso_pupil_distance_right_eye').val();
    var nea_optometry_naso_pupil_distance_left_eye = $('#op_nea_optometry_naso_pupil_distance_left_eye').val();
    var nea_optometry_pupil_distance = $('#op_nea_optometry_pupil_distance').val();
    var dia_optometry_right_eye = $('#op_dia_optometry_right_eye').val();
    var dia_optometry_left_eye = $('#op_dia_optometry_left_eye').val();
    var dia_complementary_diagnosis = $('#op_dia_complementary_diagnosis').val();
    var dia_treatment = $('#op_dia_treatment').val();
    var con_optometry_brand = $('#op_con_optometry_brand').val();
    var con_optometry_type = $('#op_con_optometry_type').val();
    var con_optometry_color = $('#op_con_optometry_color').val();
    var par_optometry_right_eye = $('#op_par_optometry_right_eye').val();
    var par_optometry_left_eye = $('#op_par_optometry_left_eye').val();
    var mea_optometry_right_eye = $('#op_mea_optometry_right_eye').val();
    var mea_optometry_left_eye = $('#op_mea_optometry_left_eye').val();
    var obs_optometry_right_eye = $('#op_obs_optometry_right_eye').val();
    var obs_optometry_left_eye = $('#op_obs_optometry_left_eye').val();
    var responsible = $('#op_responsible').val();
    var receive = $('#op_receive').val();
    var reason_for_consultation = $('#op_reason_for_consultation').val();
    var current_illness = $('#op_current_illness').val();
    var indications = $('#op_indications').val();
    var occupational = $('#op_occupational').val();
    var examination_place = $('#op_examination_place').val();
    var values = {};
    values['function'] = 'editOptometry';
    values['id'] = id;
    values['patient_id'] = patient_id;
    values['uncorrected_visual_acuity_right_eye'] = uncorrected_visual_acuity_right_eye;
    values['uncorrected_visual_acuity_left_eye'] = uncorrected_visual_acuity_left_eye;
    values['uncorrected_visual_acuity_both_eyes'] = uncorrected_visual_acuity_both_eyes;
    values['corrected_visual_acuity_right_eye'] = corrected_visual_acuity_right_eye;
    values['corrected_visual_acuity_left_eye'] = corrected_visual_acuity_left_eye;
    values['corrected_visual_acuity_both_eyes'] = corrected_visual_acuity_both_eyes;
    values['len_optometry_right_eye'] = len_optometry_right_eye;
    values['len_optometry_left_eye'] = len_optometry_left_eye;
    values['dil_corrected_visual_acuity_right_eye'] = dil_corrected_visual_acuity_right_eye;
    values['dil_corrected_visual_acuity_left_eye'] = dil_corrected_visual_acuity_left_eye;
    values['far_optometry_right_eye'] = far_optometry_right_eye;
    values['far_optometry_left_eye'] = far_optometry_left_eye;
    values['far_optometry_sphere_right_eye'] = far_optometry_sphere_right_eye;
    values['far_optometry_sphere_left_eye'] = far_optometry_sphere_left_eye;
    values['far_optometry_cylinder_right_eye'] = far_optometry_cylinder_right_eye;
    values['far_optometry_cylinder_left_eye'] = far_optometry_cylinder_left_eye;
    values['far_optometry_axis_right_eye'] = far_optometry_axis_right_eye;
    values['far_optometry_axis_left_eye'] = far_optometry_axis_left_eye;
    values['far_optometry_naso_pupil_distance_right_eye'] = far_optometry_naso_pupil_distance_right_eye;
    values['far_optometry_naso_pupil_distance_left_eye'] = far_optometry_naso_pupil_distance_left_eye;
    values['far_optometry_pupil_distance'] = far_optometry_pupil_distance;
    values['nea_optometry_right_eye'] = nea_optometry_right_eye;
    values['nea_optometry_left_eye'] = nea_optometry_left_eye;
    values['nea_optometry_sphere_right_eye'] = nea_optometry_sphere_right_eye;
    values['nea_optometry_sphere_left_eye'] = nea_optometry_sphere_left_eye;
    values['nea_optometry_naso_pupil_distance_right_eye'] = nea_optometry_naso_pupil_distance_right_eye;
    values['nea_optometry_naso_pupil_distance_left_eye'] = nea_optometry_naso_pupil_distance_left_eye;
    values['nea_optometry_pupil_distance'] = nea_optometry_pupil_distance;
    values['dia_optometry_right_eye'] = dia_optometry_right_eye;
    values['dia_optometry_left_eye'] = dia_optometry_left_eye;
    values['dia_complementary_diagnosis'] = dia_complementary_diagnosis;
    values['dia_treatment'] = dia_treatment;
    values['con_optometry_brand'] = con_optometry_brand;
    values['con_optometry_type'] = con_optometry_type;
    values['con_optometry_color'] = con_optometry_color;
    values['par_optometry_right_eye'] = par_optometry_right_eye;
    values['par_optometry_left_eye'] = par_optometry_left_eye;
    values['mea_optometry_right_eye'] = mea_optometry_right_eye;
    values['mea_optometry_left_eye'] = mea_optometry_left_eye;
    values['obs_optometry_right_eye'] = obs_optometry_right_eye;
    values['obs_optometry_left_eye'] = obs_optometry_left_eye;
    values['responsible'] = responsible;
    values['receive'] = receive;
    values['reason_for_consultation'] = reason_for_consultation;
    values['current_illness'] = current_illness;
    values['indications'] = indications;
    values['occupational'] = occupational;
    values['examination_place'] = examination_place;
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
            $('#modOptometry').modal('hide');
            loadTableOptometry();
        }
    });
}

/**
 * Abre un modal para editar un registro de optometría existente, precargando sus datos.
 * @param {string|number} id - El ID del registro de optometría a editar.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEditOptometry(id) {
    var funcion = '../controller/optometry_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditOptometry', id: id },
        cache: false,
        success: function (data) {
            sanitizeAndSetHTML('#formOptometry', data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modOptometry').modal('show');
    return false;
}

/**
 * Calcula la distancia pupilar total para la refracción de lejos.
 * Suma los valores de los ojos derecho e izquierdo y actualiza el campo total.
 */
function calculateFarPupilDistance() {
    var a = parseFloat($("#op_far_optometry_naso_pupil_distance_right_eye").val());
    var b = parseFloat($("#op_far_optometry_naso_pupil_distance_left_eye").val());
    var ok_a = false;
    var ok_b = false;
    var sum = 0;
    if (typeof a === 'number') {
        ok_a = true;
    } else {
        alertPopUp(translate['error'], translate['error_value'], 'error');
        $("#op_far_optometry_naso_pupil_distance_right_eye").val('');
        $("#op_far_optometry_naso_pupil_distance_right_eye").focus();
    }
    if (typeof b === 'number') {
        ok_b = true;
    } else {
        alertPopUp(translate['error'], translate['error_value'], 'error');
        $("#op_far_optometry_naso_pupil_distance_left_eye").val('');
        $("#op_far_optometry_naso_pupil_distance_left_eye").focus();
    }
    if (ok_a == true && ok_b == true) {
        sum = a + b;
        if (Number.isNaN(sum)) {
            $("#op_far_optometry_naso_pupil_distance_right_eye").val('');
            $("#op_far_optometry_naso_pupil_distance_left_eye").val('');
            sum = 0;
            $("#op_far_optometry_pupil_distance").val(sum);
            $("#op_far_optometry_pupil_distance").focus();
            alertPopUp(translate['error'], translate['error_value'], 'error');
        } else {
            $("#op_far_optometry_pupil_distance").val(sum);
        }
    }
}

/**
 * Calcula la distancia pupilar total para la refracción de cerca.
 * Suma los valores de los ojos derecho e izquierdo y actualiza el campo total.
 */
function calculateNeaPupilDistance() {
    var a = parseFloat($("#op_nea_optometry_naso_pupil_distance_right_eye").val());
    var b = parseFloat($("#op_nea_optometry_naso_pupil_distance_left_eye").val());
    var ok_a = false;
    var ok_b = false;
    var sum = 0;
    if (typeof a === 'number') {
        ok_a = true;
    } else {
        alertPopUp(translate['error'], translate['error_value'], 'error');
        $("#op_nea_optometry_naso_pupil_distance_right_eye").val('');
        $("#op_nea_optometry_naso_pupil_distance_right_eye").focus();
    }
    if (typeof b === 'number') {
        ok_b = true;
    } else {
        alertPopUp(translate['error'], translate['error_value'], 'error');
        $("#op_nea_optometry_naso_pupil_distance_left_eye").val('');
        $("#op_nea_optometry_naso_pupil_distance_left_eye").focus();
    }
    if (ok_a == true && ok_b == true) {
        sum = a + b;
        if (Number.isNaN(sum)) {
            $("#op_nea_optometry_naso_pupil_distance_right_eye").val('');
            $("#op_nea_optometry_naso_pupil_distance_left_eye").val('');
            sum = 0;
            $("#op_nea_optometry_pupil_distance").val(sum);
            $("#op_nea_optometry_pupil_distance").focus();
            alertPopUp(translate['error'], translate['error_value'], 'error');
        } else {
            $("#op_nea_optometry_pupil_distance").val(sum);
        }
    }
}

/**
 * Cierra el modal de optometría.
 */
function closeModalOptometry() {
    $('#modOptometry').modal('hide');
}

/**
 * Abre un modal de búsqueda de catálogo para un campo específico (ej. CIE-10).
 * Oculta temporalmente el modal de optometría para mostrar el de búsqueda.
 * @param {string} id - El ID del campo de entrada que inició la búsqueda.
 * @param {string} name - El nombre del catálogo a buscar (ej. 'CIE_10').
 */
function searchCatalogOptometry(id, name) {
    var funcion = '../controller/optometry_controller.php';
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
    $('#modOptometry').modal('hide');
}

/**
 * Carga la tabla de resultados en el modal de búsqueda de catálogo.
 * Incluye paginación y filtros basados en los valores introducidos por el usuario.
 * @param {number} offset_pag - El desplazamiento para la consulta de paginación.
 * @param {number} active_pag - El número de la página activa para resaltarla en la UI.
 */
function loadTableCIESearchOptometry(offset_pag, active_pag) {
    var op = $('#op').val();
    var code_cie = $('#s_code_cie').val();
    var text_cie = $('#s_text_cie').val();
    var funcion = '../controller/optometry_controller.php';
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
 * Transfiere el valor seleccionado del catálogo al campo de formulario correspondiente
 * en el modal de optometría y vuelve a mostrar dicho modal.
 * @param {string} value - El valor del ítem de catálogo seleccionado.
 * @param {string} title - El título o descripción del ítem seleccionado.
 */
function showCatalogFrameOptometry(value, title) {
    var id = $('#input_id').val();
    $('#' + id).val(value);
    $('#' + id).prop('title', title);
    $('#modSearchCatalog').modal('hide');
    $('#input_id').val('');
    $('#op').val('');
    $('#modOptometry').modal('show');
}

/**
 * Permite insertar un nuevo valor de catálogo si no se encontró en la búsqueda.
 * Transfiere el código buscado al campo de formulario y vuelve al modal de optometría.
 */
function showCatalogInsertFrameOptometry() {
    var id = $('#input_id').val();
    var code_cie = $('#s_code_cie').val();
    $('#' + id).val(code_cie);
    $('#' + id).prop('title', '');
    $('#modSearchCatalog').modal('hide');
    $('#input_id').val('');
    $('#op').val('');
    $('#modOptometry').modal('show');
}

/**
 * Cierra el modal de búsqueda de catálogo y vuelve a mostrar el modal de optometría.
 */
function closeModalSearchCatalogOptometry() {
    $('#s_code_cie').val('');
    $('#s_text_cie').val('');
    $('#input_id').val('');
    $('#op').val('');
    $('#modSearchCatalog').modal('hide');
    $('#modOptometry').modal('show');
}