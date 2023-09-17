function loadTable(offset_pag, active_pag) {
    var limite_pag = 5;
    var c_catalogs = $('#c_catalogs').val();
    var c_name = $('#c_name').val();
    var c_value = $('#c_value').val();
    var c_active = $('#c_active').val();
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableCatalogs', limit: limite_pag, offset: offset_pag, active_p: active_pag, catalog_id: c_catalogs, name: c_name, value: c_value, active: c_active },
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            $('#tableCatalogs').html(data);
            $('#loading').hide();
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function modNewCatalogs() {
    var catalog_id = $('#c_catalogs').val();
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalNewCatalogs', catalog_id: catalog_id },
        cache: false,
        success: function (data) {
            $('#formNewCatalogs').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            $('#catalog').prop('required', true);
        }
    });
    $('#modNewCatalogs').modal('show');
    return false;
}
function saveCatalogs() {
    var n_catalog_id = $('#c_catalogs').val();
    var n_name = $('#n_name').val();
    var n_value = $('#n_value').val();
    var n_active = $('#n_active').val();
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'newCatalogs', catalog_id: n_catalog_id, name: n_name, value: n_value, active: n_active },
        cache: false,
        beforeSend: function (xhr) {
            if (n_catalog_id == '') {
                alertPopUp(translate['advertice'], translate['catalogs_father_null'], 'warning');
                xhr.abort();
            }
            if (n_name == '' || n_value == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
            }
            return false;
        },
        success: function () {
            $('#modNewCatalogs').modal('hide');
            loadTable(0, 1);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            $('#modNewCatalogs').modal('hide');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['saved_catalog'], 'success');
            loadTable(0, 1);
        }
    });
}
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
            $('#formEditCatalogs').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEditCatalogs').modal('show');
    return false;
}
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
function closeModalNewCatalogs() {
    $('#modNewCatalogs').modal('hide');
}
function closeModalEditCatalogs() {
    $('#modEditCatalogs').modal('hide');
}