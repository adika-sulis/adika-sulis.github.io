window.onload = function () {
  setTimeout(function () {
    document.getElementById("alert").style.display = "flex";
  }, 500);
}

  function closeModal() {
    document.getElementById("alert").style.display = "none";

    var elements = document.getElementsByClassName("blurred");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("blurred");
  }
  }