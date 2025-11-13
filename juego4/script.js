var aciertos = 0;
var fallos = 0;
var preguntasFalladas = [];


var preguntas = [
  { texto: '¿Capital de Francia?', opciones: ['Madrid', 'París', 'Roma'], correcta: 1 },
  { texto: '¿Cuánto es 2 + 2?', opciones: ['3', '4', '5'], correcta: 1 },
  { texto: '¿Color del cielo?', opciones: ['Rojo', 'Azul', 'Verde'], correcta: 1 }
];

var indice = 0;
var preguntaElem = document.getElementById("pregunta");
var opcionesElem = document.getElementById("opciones");
var feedbackElem = document.getElementById("feedback");
var quizElem = document.getElementById("quiz");
var inicioElem = document.getElementById("inicio");
var btnInicio = document.getElementById("btnInicio");

btnInicio.addEventListener("click", function() {
  inicioElem.style.display = "none";
  quizElem.style.display = "block";
  indice = 0;
  mostrarPregunta();
});

function mostrarPregunta() {
  var actual = preguntas[indice];
  preguntaElem.textContent = actual.texto;
  opcionesElem.innerHTML = "";
  feedbackElem.textContent = "";

  actual.opciones.forEach(function(opcion, i) {
    var boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", function() {
      verificarRespuesta(i);
    });
    opcionesElem.appendChild(boton);
  });
}

function verificarRespuesta(seleccionada) {
  var correcta = preguntas[indice].correcta;

  if (seleccionada === correcta) {
    feedbackElem.textContent = "✅ ¡Correcto!";
    aciertos++;
  } else {
    feedbackElem.textContent = "❌ Incorrecto. La respuesta era: " + preguntas[indice].opciones[correcta];
    fallos++;
    preguntasFalladas.push(preguntas[indice]);
  }

  indice++;

  if (indice < preguntas.length) {
    setTimeout(function () {
      feedbackElem.textContent = "";
      mostrarPregunta();
    }, 1500);
  } else {
    setTimeout(function () {
      mostrarResumenFinal();
    }, 1500);
  }
}

function mostrarResumenFinal() {
  preguntaElem.textContent = "🎉 ¡Trivia completada!";
  opcionesElem.innerHTML = "";
  var resumen = "<div class='card'>";
  resumen += "<p>✅ Aciertos: " + aciertos + "</p>";
  resumen += "<p>❌ Fallos: " + fallos + "</p>";

  if (preguntasFalladas.length > 0) {
    resumen += "<p>📌 Preguntas falladas:</p><ul>";
    preguntasFalladas.forEach(function (p) {
      resumen += "<li>" + p.texto + " → Respuesta correcta: " + p.opciones[p.correcta] + "</li>";
    });
    resumen += "</ul>";
  }

  resumen += "<button id='reiniciar'>Reiniciar</button>";
  resumen += "</div>";
  feedbackElem.innerHTML = resumen;

  document.getElementById("reiniciar").addEventListener("click", reiniciarTrivia);
}
function reiniciarTrivia() {
  indice = 0;
  aciertos = 0;
  fallos = 0;
  preguntasFalladas = [];

  feedbackElem.textContent = "";
  mostrarPregunta();
}

