// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el botón por su ID
    const boton = document.getElementById('saludarBtn');

    // Agregar un evento de clic al botón
    boton.addEventListener('click', () => {
        alert('Hola Diego 👋');
    });
});