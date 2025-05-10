window.onload = function () {
  setTimeout(function () {
    document.getElementById("alert").style.display = "flex";
  }, 1000);
}

  function closeModal() {
    document.getElementById("alert").style.display = "none";
  }