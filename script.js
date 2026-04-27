function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setLang(lang) {

    localStorage.setItem("lang", lang);

    
    document.querySelectorAll("[data-ka]").forEach(el => {
        let text = el.getAttribute("data-" + lang);
        if (text) el.innerHTML = text;
    });

    startTyping(lang);

    
    document.querySelectorAll(".lang-switch button").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(
        `.lang-switch button[onclick="setLang('${lang}')"]`
    );

    if (activeBtn) activeBtn.classList.add("active");
}

let typingTimer;

function startTyping(lang) {

    const el = document.getElementById("typed-text");
    if (!el) return;

    const text = el.getAttribute("data-" + lang);
    if (!text) return;

    let i = 0;
    el.innerHTML = "";

    if (typingTimer) clearTimeout(typingTimer);

    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            typingTimer = setTimeout(type, 100);
        } else {
            typingTimer = setTimeout(() => {
                startTyping(lang);
            }, 5000);
        }
    }

    type();
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


function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

window.addEventListener("load", () => {


    let lang = localStorage.getItem("lang") || "ka";
    setLang(lang);

 
    let theme = localStorage.getItem("theme") || "dark";
    let icon = document.getElementById("theme-icon");

    if (theme === "light") {
        document.body.classList.add("light");
        if (icon) icon.textContent = "☀️";
    } else {
        document.body.classList.remove("light");
        if (icon) icon.textContent = "🌙";
    }
});
