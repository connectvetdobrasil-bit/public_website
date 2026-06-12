const body = document.body;
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('section[id]');
const contactForm = document.getElementById('contactForm');
const appModeTabs = [...document.querySelectorAll('.app-mode-tab')];
const appPreview = document.getElementById('app-preview');

const appModes = {
  tutor: {
    label: 'Connect Easy',
    title: 'Cuidado completo na palma da mão.',
    text: 'Encontre profissionais próximos, acompanhe seus animais e organize os próximos cuidados.',
    highlights: ['Busca por proximidade', 'Carteira do animal', 'Agenda de cuidados'],
    greeting: 'Olá, Marcia!',
    headline: 'Como podemos cuidar hoje?',
    avatar: 'M',
    search: 'Buscar veterinários e serviços',
    quickActions: [['✚', 'Veterinário'], ['⌖', 'Próximos'], ['▣', 'Agenda'], ['♡', 'Cuidados']],
    cardHeading: 'Profissionais perto de você',
    resultAvatar: 'CV',
    resultTitle: 'Clínica Vet Center',
    resultMeta: '1,2 km • Aberto agora',
    resultBadge: '★ 4,9 atendimento',
    alertTitle: 'Próximo cuidado',
    alertText: 'Vacina da Mel em 4 dias'
  },
  profissional: {
    label: 'Connect Professional',
    title: 'Sua rotina profissional mais inteligente.',
    text: 'Organize a agenda, receba chamados e fortaleça sua presença em uma rede especializada.',
    highlights: ['Agenda integrada', 'Chamados na região', 'Perfil profissional'],
    greeting: 'Olá, Dra. Brenda!',
    headline: 'Sua agenda está pronta.',
    avatar: 'B',
    search: 'Buscar clientes, animais ou serviços',
    quickActions: [['▣', 'Agenda'], ['⚡', 'Chamados'], ['◇', 'Clientes'], ['✚', 'Receitas']],
    cardHeading: 'Próximos atendimentos',
    resultAvatar: 'M',
    resultTitle: 'Consulta da Mel',
    resultMeta: 'Hoje, 14:30 • Domiciliar',
    resultBadge: 'Tutor confirmado',
    alertTitle: 'Novo chamado na região',
    alertText: 'Atendimento disponível a 2,4 km'
  },
  solidario: {
    label: 'Connect Vet Solidário',
    title: 'Boas conexões transformam destinos.',
    text: 'Descubra campanhas, adoções e formas de apoiar quem atua todos os dias pela causa animal.',
    highlights: ['Adoções responsáveis', 'Campanhas verificadas', 'Rede de voluntários'],
    greeting: 'Olá, Lucia!',
    headline: 'Vamos transformar uma vida?',
    avatar: 'L',
    search: 'Buscar campanhas, ONGs e adoções',
    quickActions: [['♡', 'Adoções'], ['◎', 'Campanhas'], ['♧', 'Doações'], ['+', 'Voluntários']],
    cardHeading: 'Campanhas em destaque',
    resultAvatar: 'A',
    resultTitle: 'AATAN precisa de apoio',
    resultMeta: 'Campanha verificada • Sorocaba',
    resultBadge: '72% da meta alcançada',
    alertTitle: 'Uma nova chance',
    alertText: 'Bidu está disponível para adoção'
  }
};

let currentAppMode = 'tutor';
let appModeInterval;

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

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function renderAppMode(mode, moveFocus = false) {
  const content = appModes[mode];
  const appScreen = document.querySelector('.app-screen');
  const description = document.querySelector('.app-mode-description');
  const highlights = document.getElementById('appModeHighlights');
  const quickGrid = document.getElementById('appQuickGrid');

  if (!content || !appScreen || !description || !highlights || !quickGrid) {
    return;
  }

  currentAppMode = mode;
  description.classList.add('changing');
  appScreen.classList.add('changing');

  window.setTimeout(() => {
    setText('appModeLabel', content.label);
    setText('appModeTitle', content.title);
    setText('appModeText', content.text);
    setText('appGreeting', content.greeting);
    setText('appHeadline', content.headline);
    setText('appAvatar', content.avatar);
    setText('appSearchText', content.search);
    setText('appCardHeading', content.cardHeading);
    setText('appResultAvatar', content.resultAvatar);
    setText('appResultTitle', content.resultTitle);
    setText('appResultMeta', content.resultMeta);
    setText('appResultBadge', content.resultBadge);
    setText('appAlertTitle', content.alertTitle);
    setText('appAlertText', content.alertText);

    highlights.replaceChildren(...content.highlights.map((text) => {
      const item = document.createElement('span');
      item.textContent = text;
      return item;
    }));

    quickGrid.replaceChildren(...content.quickActions.map(([icon, label]) => {
      const button = document.createElement('button');
      const iconElement = document.createElement('span');
      button.type = 'button';
      iconElement.textContent = icon;
      button.append(iconElement, label);
      return button;
    }));

    appScreen.dataset.mode = mode;
    appPreview?.setAttribute('aria-labelledby', `tab-${mode}`);

    appModeTabs.forEach((tab) => {
      const isActive = tab.dataset.appMode === mode;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && moveFocus) {
        tab.focus();
      }
    });

    description.classList.remove('changing');
    appScreen.classList.remove('changing');
  }, 180);
}

function restartAppModeRotation() {
  window.clearInterval(appModeInterval);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  appModeInterval = window.setInterval(() => {
    const modes = Object.keys(appModes);
    const nextIndex = (modes.indexOf(currentAppMode) + 1) % modes.length;
    renderAppMode(modes[nextIndex]);
  }, 7000);
}

appModeTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    renderAppMode(tab.dataset.appMode);
    restartAppModeRotation();
  });

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + appModeTabs.length) % appModeTabs.length;
    renderAppMode(appModeTabs[nextIndex].dataset.appMode, true);
    restartAppModeRotation();
  });
});

appPreview?.addEventListener('mouseenter', () => window.clearInterval(appModeInterval));
appPreview?.addEventListener('mouseleave', restartAppModeRotation);
appPreview?.addEventListener('focusin', () => window.clearInterval(appModeInterval));
appPreview?.addEventListener('focusout', restartAppModeRotation);

if (appModeTabs.length) {
  renderAppMode(currentAppMode);
  restartAppModeRotation();
}
