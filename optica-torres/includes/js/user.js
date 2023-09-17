function editUser(id) {
  $('#modEditarUsuario .close').css('display', 'none');
  $('#user_id').val(id);
  var funcion = '../controller/user_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'modalUser', value: id },
    cache: false,
    beforeSend: function () {
      $('#username').val('');
      $('#id_number').val('');
      $('#name').val('');
      $('#lastname').val('');
      $('#email').val('');
      $('#created_at').val('');
      $('#role_option').val('');
    },
    success: function (data) {
      $('#formEditUser').html(data)
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
  $('#modEditarUsuario').modal('show');
  return false;
}
function loadTable(offset_pag, active_pag) {
  var role = $('#role').val();
  var limite_pag = $('#num_reg').val();
  var c_username = $('#c_username').val();
  var c_created_at = $('#c_created_at').val();
  var c_hora_at = $('#c_hora_at').val();
  var c_active = $('#c_active').val();
  var c_role_id = $('#c_role_id').val();
  var funcion = '../controller/user_controller.php';
  if (limite_pag == '') {
    limite_pag = 5;
    $('#num_reg').val(limite_pag);
  }
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'loadTableUserRole', user_role: role, limit: limite_pag, offset: offset_pag, active_p: active_pag, username: c_username, created_at: c_created_at + ' ' + c_hora_at, active: c_active, role_id_f: c_role_id },
    cache: false,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (data) {
      $('#loading').hide();
      $('#tablaUser').html(data);
    },
    error: function () {
      $('#loading').hide();
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
}
function saveUser() {
  var funcion = '../controller/user_controller.php';
  var user_active = 1;
  var user_leader = 0;
  var id = $('#user_id').val();
  var idUser = $("#idUser").val();
  if (document.getElementById('user_active_' + idUser).checked == false) {
    user_active = 0;
  }
  if (document.getElementById('user_leader_' + idUser)) {
    if (document.getElementById('user_leader_' + idUser).checked == true) {
      user_leader = 1;
    }
  }
  var name = $('#name').val();
  var lastname = $('#lastname').val();
  var id_number = $('#id_number').val();
  var email = $('#email').val();
  var user_role_id = $('#role_option').val();
  var values = {};
  values['function'] = 'saveUser';
  values['user_id'] = id;
  values['name'] = name;
  values['lastname'] = lastname;
  values['id_number'] = id_number;
  values['email'] = email;
  values['leader'] = user_leader;
  values['user_active'] = user_active;
  values['role'] = user_role_id;
  if (name == '' || lastname == '' || id_number == '' || email == '' || user_role_id == '') {
    alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
    return false;
  } else {
    $.ajax({
      type: 'POST',
      url: funcion,
      data: values,
      cache: false,
      success: function () {
        $('#modEditarUsuario').modal('hide');
        loadTable(0, 1);
      },
      error: function () {
        alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        $('#modEditarUsuario').modal('hide');
      },
      complete: function () {
        alertPopUp(translate['success'], translate['update_register'], 'success');
      }
    });
  }
}
function deleteUser(id) {
  var funcion = '../controller/user_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'deleteUser', user_id: id },
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
    }
  });
}
function resetUser(id) {
  var funcion = '../controller/user_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'sendMail', user_id: id },
    cache: false,
    beforeSend: function () {
      $('#loading').show();
    },
    error: function () {
      $('#loading').hide();
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    },
    complete: function () {
      $('#loading').hide();
      alertPopUp(translate['success'], translate['user_send_mail'], 'success');
    }
  });
}
function closeModal() {
  $('#modEditarUsuario').modal('hide');
}