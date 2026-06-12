const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.menu a');

menuToggle.addEventListener('click', () => {
  body.classList.toggle('menu-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
  });
});

const sections = document.querySelectorAll('section[id]');

function setActiveMenu() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', setActiveMenu);
setActiveMenu();

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.16 });

revealElements.forEach(element => revealObserver.observe(element));

const slides = [
  {
    tag: 'Visibilidade local',
    title: 'Seja encontrado por tutores que precisam do seu serviço.',
    text: 'A plataforma aproxima profissionais de pessoas que já estão procurando atendimento, banho, consulta, vacina, orientação ou serviços especializados.'
  },
  {
    tag: 'Agenda mais organizada',
    title: 'Transforme solicitações em atendimentos com mais controle.',
    text: 'Receba contatos, organize disponibilidade e acompanhe oportunidades sem depender apenas de indicações informais ou redes sociais.'
  },
  {
    tag: 'Crescimento profissional',
    title: 'Construa autoridade dentro de uma rede focada no setor animal.',
    text: 'Tenha um perfil profissional, apresente especialidades e participe de um ecossistema criado para valorizar quem cuida dos animais.'
  },
  {
    tag: 'Rede de parcerias',
    title: 'Conecte-se com pet shops, clínicas e negócios complementares.',
    text: 'A Connect Vet abre espaço para colaborações estratégicas, indicações qualificadas e novas frentes comerciais dentro do mercado pet.'
  }
];

let currentSlide = 0;
const sliderContent = document.getElementById('sliderContent');
const sliderDots = document.getElementById('sliderDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let sliderInterval;

function renderSlide(index) {
  const slide = slides[index];

  sliderContent.style.opacity = 0;

  setTimeout(() => {
    sliderContent.innerHTML = `
      <span class="tag">${slide.tag}</span>
      <h3>${slide.title}</h3>
      <p>${slide.text}</p>
    `;

    sliderContent.style.opacity = 1;
  }, 180);

  document.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function buildDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.type = 'button';

    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlide(currentSlide);
      restartSlider();
    });

    sliderDots.appendChild(dot);
  });
}

function next() {
  currentSlide = (currentSlide + 1) % slides.length;
  renderSlide(currentSlide);
}

function prev() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  renderSlide(currentSlide);
}

function startSlider() {
  sliderInterval = setInterval(next, 5200);
}

function restartSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

if (prevSlide && nextSlide && sliderContent && sliderDots) {
  prevSlide.addEventListener('click', () => {
    prev();
    restartSlider();
  });

  nextSlide.addEventListener('click', () => {
    next();
    restartSlider();
  });

  buildDots();
  renderSlide(currentSlide);
  startSlider();
}

/* ==========================================
   FORMULÁRIO → WHATSAPP
========================================== */

function handleForm(event) {
  event.preventDefault();

  const nome = document.getElementById("name").value;
  const perfil = document.getElementById("profile").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("phone").value;
  const mensagem = document.getElementById("message").value;

  const texto = `Olá, tenho interesse no Connect Vet do Brasil.

Nome: ${nome}
Perfil: ${perfil}
E-mail: ${email}
Telefone: ${telefone}

Mensagem:
${mensagem}`;

  const numeroWhatsApp = "5515996451575";

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");

  event.target.reset();

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

}