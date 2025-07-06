 function menu(x) {
        x.classList.toggle("change");
        var elements = document.getElementsByClassName("menuLinks");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.toggle("change");
        }
    }