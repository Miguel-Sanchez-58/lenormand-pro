// ===============================
// CONFIGURACIÓN
// ===============================
const WORKER_URL = "https://lenormand-pro-api.miguel-69b.workers.dev";

// ===============================
// ESTADO LOCAL
// ===============================
let credits = 0;

// ===============================
// ARRANQUE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ app.js cargado");

  document.getElementById("activateBtn")
    .addEventListener("click", activateCode);

  document.getElementById("readingBtn")
    .addEventListener("click", startReading);
});

// ===============================
// ACTIVACIÓN
// ===============================
async function activateCode() {
  const code = document.getElementById("activationCode").value.trim();
  const msg = document.getElementById("activationMessage");

  if (!code) {
    msg.innerText = "Introduce un código de activación.";
    return;
  }

  msg.innerText = "Activando código...";

  try {
    const response = await fetch(`${WORKER_URL}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    console.log("Respuesta activate:", data);

    if (data.credits) {
      credits = data.credits;
      msg.innerText = `✅ Activado. Tienes ${credits} tiradas.`;
    } else {
      msg.innerText = data.error || "Error al activar.";
    }

  } catch (err) {
    console.error(err);
    msg.innerText = "❌ Error de conexión con el sistema.";
  }
}

// ===============================
// TIRADA
// ===============================
async function startReading() {
  const question = document.getElementById("question").value.trim();
  const result = document.getElementById("result");

  if (!question) {
    result.innerText = "Escribe una pregunta primero.";
    return;
  }

  if (credits <= 0) {
    result.innerText = "No tienes tiradas disponibles.";
    return;
  }

  result.innerText = "Barajando el mazo...";

  try {
    const response = await fetch(`${WORKER_URL}/reading`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    console.log("Respuesta reading:", data);

    if (data.answer) {
      credits--;
      result.innerText = data.answer + `\n\n(Tiradas restantes: ${credits})`;
    } else {
      result.innerText = data.error || "Respuesta inválida.";
    }

  } catch (err) {
    console.error(err);
    result.innerText = "❌ Error al realizar la tirada.";
  }
}
