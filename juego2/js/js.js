const opciones = document.querySelectorAll(".opcion");
const puntosJugador = document.getElementById("puntosJugador");
const puntosMaquina = document.getElementById("puntosMaquina");
const resultado = document.getElementById("resultado");
const reset = document.getElementById("reset");
const inicio = document.getElementById("inicio");
const imgJugador = document.getElementById("imgJugador");
const imgMaquina = document.getElementById("imgMaquina");
const textoJugador = document.getElementById("textoJugador");
const textoMaquina = document.getElementById("textoMaquina");

let puntosJ = 0;
let puntosM = 0;

const elecciones = ["piedra", "papel", "tijera"];

function obtenerRuta(eleccion) {
  return `css/${eleccion}.png`;
}

opciones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const eleccionJugador = btn.dataset.eleccion;
    const eleccionMaquina = elecciones[Math.floor(Math.random() * 3)];

    // Mostrar imágenes y texto
    imgJugador.src = obtenerRuta(eleccionJugador);
    imgMaquina.src = obtenerRuta(eleccionMaquina);
    textoJugador.textContent = `Elegiste: ${eleccionJugador}`;
    textoMaquina.textContent = `Máquina: ${eleccionMaquina}`;

    // Lógica del juego
    if (eleccionJugador === eleccionMaquina) {
      resultado.textContent = "🤝 ¡Empate!";
    } else if (
      (eleccionJugador === "piedra" && eleccionMaquina === "tijera") ||
      (eleccionJugador === "papel" && eleccionMaquina === "piedra") ||
      (eleccionJugador === "tijera" && eleccionMaquina === "papel")
    ) {
      puntosJ++;
      puntosJugador.textContent = puntosJ;
      resultado.textContent = `✅ Ganaste: ${eleccionJugador} vence a ${eleccionMaquina}`;
    } else {
      puntosM++;
      puntosMaquina.textContent = puntosM;
      resultado.textContent = `❌ Perdiste: ${eleccionMaquina} vence a ${eleccionJugador}`;
    }
  });
});

reset.addEventListener("click", () => {
  puntosJ = 0;
  puntosM = 0;
  puntosJugador.textContent = "0";
  puntosMaquina.textContent = "0";
  resultado.textContent = "";
  imgJugador.src = "css/avatar1.gif";
  imgMaquina.src = "css/avatar2.gif";
  textoJugador.textContent = "Esperando...";
  textoMaquina.textContent = "Esperando...";
});

inicio.addEventListener("click", () => {
  window.location.href = "inicio.html"; // Cambia esto por tu página real
});
