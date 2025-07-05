/**
 * @file Gestiona la lógica de la página de reinicio de contraseña.
 * Se encarga de enviar la nueva contraseña al servidor y de inicializar la validación de la fortaleza de la contraseña.
 */

/**
 * Envía la nueva contraseña y su confirmación al servidor para ser guardada.
 * Realiza una llamada AJAX al controlador `reset_password_controller.php`.
 * Muestra un mensaje de éxito y redirige al login si el proceso es correcto,
 * o un mensaje de error en caso contrario.
 */
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

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Inicializa la validación de fortaleza de la contraseña en los campos de tipo 'password',
 * utilizando la función `setupPasswordValidation` de `util.js`.
 * Habilita o deshabilita el botón de envío (`#submit`) según se cumplan los criterios.
 */
$(document).ready(function () {
  setupPasswordValidation('input[type=password]', '#submit');
});
