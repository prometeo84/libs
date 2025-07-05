/**
 * @file Gestiona la lógica de la interfaz de usuario para la página de inicio de sesión (login).
 * Se encarga de la selección de sucursal para roles de usuario específicos.
 */

/**
 * Se ejecuta cuando el DOM está completamente cargado.
 * Oculta inicialmente la lista de sucursales.
 */
$(document).ready(function () {
    $("#branchList").hide();
});

/**
 * Verifica el rol de un usuario para determinar si se debe mostrar la selección de sucursal.
 * Realiza una llamada AJAX al servidor. Si el rol del usuario lo requiere (identificado por un código específico, ej. 100),
 * invoca a la función `branchList` para mostrar las sucursales disponibles. De lo contrario, mantiene oculta la lista.
 * @param {string} value - El nombre de usuario que se está ingresando.
 */
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

/**
 * Obtiene y muestra una lista desplegable de sucursales.
 * Realiza una llamada AJAX para obtener el HTML de un <select> con las sucursales
 * y lo inserta en el elemento `#branchList`, haciéndolo visible.
 */
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
            sanitizeAndSetHTML("#branchList", data);
            $("#branchList").show();
        }
    });
}

/**
 * Actualiza el valor de la sucursal seleccionada en un campo oculto.
 * @param {string|number} id - El ID de la sucursal seleccionada en la lista desplegable.
 */
function changeBranch(id) {
    $("#idBranch").val(id);
}