// Variables globales para los estados de la mascota
let hunger = 50; // Hambre
let energy = 50; // Energía
let happiness = 50; // Felicidad
let hygiene = 50; // Higiene

// Variables globales para los modificadores de las clases
let hungerRate = 1;
let eatingSpeed = 1;
let happinessModifier = 1;
let energyModifier = 1;
let sleepinessRate = 1;
let hygieneModifier = 1;

let action = 'Parado'; // Acción actual
let actionCooldown = false; // Control para evitar múltiples acciones simultáneas

// Función que se ejecuta cuando la página está lista
document.addEventListener('DOMContentLoaded', () => {
    const selectedPetData = JSON.parse(localStorage.getItem('selectedPet')) || { name: 'Mascota Desconocida' };
    const petClass = selectedPetData.class || 'Clase Desconocida';

    document.getElementById('selectedPet').innerText = `${selectedPetData.name}`;
    document.getElementById("class-name").innerText = `${petClass}`
    // Guardamos los modificadores de clase en variables globales
    hungerRate = selectedPetData.hungerRate || 1;
    sleepinessRate = selectedPetData.sleepinessRate || 1;
    eatingSpeed = selectedPetData.eatingSpeed || 1;
    happinessModifier = selectedPetData.happinessModifier || 1;
    hygieneModifier = selectedPetData.hygieneModifier || 1;
    energyModifier = selectedPetData.energyModifier || 1;

    // Asignar eventos a los botones
    document.getElementById('feed').addEventListener('click', feed);
    document.getElementById('play').addEventListener('click', play);
    document.getElementById('sleep').addEventListener('click', sleep);
    document.getElementById('clean').addEventListener('click', clean);

    updateStatus(); // Actualizar el estado inicial
});

// Función para actualizar el estado de la mascota en la interfaz
function updateStatus() {
    document.getElementById('hunger').innerText = `Hambre: ${Math.round(hunger)}%`;
    document.getElementById('energy').innerText = `Energía: ${Math.round(energy)}%`;
    document.getElementById('happiness').innerText = `Felicidad: ${Math.round(happiness)}%`;
    document.getElementById('hygiene').innerText = `Higiene: ${Math.round(hygiene)}%`;

    updateLifeBar(); // Actualizar la barra de vida cuando se actualice el estado
}

// Función para actualizar la acción de la mascota en la interfaz
function updateAction() {
    document.getElementById('action').innerText = `Acción: ${action}`;
}

// Función para alternar los botones de acción
function toggleButtons(enable) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = !enable);
}

// Función para actualizar la barra de vida
function updateLifeBar() {
    // La vida es el promedio de los cuatro estados
    const life = ((100 - hunger) + energy + happiness + hygiene) / 4;
    const lifeBar = document.getElementById('lifeBar');

    // Cambiamos el ancho de la barra de vida en función del porcentaje
    lifeBar.style.width = `${life}%`;

    // Cambiamos el color de la barra dependiendo de la vida
    if (life > 75) {
        lifeBar.style.backgroundColor = 'green';
    } else if (life > 50) {
        lifeBar.style.backgroundColor = 'yellow';
    } else if (life > 25) {
        lifeBar.style.backgroundColor = 'orange';
    } else {
        lifeBar.style.backgroundColor = 'red';
    }
}

// Acción: Alimentar
function feed() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Comiendo...';
    updateAction();

    toggleButtons(false); // Desactivar botones al iniciar la acción

    // Aplicamos los modificadores de clase para hambre y velocidad al comer
    hunger = Math.max(0, hunger - (30 * hungerRate));
    energy = Math.max(0, energy + (10 * energyModifier));
    hygiene = Math.max(0, hygiene - (5 * hygieneModifier));

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true); // Reactivar botones después de la acción
    }, 3000 / eatingSpeed); // Aplicar modificador de velocidad
}

// Acción: Dormir
function sleep() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Durmiendo...';
    updateAction();

    toggleButtons(false); // Desactivar botones al iniciar la acción

    // Aplicamos modificadores para energía y sueño
    energy = Math.min(100, energy + (30 * sleepinessRate));
    hunger = Math.min(100, hunger + 10);
    happiness = Math.max(0, happiness - 5);

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true); // Reactivar botones después de la acción
    }, 3000);
}

// Acción: Jugar
function play() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Jugando...';
    updateAction();

    toggleButtons(false); // Desactivar botones al iniciar la acción

    // Aplicamos modificadores para felicidad, energía, hambre y limpieza
    happiness = Math.min(100, happiness + (30 * happinessModifier));
    energy = Math.max(0, energy - (10 * energyModifier));
    hunger = Math.min(100, hunger + 5);
    hygiene = Math.max(0, hygiene - (5 * hygieneModifier));

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true); // Reactivar botones después de la acción
    }, 3000);
}

// Acción: Limpiar
function clean() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Higienizándose...';
    updateAction();

    toggleButtons(false); // Desactivar botones al iniciar la acción

    // Aplicamos modificadores para higiene y energía
    hygiene = Math.min(100, hygiene + (30 * hygieneModifier));
    energy = Math.max(0, energy - (5 * energyModifier));

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true); // Reactivar botones después de la acción
    }, 3000);
}



