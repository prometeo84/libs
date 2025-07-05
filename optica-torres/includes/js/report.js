function reportSelect(value) {
    var funcion = '../controller/report_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'loadTableReport', report: value },
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            sanitizeAndSetHTML('#reportSetup', data);
            $('#loading').hide();
        },
        error: function () {
            $('#loading').hide();
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        }
    });
}