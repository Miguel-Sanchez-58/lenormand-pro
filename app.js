async function startReading() {
  if (window.readingInProgress) return;
window.readingInProgress = true;
  const question = document.getElementById("question").value;
  const resultDiv = document.getElementById("result");

  if (!question.trim()) {
    alert("Por favor, escribe una pregunta clara.");
    return;
    window.readingInProgress = false;
  }

  resultDiv.innerText = "🔮 Barajando el mazo Lenormand...\n\n";

  try {
    const response = await fetch(
      "https://lenormand-pro-api.miguel-69b.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      }
    );

    const data = await response.json();

    if (data.error) {
  resultDiv.innerText =
    typeof data.error === "string"
      ? data.error
      : JSON.stringify(data.error, null, 2);
} else if (data.result) {
  resultDiv.innerText = data.result;
} else {
  resultDiv.innerText = "No se pudo generar la respuesta.";
}

  } catch (error) {
    console.error(error);
    resultDiv.innerText = "Error de conexión con el sistema.";
  }
}
