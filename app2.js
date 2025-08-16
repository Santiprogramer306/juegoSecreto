let listNumeros = [];
let numeroSecreto = generarNumeroSecreto();
let juegoTerminado = false;
let tiempo = 0;


const btnReiniciar = document.getElementById("reiniciar");
// inicia deshabilitado
btnReiniciar.disabled = true;
// al hacer click, reinicia el juego
btnReiniciar.addEventListener("click", nuevoJuego);


function AlmacenLlamado(elemento, texto) {
  const elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

// --- Verificar intento ---
function verificarIntento() {
  const valorInput = document.getElementById("valorUsuario");
  const numeroUsuario = parseInt(valorInput.value);

  console.log(`Número ingresado: ${numeroUsuario}`);
  console.log(`Número secreto: ${numeroSecreto}`);

  // Validaciones
  if (isNaN(numeroUsuario)) {
    AlmacenLlamado("p", "Por favor, ingrese un número.");
    return;
  }
  if (numeroUsuario <= 0 || numeroUsuario > 10) {
    AlmacenLlamado("p", "Error, ingrese un número del 1 al 10.");
    return;
  }
  if (juegoTerminado) {
    AlmacenLlamado("p", "Si quieres volver a jugar debes dar a NUEVO JUEGO.");
    return;
  }

  // Lógica de acierto / error
  if (numeroUsuario === numeroSecreto) {
    AlmacenLlamado("p", "¡Adivinaste el número secreto!");
    juegoTerminado = true;
    btnReiniciar.disabled = false;   
    return;
  } else {
    tiempo++;
    AlmacenLlamado("p", "Número equivocado, intente otra vez");
    console.log(`Intentos: ${tiempo}`);
  }

  // Máximo de intentos
  if (tiempo >= 4) {
    AlmacenLlamado("p", "MÁXIMO DE INTENTOS ALCANZADO. Seleccionar NUEVO JUEGO.");
    juegoTerminado = true;
    btnReiniciar.disabled = false;   
  }
}

// --- Número secreto 
function generarNumeroSecreto() {
  const numeroGenerado = Math.floor(Math.random() * 10 + 1);
  if (listNumeros.includes(numeroGenerado)) {
    return generarNumeroSecreto(); 
  } else {
    listNumeros.push(numeroGenerado);
    return numeroGenerado;
  }
}

// --- Reiniciar juego ---
function nuevoJuego() {
  numeroSecreto = generarNumeroSecreto();
  juegoTerminado = false;
  tiempo = 0;

  
  const valorInput = document.getElementById("valorUsuario");
  if (valorInput) valorInput.value = "";

  AlmacenLlamado("p", "Ingrese un número del 1 al 10");
  btnReiniciar.disabled = true;   
  console.log("Nuevo juego iniciado. ¡Buena suerte!");
}

// Mensajes iniciales
AlmacenLlamado('h1', 'Juego del número secreto');
AlmacenLlamado('p', 'Ingrese un número del 1 al 10');
