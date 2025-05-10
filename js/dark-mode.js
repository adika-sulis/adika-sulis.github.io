function toggleDark() {
  var elements = document.getElementsByClassName("theme");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("dark");
  }
}