function toggleDark() {
  var elements = document.getElementsByClassName("theme");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("dark");
  }
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    if (btn.classList.contains("btn-light")) {
      btn.classList.remove("btn-light");
      btn.classList.add("btn-dark");
    } else if (btn.classList.contains("btn-dark")) {
      btn.classList.remove("btn-dark");
      btn.classList.add("btn-light");
    }
  });
}