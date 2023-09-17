function openModalEyePhysicalFileExam(id) {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modalUploadFile', id: id },
        cache: false,
        success: function (data) {
            $('#formUploadFile').html(data);
            loadTableEyePhysicalExamFile();
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modEyePhysicalExam').modal('hide');
    $('#modUploadFile').modal('show');
    return false;
}

function uploadEyePhysicalFileExam() {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    var exam_id = $('#exam_id').val();
    var form_data = new FormData();
    // Read selected files
    var totalfiles = document.getElementById('files').files.length;
    for (var index = 0; index < totalfiles; index++) {
        form_data.append("files[]", document.getElementById('files').files[index]);
        form_data.append("function", "newEyePhysicalExamFile");
        form_data.append("eye_physical_exam_id", exam_id);
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
            openModalEyePhysicalFileExam(exam_id);
            loadTableEyePhysicalExamFile();
        },
        error: function (xhr) {
            alertPopUp(translate['error'], xhr.responseText, 'error');
        }
    });
}

function loadTableEyePhysicalExamFile() {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    var exam_id = $('#exam_id').val();
    if (exam_id != '') {
        $('#modUploadFile').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableEyePhysicalExamFile', eye_physical_exam_id: exam_id, limit: 5, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                $('#tablaEyePhysicalExamFile').html(data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        data = translate['optometry_no_register'];
        $('#tab-content-3').html(data);
    }
}

function deleteEyePhysicalExamFile(id) {
    var funcion = '../controller/eye_physical_exam_file_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'deleteEyePhysicalExamFile', id: id },
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function () {
            loadTableEyePhysicalExamFile();
        },
        complete: function () {
            alertPopUp(translate['success'], translate['information_success'], 'success');
        }
    });
}

function closeModalEyePhysicalFileExam() {
    $('#modUploadFile').modal('hide');
    var id = $('#exam_id').val();
    modEditEyePhysicalExam(id);
}