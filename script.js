// TOP SCROLL
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// LANGUAGE SYSTEM
function setLang(lang) {
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-ka]").forEach(el => {
        let text = el.getAttribute("data-" + lang);
        if (text) el.innerHTML = text;
    });

    // typing text update
    updateTyping(lang);
}

// LOAD LANGUAGE
window.addEventListener("load", () => {
    let lang = localStorage.getItem("lang") || "ka";
    setLang(lang);
});

// TYPING EFFECT
const typedEl = document.getElementById("typed-text");
let i = 0;

function updateTyping(lang) {
    i = 0;
    const text = typedEl.getAttribute("data-" + lang);

    function type() {
        if (i <= text.length) {
            typedEl.innerHTML = text.substring(0, i);
            i++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                i = 0;
                type();
            }, 5000);
        }
    }

    type();
}

// scroll buttons
window.onscroll = function () {
    let btn = document.getElementById("topBtn");
    btn.style.display = document.documentElement.scrollTop > 200 ? "block" : "none";
};

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth" });
    });
});

function setLang(lang) {

    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-ka]").forEach(el => {
        let text = el.getAttribute("data-" + lang);
        if (text) el.innerHTML = text;
    });

    // active button
    document.querySelectorAll(".lang-switch button").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelector(`.lang-switch button[onclick="setLang('${lang}')"]`)
        .classList.add("active");
}

function toggleTheme() {
    document.body.classList.toggle("light");

    let icon = document.getElementById("theme-icon");

    if (document.body.classList.contains("light")) {
        icon.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        icon.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
}

// load saved theme
window.addEventListener("load", () => {
    let theme = localStorage.getItem("theme") || "dark";
    let icon = document.getElementById("theme-icon");

    if (theme === "light") {
        document.body.classList.add("light");
        icon.textContent = "☀️";
    } else {
        icon.textContent = "🌙";
    }
});

function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
}