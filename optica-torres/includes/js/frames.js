function loadTable(offset_pag, active_pag) {
    var limite_pag = 10;
    var c_type = $('#c_type').val();
    var c_brand = $('#c_brand').val();
    var c_code = $('#c_code').val();
    var c_active = $('#c_active').val();
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableFrames', limit: limite_pag, offset: offset_pag, active_p: active_pag, type: c_type, brand: c_brand, code: c_code, active: c_active },
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            $('#tableFrames').html(data);
            $('#loading').hide();
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function modNewFrames() {
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalNewFrames' },
        cache: false,
        success: function (data) {
            $('#formNewFrames').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            $('#n_sale_price').prop('required', true);
            $('#n_amount').prop('required', true);
        }
    });
    $('#modNewFrames').modal('show');
    return false;
}
function saveFrames() {
    var n_type = $('#n_type').val();
    var n_brand = $('#n_brand').val();
    var n_code = $('#n_code').val();
    var n_sale_price = $('#n_sale_price').val();
    var n_amount = $('#n_amount').val();
    var n_observations = $('#n_observations').val();
    var n_active = $('#n_active').val();
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'newFrames', type: n_type, brand: n_brand, code: n_code, sale_price: n_sale_price, observations: n_observations, amount: n_amount, active: n_active },
        cache: false,
        beforeSend: function (xhr) {
            if (n_type == '' || n_brand == '' || n_code == '' || n_sale_price == '' || n_observations == '' || n_amount == '' || n_active == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modNewFrames').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modNewFrames').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
            loadTable(0, 1);
        }
    });
}
function modEditFrames(id) {
    $('#frames_id').val(id);
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalEditFrames', id: id },
        cache: false,
        beforeSend: function () {
            $('#n_sale_price').val('');
            $('#n_amount').val('');
            $('#n_observations').val('');
        },
        success: function (data) {
            $('#formEditFrames').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEditFrames').modal('show');
    return false;
}
function editFrames() {
    var e_id = $('#e_id').val();
    var e_type = $('#e_type').val();
    var e_brand = $('#e_brand').val();
    var e_code = $('#e_code').val();
    var e_sale_price = $('#e_sale_price').val();
    var e_amount = $('#e_amount').val();
    var e_observations = $('#e_observations').val();
    var e_active = $('#e_active').val();
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'editFrames', id: e_id, type: e_type, brand: e_brand, code: e_code, sale_price: e_sale_price, observations: e_observations, amount: e_amount, active: e_active },
        cache: false,
        beforeSend: function (xhr) {
            if (e_type == '' || e_brand == '' || e_code == '' || e_sale_price == '' || e_observations == '' || e_amount == '' || e_active == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            $('#modEditFrames').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modEditFrames').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
        }
    });
}
function deleteFrames(id) {
    var funcion = '../controller/frames_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'deleteFrames', id: id },
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
function closeModalNewFrames() {
    $('#modNewFrames').modal('hide');
}
function closeModalEditFrames() {
    $('#modEditFrames').modal('hide');
}
