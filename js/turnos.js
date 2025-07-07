let currentStep = 0;
const steps = document.querySelectorAll(".step");

function showStep(n) {
  steps.forEach((step, index) =>
    step.classList.toggle("active", index === n)
  );

  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnConfirmar = document.getElementById("confirmarBtn");

  btnSiguiente.style.display = n === 3 ? "none" : "inline-block";
  btnConfirmar.style.display = n === 3 ? "inline-block" : "none";
}

function changeStep(n) {
  if (currentStep + n >= 0 && currentStep + n < steps.length) {
    currentStep += n;
    showStep(currentStep);
    if (currentStep === 3) mostrarResumen();
  }
}

function generarHorarios() {
  const horarioSelect = document.getElementById("horario");
  horarioSelect.innerHTML = '<option value="">Seleccionar horario...</option>';

  const horarios = new Set();
  while (horarios.size < 6) {
    const hora = 9 + Math.floor(Math.random() * 10);
    const minuto = [0, 15, 30][Math.floor(Math.random() * 4)];
    horarios.add(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
  }
  horarios.forEach(h => {
    const option = document.createElement("option");
    option.value = h;
    option.textContent = h;
    horarioSelect.appendChild(option);
  });
}

function mostrarResumen() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const celular = document.getElementById("celular").value;
  const email = document.getElementById("email").value;
  const profesional = document.getElementById("profesional");
  const fecha = document.getElementById("fecha").value;
  const horario = document.getElementById("horario").value;

  const resumen = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Apellido:</strong> ${apellido}</p>
    <p><strong>Celular:</strong> ${celular}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Profesional:</strong> ${profesional.options[profesional.selectedIndex].text}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Horario:</strong> ${horario}</p>
  `;
  document.getElementById("resumen").innerHTML = resumen;
}

document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);

  document.getElementById("turnoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("formulario").style.display = "none";

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const horario = document.getElementById("horario").value;

    document.getElementById("detalleFinal").innerHTML =
      `Tu turno ha sido reservado para <strong>${fecha}</strong> a las <strong>${horario}</strong>, ${nombre}. ¡Nos vemos pronto! 😊`;

    document.getElementById("pantallaFinal").style.display = "block";
  });
});
function showStep(n) {
  steps.forEach((step, index) =>
    step.classList.toggle("active", index === n)
  );

  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnConfirmar = document.getElementById("confirmarBtn");

  btnSiguiente.style.display = n === 3 ? "none" : "inline-block";
  btnConfirmar.style.display = n === 3 ? "inline-block" : "none";

  // Actualizar barra de progreso visual
  for (let i = 0; i < 4; i++) {
    const paso = document.getElementById(`pasoIndicador${i + 1}`);
    if (i === n) {
      paso.classList.add("active");
    } else {
      paso.classList.remove("active");
    }
  }
}
function changeStep(n) {
  const campos = steps[currentStep].querySelectorAll("input, select");
  let esValido = true;

  campos.forEach(campo => {
    // Validación especial para email
    if (campo.type === "email") {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(campo.value)) {
        campo.classList.add("is-invalid");
        esValido = false;
        return;
      }
    }
    

    // Validación especial para fecha (no menor a hoy)
    if (campo.type === "date") {
      const hoy = new Date().toISOString().split("T")[0];
      if (campo.value < hoy) {
        campo.classList.add("is-invalid");
        esValido = false;
        return;
      }
    }

    // Validación estándar
    if (!campo.value) {
      campo.classList.add("is-invalid");
      esValido = false;
    } else {
      campo.classList.remove("is-invalid");
    }
  });

  if (!esValido && n > 0) return;

  currentStep += n;
  showStep(currentStep);
  if (currentStep === 3) mostrarResumen();

  if (!regexEmail.test(campo.value)) {
  campo.classList.add("is-invalid");
  esValido = false;
} else {
  campo.classList.remove("is-invalid");
}
}

    document.getElementById("email").addEventListener("input", function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.classList.toggle("is-invalid", !regex.test(this.value));
    });

    document.getElementById("celular").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, ""); // Elimina letras
  const soloNumeros = /^[0-9]{8,15}$/; // Ejemplo: entre 8 y 15 dígitos
  this.classList.toggle("is-invalid", !soloNumeros.test(this.value));
});


   
