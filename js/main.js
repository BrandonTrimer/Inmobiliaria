// Control de la aplicación - Inmobiliaria Danny Moya

document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS COMUNES ---
  initHeader();
  initMobileMenu();

  // --- COMPORTAMIENTO DE PÁGINAS ESPECÍFICAS ---
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  if (page === "" || page === "index.html") {
    initHomePage();
  } else if (page === "comprar.html") {
    initComprarPage();
  } else if (page === "vender.html") {
    initVenderPage();
  } else if (page === "detalle.html") {
    initDetailPage();
  }
});

/* ==========================================
   1. FUNCIONALIDADES COMUNES (HEADER Y MENÚ)
   ========================================== */

function initHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en enlaces
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* ==========================================
   2. PÁGINA PRINCIPAL (INDEX)
   ========================================== */

function initHomePage() {
  // Renderizar 4 casas recién agregadas (1 de cada zona para variedad)
  const catalogGrid = document.querySelector("#recent-catalog");
  if (!catalogGrid) return;

  const zonas = ["Tiquipaya", "Cercado", "Sacaba", "Quillacollo"];
  const propiedadesRecientes = [];

  // Tomamos la primera propiedad disponible de cada zona
  zonas.forEach(zona => {
    const propEnZona = propiedades.find(p => p.zona.toLowerCase() === zona.toLowerCase());
    if (propEnZona) {
      propiedadesRecientes.push(propEnZona);
    }
  });

  // Si por alguna razón no tenemos 4 zonas cubiertas, rellenamos con las primeras propiedades
  while (propiedadesRecientes.length < 4 && propiedadesRecientes.length < propiedades.length) {
    const faltante = propiedades.find(p => !propiedadesRecientes.includes(p));
    if (faltante) propiedadesRecientes.push(faltante);
  }

  // Renderizar las tarjetas
  catalogGrid.innerHTML = "";
  propiedadesRecientes.forEach((prop, idx) => {
    const cardHTML = createPropertyCardHTML(prop, idx);
    catalogGrid.insertAdjacentHTML("beforeend", cardHTML);
  });

  // Inicializar carruseles de las tarjetas
  const carousels = catalogGrid.querySelectorAll(".property-carousel-container");
  carousels.forEach(carousel => setupCarousel(carousel));

  // Configurar clicks en tarjetas de zonas
  const zoneCards = document.querySelectorAll(".zone-card");
  zoneCards.forEach(card => {
    card.addEventListener("click", () => {
      const zona = card.getAttribute("data-zone");
      if (zona) {
        window.location.href = `comprar.html?zona=${encodeURIComponent(zona)}`;
      }
    });
  });

  // Inicializar contador de estadísticas
  initStatsCounter();
}

function initStatsCounter() {
  const statsSection = document.querySelector("#stats-counter-section");
  const counters = document.querySelectorAll(".stat-number");

  if (!statsSection || counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  observer.observe(statsSection);

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000; // 2 segundos de duración
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Función de easing (easeOutQuad)
        const easeProgress = progress * (2 - progress);

        const currentValue = Math.floor(easeProgress * target);

        counter.innerText = currentValue;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      }

      requestAnimationFrame(update);
    });
  }
}


/* ==========================================
   3. PÁGINA DE COMPRAR (BÚSQUEDA Y FILTROS)
   ========================================== */

