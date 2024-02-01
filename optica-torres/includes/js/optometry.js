function modOptometry() {
    var funcion = '../controller/optometry_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modOptometry' },
        cache: false,
        success: function (data) {
            $('#formOptometry').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modOptometry').modal('show');
    return false;
}

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
                $('#tab-content-2').html(data);
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

function modEditOptometry(id) {
    var funcion = '../controller/optometry_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditOptometry', id: id },
        cache: false,
        success: function (data) {
            $('#formOptometry').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modOptometry').modal('show');
    return false;
}

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

function closeModalOptometry() {
    $('#modOptometry').modal('hide');
}

function searchCatalogOptometry(id, name) {
    var funcion = '../controller/optometry_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modSearchCatalog', id: id, op: name },
        cache: false,
        success: function (data) {
            $('#formSearchCatalog').html(data)
            $('#tablaSearchCatalog').html('');
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchCatalog').modal('show');
    $('#modOptometry').modal('hide');
}

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
            $('#tablaSearchCatalog').html(data);
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function showCatalogFrameOptometry(value, title) {
    var id = $('#input_id').val();
    $('#' + id).val(value);
    $('#' + id).prop('title', title);
    $('#modSearchCatalog').modal('hide');
    $('#input_id').val('');
    $('#op').val('');
    $('#modOptometry').modal('show');
}

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

function closeModalSearchCatalogOptometry() {
    $('#s_code_cie').val('');
    $('#s_text_cie').val('');
    $('#input_id').val('');
    $('#op').val('');
    $('#modSearchCatalog').modal('hide');
    $('#modOptometry').modal('show');
}
