document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContacto');
    const button = document.getElementById('enviar');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    // Función para verificar el estado de los inputs
    function checkFormValidity() {
        let isFormValid = true;
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (!input.value.trim() || !input.checkValidity()) {
                isFormValid = false;
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
        button.disabled = !isFormValid;
    }

    // Evento para verificar los campos y activar/desactivar el botón
    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
        input.addEventListener('change', checkFormValidity); // Para select y otros campos
    });

    // Validación completa antes de enviar
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario por defecto
        checkFormValidity(); // Revisa una última vez antes de enviar

        if (form.checkValidity()) {
            // Mostrar alerta de éxito con SweetAlert
            Swal.fire({
                title: 'Formulario enviado correctamente',
                text: 'Gracias por contactarnos.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                form.reset(); // Reinicia el formulario tras enviar
                checkFormValidity(); // Desactiva el botón tras resetear
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos correctamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
