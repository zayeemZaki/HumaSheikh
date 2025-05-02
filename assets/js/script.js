// assets/js/script.js

// 1) When DOM is ready, include partials, then wire up nav and highlighting
document.addEventListener('DOMContentLoaded', async () => {
  await includeHTML();        // inject header & footer
  setupMobileMenu();          // mobile menu toggle
  highlightActiveNav();       // mark the right <a> as .active
});

// 2) Fetch & inline any [data-include] fragment
async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  for (let el of elements) {
    const file = el.getAttribute('data-include');
    try {
      const resp = await fetch(file);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const html = await resp.text();
      el.outerHTML = html;
    } catch (err) {
      console.error(`Failed to include '${file}':`, err);
    }
  }
}

// 3) Toggle mobile nav on “☰” click
function setupMobileMenu() {
  const btn = document.querySelector('.mobile-menu');
  const nav = document.querySelector('#site-nav ul');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('active'));
  }
}

// 4) Highlight the nav link matching the current page
function highlightActiveNav() {
  // determine current filename (e.g. 'index.html' or 'presentations.html')
  let current = window.location.pathname.split('/').pop();
  if (!current) current = 'index.html';

  document.querySelectorAll('#site-nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
