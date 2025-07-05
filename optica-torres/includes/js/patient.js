/**
 * @file Gestiona toda la lógica de la interfaz de usuario para la administración de pacientes.
 * Incluye la búsqueda, creación, edición y navegación de las diferentes secciones de un paciente.
 */

// file deepcode ignore DOMXSS: Sanitize in Class
/**
 * Realiza una llamada AJAX para obtener las ciudades de una provincia seleccionada
 * y poblar un elemento <select> con los resultados.
 * @param {HTMLSelectElement} provinceName - El elemento <select> de la provincia que disparó el evento.
 * @param {string} element - El ID del elemento <select> de la ciudad que se va a poblar.
 */
function readCity(provinceName, element) {
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
            }
        },
        success: function (data) {
            sanitizeAndSetHTML('#' + element, data);
        },
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

/**
 * Abre un modal para buscar pacientes existentes.
 * @returns {boolean} Retorna false para prevenir el comportamiento por defecto del evento.
 */
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
            sanitizeAndSetHTML('#formSearchPatient', data);
        },
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modSearchPatient').modal('show');
    return false;
}

/**
 * Función de inicialización que comprueba si hay un paciente seleccionado.
 * Si lo hay, carga su formulario de edición; de lo contrario, oculta el área de datos del paciente.
 */
function patientFrame() {
    var patientId = $('#patient_id').val();
    //$('.tabs').css('height', '10rem'); ya cambiado
    //$('.tab-content').css('height', '75%'); ya cambiado
    if (patientId == '') {
        $('#TableAnamnesis').hide();
    } else {
        showPatientEditFrame(patientId);
    }
}

/**
 * Prepara la interfaz para insertar un nuevo paciente.
 * Oculta el modal de búsqueda y carga el formulario de anamnesis en modo de creación.
 */
function showPatientInsertFrame() {
    var id = "";
    $('#modSearchPatient').modal('hide');
    loadTablePatient(id, 'INSERT');
    $('#TableAnamnesis').show();
}

/**
 * Prepara la interfaz para editar un paciente existente.
 * @param {string|number} id - El ID del paciente a editar.
 */
function showPatientEditFrame(id) {
    $('#modSearchPatient').modal('hide');
    $('#patient_id').val(id);
    loadTablePatient(id, 'EDIT');
    $('#TableAnamnesis').show();
}

/**
 * Recopila todos los datos del formulario de anamnesis y los envía al servidor
 * para crear un nuevo registro de paciente.
 * Realiza una validación de campos requeridos antes de enviar.
 * @returns {boolean|void} Retorna `false` si la validación falla.
 */
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
    if (name == '' || lastname == '' || birthdate == '' || genre == '' || id_number == '' || province == '' || city == '' || address == '' || mobile == '' || email == '' || type_contingency == '' || health_insurance == '' || allergy == '' || personal_history == '' || surgery == '' || medication == '' || ophthalmic_history == '' || family_background == '' || habits == '' || observations == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: funcion,
            data: values,
            cache: false,
            error: function (xhr, status) {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            complete: function (xhr, status) {
                alertPopUp(translate['success'], translate['insert_register'], 'success');
                patientFrame();
            }
        });
    }
}

/**
 * Recopila todos los datos del formulario de anamnesis y los envía al servidor
 * para actualizar un registro de paciente existente.
 * Realiza una validación de campos requeridos antes de enviar.
 * @returns {boolean|void} Retorna `false` si la validación falla.
 */
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
    if (name == '' || lastname == '' || birthdate == '' || genre == '' || id_number == '' || province == '' || city == '' || address == '' || mobile == '' || email == '' || type_contingency == '' || health_insurance == '' || allergy == '' || personal_history == '' || surgery == '' || medication == '' || ophthalmic_history == '' || family_background == '' || habits == '' || observations == '') {
        alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: funcion,
            data: values,
            cache: false,
            error: function (xhr, status) {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            complete: function (xhr, status) {
                alertPopUp(translate['success'], translate['update_register'], 'success');
                patientFrame();
            }
        });
    }
}

/**
 * Carga la tabla de resultados de búsqueda de pacientes con paginación.
 * Se basa en los criterios introducidos en el modal de búsqueda.
 * @param {number} offset_pag - El desplazamiento para la consulta de paginación.
 * @param {number} active_pag - El número de la página activa para resaltarla en la UI.
 */
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
            } else {
                $('#loading').show();
            }
        },
        success: function (data) {
            $('#loading').hide();
            sanitizeAndSetHTML('#tablaSearchPatient', data);
        },
        error: function (xhr, status) {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

/**
 * Carga el formulario principal de datos del paciente (anamnesis) en la primera pestaña.
 * @param {string|number} id - El ID del paciente a cargar. Puede ser vacío para un nuevo paciente.
 * @param {string} mode - El modo de operación ('INSERT' o 'EDIT').
 */
function loadTablePatient(id, mode) {
    var funcion = '../controller/anamnesis_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTablePatient', id: id, mode: mode },
        cache: false,
        error: function (xhr, status) {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            sanitizeAndSetHTML('#tab-content-1', data);
        },
        complete: function (xhr, status) {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

/**
 * Cierra el modal de búsqueda de pacientes.
 */
function closeModalSearchPatient() {
    $('#modSearchPatient').modal('hide');
}

/**
 * Cierra el modal de optometría.
 * Nota: El nombre de la función parece tener un error tipográfico ('closeModalcloseModal...').
 */
function closeModalcloseModalOptometry() {
    $('#modOptometry').modal('hide');
}

/**
 * Limpia el ID del paciente del campo oculto, terminando la "sesión" del paciente en la UI.
 */
function sessionPatient() {
    $('#patient_id').val('');
}

/**
 * Gestiona la lógica de la interfaz para cambiar entre las pestañas de la vista del paciente.
 * Oculta todo el contenido de las pestañas y muestra solo el de la pestaña activa.
 * @param {Event} evt - El objeto del evento click.
 * @param {string} tabName - El ID del contenido de la pestaña a mostrar.
 */
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    showDiv(tabName);
    evt.currentTarget.className += " active";
}

/**
 * Función auxiliar llamada por `openTab` para cargar dinámicamente el contenido
 * de la pestaña recién activada.
 * @param {string} tabName - El ID de la pestaña que se ha activado.
 */
function showDiv(tabName) {
    switch (tabName) {
        case 'tab2':
            loadTableOptometry();
            break;
        case 'tab3':
            loadTableEyePhysicalExam();
            break;
        case 'tab4':
            loadTableAppointmentScheduling();
            break;
        case 'tab5':
            loadRecipe();
        case 'tab7':
            loadTableReceipt();
            break;
    }
}