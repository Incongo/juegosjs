function numeroAleatorioEntre(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

let aleatorio = numeroAleatorioEntre(1, 100);
console.log("Número secreto:", aleatorio);

let intentos = 0;
const maxIntentos = 5;

const boton = document.getElementById("numeroenjuego");
const contador = document.getElementById("contador");

boton.addEventListener("click", () => {
  const num = parseInt(document.getElementById("num").value.trim());
  const input = document.getElementById("num");
  const mensaje = document.getElementById("mensaje");

  if (intentos >= maxIntentos) {
    mensaje.textContent = "¡Has agotado tus intentos!";
    boton.disabled = true;
    boton.classList.add("bloqueado");
    return;
  }

  if (isNaN(num)) {
    mensaje.textContent = "¡Debes escribir un número!";
    mensaje.classList.add("error");
    input.classList.add("error");
  } else if (num === aleatorio) {
    mensaje.textContent = "¡Felicidades, has acertado!";
    mensaje.classList.remove("error");
    input.classList.remove("error");
  } else if (num > aleatorio) {
    mensaje.textContent = "¡Te has pasado!";
    mensaje.classList.remove("error");
    input.classList.remove("error");
  } else {
    mensaje.textContent = "¡Te has quedado corto!";
    mensaje.classList.remove("error");
    input.classList.remove("error");
  }

  intentos++;
  contador.textContent = `Intentos restantes: ${maxIntentos - intentos}`;

  if (intentos === maxIntentos && num !== aleatorio) {
    mensaje.textContent += ` Has perdido. El número era ${aleatorio}.`;
    boton.disabled = true;
    boton.classList.add("bloqueado");
  }
});
