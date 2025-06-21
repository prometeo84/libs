// file deepcode ignore DOMXSS: Sanitize in Class
function modReceipt() {
    var funcion = '../controller/receipt_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modReceipt' },
        cache: false,
        success: function (data) {
            $('#formReceipt').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modReceipt').modal('show');
    return false;
}

function loadTableReceipt() {
    var funcion = '../controller/receipt_controller.php';
    var id = $('#patient_id').val();
    if (id != '') {
        $('#btnModNewReceipt').show();
        $.ajax({
            type: 'POST',
            url: funcion,
            data: { function: 'loadTableReceipt', patient_id: id, limit: 50, offset: 0, active_p: 1 },
            cache: false,
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            success: function (data) {
                $('#tab-content-7').html(data);
            },
            complete: function () {
                alertPopUp(translate['success'], translate['information_success'], 'success');
            }
        });
    } else {
        $('#btnReceipt').hide();
        $("#PatientTabs").load(location.href + " #PatientTabs");
        alertPopUp(translate['error'], translate['optometry_id_user'], 'error');
    }
}

function saveReceipt() {
    var funcion = '../controller/receipt_controller.php';
    var patient_id = $('#patient_id').val();
    var description = $('#r_description').val();
    var branch_id = $('#r_branch').val();
    var delivery_date = $('#r_delivery_date').val();
    var retirement_date = $('#r_retirement_date').val();
    var amount_paid = $('#r_amount_paid').val();
    var values = {};
    values['function'] = 'newReceipt';
    values['patient_id'] = patient_id;
    values['description'] = description;
    values['branch_id'] = branch_id;
    values['delivery_date'] = delivery_date;
    values['retirement_date'] = retirement_date;
    values['amount_paid'] = amount_paid;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        beforeSend: function (xhr) {
            if (branch_id == '' || delivery_date == '' || amount_paid == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modReceipt').modal('hide');
            loadTableReceipt();
        }
    });
}

function editReceipt(id) {
    var funcion = '../controller/receipt_controller.php';
    var patient_id = $('#patient_id').val();
    var description = $('#r_description').val();
    var branch_id = $('#r_branch').val();
    var delivery_date = $('#r_delivery_date').val();
    var retirement_date = $('#r_retirement_date').val();
    var amount_paid = $('#r_amount_paid').val();
    var values = {};
    values['id'] = id;
    values['function'] = 'editReceipt';
    values['patient_id'] = patient_id;
    values['description'] = description;
    values['branch_id'] = branch_id;
    values['delivery_date'] = delivery_date;
    values['retirement_date'] = retirement_date;
    values['amount_paid'] = amount_paid;
    $.ajax({
        type: 'POST',
        url: funcion,
        data: values,
        cache: false,
        beforeSend: function (xhr) {
            if (branch_id == '' || delivery_date == '' || amount_paid == '') {
                alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
                xhr.abort();
                return false;
            }
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        complete: function () {
            alertPopUp(translate['success'], translate['insert_register'], 'success');
            $('#modReceipt').modal('hide');
            loadTableReceipt();
        }
    });
}

function modEditReceipt(id) {
    var funcion = '../controller/receipt_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'modEditReceipt', id: id },
        cache: false,
        success: function (data) {
            $('#formReceipt').html(data)
        },
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
    $('#modReceipt').modal('show');
    return false;
}

function closeModalReceipt() {
    $('#modReceipt').modal('hide');
}