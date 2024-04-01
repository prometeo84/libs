function loadRecipe() {
    var patient_id = $('#patient_id').val();
    if (patient_id != '') {
        var funcion = '../controller/recipe_controller.php';
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableRecipe', patient_id: patient_id },
            cache: false,
            success: function (data) {
                $('#tab-content-5').html(data);
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    } else {
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}
function loadRecipePDF(pdf_id, op) {
    var funcion = '../controller/recipe_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalRecipe', id: pdf_id, op: op },
        cache: false,
        success: function (data) {
            $('#modPDFDocument').modal('show');
            $('#formPDF').html(data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}

function openModalEmailAttachment(id) {
    var funcion = '../controller/recipe_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modUploadEmailAttachment', id: id },
        cache: false,
        success: function (data) {
            $('#formUploadFile').html(data);
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modUploadEmailAttachment').modal('show');
    return false;
}

function uploadFileAttachment() {
    var funcion = '../controller/recipe_controller.php';
    var anamnesis_id = $('#anamnesis_id').val();
    var form_data = new FormData();
    // Read selected files
    var totalfiles = document.getElementById('files').files.length;
    for (var index = 0; index < totalfiles; index++) {
        form_data.append("files[]", document.getElementById('files').files[index]);
        form_data.append("function", "sendMailAttachment");
        form_data.append("recipe_anamnesis_id", anamnesis_id);
    }
    // AJAX request
    $.ajax({
        type: 'POST',
        url: funcion,
        data: form_data,
        dataType: 'json',
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
            if (form_data == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        success: function () {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        },
        error: function (xhr) {
            alertPopUp(translate['error'], xhr.responseText, 'error');
        }
    });
}

function closeModalEmailAttachment() {
    $('#modUploadEmailAttachment').modal('hide');
}

