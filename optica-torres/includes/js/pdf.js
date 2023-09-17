function newPDF(type_pdf, op) {
    var funcion = '../controller/pdf_controller.php';
    var patient_id = $('#patient_id').val();
    var values = {};
    var validate = true;
    switch (type_pdf) {
        case 'RECIPE':
            var name = $('#r_name').val();
            var date = $('#r_date').val();
            var rp = $('#r_rp').val();
            var indications = $('#r_indications').val();
            var city_name = $('#r_city_name').val();
            var age = $('#r_age').val();
            var d_re = $('#r_d_re').val();
            var d_le = $('#r_d_le').val();
            var d_complementary = $('#r_d_complementary').val();
            var foot_signature = $('#r_foot_signature').val();
            values['name'] = name;
            values['date'] = date;
            values['rp'] = rp;
            values['indications'] = indications;
            values['city_name'] = city_name;
            values['age'] = age;
            values['d_re'] = d_re;
            values['d_le'] = d_le;
            values['d_complementary'] = d_complementary;
            values['foot_signature'] = foot_signature;
            if (date == '' || rp == '' || indications == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                validate = false;
            }
            break;
        case 'ATTENDANCE':
            var id_number = $('#c_id_number').val();
            var name = $('#c_name').val();
            var genre = $('#c_genre').val();
            var city_name = $('#c_city_name').val();
            var date = $('#c_date').val();
            var appointment_start_date = $('#c_appointment_start_date').val();
            var appointment_finish_date = $('#c_appointment_finish_date').val();
            var foot_signature = $('#c_foot_signature').val();
            values['id_number'] = id_number;
            values['name'] = name;
            values['genre'] = genre;
            values['city_name'] = city_name;
            values['date'] = date;
            values['appointment_start_date'] = appointment_start_date;
            values['appointment_finish_date'] = appointment_finish_date;
            values['foot_signature'] = foot_signature;
            if (date == '' || appointment_start_date == '' || appointment_finish_date == '' || foot_signature == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                validate = false;
            }
            break;
        case 'VISUAL':
            var id_number = $('#c_id_number').val();
            var name = $('#c_name').val();
            var genre = $('#c_genre').val();
            var city_name = $('#c_city_name').val();
            var date = $('#c_date').val();
            var age = $('#c_age').val();
            var uv_a_re = $('#c_uv_a_re').val();
            var uv_a_le = $('#c_uv_a_le').val();
            var uv_a_be = $('#c_uv_a_be').val();
            var cv_a_re = $('#c_cv_a_re').val();
            var cv_a_le = $('#c_cv_a_le').val();
            var cv_a_be = $('#c_cv_a_be').val();
            var fe_s_re = $('#c_fe_s_re').val();
            var fe_s_le = $('#c_fe_s_le').val();
            var fe_c_re = $('#c_fe_c_re').val();
            var fe_c_le = $('#c_fe_c_le').val();
            var fe_a_re = $('#c_fe_a_re').val();
            var fe_a_le = $('#c_fe_a_le').val();
            var ne_s_re = $('#c_ne_s_re').val();
            var ne_s_le = $('#c_ne_s_le').val();
            var d_re = $('#c_d_re').val();
            var d_le = $('#c_d_le').val();
            var d_complementary = $('#c_d_complementary').val();
            var c_recomendations = $('#c_recomendations').val();
            var foot_signature = $('#c_foot_signature').val();
            values['id_number'] = id_number;
            values['name'] = name;
            values['genre'] = genre;
            values['city_name'] = city_name;
            values['date'] = date;
            values['age'] = age;
            values['uv_a_re'] = uv_a_re;
            values['uv_a_le'] = uv_a_le;
            values['uv_a_be'] = uv_a_be;
            values['cv_a_re'] = cv_a_re;
            values['cv_a_le'] = cv_a_le;
            values['cv_a_be'] = cv_a_be;
            values['fe_s_re'] = fe_s_re;
            values['fe_s_le'] = fe_s_le;
            values['fe_c_re'] = fe_c_re;
            values['fe_c_le'] = fe_c_le;
            values['fe_a_re'] = fe_a_re;
            values['fe_a_le'] = fe_a_le;
            values['ne_s_re'] = ne_s_re;
            values['ne_s_le'] = ne_s_le;
            values['d_re'] = d_re;
            values['d_le'] = d_le;
            values['d_complementary'] = d_complementary;
            values['c_recomendations'] = c_recomendations;
            values['foot_signature'] = foot_signature;
            if (date == '' || appointment_start_date == '' || appointment_finish_date == '' || foot_signature == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                validate = false;
            }
            break;
        case 'OPHTHALMOLOGICAL':
            var id_number = $('#c_id_number').val();
            var name = $('#c_name').val();
            var genre = $('#c_genre').val();
            var city_name = $('#c_city_name').val();
            var date = $('#c_date').val();
            var age = $('#c_age').val();
            var fe_s_re = $('#c_fe_s_re').val();
            var fe_s_le = $('#c_fe_s_le').val();
            var fe_c_re = $('#c_fe_c_re').val();
            var fe_c_le = $('#c_fe_c_le').val();
            var fe_a_re = $('#c_fe_a_re').val();
            var fe_a_le = $('#c_fe_a_le').val();
            var ne_s_re = $('#c_ne_s_re').val();
            var ne_s_le = $('#c_ne_s_le').val();
            var d_re = $('#c_d_re').val();
            var d_le = $('#c_d_le').val();
            var d_complementary = $('#c_d_complementary').val();
            var amsler_primer = $("#c_amsler_primer").val();
            var ishihara_test = $("#c_ishihara_test").val();
            var c_recomendations = $('#c_recomendations').val();
            var foot_signature = $('#c_foot_signature').val();
            values['id_number'] = id_number;
            values['name'] = name;
            values['genre'] = genre;
            values['city_name'] = city_name;
            values['date'] = date;
            values['age'] = age;
            values['fe_s_re'] = fe_s_re;
            values['fe_s_le'] = fe_s_le;
            values['fe_c_re'] = fe_c_re;
            values['fe_c_le'] = fe_c_le;
            values['fe_a_re'] = fe_a_re;
            values['fe_a_le'] = fe_a_le;
            values['ne_s_re'] = ne_s_re;
            values['ne_s_le'] = ne_s_le;
            values['d_re'] = d_re;
            values['d_le'] = d_le;
            values['d_complementary'] = d_complementary;
            values['amsler_primer'] = amsler_primer;
            values['dishihara_test'] = ishihara_test;
            values['c_recomendations'] = c_recomendations;
            values['foot_signature'] = foot_signature;
            if (date == '' || appointment_start_date == '' || appointment_finish_date == '' || foot_signature == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                validate = false;
            }
            break;
        case 'IESS':
            var id_number = $('#c_id_number').val();
            var name = $('#c_name').val();
            var genre = $('#c_genre').val();
            var city_name = $('#c_city_name').val();
            var date = $('#c_date').val();
            var resting_day = $('#c_resting_day').val();
            var rest_date = $('#c_rest_date').val();
            var recommendatios = $('#c_recommendatios').val();
            var clinic_history = $('#c_clinic_history').val();
            var contingency = $('#c_contingency').val();
            var address = $('#c_address').val();
            var mobile = $('#c_mobile').val();
            var workplace = $('#c_workplace').val();
            var work_activity = $('#c_work_activity').val();
            var diagnosis_right_eye = $('#c_diagnosis_right_eye').val();
            var diagnosis_left_eye = $('#c_diagnosis_left_eye').val();
            var diagnosis_complementary = $('#c_diagnosis_complementary').val();
            var treatment = $('#c_treatment').val();
            var foot_signature = $('#c_foot_signature').val();
            values['id_number'] = id_number;
            values['name'] = name;
            values['genre'] = genre;
            values['city_name'] = city_name;
            values['date'] = date;
            values['resting_day'] = resting_day;
            values['rest_date'] = rest_date;
            values['recommendatios'] = recommendatios;
            values['clinic_history'] = clinic_history;
            values['contingency'] = contingency;
            values['address'] = address;
            values['mobile'] = mobile;
            values['workplace'] = workplace;
            values['work_activity'] = work_activity;
            values['diagnosis_right_eye'] = diagnosis_right_eye;
            values['diagnosis_left_eye'] = diagnosis_left_eye;
            values['diagnosis_complementary'] = diagnosis_complementary;
            values['treatment'] = treatment;
            values['foot_signature'] = foot_signature;
            if (date == '' || resting_day == '' || rest_date == '' || recommendatios == '' || foot_signature == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                validate = false;
            }
            break;
    }
    if (validate) {
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'newPDF', patient_id: patient_id, type: type_pdf, field_values: values },
            cache: false,
            success: function (data) {
                switch (type_pdf) {
                    case 'RECIPE':
                        loadRecipePDF(data, op, id_number);
                        break;
                    default:
                        loadDocumentPDF(data, type_pdf, op, id_number);
                        break;
                }
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
                $('#modPDFDocument').modal('hide');
            }
        });
    } else {
        return false;
    }
}
