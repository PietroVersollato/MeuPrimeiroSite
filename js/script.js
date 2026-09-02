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

  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('menu-open')) {
      navMenu.classList.remove('menu-open');
      if (mobileBtn) {
        mobileBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    }
  }

  function openMobileMenu() {
    if (navMenu) {
      navMenu.classList.add('menu-open');
      if (mobileBtn) {
        mobileBtn.setAttribute('aria-expanded', 'true');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-xmark';
      }
    }
  }

  if (mobileBtn && navMenu) {
    mobileBtn.setAttribute('aria-expanded', 'false');

    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('menu-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Fechar menu mobile ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('menu-open') && 
          !navMenu.contains(e.target) && 
          !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
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
    },
    {
      question: "No filme recente Jurassic World: Renascimento (2025), qual é a missão confidencial da equipe de Zora Bennett?",
      options: ["Criar uma colônia humana na Ilha Sorna", "Extrair material genético dos três maiores dinossauros sobreviventes", "Construir um resort na Antártica", "Exterminar predadores híbridos fugitivos"],
      answer: 1,
      explanation: "Em Jurassic World: Renascimento (2025), a equipe deve obter DNA dos três maiores animais sobreviventes na terra, no mar e no ar para salvar milhões de vidas com um medicamento milagroso."
    },
    {
      question: "Qual dinossauro herbívoro bizarro do Cretáceo possuía as maiores garras já registradas na história fóssil (até 1 metro)?",
      options: ["Triceratops", "Therizinosaurus", "Ankylosaurus", "Stegosaurus"],
      answer: 1,
      explanation: "O Therizinosaurus cheloniformis possuía garras frontais em forma de foice de até 1 metro de comprimento para colheita vegetal e defesa implacável."
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

    if (score >= 6) {
      resultBadgeEl.textContent = '🏆🦖';
      resultTitleEl.textContent = 'Mestre Paleontólogo de Jurassic World!';
    } else if (score >= 4) {
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

  // 8. Enciclopédia Paleontológica ao Vivo (Integração com API em Português)
  const DINO_API_PRESETS = [
    { label: "T-Rex", query: "Tiranossauro", icon: "fa-skull" },
    { label: "Velociraptor", query: "Velociraptor", icon: "fa-paw" },
    { label: "Espinossauro", query: "Espinossauro", icon: "fa-water" },
    { label: "Carnotauro", query: "Carnotauro", icon: "fa-fire" },
    { label: "Tricerátops", query: "Triceratops", icon: "fa-shield-halved" },
    { label: "Anquilossauro", query: "Anquilossauro", icon: "fa-shield" },
    { label: "Braquiossauro", query: "Braquiossauro", icon: "fa-tree" },
    { label: "Alossauro", query: "Alossauro", icon: "fa-bone" },
    { label: "Estegossauro", query: "Estegossauro", icon: "fa-leaf" },
    { label: "Giganotossauro", query: "Giganotossauro", icon: "fa-mountain" },
    { label: "Mosassauro", query: "Mosassauro", icon: "fa-water" },
    { label: "Pteranodonte", query: "Pteranodonte", icon: "fa-wind" },
    { label: "Arqueoptérix", query: "Archaeopteryx", icon: "fa-feather" }
  ];

  const DINO_NAME_MAP = {
    "tyrannosaurus": "Tiranossauro",
    "tyrannosaurus rex": "Tiranossauro",
    "t-rex": "Tiranossauro",
    "spinosaurus": "Espinossauro",
    "spinosaurus aegyptiacus": "Espinossauro",
    "ankylosaurus": "Anquilossauro",
    "ankylosaurus magniventris": "Anquilossauro",
    "stegosaurus": "Estegossauro",
    "brachiosaurus": "Braquiossauro",
    "allosaurus": "Alossauro",
    "allosaurus fragilis": "Alossauro",
    "carnotaurus": "Carnotauro",
    "carnotaurus sastrei": "Carnotauro",
    "giganotosaurus": "Giganotossauro",
    "giganotosaurus carolini": "Giganotossauro",
    "mosasaurus": "Mosassauro",
    "mosasaurus hoffmanni": "Mosassauro",
    "pteranodon": "Pteranodonte",
    "diplodocus": "Diplodoco",
    "iguanodon": "Iguanodonte",
    "triceratops horridus": "Triceratops",
    "pachycephalosaurus": "Pachycephalosaurus",
    "therizinosaurus": "Therizinosaurus",
    "baryonyx": "Baryonyx",
    "parasaurolophus": "Parasaurolophus",
    "archaeopteryx": "Archaeopteryx",
    "liopleurodon": "Liopleurodon"
  };

  const apiInput = document.getElementById('apiDinoInput');
  const apiSearchBtn = document.getElementById('apiSearchBtn');
  const apiRandomBtn = document.getElementById('apiRandomBtn');
  const apiPresetsContainer = document.getElementById('apiPresets');
  const apiResultCard = document.getElementById('apiResultCard');

  // Renderizar atalhos de dinossauros
  if (apiPresetsContainer) {
    DINO_API_PRESETS.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-pill';
      btn.innerHTML = `<i class="fa-solid ${item.icon}"></i> ${item.label}`;
      btn.addEventListener('click', () => {
        if (apiInput) apiInput.value = item.label;
        fetchDinosaurFromAPI(item.query, item.label);
      });
      apiPresetsContainer.appendChild(btn);
    });
  }

  // Função para consultar API da Wikipedia em Português
  async function fetchDinosaurFromAPI(query, displayQuery = '') {
    if (!apiResultCard) return;

    let searchTerm = query.trim();
    if (!searchTerm) return;

    const cleanTerm = searchTerm.toLowerCase().replace(/[^a-z0-9\s-]/g, '');
    if (DINO_NAME_MAP[cleanTerm]) {
      searchTerm = DINO_NAME_MAP[cleanTerm];
    }

    // Exibir estado de carregamento animado
    apiResultCard.innerHTML = `
      <div class="api-loading-state">
        <div class="api-spinner"></div>
        <p style="color: var(--amber-glow); font-weight:600;">Consultando API científica em português para "<strong>${displayQuery || query}</strong>"...</p>
        <span style="font-size:0.85rem; color:var(--text-dim);">Acessando base de dados paleontológicos em tempo real...</span>
      </div>
    `;

    try {
      const endpoint = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();

      const title = data.title || displayQuery || query;
      const extract = data.extract || "Nenhuma descrição detalhada disponível no momento.";
      const description = data.description || "Espécie paleontológica pré-histórica catalogada";
      const wikiUrl = data.content_urls?.desktop?.page || `https://pt.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`;
      
      const imageUrl = data.originalimage?.source || data.thumbnail?.source || 'img/Carnivoros.jpg';

      apiResultCard.innerHTML = `
        <div class="api-result-grid">
          <div class="api-result-media">
            <img src="${imageUrl}" alt="Fóssil ou reconstituição de ${title}" loading="lazy">
          </div>
          <div class="api-result-info">
            <span class="api-result-badge"><i class="fa-solid fa-satellite-dish"></i> Dados Oficiais via API em Português</span>
            <h3 class="api-result-title">${title}</h3>
            <span class="api-result-subtitle"><i class="fa-solid fa-dna"></i> ${description}</span>
            <p class="api-result-extract">${extract}</p>
            <div class="api-result-actions">
              <a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-solid fa-book-open"></i> Ler Artigo Completo na Enciclopédia
              </a>
              <button class="btn btn-outline" id="apiShareBtn">
                <i class="fa-solid fa-share-nodes"></i> Compartilhar Descoberta
              </button>
            </div>
          </div>
        </div>
      `;

      const shareBtn = document.getElementById('apiShareBtn');
      shareBtn?.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${title} no Portal Jurassic Saga: ${wikiUrl}`);
          shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link Copiado!';
          setTimeout(() => {
            shareBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Compartilhar Descoberta';
          }, 2500);
        }
      });

    } catch (err) {
      apiResultCard.innerHTML = `
        <div class="api-error-state">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <h4 style="color: #fff; font-size: 1.25rem; margin-bottom: 8px;">Espécie não localizada na API</h4>
          <p style="max-width: 500px; margin: 0 auto 16px; font-size: 0.95rem;">
            Não encontramos um verbete exato para "<strong>${displayQuery || query}</strong>" na enciclopédia em português.
          </p>
          <p style="font-size: 0.88rem; color: var(--amber-glow);">
            Tente buscar por termos populares como <strong>Tiranossauro</strong>, <strong>Velociraptor</strong>, <strong>Carnotauro</strong> ou <strong>Anquilossauro</strong>.
          </p>
        </div>
      `;
    }
  }

  // Eventos de busca
  apiSearchBtn?.addEventListener('click', () => {
    if (apiInput && apiInput.value.trim()) {
      fetchDinosaurFromAPI(apiInput.value.trim());
    }
  });

  apiInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (apiInput.value.trim()) {
        fetchDinosaurFromAPI(apiInput.value.trim());
      }
    }
  });

  apiRandomBtn?.addEventListener('click', () => {
    const randomItem = DINO_API_PRESETS[Math.floor(Math.random() * DINO_API_PRESETS.length)];
    if (apiInput) apiInput.value = randomItem.label;
    fetchDinosaurFromAPI(randomItem.query, randomItem.label);
  });

  // Conectar os cards de espécies existentes da Seção 2 à API
  const dinoItems = document.querySelectorAll('.dino-species-item');
  dinoItems.forEach(item => {
    const nameEl = item.querySelector('.species-name');
    if (nameEl) {
      const hint = document.createElement('span');
      hint.className = 'api-hint-badge';
      hint.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> Ver na API';
      nameEl.appendChild(hint);

      item.addEventListener('click', () => {
        const rawName = nameEl.textContent.replace('Ver na API', '').replace(/[›»>]/g, '').trim();
        const firstName = rawName.split(' ')[0];
        
        const apiSection = document.getElementById('explorador-api');
        if (apiSection) {
          apiSection.scrollIntoView({ behavior: 'smooth' });
        }

        if (apiInput) apiInput.value = rawName;
        fetchDinosaurFromAPI(firstName, rawName);
      });
    }
  });

  // Carregar dinossauro inicial padrão
  if (apiResultCard) {
    fetchDinosaurFromAPI('Tiranossauro', 'Tiranossauro Rex');
  }
});
