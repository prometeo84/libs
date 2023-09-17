function loadTable(offset_pag, active_pag) {
  var limite_pag = $('#num_reg').val();
  var c_catalog = $('#c_catalog').val();
  var c_active = $('#c_active').val();
  var funcion = '../controller/catalog_controller.php';
  if (limite_pag == '' || limite_pag < 1) {
    limite_pag = 5;
    $('#num_reg').val(limite_pag);
  }
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'loadTableCatalog', limit: limite_pag, offset: offset_pag, active_p: active_pag, catalog: c_catalog, active: c_active },
    cache: false,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (data) {
      $('#tableCatalog').html(data);
      $('#loading').hide();
    },
    error: function () {
      $('#loading').hide();
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
}

function modNewCatalog() {
  var funcion = '../controller/catalog_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'modalNewCatalog' },
    cache: false,
    success: function (data) {
      $('#formNewCatalog').html(data)
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    },
    complete: function () {
      $('#catalog').prop('required', true);
    }
  });
  $('#modNewCatalog').modal('show');
  return false;
}
function saveCatalog() {
  var n_catalog = $('#n_catalog').val();
  var n_active = $('#n_active').val();
  var funcion = '../controller/catalog_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'newCatalog', catalog: n_catalog, active: n_active },
    cache: false,
    beforeSend: function (xhr) {
      if (n_catalog == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        xhr.abort();
        return false;
      }
    },
    success: function () {
      $('#modNewCatalog').modal('hide');
      loadTable(0, 1);
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
      $('#modNewCatalog').modal('hide');
    },
    complete: function () {
      alertPopUp(translate['success'], translate['saved_catalog'], 'success');
      window.setTimeout('location.reload()', 4000);
    }
  });
}
function modEditCatalog(id) {
  $('#catalog_id').val(id);
  var funcion = '../controller/catalog_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'modalEditCatalog', id: id },
    cache: false,
    beforeSend: function () {
      $('#e_catalog').val('');
      $('#e_active').val('');
    },
    success: function (data) {
      $('#formEditCatalog').html(data)
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
  $('#modEditCatalog').modal('show');
  return false;
}
function editCatalog() {
  var id = $('#catalog_id').val();
  var e_catalog = $('#e_catalog').val();
  var e_active = $('#e_active').val();
  var funcion = '../controller/catalog_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'editCatalog', id: id, catalog: e_catalog, active: e_active },
    cache: false,
    beforeSend: function (xhr) {
      if (e_catalog == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        xhr.abort();
        return false;
      }
    },
    success: function () {
      $('#modEditCatalog').modal('hide');
      loadTable(0, 1);
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
      $('#modEditCatalog').modal('hide');
    },
    complete: function () {
      alertPopUp(translate['success'], translate['saved_catalog'], 'success');
      window.setTimeout('location.reload()', 4000);
    }
  });
}
function deleteCatalog(id) {
  var funcion = '../controller/catalog_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'deleteCatalog', id: id },
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
function closeModalNewCatalog() {
  $('#modNewCatalog').modal('hide');
}
function closeModalEditCatalog() {
  $('#modEditCatalog').modal('hide');
}