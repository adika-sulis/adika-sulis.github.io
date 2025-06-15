window.onload = function () {
  setTimeout(function () {
    var modal = document.getElementById("alert");
    if (modal) {
      modal.style.display = "flex"; 
    }
  }, 500); 
}

function closeModal() {
  var modal = document.getElementById("alert");
  if (modal) {
    modal.style.display = "none";

    var elements = document.getElementsByClassName("blurred");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("blurred");
    }
  }
}