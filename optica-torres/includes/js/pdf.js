/**
 * @file Gestiona la creación de diversos documentos PDF en toda la aplicación.
 */

/**
 * Recopila datos de un formulario, los valida y los envía al servidor para generar un documento PDF.
 *
 * Esta función actúa como un controlador central para la generación de múltiples tipos de PDFs.
 * Utiliza un `switch` basado en el parámetro `type_pdf` para determinar qué campos de formulario
 * leer y qué validaciones aplicar.
 *
 * Una vez recopilados los datos, realiza una llamada AJAX a `pdf_controller.php`. Si la creación
 * es exitosa, el servidor devuelve un ID que se utiliza para cargar el PDF en un modal
 * a través de las funciones `loadRecipePDF` o `loadDocumentPDF`.
 *
 * @param {string} type_pdf - El tipo de PDF a generar (ej. 'RECIPE', 'ATTENDANCE', 'VISUAL', 'HISTORIAL_MEDICO'). Determina el caso del switch a ejecutar.
 * @param {string|number} op - Un parámetro de operación multipropósito. Puede ser el nombre de una firma, un ID de detalle, etc., dependiendo del contexto.
 * @returns {boolean|void} Retorna `false` si la validación inicial falla, para detener la ejecución.
 */
function newPDF(type_pdf, op) {
  var funcion = "../controller/pdf_controller.php";
  var patient_id = $("#patient_id").val();
  var values = [];
  var validate = true;
  var foo_value =
    "MUIFACL6qgAh_qfJ2QfZHet5UlUYS0AJTSCXQZkSO_L1dZL6Ayiny_eocJUozTfEeLA05mRC6719eadtogvzj4X7pQ4JXlCpZK-De1s3J12ypsOE7ARDRSIuYbdSoVi6R4Q6Wt05_vb4MuNf_OsfeP-6pJ0Z0J30YqX56U8=";
  switch (type_pdf) {
    case "RECIPE":
      var name = $("#r_name").val();
      var date = $("#r_date").val();
      var rp = $("#r_rp").val();
      var indications = $("#r_indications").val();
      var warning_signs = $("#r_warning_signs").val();
      var pharmacological_recommendations = $(
        "#r_pharmacological_recommendations",
      ).val();
      var city = $("#r_city").val();
      var age = $("#r_age").val();
      var month = $("#r_month").val();
      var d_re = $("#r_d_re").val();
      var d_le = $("#r_d_le").val();
      var d_complementary = $("#r_d_complementary").val();
      var foot_signature = $("#r_foot_signature").val();
      var id_number = $("#r_id_number").val();
      var genre = $("#r_genre_id").val();
      var allergy = $("#r_allergy").val();
      var foot_signature_name = $("#r_foot_signature option:selected").text();
      op = $("#r_foot_signature option:selected").text();

      // Usar array con índices específicos para garantizar el orden
      values[0] = name;
      values[1] = date;
      values[2] = rp;
      values[3] = indications;
      values[4] = city;
      values[5] = age;
      values[6] = month;
      values[7] = d_re;
      values[8] = d_le;
      values[9] = d_complementary;
      values[10] = foot_signature;
      values[11] = id_number;
      values[12] = foot_signature_name;
      values[13] = "-"; // Placeholder (NO usar vacío)
      values[14] = "-"; // Placeholder (NO usar vacío)
      values[15] = "-"; // Placeholder (NO usar vacío)
      values[16] = "-"; // Placeholder (NO usar vacío)
      values[17] = genre;
      values[18] = allergy;
      values[19] = warning_signs;
      values[20] = pharmacological_recommendations;

      if (date == "" || rp == "" || indications == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "ATTENDANCE":
      var id_number = $("#c_id_number").val();
      var name = $("#c_name").val();
      var genre = $("#c_genre").val();
      var city_name = $("#c_city_name").val();
      var date = $("#c_date").val();
      var appointment_start_date = $("#c_appointment_start_date").val();
      var appointment_finish_date = $("#c_appointment_finish_date").val();
      var foot_signature = $("#c_foot_signature").val();
      var foot_signature_name = $("#c_foot_signature option:selected").text();
      
      // Usar array indexado para garantizar orden
      values[0] = id_number;
      values[1] = name;
      values[2] = genre;
      values[3] = city_name;
      values[4] = date;
      values[5] = appointment_start_date;
      values[6] = appointment_finish_date;
      values[7] = foot_signature; // 5 partes separadas con {}
      values[8] = "-"; // Placeholder
      values[9] = "-";
      values[10] = "-";
      values[11] = "-";
      values[12] = foot_signature_name;
      
      if (
        date == "" ||
        foot_signature == ""
      ) {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "VISUAL":
      var id_number = $("#c_id_number").val();
      var name = $("#c_name").val();
      var genre = $("#c_genre").val();
      var city_name = $("#c_city_name").val();
      var date = $("#c_date").val();
      var age = $("#c_age").val();
      var uv_a_re = $("#c_uv_a_re").val();
      var uv_a_le = $("#c_uv_a_le").val();
      var uv_a_be = $("#c_uv_a_be").val();
      var cv_a_re = $("#c_cv_a_re").val();
      var cv_a_le = $("#c_cv_a_le").val();
      var cv_a_be = $("#c_cv_a_be").val();
      var fe_s_re = $("#c_fe_s_re").val();
      var fe_s_le = $("#c_fe_s_le").val();
      var fe_c_re = $("#c_fe_c_re").val();
      var fe_c_le = $("#c_fe_c_le").val();
      var fe_a_re = $("#c_fe_a_re").val();
      var fe_a_le = $("#c_fe_a_le").val();
      var ne_s_re = $("#c_ne_s_re").val();
      var ne_s_le = $("#c_ne_s_le").val();
      var d_re = $("#c_d_re").val();
      var d_le = $("#c_d_le").val();
      var d_complementary = $("#c_d_complementary").val();
      var c_recomendations = $("#c_recomendations").val();
      var foot_signature = $("#c_foot_signature").val();
      var foot_signature_name = $("#c_foot_signature option:selected").text();
      
      // Usar array indexado para garantizar orden
      values[0] = id_number;
      values[1] = name;
      values[2] = genre;
      values[3] = city_name;
      values[4] = date;
      values[5] = age;
      values[6] = uv_a_re;
      values[7] = uv_a_le;
      values[8] = uv_a_be;
      values[9] = cv_a_re;
      values[10] = cv_a_le;
      values[11] = cv_a_be;
      values[12] = fe_s_re;
      values[13] = fe_s_le;
      values[14] = fe_c_re;
      values[15] = fe_c_le;
      values[16] = fe_a_re;
      values[17] = fe_a_le;
      values[18] = ne_s_re;
      values[19] = ne_s_le;
      values[20] = d_re;
      values[21] = d_le;
      values[22] = d_complementary;
      values[23] = c_recomendations;
      values[24] = foot_signature; // 5 partes separadas con {}
      values[25] = "-"; // Placeholder
      values[26] = "-";
      values[27] = "-";
      values[28] = "-";
      values[29] = foot_signature_name;
      
      if (
        date == "" ||
        foot_signature == ""
      ) {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "OPHTHALMOLOGICAL":
      var id_number = $("#c_id_number").val();
      var name = $("#c_name").val();
      var genre = $("#c_genre").val();
      var city_name = $("#c_city_name").val();
      var date = $("#c_date").val();
      var age = $("#c_age").val();
      var fe_s_re = $("#c_fe_s_re").val();
      var fe_s_le = $("#c_fe_s_le").val();
      var fe_c_re = $("#c_fe_c_re").val();
      var fe_c_le = $("#c_fe_c_le").val();
      var fe_a_re = $("#c_fe_a_re").val();
      var fe_a_le = $("#c_fe_a_le").val();
      var ne_s_re = $("#c_ne_s_re").val();
      var ne_s_le = $("#c_ne_s_le").val();
      var d_re = $("#c_d_re").val();
      var d_le = $("#c_d_le").val();
      var d_complementary = $("#c_d_complementary").val();
      var amsler_primer = $("#c_amsler_primer").val();
      var ishihara_test = $("#c_ishihara_test").val();
      var c_recomendations = $("#c_recomendations").val();
      var foot_signature = $("#c_foot_signature").val();
      var foot_signature_name = $("#c_foot_signature option:selected").text();
      
      // Usar array indexado para garantizar orden
      values[0] = id_number;
      values[1] = name;
      values[2] = genre;
      values[3] = city_name;
      values[4] = date;
      values[5] = age;
      values[6] = fe_s_re;
      values[7] = fe_s_le;
      values[8] = fe_c_re;
      values[9] = fe_c_le;
      values[10] = fe_a_re;
      values[11] = fe_a_le;
      values[12] = ne_s_re;
      values[13] = ne_s_le;
      values[14] = d_re;
      values[15] = d_le;
      values[16] = d_complementary;
      values[17] = amsler_primer;
      values[18] = ishihara_test;
      values[19] = c_recomendations;
      values[20] = foot_signature; // 5 partes separadas con {}
      values[21] = "-"; // Placeholder
      values[22] = "-";
      values[23] = "-";
      values[24] = "-";
      values[25] = foot_signature_name;
      
      if (
        date == "" ||
        foot_signature == ""
      ) {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "IESS-SURGERY":
      var id_number = $("#c_id_number").val();
      var name = $("#c_name").val();
      var genre = $("#c_genre").val();
      var city_name = $("#c_city_name").val();
      var date = $("#c_date").val();
      var resting_day = $("#c_resting_day").val();
      var rest_date = $("#c_rest_date").val();
      var branch = $("#c_branch").val();
      var recommendatios = $("#c_recommendatios").val();
      var clinic_history = $("#c_clinic_history").val();
      var contingency = $("#c_contingency").val();
      var address = $("#c_address").val();
      var mobile = $("#c_mobile").val();
      var workplace = $("#c_workplace").val();
      var work_activity = $("#c_work_activity").val();
      var diagnosis_right_eye = $("#c_diagnosis_right_eye").val();
      var diagnosis_left_eye = $("#c_diagnosis_left_eye").val();
      var diagnosis_complementary = $("#c_diagnosis_complementary").val();
      var treatment = $("#c_treatment").val();
      var foot_signature = $("#c_foot_signature").val();
      var foot_signature_name = $("#c_foot_signature option:selected").text();
      values["id_number"] = id_number;
      values["name"] = name;
      values["genre"] = genre;
      values["city_name"] = city_name;
      values["date"] = date;
      values["resting_day"] = resting_day;
      values["rest_date"] = rest_date;
      values["recommendatios"] = recommendatios;
      values["clinic_history"] = clinic_history;
      values["contingency"] = contingency;
      values["address"] = address;
      values["mobile"] = mobile;
      values["workplace"] = workplace;
      values["work_activity"] = work_activity;
      values["diagnosis_right_eye"] = diagnosis_right_eye;
      values["diagnosis_left_eye"] = diagnosis_left_eye;
      values["diagnosis_complementary"] = diagnosis_complementary;
      values["treatment"] = treatment;
      values["branch"] = branch;
      values["foot_signature"] = foot_signature;
      values["foot_signature_name"] = foot_signature_name;
      if (
        date == "" ||
        resting_day == "" ||
        rest_date == "" ||
        recommendatios == "" ||
        foot_signature == "" ||
        branch == ""
      ) {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "IESS-ATTENTION":
      var id_number = $("#c_id_number").val();
      var name = $("#c_name").val();
      var age = $("#c_age").val();
      var genre = $("#c_genre").val();
      var city_name = $("#c_city_name").val();
      var date = $("#c_date").val();
      var resting_day = $("#c_resting_day").val();
      var rest_date = $("#c_rest_date").val();
      var branch = $("#c_branch").val();
      var recommendatios = $("#c_recommendatios").val();
      var clinic_history = $("#c_clinic_history").val();
      var contingency = $("#c_contingency").val();
      var address = $("#c_address").val();
      var mobile = $("#c_mobile").val();
      var workplace = $("#c_workplace").val();
      var work_activity = $("#c_work_activity").val();
      var diagnosis_right_eye = $("#c_diagnosis_right_eye").val();
      var diagnosis_left_eye = $("#c_diagnosis_left_eye").val();
      var diagnosis_complementary = $("#c_diagnosis_complementary").val();
      var treatment = $("#c_treatment").val();
      var email = $("#c_email").val();
      var foot_signature = $("#c_foot_signature").val();
      var foot_signature_name = $("#c_foot_signature option:selected").text();
      values["id_number"] = id_number;
      values["name"] = name;
      values["age"] = age;
      values["genre"] = genre;
      values["city_name"] = city_name;
      values["date"] = date;
      values["resting_day"] = resting_day;
      values["rest_date"] = rest_date;
      values["recommendatios"] = recommendatios;
      values["clinic_history"] = clinic_history;
      values["contingency"] = contingency;
      values["address"] = address;
      values["mobile"] = mobile;
      values["workplace"] = workplace;
      values["work_activity"] = work_activity;
      values["diagnosis_right_eye"] = diagnosis_right_eye;
      values["diagnosis_left_eye"] = diagnosis_left_eye;
      values["diagnosis_complementary"] = diagnosis_complementary;
      values["treatment"] = treatment;
      values["email"] = email;
      values["branch"] = branch;
      values["foot_signature"] = foot_signature;
      values["foot_signature_name"] = foot_signature_name;
      if (
        date == "" ||
        resting_day == "" ||
        rest_date == "" ||
        recommendatios == "" ||
        foot_signature == "" ||
        branch == ""
      ) {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "ANAMNESIS_POR_USUARIO":
      var patient_id = foo_value;
      var id_number = 0;
      var username = $("#username").val();
      var s_date = $("#s_date").val();
      var f_date = $("#f_date").val();
      var branch = $("#branch").val();
      values["id_number"] = id_number;
      values["patient_id"] = patient_id;
      values["username"] = username;
      values["s_date"] = s_date;
      values["f_date"] = f_date;
      values["branch"] = branch;
      var sDate = new Date(s_date);
      var fDate = new Date(f_date);
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = fDate.getTime() - sDate.getTime();
      var days = millisBetween / millisecondsPerDay;
      if (days < 0) {
        alertPopUp(
          translate["advertice"],
          translate["report_invalid_date"],
          "warning",
        );
        validate = false;
      }
      if (username == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "EXAMEN_OFTALMOLOGICO_POR_USUARIO":
      var patient_id = foo_value;
      var id_number = 0;
      var username = $("#username").val();
      var s_date = $("#s_date").val();
      var f_date = $("#f_date").val();
      var branch = $("#branch").val();
      values["id_number"] = id_number;
      values["patient_id"] = patient_id;
      values["username"] = username;
      values["s_date"] = s_date;
      values["f_date"] = f_date;
      values["branch"] = branch;
      var sDate = new Date(s_date);
      var fDate = new Date(f_date);
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = fDate.getTime() - sDate.getTime();
      var days = millisBetween / millisecondsPerDay;
      if (days < 0) {
        alertPopUp(
          translate["advertice"],
          translate["report_invalid_date"],
          "warning",
        );
        validate = false;
      }
      if (username == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "HISTORIAL_MEDICO":
      var patient_id = foo_value;
      var id_number = $("#id_number").val();
      values["id_number"] = id_number;
      values["patient_id"] = patient_id;
      if (id_number == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "REPORTE_MENSUAL_AGENDA":
      var patient_id = foo_value;
      var id_month = $("#month").val();
      values["id_month"] = id_month;
      values["patient_id"] = patient_id;
      if (id_month == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "REPORTE_COBROS":
      var patient_id = foo_value;
      var id_number = $("#id_number").val();
      var s_date = $("#s_date").val();
      var f_date = $("#f_date").val();
      var branch = $("#branch").val();
      var canceled = $("#canceled").val();
      values["id_number"] = id_number;
      values["patient_id"] = patient_id;
      values["s_date"] = s_date;
      values["f_date"] = f_date;
      values["branch"] = branch;
      values["canceled"] = canceled;
      var sDate = new Date(s_date);
      var fDate = new Date(f_date);
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = fDate.getTime() - sDate.getTime();
      var days = millisBetween / millisecondsPerDay;
      if (days < 0) {
        alertPopUp(
          translate["advertice"],
          translate["report_invalid_date"],
          "warning",
        );
        validate = false;
      }
      if (id_number == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
    case "RECEIPT":
      var patient_id = foo_value;
      values["receipt_detail_id"] = op;
      if (id_month == "") {
        alertPopUp(
          translate["advertice"],
          translate["required_fields"],
          "warning",
        );
        validate = false;
      }
      break;
  }
  if (validate) {
    $.ajax({
      type: "POST",
      url: funcion,
      data: {
        function: "newPDF",
        patient_id: patient_id,
        type: type_pdf,
        field_values: values,
      },
      cache: false,
      success: function (data) {
        switch (type_pdf) {
          case "RECIPE":
            loadRecipePDF(data, op, id_number);
            break;
          default:
            loadDocumentPDF(data, type_pdf, op, id_number);
            break;
        }
      },
      error: function () {
        alertPopUp(
          translate["error"],
          translate["error_execution_proccess"],
          "error",
        );
        $("#modPDFDocument").modal("hide");
      },
    });
  } else {
    return false;
  }
}
