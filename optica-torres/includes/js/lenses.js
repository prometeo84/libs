function loadTable(offset_pag, active_pag) {
    var limite_pag = 5;
    var c_material = $('#c_material').val();
    var c_lens_type = $('#c_lens_type').val();
    var c_treatment = $('#c_treatment').val();
    var c_photo_sensitivity = $('#c_photo_sensitivity').val();
    var c_transition = $('#c_transition').val();
    var c_active = $('#c_active').val();
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableLenses', limit: limite_pag, offset: offset_pag, active_p: active_pag, material: c_material, lens_type: c_lens_type, treatment: c_treatment, photo_sensitivity: c_photo_sensitivity, transition: c_transition, active: c_active },
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            $('#tableLenses').html(data);
            $('#loading').hide();
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function modNewLenses() {
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalNewLenses' },
        cache: false,
        success: function (data) {
            $('#formNewLenses').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            $('#n_amount').prop('required', true);
        }
    });
    $('#modNewLenses').modal('show');
    return false;
}
function saveLenses() {
    var n_material = $('#n_material').val();
    var n_lens_type = $('#n_lens_type').val();
    var n_treatment = $('#n_treatment').val();
    var n_photo_sensitivity = $('#n_photo_sensitivity').val();
    var n_transition = $('#n_transition').val();
    var n_amount = $('#n_amount').val();
    var n_active = $('#n_active').val();
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'newLenses', material: n_material, lens_type: n_lens_type, treatment: n_treatment.toString(), photo_sensitivity: n_photo_sensitivity, transition: n_transition, amount: n_amount, active: n_active },
        cache: false,
        beforeSend: function (xhr) {
            if (n_material == '' || n_lens_type == '' || n_treatment == '' || n_photo_sensitivity == '' || n_transition == '' || n_amount == '' || n_active == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modNewLenses').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modNewLenses').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
            loadTable(0, 1);
        }
    });
}
function modEditLenses(id) {
    $('#lenses_id').val(id);
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalEditLenses', id: id },
        cache: false,
        beforeSend: function () {
            $('#n_amount').val('');
        },
        success: function (data) {
            $('#formEditLenses').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEditLenses').modal('show');
    return false;
}
function editLenses() {
    var e_id = $('#e_id').val();
    var e_material = $('#e_material').val();
    var e_lens_type = $('#e_lens_type').val();
    var e_treatment = $('#e_treatment').val();
    var e_photo_sensitivity = $('#e_photo_sensitivity').val();
    var e_transition = $('#e_transition').val();
    var e_amount = $('#e_amount').val();
    var e_active = $('#e_active').val();
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'editLenses', id: e_id, material: e_material, lens_type: e_lens_type, treatment: e_treatment.toString(), photo_sensitivity: e_photo_sensitivity, transition: e_transition, amount: e_amount, active: e_active },
        cache: false,
        beforeSend: function (xhr) {
            if (e_material == '' || e_lens_type == '' || e_treatment == '' || e_photo_sensitivity == '' || e_transition == '' || e_amount == '' || e_active == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modEditLenses').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modEditLenses').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
        }
    });
}
function deleteLenses(id) {
    var funcion = '../controller/lenses_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'deleteLenses', id: id },
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
function closeModalNewLenses() {
    $('#modNewLenses').modal('hide');
}
function closeModalEditLenses() {
    $('#modEditLenses').modal('hide');
}