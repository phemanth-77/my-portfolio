const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.section, .section-light, .section-dark, .section-accent, .project-card, .pillar-grid article').forEach((element) => {
  element.classList.add('reveal-on-scroll');
  revealObserver.observe(element);
});

const projectData = {
  'future-me': ['AI PRODUCT CONCEPT', 'Future Me', 'An AI-powered personal development product designed around goals, habits and personal growth.', 'https://github.com/phemanth-77/future-me'],
  'cultural-hotel': ['BUSINESS & ENTREPRENEURSHIP', 'Smart AI-Powered Cultural Hotel', 'A smart hospitality business concept combining AI, IoT and cultural experiences.', ''],
  pdftoolkit: ['DIGITAL PRODUCT', 'PDFToolkit', 'A privacy-focused digital product designed to simplify PDF workflows.', 'https://github.com/phemanth-77/pdf-toolkit'],
  restaurant: ['BUSINESS MANAGEMENT SYSTEM', 'Restaurant Management System Pro', 'A technology solution focused on improving restaurant management and operations.', 'https://github.com/phemanth-77/Restaurant-Management-System-Pro'],
};
const modal = document.querySelector('#case-study-modal');
const modalLink = document.querySelector('#modal-link');
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
document.querySelectorAll('.case-study-trigger').forEach((button) => button.addEventListener('click', () => {
  const [category, title, statement, link] = projectData[button.dataset.project];
  document.querySelector('#modal-category').textContent = category;
  document.querySelector('#modal-title').textContent = title;
  document.querySelector('#modal-statement').textContent = statement;
  modalLink.hidden = !link;
  if (link) modalLink.href = link;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  document.querySelector('.modal-close').focus();
}));
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#form-note').textContent = 'The form is ready. Add your real email address in js/script.js to enable the mailto fallback.';
});

document.querySelector('.print-resume').addEventListener('click', () => window.print());
