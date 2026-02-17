async function startReading() {
  const question = document.getElementById("question").value;
  const resultDiv = document.getElementById("result");

  if (!question.trim()) {
    alert("Por favor, escribe una pregunta clara.");
    return;
  }

  resultDiv.innerText = "🔮 Barajando el mazo Lenormand...\n\n";

  try {
    const response = await fetch(
      "https://lenormand-pro-api.miguel-69b.workers.dev",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      }
    );

    const data = await response.json();

    if (data.error) {
      resultDiv.innerText = data.error;
    } else {
      resultDiv.innerText = data.result;
    }
  } catch (error) {
    resultDiv.innerText = "Error de conexión con el sistema.";
  }
}


