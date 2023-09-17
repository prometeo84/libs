function readCity(provinceName) {
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'createDropDownCity', catalog_id: provinceName.value, provinceName: provinceName.selectedOptions[0].text },
        cache: false,
        beforeSend: function (xhr) {
            if (provinceName == '') {
                alertPopUp(translate['advertice'], translate['catalogs_province_empty'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function (data) {
            $('#a_city').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}
function modSearchPatient() {
    var funcion = '../controller/anamnesis_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalSearchPatient' },
        cache: false,
        beforeSend: function () {
            $('#s_id_number').val('');
            $('#s_lastname').val('');
            $('#s_name').val('');
            $('#tablaSearchPatient').html('');
        },
        success: function (data) {
            $('#formSearchPatient').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchPatient').modal('show');
    return false;
}
function patientFrame() {
    var patientId = $('#patient_id').val();
    $('.tabs').css('height', '10rem');
    $('.tab-content').css('height', '75%');
    if (patientId == '') {
        $('#TableAnamnesis').hide();
    } else {
        showPatientEditFrame(patientId);
    }
}
function showPatientInsertFrame() {
    var id = "";
    $('#modSearchPatient').modal('hide');
    loadTablePatient(id, 'INSERT');
    $('.tabs').css('height', '65rem');
    $('.tab-content').css('height', '96%');
    $('#TableAnamnesis').show();
}
function showPatientEditFrame(id) {
    $('#modSearchPatient').modal('hide');
    $('#patient_id').val(id);
    loadTablePatient(id, 'EDIT');
    $('.tabs').css('height', '65rem');
    $('.tab-content').css('height', '96%');
    $('#TableAnamnesis').show();
}
function savePatient() {
    var funcion = '../controller/anamnesis_controller.php';
    var lastname = $('#a_lastname').val();
    var name = $('#a_name').val();
    var birthdate = $('#a_birthdate').val();
    var genre = $('#a_genre').val();
    var id_number = $('#a_id_number').val();
    var passport = $('#a_passport').val();
    var province = $('#a_province').val();
    var city = $('#a_city').val();
    var address = $('#a_address').val();
    var telephone = $('#a_telephone').val();
    var mobile = $('#a_mobile').val();
    var email = $('#a_email').val();
    var academic_instruction = $('#a_academic_instruction').val();
    var work_activity = $('#a_work_activity').val();
    var workplace = $('#a_workplace').val();
    var type_contingency = $('#a_type_contingency').val();
    var health_insurance = $('#a_health_insurance').val();
    var blood_type = $('#a_blood_type').val();
    var allergy = $('#a_allergy').val();
    var personal_history = $('#a_personal_history').val();
    var surgery = $('#a_surgery').val();
    var medication = $('#a_medication').val();
    var ophthalmic_history = $('#a_ophthalmic_history').val();
    var ophthalmological_family_history = $('#a_ophthalmological_family_history').val();
    var family_background = $('#a_family_background').val();
    var habits = $('#a_habits').val();
    var observations = $('#a_observations').val();
    var values = {};
    values['function'] = 'newAnamnesis';
    values['lastname'] = lastname;
    values['name'] = name;
    values['birthdate'] = birthdate;
    values['genre'] = genre;
    values['id_number'] = id_number;
    values['passport'] = passport;
    values['province'] = province;
    values['city'] = city;
    values['address'] = address;
    values['telephone'] = telephone;
    values['mobile'] = mobile;
    values['email'] = email;
    values['academic_instruction'] = academic_instruction;
    values['work_activity'] = work_activity;
    values['workplace'] = workplace;
    values['type_contingency'] = type_contingency;
    values['health_insurance'] = health_insurance;
    values['blood_type'] = blood_type;
    values['allergy'] = allergy;
    values['personal_history'] = personal_history;
    values['surgery'] = surgery;
    values['medication'] = medication;
    values['ophthalmic_history'] = ophthalmic_history;
    values['ophthalmological_family_history'] = ophthalmological_family_history;
    values['family_background'] = family_background;
    values['habits'] = habits;
    values['observations'] = observations;
    if (name == '' || lastname == '' || birthdate == '' || genre == '' || id_number == '' || province == '' || city == '' || address == '' || mobile == '' || email == '' || type_contingency == '' || health_insurance == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: funcion,
            data: values,
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            complete: function () {
                alertPopUp(translate['success'], translate['insert_register'], 'success');
                patientFrame();
            }
        });
    }
}

function editPatient() {
    var funcion = '../controller/anamnesis_controller.php';
    var id = $('#patient_id').val();
    var lastname = $('#a_lastname').val();
    var name = $('#a_name').val();
    var birthdate = $('#a_birthdate').val();
    var genre = $('#a_genre').val();
    var id_number = $('#a_id_number').val();
    var passport = $('#a_passport').val();
    var province = $('#a_province').val();
    var city = $('#a_city').val();
    var address = $('#a_address').val();
    var telephone = $('#a_telephone').val();
    var mobile = $('#a_mobile').val();
    var email = $('#a_email').val();
    var academic_instruction = $('#a_academic_instruction').val();
    var work_activity = $('#a_work_activity').val();
    var workplace = $('#a_workplace').val();
    var type_contingency = $('#a_type_contingency').val();
    var health_insurance = $('#a_health_insurance').val();
    var blood_type = $('#a_blood_type').val();
    var allergy = $('#a_allergy').val();
    var personal_history = $('#a_personal_history').val();
    var surgery = $('#a_surgery').val();
    var medication = $('#a_medication').val();
    var ophthalmic_history = $('#a_ophthalmic_history').val();
    var ophthalmological_family_history = $('#a_ophthalmological_family_history').val();
    var family_background = $('#a_family_background').val();
    var habits = $('#a_habits').val();
    var observations = $('#a_observations').val();
    var values = {};
    values['function'] = 'editAnamnesis';
    values['id'] = id;
    values['lastname'] = lastname;
    values['name'] = name;
    values['birthdate'] = birthdate;
    values['genre'] = genre;
    values['id_number'] = id_number;
    values['passport'] = passport;
    values['province'] = province;
    values['city'] = city;
    values['address'] = address;
    values['telephone'] = telephone;
    values['mobile'] = mobile;
    values['email'] = email;
    values['academic_instruction'] = academic_instruction;
    values['work_activity'] = work_activity;
    values['workplace'] = workplace;
    values['type_contingency'] = type_contingency;
    values['health_insurance'] = health_insurance;
    values['blood_type'] = blood_type;
    values['allergy'] = allergy;
    values['personal_history'] = personal_history;
    values['surgery'] = surgery;
    values['medication'] = medication;
    values['ophthalmic_history'] = ophthalmic_history;
    values['ophthalmological_family_history'] = ophthalmological_family_history;
    values['family_background'] = family_background;
    values['habits'] = habits;
    values['observations'] = observations;
    if (name == '' || lastname == '' || birthdate == '' || genre == '' || id_number == '' || province == '' || city == '' || address == '' || mobile == '' || email == '' || type_contingency == '' || health_insurance == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: funcion,
            data: values,
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            complete: function () {
                alertPopUp(translate['success'], translate['update_register'], 'success');
                patientFrame();
            }
        });
    }
}

function loadTableSearch(offset_pag, active_pag) {
    var s_id_number = $('#s_id_number').val();
    var s_lastname = $('#s_lastname').val();
    var s_name = $('#s_name').val();
    var funcion = '../controller/anamnesis_controller.php';
    var limite_pag = 5;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableSearchPatients', limit: limite_pag, offset: offset_pag, active_p: active_pag, id_number: s_id_number, name: s_name, lastname: s_lastname },
        cache: false,
        beforeSend: function (xhr) {
            if (s_id_number == '' && s_lastname == '' && s_name == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            } else {
                $('#loading').show();
            }
        },
        success: function (data) {
            $('#loading').hide();
            $('#tablaSearchPatient').html(data);
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function loadTablePatient(id, mode) {
    var funcion = '../controller/anamnesis_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTablePatient', id: id, mode: mode },
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            $('#tab-content-1').html(data);
        },
        complete: function () {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

function closeModalSearchPatient() {
    $('#modSearchPatient').modal('hide');
}

function closeModalcloseModalOptometry() {
    $('#modOptometry').modal('hide');
}

function sessionPatient() {
    $('#patient_id').val('');
}