function initComprarPage() {
  const catalogGrid = document.querySelector("#comprar-catalog");
  const searchInput = document.querySelector("#search-txt");
  const zoneSelect = document.querySelector("#filter-zona");
  const typeSelect = document.querySelector("#filter-tipo");
  const clearBtn = document.querySelector("#btn-clear");

  if (!catalogGrid) return;

  // Cargar filtros desde la URL si existen (ej. cuando vienen del Home de zonas)
  const urlParams = new URLSearchParams(window.location.search);
  const urlZona = urlParams.get("zona");
  const urlTipo = urlParams.get("tipo");

  if (urlZona && zoneSelect) {
    zoneSelect.value = urlZona;
  }
  if (urlTipo && typeSelect) {
    typeSelect.value = urlTipo;
  }

  // Render inicial de todas las propiedades filtradas
  filtrarYRenderizar();

  // Escuchar cambios en los inputs para búsqueda en tiempo real
  if (searchInput) searchInput.addEventListener("input", filtrarYRenderizar);
  if (zoneSelect) zoneSelect.addEventListener("change", filtrarYRenderizar);
  if (typeSelect) typeSelect.addEventListener("change", filtrarYRenderizar);

  // Botón limpiar filtros
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (zoneSelect) zoneSelect.value = "all";
      if (typeSelect) typeSelect.value = "all";
      // Limpiar URL params sin recargar
      window.history.pushState({}, document.title, window.location.pathname);
      filtrarYRenderizar();
    });
  }

  function filtrarYRenderizar() {
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const zoneVal = zoneSelect ? zoneSelect.value : "all";
    const typeVal = typeSelect ? typeSelect.value : "all";

    const propiedadesFiltradas = propiedades.filter(prop => {
      // Filtro de texto (título o dirección)
      const matchesSearch = searchVal === "" ||
        prop.titulo.toLowerCase().includes(searchVal) ||
        prop.direccion.toLowerCase().includes(searchVal);

      // Filtro de Zona
      const matchesZone = zoneVal === "all" || prop.zona.toLowerCase() === zoneVal.toLowerCase();

      // Filtro de Tipo
      const matchesType = typeVal === "all" || prop.tipo.toLowerCase() === typeVal.toLowerCase();

      return matchesSearch && matchesZone && matchesType;
    });

    // Renderizar resultados
    catalogGrid.innerHTML = "";

    if (propiedadesFiltradas.length === 0) {
      catalogGrid.innerHTML = `
        <div class="no-results animate-fade-in">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3>No se encontraron propiedades</h3>
          <p>Prueba ajustando tus parámetros de búsqueda o limpiando los filtros.</p>
        </div>
      `;
      return;
    }

    propiedadesFiltradas.forEach((prop, idx) => {
      const cardHTML = createPropertyCardHTML(prop, idx);
      catalogGrid.insertAdjacentHTML("beforeend", cardHTML);
    });

    // Inicializar carruseles
    const carousels = catalogGrid.querySelectorAll(".property-carousel-container");
    carousels.forEach(carousel => setupCarousel(carousel));
  }
}

/* ==========================================
   4. PÁGINA DE VENDER (FORMULARIO)
   ========================================== */

function initVenderPage() {
  // Inicializar carrusel vertical 3D de asesores
  initVerticalCarousel();

  const sellForm = document.querySelector("#sell-form");
  if (!sellForm) return;

  sellForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores de los campos del formulario
    const nombre = document.querySelector("#vender-nombre").value.trim();
    const telefono = document.querySelector("#vender-tel").value.trim();
    const email = document.querySelector("#vender-email").value.trim();
    const tipo = document.querySelector("#vender-tipo").value;
    const zona = document.querySelector("#vender-zona").value;
    const direccion = document.querySelector("#vender-direccion").value.trim();
    const mensaje = document.querySelector("#vender-mensaje").value.trim();

    if (!nombre || !email || !telefono) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Construir mensaje estructurado para WhatsApp
    const mensajeWhatsApp = `*¡Hola Danny Moya! Quiero registrar mi propiedad para la venta.*\n\n` +
      `📋 *Datos de Contacto:*\n` +
      `• *Nombre:* ${nombre}\n` +
      `• *Teléfono:* ${telefono}\n` +
      `• *Email:* ${email}\n\n` +
      `🏠 *Detalles de la Propiedad:*\n` +
      `• *Tipo:* ${tipo}\n` +
      `• *Zona:* ${zona}\n` +
      `• *Dirección:* ${direccion || "No especificada"}\n` +
      `• *Detalles:* ${mensaje || "Sin detalles adicionales"}`;

    const numeroWhatsApp = "59164943836";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    // Abrir WhatsApp con los datos del formulario cargados
    window.open(urlWhatsApp, "_blank");
    sellForm.reset();
  });
}

