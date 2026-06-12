const body = document.body;
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contactForm');

function setMenuOpen(isOpen) {
  body.classList.toggle('menu-open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
}

function updateNavigation() {
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.hash === `#${currentSection}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  header?.classList.toggle('scrolled', window.scrollY > 40);
}

menuToggle?.addEventListener('click', () => {
  setMenuOpen(!body.classList.contains('menu-open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('menu-open')) {
    setMenuOpen(false);
    menuToggle?.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1080) {
    setMenuOpen(false);
  }
});

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

function handleForm(event) {
  event.preventDefault();

  const nome = document.getElementById('name').value.trim();
  const perfil = document.getElementById('profile').value;
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('phone').value.trim();
  const mensagem = document.getElementById('message').value.trim();

  const texto = `Olá, tenho interesse no Connect Vet do Brasil.

Nome: ${nome}
Perfil: ${perfil}
E-mail: ${email}
Telefone: ${telefone || 'Não informado'}

Mensagem:
${mensagem}`;

  const numeroWhatsApp = '5515996451575';
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
  const whatsappWindow = window.open(url, '_blank');

  if (whatsappWindow) {
    whatsappWindow.opener = null;
    event.target.reset();
  } else {
    window.location.href = url;
  }
}

contactForm?.addEventListener('submit', handleForm);
