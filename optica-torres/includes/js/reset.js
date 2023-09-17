function saveRegister() {
  var funcion = '../controller/reset_password_controller.php';
  var userId = $('#userId').val();
  var user_password = $('#password').val();
  var user_confirm_password = $('#confirm_password').val();
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'saveReset', user_id: userId, password: user_password, confirm_password: user_confirm_password },
    cache: false,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function () {
      $('#loading').hide();
      alertPopUp(translate['success'], translate['update_register'], 'success');
      setTimeout(function () {
        window.location.href = '../view/login.php';
      }, 2000)
    },
    error: function () {
      $('#loading').hide();
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
}
$(document).ready(function () {
  $('input[type=password]').keyup(function () {
    var pswd = $(this).val();
    var okpswd = 0;
    //validate the length
    if (pswd.length < 6) {
      okpswd = okpswd - 1;
      $('#length').removeClass('valid').addClass('invalid');
    } else {
      $('#length').removeClass('invalid').addClass('valid');
      okpswd = okpswd + 1;
    }
    //validate letter
    if (pswd.match(/[A-z]/)) {
      $('#letter').removeClass('invalid').addClass('valid');
      okpswd = okpswd + 1;
    } else {
      $('#letter').removeClass('valid').addClass('invalid');
      okpswd = okpswd - 1;
    }
    //validate capital letter
    if (pswd.match(/[A-Z]/)) {
      $('#capital').removeClass('invalid').addClass('valid');
      okpswd = okpswd + 1;
    } else {
      $('#capital').removeClass('valid').addClass('invalid');
      okpswd = okpswd - 1;
    }
    //validate number
    if (pswd.match(/\d/)) {
      $('#number').removeClass('invalid').addClass('valid');
      okpswd = okpswd + 1;
    } else {
      $('#number').removeClass('valid').addClass('invalid');
      okpswd = okpswd - 1;
    }
    //validate space
    if (pswd.match(/[^a-zA-Z0-9\-\/]/)) {
      $('#space').removeClass('invalid').addClass('valid');
      okpswd = okpswd + 1;
    } else {
      $('#space').removeClass('valid').addClass('invalid');
      okpswd = okpswd - 1;
    }
    if (okpswd >= 4) {
      $('#submit').prop('disabled', false);
    } else {
      $('#submit').prop('disabled', true);
    }
  }).focus(function () {
    $('#pswd_info').show();
  }).blur(function () {
    $('#pswd_info').hide();
  });
});