/* ==========================================
   4.1 CARRUSEL VERTICAL 3D (COVERFLOW)
   ========================================== */

function initVerticalCarousel() {
  const stage = document.querySelector("#v-carousel-stage");
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll(".v-card"));
  const prevBtn = document.querySelector("#v-prev-btn");
  const nextBtn = document.querySelector("#v-next-btn");
  const dotsContainer = document.querySelector("#v-carousel-dots");

  if (cards.length === 0) return;

  // Índice activo inicial (1 = Simon Hadley para coincidir con la imagen de referencia)
  let currentIndex = 1;
  const totalCards = cards.length;

  // Generar puntos de paginación (dots)
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    cards.forEach((_, idx) => {
      const dot = document.createElement("span");
      dot.className = `v-dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute("data-index", idx);
      dot.addEventListener("click", () => {
        currentIndex = idx;
        update3DCarousel();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Actualizar posiciones y transformaciones 3D
  function update3DCarousel() {
    cards.forEach((card, idx) => {
      card.classList.remove("active", "prev", "next", "hidden-left", "hidden-right");

      // Calcular offset considerando loop circular
      let offset = idx - currentIndex;
      if (offset > totalCards / 2) offset -= totalCards;
      if (offset < -totalCards / 2) offset += totalCards;

      if (offset === 0) {
        card.classList.add("active");
      } else if (offset === -1) {
        card.classList.add("prev");
      } else if (offset === 1) {
        card.classList.add("next");
      } else if (offset < -1) {
        card.classList.add("hidden-left");
      } else if (offset > 1) {
        card.classList.add("hidden-right");
      }
    });

    // Actualizar estado de dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".v-dot");
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }

  // Clic en tarjetas adyacentes para ponerlas en el centro
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      if (idx !== currentIndex) {
        currentIndex = idx;
        update3DCarousel();
        resetAutoplay();
      }
    });
  });

  // Botón Siguiente
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % totalCards;
      update3DCarousel();
      resetAutoplay();
    });
  }

  // Botón Anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      update3DCarousel();
      resetAutoplay();
    });
  }

  // Gestos Táctiles Swipe (para celulares y tablets)
  let startX = 0;
  let startY = 0;

  stage.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  stage.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Solo si el deslizamiento es más horizontal que vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swipe Izquierda -> Siguiente
        currentIndex = (currentIndex + 1) % totalCards;
      } else {
        // Swipe Derecha -> Anterior
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      }
      update3DCarousel();
      resetAutoplay();
    }
  }, { passive: true });

  // Transición automática suave opcional (Autoplay)
  let autoplayTimer = null;

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      update3DCarousel();
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausar al pasar el mouse por encima
  const wrapper = document.querySelector(".v-carousel-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", startAutoplay);
  }

  // Render inicial
  update3DCarousel();
  startAutoplay();
}


/* ==========================================
   5. PÁGINA DE DETALLE DE PROPIEDAD
   ========================================== */

function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const idStr = urlParams.get("id");
  const id = parseInt(idStr, 10);

  if (!idStr || isNaN(id)) {
    window.location.href = "comprar.html";
    return;
  }

  // Buscar propiedad en base de datos
  const prop = propiedades.find(p => p.id === id);

  if (!prop) {
    window.location.href = "comprar.html";
    return;
  }

  // Renderizar contenido dinámico
  const pageTitle = document.querySelector("title");
  if (pageTitle) pageTitle.innerText = `${prop.titulo} | Inmobiliaria Danny Moya`;

  // Renderizar Carrusel Principal
  const carouselTrack = document.querySelector("#detail-carousel-track");
  const indicators = document.querySelector("#detail-carousel-indicators");

  if (carouselTrack) {
    carouselTrack.innerHTML = "";
    if (indicators) indicators.innerHTML = "";

    prop.imagenes.forEach((imgUrl, idx) => {
      // Slides
      const slideHTML = `
        <div class="detail-carousel-slide">
          <img src="${imgUrl}" alt="${prop.titulo} - Imagen ${idx + 1}">
        </div>
      `;
      carouselTrack.insertAdjacentHTML("beforeend", slideHTML);

      // Dots
      if (indicators) {
        const dotHTML = `<span class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`;
        indicators.insertAdjacentHTML("beforeend", dotHTML);
      }
    });

    // Configurar carrusel de detalle
    setupCarousel(document.querySelector(".detail-carousel-container"));
  }

  // Renderizar etiquetas de estado y tipo
  const tagsContainer = document.querySelector("#detail-tags");
  if (tagsContainer) {
    const estadoTxt = prop.estado === "disponible" ? "Disponible" : "Vendido";
    const estadoClass = prop.estado === "disponible" ? "available" : "sold";
    tagsContainer.innerHTML = `
      <span class="tag-status ${estadoClass}">${estadoTxt}</span>
      <span class="tag-type">${prop.tipo}</span>
    `;
  }

  const zoneTag = document.querySelector("#detail-zone");
  if (zoneTag) {
    zoneTag.innerText = prop.zona;
  }

  // Datos principales
  const propTitle = document.querySelector("#detail-title");
  if (propTitle) propTitle.innerText = prop.titulo;

  const propAddress = document.querySelector("#detail-address");
  if (propAddress) {
    propAddress.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      ${prop.direccion}, ${prop.zona}
    `;
  }

  // Características
  const featSize = document.querySelector("#feat-size");
  if (featSize) featSize.innerText = `${prop.tamano} m²`;

  const featDorm = document.querySelector("#feat-dorm");
  if (featDorm) {
    if (prop.tipo === "Terreno") {
      // Ocultar o cambiar dormitorios para terrenos
      document.querySelector("#feat-card-dorm").style.display = "none";
    } else {
      featDorm.innerText = prop.dormitorios;
    }
  }

  const featBath = document.querySelector("#feat-bath");
  if (featBath) {
    if (prop.tipo === "Terreno") {
      document.querySelector("#feat-card-bath").style.display = "none";
    } else {
      featBath.innerText = prop.banos;
    }
  }

  // Descripción
  const propDesc = document.querySelector("#detail-desc");
  if (propDesc) propDesc.innerText = prop.descripcion;

  // Google Maps Iframe
  const mapContainer = document.querySelector("#map-iframe-container");
  if (mapContainer && prop.mapUrl) {
    mapContainer.innerHTML = `
      <iframe src="${prop.mapUrl}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;
  }

  // Formulario de Contacto Lateral
  const detailForm = document.querySelector("#detail-sidebar-form");
  if (detailForm) {
    detailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.querySelector("#detail-form-name").value;
      const tel = document.querySelector("#detail-form-tel").value;

      if (!nombre || !tel) {
        alert("Por favor, introduce tu nombre y teléfono.");
        return;
      }

      alert(`Gracias, ${nombre}. Danny Moya se contactará contigo al ${tel} con información detallada de la propiedad: "${prop.titulo}".`);
      detailForm.reset();
    });
  }

  // WhatsApp Button Dinámico
  const waBtn = document.querySelector("#detail-wa-btn");
  if (waBtn) {
    const textMsg = encodeURIComponent(`Hola Danny Moya, estoy interesado en la propiedad "${prop.titulo}" (${prop.tipo}) ubicada en ${prop.zona}. Quisiera agendar una visita.`);
    waBtn.setAttribute("href", `https://wa.me/59164943836?text=${textMsg}`);
  }
}

