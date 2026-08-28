// ==========================================================================
// Fio & Saúde — Landing Page
// script.js — carrossel de sinais, acordeão de FAQ, navegação suave e form
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initFaqAccordion();
  initSmoothScroll();
  initContactForm();
});

// --------------------------------------------------------------------------
// Carrossel "Você se identifica?"
// --------------------------------------------------------------------------
// Conteúdo placeholder — troque pelos sinais reais de alerta capilar
// definidos pela clínica antes da entrega final.
function initCarousel() {
  const container = document.querySelector('.identificacao-section .carousel-container');
  if (!container) return;

  const slides = [
    {
      title: 'Queda Excessiva',
      text: 'Perda acima do normal, especialmente ao pentear ou lavar.'
    },
    {
      title: '[ Sinal de Alerta 02 ]',
      text: '[ Descrição placeholder do segundo sinal de alerta capilar. ]'
    },
    {
      title: '[ Sinal de Alerta 03 ]',
      text: '[ Descrição placeholder do terceiro sinal de alerta capilar. ]'
    }
  ];

  const titleEl = container.querySelector('.carousel-title');
  const textEl = container.querySelector('.carousel-text');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = container.querySelector('.carousel-arrow.prev');
  const nextBtn = container.querySelector('.carousel-arrow.next');

  let current = 0;

  function render(index) {
    current = (index + slides.length) % slides.length;
    titleEl.textContent = slides[current].title;
    textEl.textContent = slides[current].text;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => render(current - 1));
  nextBtn.addEventListener('click', () => render(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => render(i)));

  // Autoplay suave — pausa quando o mouse está sobre o card
  let autoplay = setInterval(() => render(current + 1), 6000);
  container.addEventListener('mouseenter', () => clearInterval(autoplay));
  container.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => render(current + 1), 6000);
  });

  render(0);
}

// --------------------------------------------------------------------------
// Acordeão do FAQ (abre um item por vez)
// --------------------------------------------------------------------------
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Primeiro item já aberto por padrão, igual à referência visual
  items[0].classList.add('active');
}

// --------------------------------------------------------------------------
// Navegação suave para os links do menu e botões de CTA que apontam para
// âncoras internas (#inicio, #metodo, #beneficios, #contato)
// --------------------------------------------------------------------------
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Botão do banner CTA leva até o formulário de contato
  const ctaButton = document.querySelector('.cta-banner .btn');
  const contactSection = document.getElementById('contato');
  if (ctaButton && contactSection) {
    ctaButton.addEventListener('click', () => {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

// --------------------------------------------------------------------------
// Formulário de contato
// --------------------------------------------------------------------------
// Faz apenas a validação e o feedback visual no front-end. A gravação real
// do lead (envio por e-mail, planilha, CRM etc.) depende de um backend ou
// serviço externo (ex.: Formspree, EmailJS) que ainda precisa ser plugado
// na action do <form> antes da entrega final.
function initContactForm() {
  const form = document.querySelector('.form-card form');
  if (!form) return;

  const submitButton = form.querySelector('.form-btn');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const telefone = form.querySelector('#telefone');

    const camposObrigatorios = [nome, email, telefone];
    const algumVazio = camposObrigatorios.some((campo) => !campo.value.trim());

    if (algumVazio) {
      camposObrigatorios.forEach((campo) => {
        campo.style.borderColor = campo.value.trim() ? '#D1D5DB' : 'var(--rust)';
      });
      return;
    }

    const textoOriginal = submitButton.textContent;
    submitButton.textContent = 'ENVIADO ✓';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = textoOriginal;
      submitButton.disabled = false;
      form.reset();
    }, 2500);
  });
}
