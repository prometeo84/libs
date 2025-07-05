// file deepcode ignore DOMXSS: Sanitize in Class
/**
 * Abre un modal para ver y añadir detalles (pagos) a un recibo existente.
 * @param {string|number} id - El ID del recibo principal.
 * @param {number} amount_paid - El monto total del recibo.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modReceiptDetail(id, amount_paid) {
  var funcion = '../controller/receipt_detail_controller.php';
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { function: 'modReceiptDetail', receipt_id: id, amount_paid: amount_paid },
    cache: false,
    success: function (data) {
      sanitizeAndSetHTML('#formReceiptDetail', data);
    },
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    }
  });
  $('#modReceiptDetail').modal('show');
  loadTableReceiptDetail(id);
  return false;
}

/**
 * Cierra el modal de detalle de recibo.
 */
function closeModalReceiptDetail() {
  $('#modReceiptDetail').modal('hide');
}

/**
 * Guarda los nuevos detalles (pagos) de un recibo.
 * Recopila los datos de todas las filas de pago nuevas, las convierte a JSON y las envía al servidor.
 */
function saveReceiptDetail() {
  var funcion = '../controller/receipt_detail_controller.php';
  let payments = [];
  $("#payments tr").each(function (index, row) {
    let $currentRow = $(row);
    console.log($currentRow);
    let payment = {
      payment: $currentRow.find("input[name='r_payment']").val(),
      description: $currentRow.find("input[name='r_description']").val(),
      balance: $currentRow.find("input[name='r_balance']").val(),
      method_payment: $currentRow.find("select[name='r_method_payment']").val(),
      bank: $currentRow.find("select[name='r_bank']").val()
    };
    if (payment.description && payment.description.trim() !== '' && payment.payment && parseFloat(payment.payment) > 0 && payment.method_payment.trim() !== '') {
      payments.push(payment);
    }
  });
  if (payments.length === 0) {
    alertPopUp(translate['error'], translate['optometry_no_register'], 'error');
    return;
  }
  $.ajax({
    type: 'POST',
    url: funcion,
    data: { payments: JSON.stringify(payments), function: 'newReceiptDetail', receipt_id: $('#r_receipt_id').val() },
    cache: false,
    error: function () {
      alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
    },
    complete: function () {
      alertPopUp(translate['success'], translate['insert_register'], 'success');
      $('#modReceiptDetail').modal('hide');
      loadTableReceipt();
    }
  });
}

/**
 * Añade una nueva fila a la tabla de pagos en el modal de detalle de recibo,
 * permitiendo al usuario registrar un nuevo abono.
 */
function addReceiptDetail() {
  var cmbMethodPayment = $('#cmbMethodPayment').data('php-variable');
  var cmbBank = $('#cmbBank').data('php-variable');
  $('#payments_table').show();
  $('#total_balance').show();
  let rowCounter = $('#r_count').val();
  let paymentOptionsHtml = "<option value=''></option>";
  let bankOptionsHtml = "<option value=''></option>";
  if (cmbMethodPayment && Array.isArray(cmbMethodPayment)) {
    cmbMethodPayment.forEach(item => {
      paymentOptionsHtml += `<option value="${item.id}">${item.name}</option>`;
    });
  }
  if (cmbBank && Array.isArray(cmbBank)) {
    cmbBank.forEach(item => {
      bankOptionsHtml += `<option value="${item.id}">${item.name}</option>`;
    });
  }
  let newRowHead = "<tr id='row-" + rowCounter + "'>";
  let newRowBody1 = "<td style='width:20%'>$<input type='text' id='r_payment' name='r_payment' onkeypress='return floatValidate(event);' onblur='calculateBalance(this.value, " + rowCounter + ")' maxlength='6' style='width:43%' value='' placeholder='0000.00' /></td>";
  let newRowBody2 = "<td style='width:35%'><input type='text' id='r_description' name='r_description' onkeyup='this.value = this.value.toUpperCase();' style='width:95%' /></td>";
  let newRowBody3 = "<td style='width:33%'><select name='r_method_payment' id='r_method_payment_" + rowCounter + "' onchange='methodPayment(this)'>" + paymentOptionsHtml + "</select>&nbsp";
  let newRowBody4 = "<select name='r_bank' id='r_bank_" + rowCounter + "' style='display: none;'>" + bankOptionsHtml + "</select></td>";
  let newRowBody5 = "<td style='width:12%' class='acciones'><input type='hidden' id='r_balance' name='r_balance' value=''/><button type='button' class='btn btn-danger btn-sm' onclick='deleteRow(" + rowCounter + ");' name='accion' value='deleteRow'>" + translate['delete'] + " <i class='fa-solid fa-trash-can'></i></button></td>";
  let newRowFoot = "</tr>";
  let newRow = newRowHead + newRowBody1 + newRowBody2 + newRowBody3 + newRowBody4 + newRowBody5 + newRowFoot;
  $("#payments").append(newRow);
  rowCounter++;
  $('#r_count').val(rowCounter);
}

