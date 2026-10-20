const root = document.documentElement;
root.classList.add("js");
const toggle = document.getElementById("lang-toggle");

function setLang(lang) {
  root.dataset.lang = lang;
  root.lang = lang;
  toggle.textContent = lang === "tr" ? "EN" : "TR";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
setLang(saved === "en" || saved === "tr" ? saved : "tr");

toggle.addEventListener("click", () => {
  setLang(root.dataset.lang === "tr" ? "en" : "tr");
});

// Fade elements in as they scroll into view, staggering siblings slightly.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
    entry.target.style.transitionDelay = `${Math.min(siblings.indexOf(entry.target), 4) * 80}ms`;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Show the nav border once the page has scrolled.
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
