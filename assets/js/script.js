// assets/js/script.js

console.log("📋 script.js loaded");  // 1) confirm script is included

window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded");
  includeHTML()
    .then(() => {
      console.log("🔗 includeHTML done");
      setupMobileMenu();
      highlightActiveNav();
    })
    .catch(err => console.error("❌ includeHTML failed:", err));
});

async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  console.log(`Found ${elements.length} include elements`);
  
  for (let el of elements) {
    const file = el.getAttribute("data-include");
    // Try BOTH absolute and relative if you like. Start with relative:
    const path = file;                 
    console.log(`Attempting to fetch: ${path}`);
    try {
      const res = await fetch(path);
      console.log(`→ fetch status for ${path}:`, res.status);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      el.outerHTML = text;
      console.log(`✔ Injected ${path}`);
    } catch (err) {
      console.error(`Failed to include '${path}':`, err);
    }
  }
}

function setupMobileMenu() {
  const btn = document.querySelector(".mobile-menu");
  const nav = document.querySelector("nav ul");
  if (btn && nav) {
    btn.addEventListener("click", () => nav.classList.toggle("active"));
  }
}

function highlightActiveNav() {
  const links = document.querySelectorAll("nav ul li a");
  const current = location.pathname.split("/").pop() || "index.html";
  links.forEach(a => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    }
  });
}
