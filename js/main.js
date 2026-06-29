// === Navigation ===

const navLinks = [
  { label: 'Home', href: 'index.html' },
  { label: 'Experience', href: 'experience.html' },
  { label: 'Coding', href: 'coding.html' },
  { label: 'Design', href: 'design.html' },
  { label: 'Fine Art', href: 'fine-art.html' },
  { label: 'Spoke', href: 'spoke.html' },
];

function buildNav() {
  const linksHTML = navLinks
    .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('');

  document.getElementById('nav').innerHTML = `
    <div class="container">
      <a href="index.html" class="nav-logo">Raima Saha</a>
      <button class="nav-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links">
        ${linksHTML}
      </ul>
    </div>
  `;

  setActiveLink();
  initHamburger();
}

function setActiveLink() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    const isActive =
      path.endsWith(href) ||
      (href === 'index.html' && (path.endsWith('/') || path === ''));

    if (isActive) {
      link.classList.add('active');
    }
  });
}

function initHamburger() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Close menu when a link is clicked (mobile)
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', buildNav);
