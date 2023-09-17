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