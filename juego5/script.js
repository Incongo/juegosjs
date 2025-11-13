// Cargar tareas desde localStorage o iniciar vacío
var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

document.getElementById("agregarTarea").addEventListener("click", function () {
  var texto = document.getElementById("tareaTexto").value.trim();
  var color = document.getElementById("etiquetaColor").value;

  if (texto !== "") {
    var nueva = {
      id: Date.now(),
      texto: texto,
      color: color,
      estado: "pendientes"
    };
    tareas.push(nueva);
    document.getElementById("tareaTexto").value = "";
    guardarTareas();
    renderizar();
  }
});

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizar() {
  ["listaPendientes", "listaProgreso", "listaHechas"].forEach(function (id) {
    document.getElementById(id).innerHTML = "";
  });

  tareas.forEach(function (tarea, index) {
    var div = document.createElement("div");
    div.className = "tarea " + tarea.color;

    var span = document.createElement("span");
    span.textContent = tarea.texto;

    var btnRetroceder = document.createElement("button");
    btnRetroceder.textContent = "⬅️";
    btnRetroceder.title = "Retroceder";

    var btnAvanzar = document.createElement("button");
    btnAvanzar.textContent = "➡️";
    btnAvanzar.title = "Avanzar";

    var btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.title = "Eliminar";

    btnRetroceder.addEventListener("click", function () {
      if (tarea.estado === "en-progreso") tarea.estado = "pendientes";
      else if (tarea.estado === "hechas") tarea.estado = "en-progreso";
      guardarTareas();
      renderizar();
    });

    btnAvanzar.addEventListener("click", function () {
      if (tarea.estado === "pendientes") tarea.estado = "en-progreso";
      else if (tarea.estado === "en-progreso") tarea.estado = "hechas";
      guardarTareas();
      renderizar();
    });

    btnEliminar.addEventListener("click", function () {
      tareas.splice(index, 1);
      guardarTareas();
      renderizar();
    });

    div.appendChild(span);
    if (tarea.estado !== "pendientes") div.appendChild(btnRetroceder);
    if (tarea.estado !== "hechas") div.appendChild(btnAvanzar);
    div.appendChild(btnEliminar);

    var contenedor = document.getElementById(
      tarea.estado === "pendientes"
        ? "listaPendientes"
        : tarea.estado === "en-progreso"
        ? "listaProgreso"
        : "listaHechas"
    );
    contenedor.appendChild(div);
  });
}

// Modo claro/oscuro
var toggle = document.getElementById("modoOscuroToggle");
var body = document.body;

// Cargar preferencia guardada
if (localStorage.getItem("modo") === "oscuro") {
  body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", function () {
  if (toggle.checked) {
    body.classList.add("dark");
    localStorage.setItem("modo", "oscuro");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("modo", "claro");
  }
});


// Inicializar al cargar
renderizar();
