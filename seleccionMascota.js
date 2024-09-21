// Función para seleccionar una mascota y asignarle una clase al azar
function selectPet(petType) {
    const petName = document.getElementById('petName').value.trim();
    if (!petName) {
        alert("¡Por favor, escribe un nombre para tu mascota!");
        return; // No continuar si el nombre está vacío
    }

    const classes = ['Glotona', 'Dormilona', 'Juguetona', 'Higiénica', 'Poco Hambre'];
    const selectedClass = classes[Math.floor(Math.random() * classes.length)];

    let classModifiers = {};
    switch (selectedClass) {
        case 'Glotona':
            classModifiers = { hungerRate: 0.8, eatingSpeed: 1.5, energyModifier: 1, hygieneModifier: 1, happinessModifier: 1 };
            break;
        case 'Dormilona':
            classModifiers = { hungerRate: 1, sleepinessRate: 1.5, energyModifier: 1.2, hygieneModifier: 1, happinessModifier: 1 };
            break;
        case 'Juguetona':
            classModifiers = { hungerRate: 1, happinessModifier: 1.4, energyModifier: 1.3, hygieneModifier: 1, sleepinessRate: 1 };
            break;
        case 'Higiénica':
            classModifiers = { hungerRate: 1, hygieneModifier: 1.5, energyModifier: 1.1, happinessModifier: 1, sleepinessRate: 1 };
            break;
        case 'Poco Hambre':
            classModifiers = { hungerRate: 0.5, eatingSpeed: 1.2, energyModifier: 1, hygieneModifier: 1, happinessModifier: 1 };
            break;
    }

    const selectedPet = {
        name: petName,
        class: selectedClass,
        ...classModifiers,
    };

    localStorage.setItem('selectedPet', JSON.stringify(selectedPet));
    window.location.href = 'tamagotchi.html';
}
