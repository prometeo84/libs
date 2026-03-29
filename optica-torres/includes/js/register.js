/**
 * @file Gestiona la lógica de la página de registro de nuevos usuarios.
 * Se encarga de enviar los datos del formulario al servidor y de inicializar la validación de la contraseña.
 */

/**
 * Recopila los datos del formulario de registro y los envía al servidor para crear un nuevo usuario.
 * Realiza una llamada AJAX al controlador `register_controller.php`.
 * Si el controlador devuelve un mensaje, lo muestra como una advertencia (ej. "el usuario ya existe").
 * Si el proceso es exitoso, muestra un mensaje de éxito y recarga la página.
 */
function saveRegister() {
  var funcion = '../controller/register_controller.php';
  var user_role = $('#role').val();
  var user_login = $('#login').val();
  var user_name = $('#name').val();
  var user_lastname = $('#lastname').val();
  var user_email = $('#email').val();
  var user_password = $('#password').val();
  var user_confirm_password = $('#confirm_password').val();
  var csrf = $('input[name="CSRFToken"]').val();

  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'saveRegister', login: user_login, name: user_name, lastname: user_lastname, email: user_email, password: user_password, confirm_password: user_confirm_password, role: user_role, CSRFToken: csrf },
    cache: false,
    beforeSend: function () { $('#loading').show(); },
    success: function (data) {
      if (data != '') {
        $('#loading').hide();
        alertPopUp(translate['advertice'], data, 'warning');
      } else {
        setTimeout(location.reload.bind(location), 1000);
        $('#loading').hide();
        $('#password').val('');
        $('#confirm_password').val('');
        alertPopUp(translate['success'], translate['insert_register'], 'success');
      }
    },
    error: function () { $('#loading').hide(); alertPopUp(translate['error'], translate['error_execution_proccess'], 'error'); }
  });
}

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Limpia los campos de contraseña y configura la validación de fortaleza de la contraseña en tiempo real,
 * utilizando la función `setupPasswordValidation` de `util.js`.
 */
$(document).ready(function () {
  $('#password').html('');
  $('#confirm_password').val('');
  if (typeof setupPasswordValidation === 'function') {
    setupPasswordValidation('input[type=password]', '#submit');
  }
});