/**
 * Elimina una fila de la tabla de pagos.
 * @param {number} rowCounter - El identificador de la fila a eliminar.
 */
function deleteRow(rowCounter) {
  $("#row-" + rowCounter).closest("tr").remove();
}

/**
 * Calcula el saldo restante después de ingresar un monto de pago.
 * Se ejecuta en el evento `onblur` del campo de monto.
 * @param {number|string} payment - El monto del pago actual.
 * @param {number} id - El identificador de la fila actual.
 */
function calculateBalance(payment, id) {
  payment = parseFloat(payment);
  id = parseInt(id);
  let amount_paid = parseFloat($('#r_amount_paid').val());
  let balance = 0;
  let payment_tmp = parseFloat($("#r_payment_tmp").val());
  if ($("#payments #row-" + (id - 1) + " #r_balance").length) {
    balance = parseFloat($("#payments #row-" + (parseInt(id) - 1) + " #r_balance").val()) - payment;
  } else {
    balance = amount_paid - payment - payment_tmp;
  }
  if (parseFloat(balance.toFixed(2)) >= 0) {
    $("#payments #row-" + id + " #r_balance").val(parseFloat(balance.toFixed(2)));
    $("#r_totalBalance").val(parseFloat(balance.toFixed(2)));
  } else {
    alertPopUp(translate['error'], translate['receipt_balance_value'], 'error');
    $("#payments #row-" + id + " #r_payment").val('');
    $("#payments #row-" + id + " #r_balance").val('');
  }
}

/**
 * Carga el historial de pagos ya realizados para un recibo específico.
 * @param {string|number} id - El ID del recibo.
 */
function loadTableReceiptDetail(id) {
  var funcion = '../controller/receipt_detail_controller.php';
  if (id != '') {
    $.ajax({
      type: 'POST',
      url: funcion,
      data: { receipt_id: id, function: 'loadTableReceiptDetail' },
      cache: false,
      success: function (data) {
        if (data.length > 0) {
          sanitizeAndSetHTML('#payment_history', data);
          if (parseFloat($("#r_amount_paid").val()) == parseFloat($("#r_payment_tmp").val())) {
            $('#addRecepitDetail').hide();
          } else {
            $('#addRecepitDetail').show();
          }
        } else {
          $('#payment_history').hide();
        }
        $('#payments_table').hide();
        $('#total_balance').hide();
      },
      error: function () {
        alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
      }
    });
  }
}

/**
 * Muestra u oculta el selector de banco dependiendo del método de pago seleccionado.
 * Si el método es 'TRANSFERENCIA', muestra el selector; de lo contrario, lo oculta.
 * @param {HTMLElement} selectElement - El elemento `<select>` del método de pago que cambió.
 */
function methodPayment(selectElement) {
  var $select = $(selectElement);
  var selectedText = $select.find('option:selected').text();
  var $row = $select.closest('tr');
  var $bankSelect = $row.find("select[id^='r_bank_']");
  if (selectedText === 'TRANSFERENCIA') {
    $bankSelect.show();
  } else {
    $bankSelect.hide();
  }
}