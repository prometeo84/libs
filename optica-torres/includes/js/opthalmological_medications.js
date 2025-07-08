/**
 * @file Gestiona la lógica de la interfaz de usuario para la administración de Medicamentos Oftalmológicos.
 * Utiliza JavaScript no intrusivo con delegación de eventos de jQuery.
 */

$(document).ready(function () {

    const CONTROLLER_URL = '../controller/ophthalmological_medications_controller.php';

    /**
     * Carga la tabla de medicamentos con filtros y paginación.
     * @param {number} offset - El desplazamiento para la consulta de paginación.
     * @param {number} page - El número de la página activa para resaltarla en la UI.
     */
    function loadTable(offset = 0, page = 1) {
        const limit = 10;
        const filters = {
            function: 'loadTableMedications',
            limit: limit,
            offset: offset,
            active_p: page,
            catalog_id: $('#c_catalogs').val(),
            search_term: $('#c_search_term').val(),
            type_medication: $('#c_type_medication').val(),
            medication_name: $('#c_medication_name').val(),
            medication_presentation: $('#c_medication_presentation').val(),
            active: $('#c_active').val()
        };

        $.ajax({
            type: 'POST',
            url: CONTROLLER_URL,
            data: filters,
            cache: false,
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                sanitizeAndSetHTML('#tableMedications', data);
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            },
            complete: function () {
                $('#loading').hide();
            }
        });
    }

    // --- MANEJADORES DE EVENTOS DELEGADOS ---

    // Abrir modal para crear nuevo medicamento
    $(document).on('click', '.btn-new-medication', function () {
        const catalog_id = $('#c_catalogs').val();
        $.ajax({
            type: 'POST',
            url: CONTROLLER_URL,
            data: { function: 'modalNewMedications', catalog_id: catalog_id },
            cache: false,
            success: function (data) {
                sanitizeAndSetHTML('#formNewMedications', data);
                $('#modNewMedications').modal('show');
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    });

    // Guardar nuevo medicamento
    $(document).on('click', '#btn-save-new-medication', function () {
        const newData = {
            function: 'newMedications',
            catalog_id: $('#n_catalog_id').val(),
            search_term: $('#n_search_term').val(),
            type_medication: $('#n_type_medication').val(),
            medication_name: $('#n_medication_name').val(),
            medication_presentation: $('#n_medication_presentation').val()
        };

        if (!newData.catalog_id) {
            alertPopUp(translate['advertice'], translate['catalogs_father_null'], 'warning');
            return;
        }
        if (!newData.search_term || !newData.medication_name || !newData.medication_presentation) {
            alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
            return;
        }

        $.ajax({
            type: 'POST',
            url: CONTROLLER_URL,
            data: newData,
            cache: false,
            success: function () {
                $('#modNewMedications').modal('hide');
                alertPopUp(translate['success'], translate['saved_catalog'], 'success');
                loadTable(0, 1);
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    });

    // Abrir modal para editar medicamento
    $(document).on('click', '.btn-edit-medication', function () {
        const medicationId = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: CONTROLLER_URL,
            data: { function: 'modEditMedications', id: medicationId },
            cache: false,
            success: function (data) {
                sanitizeAndSetHTML('#formEditMedications', data);
                $('#modEditMedications').modal('show');
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    });

    // Guardar cambios de medicamento editado
    $(document).on('click', '#btn-save-edit-medication', function () {
        const editedData = {
            function: 'editMedications', // Corregido: 'editMedications' a 'editMedications'
            id: $('#e_id').val(),
            search_term: $('#e_search_term').val(),
            type_medication: $('#e_type_medication').val(),
            medication_name: $('#e_medication_name').val(),
            medication_presentation: $('#e_medication_presentation').val(),
            active: $('#e_active').val()
        };

        if (!editedData.search_term || !editedData.type_medication || !editedData.medication_name || !editedData.medication_presentation) {
            alertPopUp(translate['advertice'], translate['required_fields'], 'warning');
            return;
        }

        $.ajax({
            type: 'POST',
            url: CONTROLLER_URL,
            data: editedData,
            cache: false,
            success: function () {
                $('#modEditMedications').modal('hide');
                alertPopUp(translate['success'], translate['update_register'], 'success');
                loadTable(0, 1);
            },
            error: function () {
                alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
            }
        });
    });

    // Eliminar medicamento
    $(document).on('click', '.btn-delete-medication', function () {
        const medicationId = $(this).data('id');

        Swal.fire({
            title: translate['advertice'],
            text: translate['confirm_delete_register'],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: translate['delete']
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: CONTROLLER_URL,
                    data: { function: 'deleteMedications', id: medicationId }, // Corregido: 'deleteMedications' a 'deleteMedications'
                    cache: false,
                    success: function () {
                        alertPopUp(translate['success'], translate['delete_register'], 'success');
                        loadTable(0, 1); // Recarga solo la tabla, no toda la página
                    },
                    error: function () {
                        alertPopUp(translate['error'], translate['error_execution_proccess'], 'error');
                    }
                });
            }
        });
    });

    // Manejador para cualquier cambio en los filtros de la tabla.
    // Esto reemplaza los atributos 'onchange' en el HTML.
    const filterSelectors = [
        '#c_catalogs',
        '#c_search_term',
        '#c_type_medication',
        '#c_medication_name',
        '#c_medication_presentation',
        '#c_active'
    ].join(', ');

    $(document).on('change', filterSelectors, function () {
        loadTable(0, 1);
    });

    // Manejador para la paginación
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        const offset = $(this).data('offset');
        if (page) { // Asegurarse de que el link de paginación fue clickeado
            loadTable(offset, page);
        }
    });

});
