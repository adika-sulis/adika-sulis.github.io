fetch("api/attack.php", {
    method: "POST",
    body: new URLSearchParams({
        gameId: 5
    })
});