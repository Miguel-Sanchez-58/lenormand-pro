console.log("app.js cargado");

function showMessage(text) {
  const resultDiv = document.getElementById("result");

  if (typeof text === "string") {
    resultDiv.innerText = text;
  } else {
    // FORZAMOS texto siempre
    resultDiv.innerText = JSON.stringify(text, null, 2);
  }
}

async function startReading(mode = "basic") {
  if (window.readingInProgress) return;
  window.readingInProgress = true;

  const questionInput = document.getElementById("question");
  const question = questionInput.value.trim();

  if (!question) {
    alert("Por favor, escribe una pregunta clara.");
    window.readingInProgress = false;
    return;
  }

  showMessage("🔮 Barajando el mazo Lenormand…");

  try {
    const response = await fetch(
      fetch("https://lenormand-pro-api.miguel-69b.workers.dev/reading", {
,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question,
          mode: mode
        })
      }
    );

    const data = await response.json();

    // 🔴 AQUÍ ESTÁ LA CLAVE
    if (data.result) {
      showMessage(String(data.result));
    } else if (data.error) {
      showMessage(String(data.error.message || data.error));
    } else {
      showMessage("Respuesta inválida del sistema.");
    }

  } catch (err) {
    showMessage("Error de conexión con el sistema.");
  }

  window.readingInProgress = false;
}
