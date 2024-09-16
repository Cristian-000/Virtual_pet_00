function selectPet(petName) {
    // Guardar la mascota seleccionada en localStorage
    localStorage.setItem('selectedPet', petName);

    // Redirigir al juego principal
    window.location.href = 'tamagotchi.html';
}
