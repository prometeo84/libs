(function ($) {
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
// Solo Enteros Positivo
$(document).ready(function () {
  $('input[class=campoEnteroPositivo]').inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
});
function numberValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    return false;
  } else {
    return true;
  }
}
function stringValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123)) {
    return true;
  } else {
    return false;
  }
}
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
function catalogValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || ASCIICode == 95) {
    return true;
  } else {
    return false;
  }
}
function usernameValidate(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if ((ASCIICode > 64 && ASCIICode < 91) || (ASCIICode > 96 && ASCIICode < 123) || ASCIICode == 46) {
    return true;
  } else {
    return false;
  }
}
function emailValidate(input) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    alert("Correo Electrónico Invalido!");
    return false;
  }
}
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
//Solo Enteros Límite 500
$(document).ready(function () {
  $('input[class=campoEnteroLimite]').inputFilter(function (value) {
    return /^\d*$/.test(value) && (value === '' || parseInt(value) <= 500);
  });
});
//Entero Positivo y Negativo
$(document).ready(function () {
  $('input[class=campoEntero]').inputFilter(function (value) {
    return /^-?\d*$/.test(value);
  });
});
//Flotante con . o ,
$(document).ready(function () {
  $('input[class=campoFlotante]').inputFilter(function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
  });
});
//Moneda
$(document).ready(function () {
  $('input[class=campoMoneda]').inputFilter(function (value) {
    return /^-?\d*[.,]?\d{0,2}$/.test(value);
  });
});
//Solo Letras
$(document).ready(function () {
  $('input[class=campoTexto]').inputFilter(function (value) {
    return /^[a-z]*$/i.test(value);
  });
});
//Solo Letras Extendido
$(document).ready(function () {
  $('input[class=campoTextoExtendido]').inputFilter(function (value) {
    return /^[a-z\u00c0-\u024f]*$/i.test(value);
  });
});
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
function alertPopUp(titulo = '', mensaje = '', event = 'success') {
  //'warning','error','success','info','question'
  Swal.fire(
    titulo,
    mensaje,
    event
  )
}
function exportExcel() {
  var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($('#tableWrap').html())
  location.href = url
  return false
}
var translate = {
  advertice: 'Advertencia!',
  catalogs_father_null: 'Seleccione un Catálogo',
  catalogs_province_empty: 'Seleccione una Provincia',
  confirm_delete_register: 'Desea eliminar el registro?',
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
  saved_catalog: 'Catálogo Guardado.',
  success: 'Éxito!',
  update_register: 'Registro Modificado.',
  user_send_mail: 'Correo enviado.',
  required_fields: 'Ingrese los campos requeridos.'
};
