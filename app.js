// Variables iniciales
let hunger = 50;
let happiness = 50;
let energy = 50;
let hygiene = 50;
let age = 1;
let status = 'Healthy';
let alive = true;
let actionCooldown = false;

// Seleccionamos los elementos del DOM
const hungerEl = document.getElementById('hunger');
const happinessEl = document.getElementById('happiness');
const energyEl = document.getElementById('energy');
const hygieneEl = document.getElementById('hygiene');
const ageEl = document.getElementById('age');
const statusEl = document.getElementById('status');
const buttons = document.querySelectorAll('.tamagotchi-actions button');

// Función para actualizar los botones según el estado del Tamagotchi
function toggleButtons(state) {
    buttons.forEach(button => {
        button.disabled = !state;
    });
}

// Funciones para actualizar el estado del Tamagotchi
function feed() {
    if (actionCooldown) return;
    actionCooldown = true;
    hunger = Math.max(0, hunger - 10);
    happiness = Math.min(100, happiness + 5);
    updateStatus();

    setTimeout(() => {
        actionCooldown = false;
        toggleButtons(true);
    }, 3000); // 3 segundos de espera antes de poder realizar otra acción
}

function play() {
    if (actionCooldown) return;
    actionCooldown = true;
    happiness = Math.min(100, happiness + 10);
    energy = Math.max(0, energy - 10);
    hunger = Math.min(100, hunger + 5);
    updateStatus();

    setTimeout(() => {
        actionCooldown = false;
        toggleButtons(true);
    }, 3000); // 3 segundos de espera
}

function sleep() {
    if (actionCooldown) return;
    actionCooldown = true;
    toggleButtons(false); // Bloquear acciones mientras duerme

    energy = Math.min(100, energy + 30);
    hygiene = Math.min(100, hygiene - 10); // Se ensucia mientras duerme
    updateStatus();

    status = 'Sleeping...';
    statusEl.innerText = status;

    setTimeout(() => {
        status = 'Awake';
        statusEl.innerText = status;
        actionCooldown = false;
        toggleButtons(true);
    }, 5000); // 5 segundos de espera mientras duerme
}

function clean() {
    if (actionCooldown) return;
    actionCooldown = true;
    hygiene = Math.min(100, hygiene + 20);
    updateStatus();

    setTimeout(() => {
        actionCooldown = false;
        toggleButtons(true);
    }, 3000); // 3 segundos de espera
}

function updateStatus() {
    hungerEl.innerText = hunger;
    happinessEl.innerText = happiness;
    energyEl.innerText = energy;
    hygieneEl.innerText = hygiene;
    ageEl.innerText = age;

    // Revisión de condiciones críticas
    if (hunger >= 90 || happiness <= 10 || energy <= 10 || hygiene <= 10) {
        status = 'Critical';
        checkIfDead();
    } else if (!alive) {
        status = 'Dead';
        toggleButtons(false);
    } else {
        status = 'Healthy';
    }

    statusEl.innerText = status;
}

function checkIfDead() {
    if (hunger >= 100 || happiness <= 0 || energy <= 0 || hygiene <= 0) {
        alive = false;
        status = 'Dead';
        statusEl.innerText = status;
        toggleButtons(false); // Deshabilitar botones cuando el Tamagotchi muere
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
        hunger = Math.min(100, hunger + 5);  // Se incrementa el hambre con el tiempo
        happiness = Math.max(0, happiness - 5);  // Se reduce la felicidad con el tiempo
        hygiene = Math.max(0, hygiene - 5);  // La higiene disminuye con el tiempo
        energy = Math.max(0, energy - 5);  // La energía disminuye con el tiempo
        updateStatus();
    }
}, 60000); // Cada minuto se incrementan los valores críticos

// Inicializar botones y estado al inicio
updateStatus();
toggleButtons(true);
