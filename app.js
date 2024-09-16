// Variables iniciales
let hunger = 50;
let happiness = 50;
let energy = 50;
let age = 1;

// Seleccionamos los elementos del DOM
const hungerEl = document.getElementById('hunger');
const happinessEl = document.getElementById('happiness');
const energyEl = document.getElementById('energy');
const ageEl = document.getElementById('age');

// Funciones para actualizar el estado del Tamagotchi
function feed() {
    hunger = Math.max(0, hunger - 10);
    happiness = Math.min(100, happiness + 5);
    energy = Math.min(100, energy + 5);
    updateStatus();
}

function play() {
    happiness = Math.min(100, happiness + 10);
    energy = Math.max(0, energy - 10);
    hunger = Math.min(100, hunger + 5);
    updateStatus();
}

function sleep() {
    energy = Math.min(100, energy + 20);
    hunger = Math.min(100, hunger + 10);
    updateStatus();
}

function updateStatus() {
    hungerEl.innerText = hunger;
    happinessEl.innerText = happiness;
    energyEl.innerText = energy;
    ageEl.innerText = age;
}

// Añadimos los event listeners para los botones
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('play').addEventListener('click', play);
document.getElementById('sleep').addEventListener('click', sleep);

// Simulación del envejecimiento del Tamagotchi
setInterval(() => {
    age += 1;
    updateStatus();
}, 60000); // Cada minuto el Tamagotchi envejece un año
