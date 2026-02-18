document.addEventListener("DOMContentLoaded", () => {
  alert("JS FUNCIONANDO");

  const readingBtn = document.getElementById("readingBtn");
  const activateBtn = document.getElementById("activateBtn");

  if (readingBtn) {
    readingBtn.addEventListener("click", () => {
      alert("BOTÓN REALIZAR TIRADA FUNCIONA");
    });
  } else {
    alert("NO ENCUENTRA readingBtn");
  }

  if (activateBtn) {
    activateBtn.addEventListener("click", () => {
      alert("BOTÓN ACTIVAR FUNCIONA");
    });
  } else {
    alert("NO ENCUENTRA activateBtn");
  }
});
