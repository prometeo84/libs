$(document).ready(function () {
    $("#branchList").hide();
});
function userRoleSearch(value) {
    var funcion = '../controller/user_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'userRole', user_name: value },
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            if (data == 100) {
                branchList();
            } else {
                $("#branchList").hide();
            }
        }
    });
}

function branchList() {
    var funcion = '../controller/catalogs_controller.php';
    $.ajax({
        type: 'POST',
        url: funcion,
        data: { function: 'createDropDownBranch' },
        cache: false,
        error: function () {
            alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
        },
        success: function (data) {
            $("#branchList").html(data);
            $("#branchList").show();
        }
    });
}

function changeBranch(id) {
    $("#idBranch").val(id);
}