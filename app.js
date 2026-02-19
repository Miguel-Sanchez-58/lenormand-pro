// =========================
// CONFIGURACIÓN
// =========================
const WORKER_URL = "https://lenormand-pro-api.miguel-69b.workers.dev";

// =========================
// ESTADO
// =========================
let credits = Number(localStorage.getItem("lenormandCredits")) || 0;

// =========================
// UI HELPERS
// =========================
function updateCreditsUI() {
  const counter = document.getElementById("creditsCount");
  if (counter) counter.innerText = credits;

  if (credits <= 0) {
    showBuyButton();
  } else {
    hideBuyButton();
  }
}

function showBuyButton() {
  const box = document.getElementById("buyBox");
  if (box) box.style.display = "block";
}

function hideBuyButton() {
  const box = document.getElementById("buyBox");
  if (box) box.style.display = "none";
}

// Inicialización visual
updateCreditsUI();

// =========================
// ACTIVAR CONTRASEÑA
// =========================
async function activateCode() {
  const codeInput = document.getElementById("activationCode");
  const msg = document.getElementById("activationMessage");

  const code = codeInput.value.trim();

  if (!code) {
    msg.innerText = "Introduce la contraseña.";
    return;
  }

  msg.innerText = "Activando contraseña...";

  try {
    const response = await fetch(`${WORKER_URL}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: code })
    });

    const data = await response.json();

    if (data.credits) {
      credits = data.credits;
      localStorage.setItem("lenormandCredits", credits);
      updateCreditsUI();

      msg.innerText = `✅ Activado. Tienes ${credits} tiradas.`;
      codeInput.value = "";
    } else {
      msg.innerText = data.error || "Contraseña no válida.";
    }

  } catch (err) {
    msg.innerText = "❌ Error de conexión con el sistema.";
  }
}

// =========================
// REALIZAR TIRADA
// =========================
async function makeReading() {
  const questionInput = document.getElementById("question");
  const resultBox = document.getElementById("result");

  const question = questionInput.value.trim();

  if (!question) {
    resultBox.innerText = "Escribe una pregunta antes de realizar la tirada.";
    return;
  }

  // 🔒 SIN CRÉDITOS → MENSAJE FINAL + BOTÓN
  if (credits <= 0) {
    resultBox.innerText =
      "🃏 Lenormand Pro\n\n" +
      "Has completado todas tus tiradas disponibles.\n" +
      "El mensaje que necesitabas ya ha sido revelado.\n\n" +
      "Cuando sientas que es el momento adecuado para una nueva consulta,\n" +
      "puedes acceder de nuevo mediante una nueva clave.\n\n" +
      "✨ Gracias por confiar en esta lectura.";
    showBuyButton();
    return;
  }

  resultBox.innerText = "🃏 Barajando el mazo...";

  try {
    const response = await fetch(`${WORKER_URL}/reading`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (data.answer) {
      resultBox.innerText = data.answer;

      credits--;
      localStorage.setItem("lenormandCredits", credits);
      updateCreditsUI();

      questionInput.value = "";

      // Si esta fue la última tirada, mostrar mensaje final
      if (credits === 0) {
        resultBox.innerText +=
          "\n\n—\n\n" +
          "✨ Has completado todas tus tiradas disponibles.\n" +
          "Gracias por confiar en esta lectura.";
        showBuyButton();
      }
function goToEtsy() {
  window.open(
    "https://www.etsy.com/tu-enlace-aqui",
    "_blank"
  );
}

    } else {
      resultBox.innerText = data.error || "No se pudo generar la lectura.";
    }

  } catch (err) {
    resultBox.innerText = "❌ Error de conexión con el sistema.";
  }
}
