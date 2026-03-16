/**
 * @file Gestiona la lógica de la interfaz de usuario para los recibos de pago.
 * Incluye funciones para cargar, crear, editar y guardar recibos.
 */

// file deepcode ignore DOMXSS: Sanitize in Class
/**
 * Abre un modal para crear un nuevo recibo.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modReceipt() {
  var funcion = "../controller/receipt_controller.php";
  $.ajax({
    type: "POST",
    url: funcion,
    data: { function: "modReceipt" },
    cache: false,
    success: function (data) {
      sanitizeAndSetHTML("#formReceipt", data);
    },
    error: function () {
      alertPopUp(
        translate["error"],
        translate["error_execution_proccess"],
        "error",
      );
    },
  });
  $("#modReceipt").modal("show");
  return false;
}

/**
 * Carga la tabla de recibos para el paciente actualmente seleccionado.
 * Realiza una llamada AJAX para obtener el HTML de la tabla y lo inserta en el DOM.
 */
function loadTableReceipt() {
  var funcion = "../controller/receipt_controller.php";
  var id = $("#patient_id").val();

  if (id != "") {
    $("#btnModNewReceipt").show();
    $.ajax({
      type: "POST",
      url: funcion,
      data: {
        function: "loadTableReceipt",
        patient_id: id,
        limit: 50,
        offset: 0,
        active_p: 1,
      },
      cache: false,
      error: function () {
        alertPopUp(
          translate["error"],
          translate["error_execution_proccess"],
          "error",
        );
      },
      success: function (data) {
        sanitizeAndSetHTML("#tab-content-7", data);
      },
    });
  } else {
    $("#btnReceipt").hide();
    $("#PatientTabs").load(location.href + " #PatientTabs");
    alertPopUp(translate["error"], translate["optometry_id_user"], "error");
  }
}

/**
 * Guarda un nuevo recibo. Recopila los datos del formulario y los envía al servidor.
 */
function saveReceipt() {
  var funcion = "../controller/receipt_controller.php";
  var patient_id = $("#patient_id").val();
  var description = $("#r_description").val();
  var branch_id = $("#r_branch").val();
  var delivery_date = $("#r_delivery_date").val();
  var retirement_date = $("#r_retirement_date").val();
  var amount_paid = $("#r_amount_paid").val();
  var values = {};
  values["function"] = "newReceipt";
  values["patient_id"] = patient_id;
  values["description"] = description;
  values["branch_id"] = branch_id;
  values["delivery_date"] = delivery_date;
  values["retirement_date"] = retirement_date;
  values["amount_paid"] = amount_paid;
  $.ajax({
    type: "POST",
    url: funcion,
    data: values,
    cache: false,
    beforeSend: function (xhr) {
      if (branch_id == "" || delivery_date == "" || amount_paid == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        xhr.abort();
        return false;
      }
    },
    error: function () {
      alertPopUp(
        translate["error"],
        translate["error_execution_proccess"],
        "error",
      );
    },
    complete: function () {
      alertPopUp(translate["success"], translate["insert_register"], "success");
      $("#modReceipt").modal("hide");
      loadTableReceipt();
    },
  });
}

/**
 * Guarda los cambios de un recibo existente.
 * @param {string|number} id - El ID del recibo que se está editando.
 */
function editReceipt(id) {
  var funcion = "../controller/receipt_controller.php";
  var patient_id = $("#patient_id").val();
  var description = $("#r_description").val();
  var branch_id = $("#r_branch").val();
  var delivery_date = $("#r_delivery_date").val();
  var retirement_date = $("#r_retirement_date").val();
  var amount_paid = $("#r_amount_paid").val();
  var values = {};
  values["id"] = id;
  values["function"] = "editReceipt";
  values["patient_id"] = patient_id;
  values["description"] = description;
  values["branch_id"] = branch_id;
  values["delivery_date"] = delivery_date;
  values["retirement_date"] = retirement_date;
  values["amount_paid"] = amount_paid;
  $.ajax({
    type: "POST",
    url: funcion,
    data: values,
    cache: false,
    beforeSend: function (xhr) {
      if (branch_id == "" || delivery_date == "" || amount_paid == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        xhr.abort();
        return false;
      }
    },
    error: function () {
      alertPopUp(
        translate["error"],
        translate["error_execution_proccess"],
        "error",
      );
    },
    complete: function () {
      alertPopUp(translate["success"], translate["insert_register"], "success");
      $("#modReceipt").modal("hide");
      loadTableReceipt();
    },
  });
}

/**
 * Abre un modal para editar un recibo existente, precargando sus datos.
 * @param {string|number} id - El ID del recibo a editar.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
function modEditReceipt(id) {
  var funcion = "../controller/receipt_controller.php";
  $.ajax({
    type: "POST",
    url: funcion,
    data: { function: "modEditReceipt", id: id },
    cache: false,
    success: function (data) {
      sanitizeAndSetHTML("#formReceipt", data);
    },
    error: function () {
      alertPopUp(
        translate["error"],
        translate["error_execution_proccess"],
        "error",
      );
    },
  });
  $("#modReceipt").modal("show");
  return false;
}

/**
 * Cierra el modal de creación/edición de recibos.
 */
function closeModalReceipt() {
  $("#modReceipt").modal("hide");
}
