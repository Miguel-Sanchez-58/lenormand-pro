const DAILY_LIMIT = 1; // free
const STORAGE_KEY = "lenormand_reads";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getUsage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const today = getTodayKey();
  return data[today] || 0;
}

function incrementUsage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const today = getTodayKey();
  data[today] = (data[today] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function showMessage(text) {
  document.getElementById("result").innerText = text;
}

async function startReading(mode = "basic") {
  if (window.readingInProgress) return;
  window.readingInProgress = true;

  const question = document.getElementById("question").value.trim();

  if (!question) {
    alert("Por favor, escribe una pregunta clara.");
    window.readingInProgress = false;
    return;
  }

  // LÍMITE FREE
  if (mode === "basic" && getUsage() >= DAILY_LIMIT) {
    showMessage(
`🔒 Límite alcanzado

Ya has utilizado tu lectura gratuita de hoy.

Con Lenormand Pro Avanzado puedes acceder a lecturas completas y más profundidad.

👉 Desbloquear versión avanzada`
    );
    window.readingInProgress = false;
    return;
  }

  showMessage("🔮 Barajando el mazo Lenormand…");

  try {
    const response = await fetch(
      "https://lenormand-pro-api.miguel-69b.workers.dev",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          mode // 👈 AQUÍ VA LA CLAVE
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      showMessage(data.error);
    } else {
      showMessage(data.result);
      if (mode === "basic") incrementUsage();
    }

  } catch (e) {
    showMessage("Error de conexión con el sistema.");
  }

  window.readingInProgress = false;
}
