function startReading() {
  const question = document.getElementById("question").value;

  if (!question.trim()) {
    alert("Por favor, escribe una pregunta clara.");
    return;
  }

  document.getElementById("result").innerText =
    "🔮 Barajando el mazo Lenormand...\n\n(Esta es una demo visual. La IA se conecta en el siguiente paso.)";
}

/* Registro PWA */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