/* ==========================================
   6. FUNCIONES AUXILIARES
   ========================================== */

// Helper para crear el HTML de la tarjeta de propiedad
function createPropertyCardHTML(prop, index) {
  const estadoTxt = prop.estado === "disponible" ? "Disponible" : "Vendido";
  const estadoClass = prop.estado === "disponible" ? "available" : "sold";
  const isTerreno = prop.tipo === "Terreno";

  // Generar HTML de imágenes para el carrusel (máx 3)
  let slidesHTML = "";
  let dotsHTML = "";

  prop.imagenes.forEach((imgUrl, idx) => {
    slidesHTML += `
      <div class="property-carousel-slide">
        <img src="${imgUrl}" alt="${prop.titulo} - Imagen ${idx + 1}" loading="lazy">
      </div>
    `;
    dotsHTML += `
      <span class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
    `;
  });

  // Características específicas
  const featuresHTML = isTerreno
    ? `
      <div class="feature-item">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
        </svg>
        <span class="feature-item-val">${prop.tamano} m²</span>
        <span>Área total</span>
      </div>
      <div class="feature-item">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span class="feature-item-val">Listo</span>
        <span>Para edificar</span>
      </div>
    `
    : `
      <div class="feature-item">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span class="feature-item-val">${prop.tamano} m²</span>
        <span>Tamaño</span>
      </div>
      <div class="feature-item">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 4v16M22 4v16M2 8h20M2 16h20"></path>
          <rect x="6" y="10" width="12" height="4" rx="1"></rect>
        </svg>
        <span class="feature-item-val">${prop.dormitorios}</span>
        <span>Dorm.</span>
      </div>
      <div class="feature-item">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16v16H4zM4 10h16M10 4v16"></path>
        </svg>
        <span class="feature-item-val">${prop.banos}</span>
        <span>Baños</span>
      </div>
    `;

  return `
    <div class="property-card animate-fade-in-up animate-show-scroll" style="animation-delay: ${index * 100}ms">
      <!-- Carrusel -->
      <div class="property-carousel-container">
        <div class="property-tags">
          <span class="tag-status ${estadoClass}">${estadoTxt}</span>
          <span class="tag-type">${prop.tipo}</span>
        </div>
        <span class="tag-zone">${prop.zona}</span>
        
        <div class="property-carousel-track">
          ${slidesHTML}
        </div>
        
        <div class="carousel-btn carousel-btn-prev">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
        <div class="carousel-btn carousel-btn-next">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
        
        <div class="carousel-indicators">
          ${dotsHTML}
        </div>
      </div>
      
      <!-- Contenido de Info -->
      <div class="property-info">
        <h3 class="property-title">${prop.titulo}</h3>
        <div class="property-address">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${prop.direccion}</span>
        </div>
        
        <div class="property-features">
          ${featuresHTML}
        </div>
      </div>
      
      <!-- Acción -->
      <div class="property-action">
        <a href="detalle.html?id=${prop.id}" class="btn-card">
          <span>Ver Información Completa</span>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  `;
}

