// seleccionMascota.js

function selectPet(petName) {
    // Generar una variación aleatoria en las estadísticas de la mascota
    const hungerRate = Math.random() * (1.2 - 0.8) + 0.8; // entre 0.8x y 1.2x de tasa de hambre
    const sleepinessRate = Math.random() * (1.2 - 0.8) + 0.8; // entre 0.8x y 1.2x de tasa de sueño
    const eatingSpeed = Math.random() * (1.2 - 0.8) + 0.8; // entre 0.8x y 1.2x de velocidad de comida

    // Guardar la mascota seleccionada en localStorage
    const selectedPet = {
        name: petName,
        hungerRate: hungerRate.toFixed(2),
        sleepinessRate: sleepinessRate.toFixed(2),
        eatingSpeed: eatingSpeed.toFixed(2)
    };

    localStorage.setItem('selectedPet', JSON.stringify(selectedPet));

    // Redirigir al juego principal
    window.location.href = 'tamagotchi.html';
}
