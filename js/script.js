/**
 * JURASSIC WORLD & DINOSSAUROS - SCRIPTS INTERATIVOS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cabeçalho com Efeito de Scroll
  const cabecalho = document.querySelector('.cabecalho');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      cabecalho?.classList.add('scrolled');
    } else {
      cabecalho?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  // Botão Voltar ao Topo
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 2. Menu Mobile Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('menu-open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('menu-open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Fechar menu mobile ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('menu-open');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Scrollspy para Ativar Links do Menu
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('#menu ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Filtro de Categorias de Dinossauros
  const filterBtns = document.querySelectorAll('.filter-btn');
  const dinoCards = document.querySelectorAll('.dino-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      dinoCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Acordeão de Curiosidades
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Fecha todos os itens
      document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

      // Abre o clicado se não estava aberto
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Modal Lightbox de Imagens
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const clickableImages = document.querySelectorAll('.movie-media, .dino-media, .gallery-item');
  clickableImages.forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('img');
      const caption = container.querySelector('.movie-media-caption, figcaption, .dino-card-title');
      
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Imagem do universo Jurassic';
        if (lightboxCaption) {
          lightboxCaption.textContent = caption ? caption.textContent.trim() : (img.alt || '');
        }
        lightboxModal.classList.add('open');
      }
    });
  });

  const closeLightbox = () => {
    lightboxModal?.classList.remove('open');
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 7. Quiz Interativo
  const quizData = [
    {
      question: "Qual dinossauro foi o principal antagonista em Jurassic Park III (2001)?",
      options: ["Tyrannosaurus Rex", "Spinosaurus", "Indominus Rex", "Velociraptor"],
      answer: 1,
      explanation: "O Spinosaurus foi introduzido em Jurassic Park III como o predador supremo capaz de enfrentar o T-Rex."
    },
    {
      question: "Qual o tamanho real estimado do fóssil de Velociraptor mongoliensis na natureza?",
      options: ["Do tamanho de um elefante", "Aproximadamente 4 metros de altura", "Do tamanho de um peru grande (cerca de 50cm)", "Maior que o T-Rex"],
      answer: 2,
      explanation: "Na realidade, os Velociraptores tinham cerca de 50cm a 60cm de altura. O tamanho gigante no filme foi inspirado no Deinonychus!"
    },
    {
      question: "Em Jurassic World (2015), qual é o nome do primeiro dinossauro híbrido criado no laboratório?",
      options: ["Indoraptor", "Scorpios Rex", "Indominus Rex", "Stegoceratops"],
      answer: 2,
      explanation: "O Indominus Rex foi o primeiro híbrido geneticamente modificado projetado pela InGen e Dr. Henry Wu."
    },
    {
      question: "Qual réptil voador com envergadura de até 11 metros é considerado um dos maiores animais voadores da história?",
      options: ["Pterodactylus", "Quetzalcoatlus", "Archaeopteryx", "Dimorphodon"],
      answer: 1,
      explanation: "O Quetzalcoatlus possuía envergadura de asas entre 10 e 11 metros, sendo um dos maiores seres alados que já existiram."
    },
    {
      question: "Quais sons foram combinados pelos designers de áudio de Jurassic Park para criar o icônico rugido do T-Rex?",
      options: ["Apenas leões e tigres", "Mistura de sons de elefantes, tigres e jacarés", "Som gerado 100% por computador", "Gritos de aves marinhas"],
      answer: 1,
      explanation: "Gary Rydstrom mixou o choro de filhote de elefante com o rugido de tigre e o sibilo de jacaré para compor o clássico rugido do T-Rex."
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizOptionsEl = document.getElementById('quizOptions');
  const quizProgressEl = document.getElementById('quizProgress');
  const quizScoreEl = document.getElementById('quizScoreLive');
  const quizFeedbackEl = document.getElementById('quizFeedback');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizContainer = document.getElementById('quizContent');
  const quizResultView = document.getElementById('quizResultView');
  const resultBadgeEl = document.getElementById('resultBadge');
  const resultTitleEl = document.getElementById('resultTitle');
  const resultScoreEl = document.getElementById('resultScore');
  const quizRestartBtn = document.getElementById('quizRestartBtn');

  function loadQuestion() {
    if (!quizQuestionEl || !quizOptionsEl) return;
    
    const q = quizData[currentQuestion];
    quizQuestionEl.textContent = `${currentQuestion + 1}. ${q.question}`;
    quizProgressEl.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    quizScoreEl.textContent = `Acertos: ${score}`;
    
    quizOptionsEl.innerHTML = '';
    quizFeedbackEl.className = 'quiz-feedback';
    quizFeedbackEl.style.display = 'none';
    quizFeedbackEl.textContent = '';
    quizNextBtn.style.display = 'none';

    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span style="opacity:0.6;font-weight:700;">${String.fromCharCode(65 + index)}.</span> ${opt}`;
      btn.addEventListener('click', () => selectAnswer(index));
      quizOptionsEl.appendChild(btn);
    });
  }

  function selectAnswer(selectedIndex) {
    const q = quizData[currentQuestion];
    const buttons = quizOptionsEl.querySelectorAll('.quiz-option');

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add('correct');
      }
      if (idx === selectedIndex && idx !== q.answer) {
        btn.classList.add('incorrect');
      }
    });

    if (selectedIndex === q.answer) {
      score++;
      quizScoreEl.textContent = `Acertos: ${score}`;
      quizFeedbackEl.className = 'quiz-feedback show-correct';
      quizFeedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Correto!</strong> ${q.explanation}`;
    } else {
      quizFeedbackEl.className = 'quiz-feedback show-incorrect';
      quizFeedbackEl.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Incorreto!</strong> A resposta certa é <em>${q.options[q.answer]}</em>. ${q.explanation}`;
    }

    quizFeedbackEl.style.display = 'block';
    quizNextBtn.style.display = 'inline-flex';

    if (currentQuestion === quizData.length - 1) {
      quizNextBtn.innerHTML = 'Ver Resultado <i class="fa-solid fa-award"></i>';
    } else {
      quizNextBtn.innerHTML = 'Próxima Pergunta <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  quizNextBtn?.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    if (!quizContainer || !quizResultView) return;
    quizContainer.style.display = 'none';
    quizResultView.classList.add('active');

    resultScoreEl.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!`;

    if (score === 5) {
      resultBadgeEl.textContent = '🏆🦖';
      resultTitleEl.textContent = 'Mestre Paleontólogo de Jurassic World!';
    } else if (score >= 3) {
      resultBadgeEl.textContent = '🌿🦕';
      resultTitleEl.textContent = 'Especialista em Dinossauros!';
    } else {
      resultBadgeEl.textContent = '🥚🔍';
      resultTitleEl.textContent = 'Explorador Iniciante de Fósseis!';
    }
  }

  quizRestartBtn?.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizResultView.classList.remove('active');
    quizContainer.style.display = 'block';
    loadQuestion();
  });

  // Iniciar primeira pergunta do quiz
  if (quizQuestionEl) {
    loadQuestion();
  }
});
