/**
 * @file Librería de utilidades de JavaScript para la aplicación.
 * Contiene funciones de validación, helpers de UI, y funciones de seguridad.
 */

(function ($) {
  /**
   * Plugin de jQuery para filtrar la entrada de un campo de texto en tiempo real.
   * @param {function(string): boolean} inputFilter - Una función que recibe el valor del input y devuelve true si es válido, false en caso contrario.
   * @returns {jQuery} El objeto jQuery para encadenamiento.
   */
  $.fn.inputFilter = function (inputFilter) {
    return this.on('input keydown keyup mousedown mouseup select contextmenu drop', function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  };
}(jQuery));

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Aplica el filtro de solo enteros positivos a los campos con la clase 'campoEnteroPositivo'.
 */
$(document).ready(function () {
  $('input[class=campoEnteroPositivo]').inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
});

/**
 * Valida si la tecla presionada corresponde a un dígito numérico.
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si es un número, de lo contrario false.
 */
function numberValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    return false;
  } else {
    return true;
  }
}

/**
 * Valida si la tecla presionada corresponde a un dígito numérico o un punto (para decimales).
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si es un número o un punto, de lo contrario false.
 */
function floatValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    if (ASCIICode == 46) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * Valida si la tecla presionada corresponde a una letra (a-z, A-Z).
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si es una letra, de lo contrario false.
 */
function stringValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Valida si la tecla presionada corresponde a una letra, espacio o caracteres acentuados comunes en español.
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si el carácter es válido para un nombre, de lo contrario false.
 */
function nameValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  var valid;
  validKeys = [32, 193, 201, 205, 209, 211, 218, 225, 233, 237, 241, 243, 250];
  if (validKeys.indexOf(ASCIICode) != -1) {
    valid = 1;
  }
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || valid == 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * Valida si la tecla presionada corresponde a una letra o un guion bajo, útil para nombres de catálogos.
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si el carácter es válido, de lo contrario false.
 */
function catalogValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || ASCIICode == 95) {
    return true;
  } else {
    return false;
  }
}

/**
 * Valida si la tecla presionada corresponde a una letra o un punto, útil para nombres de usuario.
 * @param {KeyboardEvent} evt - El evento del teclado.
 * @returns {boolean} True si el carácter es válido, de lo contrario false.
 */
function usernameValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || ASCIICode == 46) {
    return true;
  } else {
    return false;
  }
}

/**
 * Valida si una cadena de texto tiene el formato de un correo electrónico.
 * @param {string} input - La cadena de texto a validar.
 * @param {string} id - El ID del campo de entrada para limpiarlo si no es válido.
 * @returns {boolean} True si el formato es válido, de lo contrario false.
 */
function emailValidate(input, id) {
  let email = input.toString();
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    alert("Correo Electrónico Invalido!");
    $('#' + id).val('');
    return false;
  }
}

/**
 * Realiza una llamada AJAX para verificar si un número de documento ya existe en la base de datos.
 * @param {string} value - El número de documento a verificar.
 */
function idNumberExistValidate(value) {
  var funcion = '../controller/anamnesis_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'idNumberExistValidate', id_number: value },
    cache: false,
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    },
    success: function (data) {
      if (data > 0) {
        $('#a_id_number').val('');
        alertPopUp(translate['warning'], translate['id_number_exist'], 'warning');
      }
    }
  });
}

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Aplica varios filtros de entrada a diferentes clases de campos de formulario.
 */
$(document).ready(function () {
  $('input[class=campoEnteroLimite]').inputFilter(function (value) {
    return /^\d*$/.test(value) && (value === '' || parseInt(value) <= 500);
  });
  //Entero Positivo y Negativo
  $('input[class=campoEntero]').inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });
  //Flotante con . o ,
  $('input[class=campoFlotante]').inputFilter(function (value) {
    return /^-?\d*[.]?\d*$/.test(value);
  });
  //Moneda
  $('input[class=campoMoneda]').inputFilter(function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value);
  });
  //Solo Letras
  $('input[class=campoTexto]').inputFilter(function (value) {
    return /^[a-z]*$/i.test(value);
  });
  //Solo Letras Extendido
  $('input[class=campoTextoExtendido]').inputFilter(function (value) {
    return /^[a-z\u00c0-\u024f]*$/i.test(value);
  });
});

/**
 * Crea y envía un formulario dinámicamente para realizar una redirección POST.
 * @param {string} url - La URL a la que se enviará el formulario.
 * @param {object} data - Un objeto con los datos a enviar como campos ocultos.
 */
