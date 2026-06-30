function logout() {
    setCookie("hash", "", -1);
    location.href = "https://adika-sulis.rf.gd/account/login/index.php";
}

function deleteAccount() {
    var deleteDiv = document.getElementById("delete")
    deleteDiv.innerHTML = `<h1>Ez a művelet <strong>nem vonható vissza</strong>!</h1>
    <form method="POST" action="">
        <input type="hidden" name="action" value="delete">
        <button class="btn btn-danger">Fiókom törlése</button>
    </form> `
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}
