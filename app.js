// Variables iniciales
let hunger = 50;
let happiness = 50;
let energy = 50;
let hygiene = 50;
let age = 1;
let action = 'Idle'; // Estado detallado
let alive = true;
let actionCooldown = false;

// Seleccionamos los elementos del DOM
const hungerEl = document.getElementById('hunger');
const happinessEl = document.getElementById('happiness');
const energyEl = document.getElementById('energy');
const hygieneEl = document.getElementById('hygiene');
const ageEl = document.getElementById('age');
const statusEl = document.getElementById('status');
const actionEl = document.getElementById('action');
const healthBarFill = document.getElementById('health-bar-fill');
const buttons = document.querySelectorAll('.tamagotchi-actions button');

// Función para actualizar los botones según el estado del Tamagotchi
function toggleButtons(state) {
    buttons.forEach(button => {
        button.disabled = !state;
    });
}

// Función para actualizar la barra de salud
function updateHealthBar() {
    const normalizedHunger = 100 - hunger; // 0 hambre es ideal, 100 es crítico
    const averageHealth = (normalizedHunger + happiness + energy + hygiene) / 4;

    healthBarFill.style.width = `${averageHealth}%`;

    if (averageHealth > 60) {
        healthBarFill.style.backgroundColor = 'green';
    } else if (averageHealth > 30) {
        healthBarFill.style.backgroundColor = 'yellow';
    } else {
        healthBarFill.style.backgroundColor = 'red';
    }
}

// Función para actualizar el estado del Tamagotchi
function updateStatus() {
    hungerEl.innerText = hunger;
    happinessEl.innerText = happiness;
    energyEl.innerText = energy;
    hygieneEl.innerText = hygiene;
    ageEl.innerText = age;

    updateHealthBar();

    if (hunger >= 90 || happiness <= 10 || energy <= 10 || hygiene <= 10) {
        statusEl.innerText = 'Crítico';
        checkIfDead();
    } else if (!alive) {
        statusEl.innerText = 'Muerto';
        toggleButtons(false);
    } else {
        statusEl.innerText = 'Saludable';
    }
}

// Funciones para las acciones
function feed() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Comiendo...';
    updateAction();

    hunger = Math.max(0, hunger - 30);
    happiness = Math.min(100, happiness + 5);

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true);
    }, 3000);
}

function play() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Jugando...';
    updateAction();

    happiness = Math.min(100, happiness + 30);
    energy = Math.max(0, energy - 10);
    hunger = Math.min(100, hunger + 5);
    hygiene = Math.max(0, hygiene - 5);

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true);
    }, 3000);
}

function sleep() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Durmiendo...'; // Corregir las comillas faltantes
    updateAction();

    toggleButtons(false);

    energy = Math.min(100, energy + 30);
    hygiene = Math.max(0, hygiene - 10); 
    hunger = Math.min(100, hunger + 5);

    setTimeout(() => {
        updateStatus();
        action = 'Despierto';
        updateAction();
        actionCooldown = false;
        toggleButtons(true);
    }, 5000);
}

function clean() {
    if (actionCooldown) return;
    actionCooldown = true;
    action = 'Higienizándose...';
    updateAction();

    hygiene = Math.min(100, hygiene + 30);
    energy = Math.max(0, energy - 5);
    hunger = Math.min(100, hunger + 5);

    setTimeout(() => {
        updateStatus();
        actionCooldown = false;
        action = 'Parado';
        updateAction();
        toggleButtons(true);
    }, 3000);
}

// Función para actualizar el estado de la acción
function updateAction() {
    actionEl.innerText = action;
}

function checkIfDead() {
    if (hunger >= 100 || happiness <= 0 || energy <= 0 || hygiene <= 0) {
        alive = false;
        statusEl.innerText = 'Muerto';
        action = 'Muerto';
        updateAction();
        toggleButtons(false);
    }
}

// Añadimos los event listeners para los botones
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('play').addEventListener('click', play);
document.getElementById('sleep').addEventListener('click', sleep);
document.getElementById('clean').addEventListener('click', clean);

// Simulación del envejecimiento del Tamagotchi
setInterval(() => {
    if (alive) {
        age += 1;
        hunger = Math.min(100, hunger + 5);  
        happiness = Math.max(0, happiness - 5);  
        hygiene = Math.max(0, hygiene - 5);  
        energy = Math.max(0, energy - 5);  
        updateStatus();
    }
}, 60000);

// Inicializar botones y estado al inicio
updateStatus();
toggleButtons(true);
updateAction();
