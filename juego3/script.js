var selector = document.getElementById("selector");

selector.addEventListener("change", mostrarConversor);
mostrarConversor();

function mostrarConversor() {
  var tipo = selector.value;

  document.getElementById("conversorTemperatura").style.display = "none";
  document.getElementById("conversorDistancia").style.display = "none";
  document.getElementById("conversorMoneda").style.display = "none";

  if (tipo === "celsius") {
    document.getElementById("conversorTemperatura").style.display = "block";
  } else if (tipo === "distancia") {
    document.getElementById("conversorDistancia").style.display = "block";
  } else if (tipo === "moneda") {
    document.getElementById("conversorMoneda").style.display = "block";
  }
}

// 🌡️ Temperatura
(function () {
  var invertido = false;
  var input = document.getElementById("tempInput");
  var resultado = document.getElementById("resultadoTemp");
  var btnCambiar = document.getElementById("cambiarTemp");
  var btnConvertir = document.getElementById("convertirTemp");

  function actualizarPlaceholder() {
    input.placeholder = invertido ? "°F" : "°C";
  }

  btnCambiar.addEventListener("click", function () {
    invertido = !invertido;
    actualizarPlaceholder();
    resultado.innerHTML = "";
  });

  btnConvertir.addEventListener("click", function () {
    var valor = parseFloat(input.value);
    if (isNaN(valor)) {
      mostrarResultado("Introduce un número válido", "warning", resultado);
      return;
    }

    var convertido, texto, simbolo;
    if (invertido) {
      convertido = (valor - 32) * 5 / 9;
      texto = valor + "°F = " + convertido.toFixed(2) + "°C";
      simbolo = "celsius";
    } else {
      convertido = (valor * 9 / 5) + 32;
      texto = valor + "°C = " + convertido.toFixed(2) + "°F";
      simbolo = "fahrenheit";
    }

    mostrarResultado(texto, simbolo, resultado);
  });

  actualizarPlaceholder();
})();

// 📏 Distancia
(function () {
  var invertido = false;
  var input = document.getElementById("distInput");
  var resultado = document.getElementById("resultadoDist");
  var btnCambiar = document.getElementById("cambiarDist");
  var btnConvertir = document.getElementById("convertirDist");

  function actualizarPlaceholder() {
    input.placeholder = invertido ? "Millas" : "Kilómetros";
  }

  btnCambiar.addEventListener("click", function () {
    invertido = !invertido;
    actualizarPlaceholder();
    resultado.innerHTML = "";
  });

  btnConvertir.addEventListener("click", function () {
    var valor = parseFloat(input.value);
    if (isNaN(valor)) {
      mostrarResultado("Introduce un número válido", "warning", resultado);
      return;
    }

    var convertido, texto, simbolo;
    if (invertido) {
      convertido = valor / 0.621371;
      texto = valor + " mi = " + convertido.toFixed(2) + " km";
      simbolo = "km";
    } else {
      convertido = valor * 0.621371;
      texto = valor + " km = " + convertido.toFixed(2) + " mi";
      simbolo = "mi";
    }

    mostrarResultado(texto, simbolo, resultado);
  });

  actualizarPlaceholder();
})();

// 💶 Moneda
(function () {
  var invertido = false;
  var tasaCambio = 1.08;
  var input = document.getElementById("monedaInput");
  var resultado = document.getElementById("resultadoMoneda");
  var btnCambiar = document.getElementById("cambiarMoneda");
  var btnConvertir = document.getElementById("convertirMoneda");

  function actualizarPlaceholder() {
    input.placeholder = invertido ? "Dólares" : "Euros";
  }

  btnCambiar.addEventListener("click", function () {
    invertido = !invertido;
    actualizarPlaceholder();
    resultado.innerHTML = "";
  });

  btnConvertir.addEventListener("click", function () {
    var valor = parseFloat(input.value);
    if (isNaN(valor)) {
      mostrarResultado("Introduce un número válido", "warning", resultado);
      return;
    }

    var convertido, texto, simbolo;
    if (invertido) {
      convertido = valor / tasaCambio;
      texto = valor + " $ = " + convertido.toFixed(2) + " €";
      simbolo = "eur";
    } else {
      convertido = valor * tasaCambio;
      texto = valor + " € = " + convertido.toFixed(2) + " $";
      simbolo = "usd";
    }

    mostrarResultado(texto, simbolo, resultado);
  });

  actualizarPlaceholder();
})();

// 📦 Mostrar resultado
function mostrarResultado(texto, simbolo, destino) {
  destino.innerHTML = `
    <div class="resultado-box">
      <img src="img/${simbolo}.png" alt="${simbolo}" />
      <div class="resultado-text">${texto}</div>
    </div>
  `;
}