function redirectPost(url, data) {
  var form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'post';
  form.action = url;
  for (var name in data) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = data[name];
    form.appendChild(input);
  }
  form.submit();
}

/**
 * Muestra una ventana emergente utilizando la librería SweetAlert2.
 * @param {string} [titulo=''] - El título de la alerta.
 * @param {string} [mensaje=''] - El mensaje principal de la alerta.
 * @param {('success'|'error'|'warning'|'info'|'question')} [event='success'] - El tipo de alerta, que determina el icono.
 */
function alertPopUp(titulo = '', mensaje = '', event = 'success') {
  //'warning','error','success','info','question'
  Swal.fire(
    titulo,
    mensaje,
    event
  )
}

/**
 * Exporta el contenido HTML de un elemento a un archivo de Microsoft Excel.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento que la llama.
 */
function exportExcel() {
  var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($('#tableWrap').html())
  location.href = url
  return false
}

/**
 * Objeto que contiene cadenas de texto para internacionalización (i18n) en alertas y mensajes de JavaScript.
 */
var translate = {
  advertice: 'Advertencia!',
  catalogs_father_null: 'Seleccione un Catálogo',
  catalogs_province_empty: 'Seleccione una Provincia',
  confirm_delete_register: 'Desea eliminar el registro?',
  delete: 'Eliminar',
  delete_register: 'Registro Eliminado.',
  error_execution_proccess: 'Error en la ejecución del proceso.',
  error_value: 'El valor ingresado no posee el formato solicitado!',
  error: 'Error!',
  id_number_exist: 'Número de Documento ya ingresado!',
  image_extension: 'Las extensiones permitidas son: jpg, jpeg y png.',
  image_file_size: 'El archivo no puede sobrepasar los 250KB.',
  information_success: 'Información procesada satisfactoriamente!',
  information: 'Información!',
  insert_register: 'Registro Ingresado.',
  optometry_id_user: 'Seleccione al Paciente!',
  optometry_no_register: 'Sin Registros!',
  receipt_balance_value: 'Verifique la información ingresada',
  saved_catalog: 'Catálogo Guardado.',
  success: 'Éxito!',
  update_register: 'Registro Modificado.',
  user_send_mail: 'Correo enviado.',
  required_fields: 'Ingrese los campos requeridos.',
  report_invalid_date: 'Verifique las fechas ingresadas'
};

/**
 * Configuración para la librería DOMPurify.
 * Define una lista blanca de etiquetas y atributos HTML permitidos para la sanitización,
 * previniendo ataques XSS.
 */
const DOMPURIFY_CONFIG = {
  ADD_TAGS: ['iframe', 'embed', 'html', 'head', 'title', 'link', 'meta', 'script', 'body', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'hr', 'p', 'td', 'tr', 'a', 'b', 'br', 'button', 'span', 'strong', 'area', 'img', 'picture', 'table', 'tbody', 'th', 'thead', 'tfoot', 'button', 'input', 'textarea', 'label', 'option', 'select'],
  ADD_ATTR: ['src', 'type', 'width', 'height', 'frameborder', 'allowfullscreen', 'style', 'cellspacing', 'border', 'class', 'colspan', 'alt', 'onclick', 'onkeydown', 'onkeypress', 'onsubmit', 'onchange', 'onblur', 'onload', 'margin', 'padding']
};

/**
 * Sanitiza una cadena de HTML usando DOMPurify y la inserta en un elemento del DOM.
 * @param {string} selector - El selector de jQuery para el elemento contenedor.
 * @param {string} html - La cadena de HTML a sanitizar e insertar.
 */
function sanitizeAndSetHTML(selector, html) {
  const cleanHTML = DOMPurify.sanitize(html, DOMPURIFY_CONFIG);
  $(selector).html(cleanHTML);
}

function setupPasswordValidation(passwordSelector, submitSelector) {
  $(passwordSelector).keyup(function () {
    /**
     * Configura la validación en tiempo real para un campo de contraseña.
     * @param {string} passwordSelector - El selector de jQuery para el campo de contraseña.
     * @param {string} submitSelector - El selector de jQuery para el botón de envío que se habilitará/deshabilitará.
     */
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
      $(submitSelector).prop('disabled', false);
    } else {
      $(submitSelector).prop('disabled', true);
    }
  }).focus(function () {
    $('#pswd_info').show();
  }).blur(function () {
    $('#pswd_info').hide();
  });
}