// Configuración general de carruseles interactivos de 3 imágenes
function setupCarousel(carouselContainer) {
  if (!carouselContainer) return;

  const track = carouselContainer.querySelector(".property-carousel-track, .detail-carousel-track");
  const prevBtn = carouselContainer.querySelector(".carousel-btn-prev");
  const nextBtn = carouselContainer.querySelector(".carousel-btn-next");
  const dots = carouselContainer.querySelectorAll(".carousel-indicators .carousel-dot");

  if (!track) return;

  let currentIndex = 0;
  const totalSlides = track.children.length;

  if (totalSlides <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    return;
  }

  function updateCarousel() {
    // Desplazar el track segun el index
    const offsetPercentage = - (currentIndex * 100) / totalSlides;
    track.style.transform = `translateX(${offsetPercentage}%)`;

    // Actualizar dots activos
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Escuchar botones next/prev
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });
  }

  // Escuchar clicks en dots
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
      currentIndex = targetIndex;
      updateCarousel();
    });
  });

  // Permitir gestos swipe para móviles (opcional y premium)
  let startX = 0;
  let endX = 0;

  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carouselContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50; // min px to count as swipe
    if (startX - endX > threshold) {
      // Swipe izquierda -> Siguiente
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    } else if (endX - startX > threshold) {
      // Swipe derecha -> Anterior
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
  }
}
