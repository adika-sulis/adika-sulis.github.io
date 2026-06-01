const VISITS_WEBHOOK_secret = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM5MzM4OTcwNDY5NDczMDgxMi9YelljSEhKZU5KNDExZmNkSGE2aUJBUW9OX2UzYXBEM0VmTHBRa3F6UmlhQjVjN0hrTHB6Ti13S3UzMS1kRjI4OWctRg==";
const INTERACTIONS_WEBHOOK_secret = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM5MzM2NTQ4ODMwNTgzNjA3My9mNF8zR3hrQ3pTVWo0ZVdwMHBmQ2R5a3cwMTFzZGw0b2k2MGJLRGNXR2N1X2QyLTVibmpGWTRLNXlVZlE1Z3dKLTNtVg==";

function secret(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

const VISITS_WEBHOOK = secret(VISITS_WEBHOOK_secret);
const INTERACTIONS_WEBHOOK = secret(INTERACTIONS_WEBHOOK_secret);

document.addEventListener("DOMContentLoaded", function () {
    if (getCookie("consent") == "true") {
        try {
            acceptTracking();
            document.getElementById("cookie-consent").style.display = "none";
        } catch (e){
            console.error("Hiba az elfogadás során:", e);
            acceptTracking(); 
        }
    }
});


function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}

let trackingAccepted = getCookie("consent") === "true";

if (!trackingAccepted) {
    document.getElementById("cookie-consent").style.display = "block";
}
function declineTracking() {
    document.getElementById("cookie-consent").style.display = "none";
}

function optOut() {
    setCookie("consent", "", 0);
    setCookie("username", "", 0);
    trackingAccepted = false;
    alert("Sütik sikeresen törölve!")
}

function acceptTracking() {
    trackingAccepted = true
    if (getCookie("consent") != "true") {
    setCookie("consent", "true", 365);
    }
    if (getCookie("username") == "" || getCookie("username") == null) {
        let username = prompt("Adj meg egy tetszőleges nevet!", "Parkoló Péter");
        setCookie("username", username || "Valaki", 365);
    }
    try {
    document.getElementById("cookie-consent").style.display = "none";}
    catch (e) {
        console.log("")
        }



    const now = new Date().toLocaleString();

    const message = {
        content: `
<------------------------------------------------->
👋 ${getCookie("username")} elfogadta a sütiket és meglátogatta az oldalt:

📄 Cím: ${document.title}
🔗 URL: <${window.location.href}>
🔙 Előző oldal: <${document.referrer || "nincs"}>
📅 Dátum: ${now}

💻 Platform: ${navigator.platform}
🖥️ Képernyő: ${screen.width}x${screen.height}
🌐 Nyelv: ${navigator.language}
🌗 Sötét mód: ${window.matchMedia('(prefers-color-scheme: dark)').matches ? "igen" : "nem"}
📱 Érintőképernyő: ${'ontouchstart' in window ? "igen" : "nem"}
<------------------------------------------------->
`
    };

    fetch(VISITS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    }).catch(console.error);
}

function isInteractiveElement(el) {
    const tag = el.tagName.toLowerCase();
    const type = el.getAttribute("type")?.toLowerCase();

    return (
        tag === "button" ||
        tag === "a" ||
        tag === "label" ||
        (tag === "input" && (type === "submit" || type === "button")) ||
        el.getAttribute("role") === "button"
    );
}

document.addEventListener("click", function (event) {
    if (!trackingAccepted) return;

    const target = event.target.closest("button, a, input, label, [role='button']");
    if (!target || !isInteractiveElement(target)) return;

    const message = {
        content: `🖱️ Interakció:
🔘 Elem: <${target.tagName}>
🆔 ID: ${target.id || "nincs"}
🎯 Class: ${target.className || "nincs"}
📄 Szöveg: "${(target.textContent || target.value || "").trim().slice(0, 60) || "nincs"}"`
    };

    fetch(INTERACTIONS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    }).catch(console.error);
});

