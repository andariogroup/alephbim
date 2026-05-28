document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Transform hamburger to X (optional enhancement)
            const bars = mobileMenu.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (fade-in)
    const faders = document.querySelectorAll('.beneficio-card, .feature-box, .servicio-item, .servicios-image, .section-header');
    
    // Add fade-in base class
    faders.forEach(el => el.classList.add('fade-in'));

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Manual Scrolling for Projects
    const projectsContainer = document.getElementById('projects-container');
    const scrollPrev = document.getElementById('scroll-prev');
    const scrollNext = document.getElementById('scroll-next');

    if (projectsContainer && scrollPrev && scrollNext) {
        const scrollAmount = 382; // card width (350) + gap (32)
        
        scrollPrev.addEventListener('click', () => {
            projectsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollNext.addEventListener('click', () => {
            projectsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Modal Cotización Logic
    const btnCotizacion = document.getElementById('btn-cotizacion');
    const modalCotizacion = document.getElementById('modal-cotizacion');
    const closeModal = document.querySelector('.close-modal');

    if (btnCotizacion && modalCotizacion) {
        btnCotizacion.addEventListener('click', () => {
            modalCotizacion.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    if (closeModal && modalCotizacion) {
        closeModal.addEventListener('click', () => {
            modalCotizacion.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    if (modalCotizacion) {
        window.addEventListener('click', (e) => {
            if (e.target === modalCotizacion) {
                modalCotizacion.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Handle form submission
        const formCotizacion = document.getElementById('form-cotizacion');
        if (formCotizacion) {
            formCotizacion.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
                const telefono = document.getElementById('telefono').value;
                const pais = document.getElementById('pais').value;
                const ciudad = document.getElementById('ciudad').value;
                const servicioSelect = document.getElementById('servicio');
                const servicio = servicioSelect.options[servicioSelect.selectedIndex].text;
                const mensaje = document.getElementById('mensaje').value;

                const subject = encodeURIComponent(`Nueva Solicitud de Cotización - ${servicio}`);
                const body = encodeURIComponent(`Nombre / Empresa: ${nombre}\nCorreo Electrónico: ${email}\nTeléfono: ${telefono}\nPaís: ${pais}\nCiudad: ${ciudad}\nServicio de Interés: ${servicio}\n\nDetalles del Proyecto:\n${mensaje}`);
                
                window.location.href = `mailto:alephbim@gmail.com?subject=${subject}&body=${body}`;

                alert('¡Gracias por tu solicitud! Se abrirá tu cliente de correo para enviar la información.');
                modalCotizacion.classList.remove('show');
                document.body.style.overflow = '';
                formCotizacion.reset();
            });
        }
    }

    // Modal Servicio Logic
    const modalServicio = document.getElementById('modal-servicio');
    const closeBtnsServicio = document.querySelectorAll('.close-modal-servicio, .close-modal-btn');
    const clickableServices = document.querySelectorAll('.clickable-service');
    let activeServiceCard = null;
    
    if (modalServicio) {
        clickableServices.forEach(card => {
            card.addEventListener('click', () => {
                activeServiceCard = card;
                const title = card.getAttribute('data-title');
                const desc = card.getAttribute('data-desc');
                const iconHTML = card.querySelector('.servicio-icon').innerHTML;
                
                document.getElementById('modal-servicio-title').innerText = title;
                document.getElementById('modal-servicio-desc').innerHTML = desc;
                document.getElementById('modal-servicio-icon').innerHTML = iconHTML;
                
                modalServicio.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtnsServicio.forEach(btn => {
            btn.addEventListener('click', () => {
                modalServicio.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === modalServicio) {
                modalServicio.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Language Toggle Logic
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'es';

    const translations = {
        es: {
            "nav-nos": "Nosotros",
            "nav-serv": "Servicios",
            "nav-proy": "Proyectos",
            "nav-cli": "Clientes",
            "nav-cont": "Contacto",
            "btn-cot": "Solicitar Cotización",
            "hero-title": "LA INTEGRACIÓN TOTAL DEL PROYECTO, EN UN SOLO MODELO",
            "hero-sub": "Integramos arquitectura, estructuras e instalaciones en un solo modelo digital",
            "btn-serv": "Descubre nuestros Servicios",
            "btn-proy": "Ver Proyectos",
            "btn-cli": "Nuestros Clientes",
            "nos-title": "Sobre <span class=\"highlight-primary\">Nosotros</span>",
            "nos-desc1": "AlephBIM es una consultora de ingeniería civil especializada en la implementación de la metodología BIM (Building Information Modeling). Nacemos con el propósito de transformar la manera en que se planifica, diseña y construye en Colombia, llevando la digitalización de proyectos a constructoras, promotores inmobiliarios y entidades públicas de todo el país.",
            "nos-desc2": "Nuestro equipo está conformado por profesionales en el área y especialistas BIM comprometidos con la excelencia técnica, la innovación y la entrega de resultados medibles para cada proyecto. Creemos que la tecnología BIM no es un lujo — es la herramienta que reduce costos, elimina errores y garantiza obras de calidad.",
            "nos-cert-title": "Acreditaciones Internacionales",
            "ben-title": "Beneficios de la Implementación BIM",
            "ben-desc": "BIM centraliza toda la información en un modelo digital inteligente, eliminando los errores y sobrecostos de la construcción tradicional.",
            "ben1-title": "Eficiencia y Reducción de Costos",
            "ben1-desc": "Reduce hasta un 30% los costos y optimiza los tiempos de ejecución detectando conflictos antes de la obra.",
            "ben2-title": "Mejor Coordinación",
            "ben2-desc": "Colaboración integrada en tiempo real entre todas las disciplinas, evitando errores de comunicación y retrabajos.",
            "ben3-title": "Mayor ROI",
            "ben3-desc": "Impulsa decisiones claras y reduce cambios tardíos, acelerando el avance y maximizando el retorno de inversión.",
            "serv-title": "Nuestros <span class=\"highlight-accent\">Servicios</span>",
            "serv-sub": "Especialistas en diseño coordinado y soluciones integrales BIM.",
            "btn-brochure": "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line></svg> Descargar Brochure",
            "serv1-title": "Especialidades de diseño integrado con Metodología BIM",
            "serv1-desc": "Integramos arquitectura, estructuras e instalaciones mediante metodología BIM para lograr un diseño eficiente, coordinado y libre de interferencias desde las etapas tempranas del proyecto, optimizando la toma de decisiones.<br><br><strong>Especialidades incluidas:</strong><div class='specialties-grid'><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M9 7h6M9 11h6'/></svg><span>Diseño arquitectónico</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/></svg><span>Diseño estructural</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'/></svg><span>Diseño hidrosanitario</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg><span>Diseño eléctrico</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M17.5 19c-1.5 1.5-3.5 2-5.5 2s-4-0.5-5.5-2c-2.5-2.5-2-6.5-1-8.5C6 9 8 7.5 9.5 5.5c1.5-2 1.5-4.5 1.5-4.5s1 2.5 3 4.5C15.5 7.5 17 9 18 10.5C19 12.5 19.5 16.5 17.5 19z'/></svg><span>Redes contraincendio</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 18L12 22 21 18M3 14L12 18 21 14M12 2L3 6 12 10 21 6z'/></svg><span>Diseño vial y geom.</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='3' y='14' width='18' height='4' rx='1'/><rect x='3' y='8' width='18' height='4' rx='1'/><path d='M3 20h18'/></svg><span>Diseño de pavimentos</span></div></div>",
            "serv2-title": "Implementación BIM a proyectos existentes - Del 2D al BIM",
            "serv2-desc": "Llevamos tus proyectos actuales desde planos tradicionales en 2D a modelos 3D inteligentes, enriquecidos con información paramétrica, facilitando la visualización, cuantificación y gestión integral de la obra.",
            "serv3-title": "Coordinación y control de obra BIM",
            "serv3-desc": "Supervisamos y controlamos la ejecución de la obra utilizando modelos BIM actualizados, optimizando la logística, detectando conflictos en campo, reduciendo sobrecostos y asegurando la calidad constructiva según lo diseñado.",
            "serv4-title": "Construcción eficiente",
            "serv4-desc": "Aplicamos herramientas y flujos de trabajo BIM avanzados para planificar las fases constructivas (4D) y estimar costos con precisión (5D), logrando una ejecución de obra más ágil, transparente y con menor desperdicio de recursos.",
            "preview-text": "Ver detalles...",
            "proy-title": "Nuestros <span class=\"highlight-primary\">Proyectos</span>",
            "proy-sub": "Conoce algunas de nuestras obras más destacadas.",
            "proy1-title": "Casa Campo El Encanto",
            "proy1-desc": "Diseño Integrado BIM - Diseño Hidrosanitario",
            "proy2-title": "Proyecto 2",
            "proy2-desc": "Descripción pendiente",
            "proy3-title": "Proyecto 3",
            "proy3-desc": "Descripción pendiente",
            "cli-title": "Nuestros <span class=\"highlight-accent\">Clientes</span>",
            "cli-sub": "Empresas que confían en nosotros.",
            "cta-title": "¿Listo para elevar tu próximo proyecto?",
            "cta-sub": "Asóciate con ALEPHBIM para obtener precisión y experiencia estructural sin igual.",
            "cta-btn": "Contacta a nuestros Expertos",
            "foot-desc": "Potenciando la construcción a través de soluciones BIM de precisión.",
            "foot-links": "Enlaces Rápidos",
            "foot-cont": "Contacto",
            "foot-copy": "&copy; 2026 ALEPHBIM. Todos los derechos reservados.",
            "mod-cot-title": "Solicitar <span class=\"highlight-accent\">Cotización</span>",
            "mod-cot-sub": "Déjanos tus datos y te contactaremos para cotizar tu proyecto.",
            "mod-cot-name": "Nombre / Empresa",
            "mod-cot-email": "Correo Electrónico",
            "mod-cot-serv": "Servicio de interés",
            "mod-cot-det": "Detalles del Proyecto",
            "mod-cot-btn": "Enviar Solicitud",
            "mod-serv-close": "Cerrar",
            "drop-serv1": "Diseño Integrado BIM <span class=\"arrow-right\">▸</span>",
            "drop-spec1": "Diseño arquitectónico",
            "drop-spec2": "Diseño estructural",
            "drop-spec3": "Diseño hidrosanitario",
            "drop-spec4": "Diseño eléctrico",
            "drop-spec5": "Diseño de redes contraincendio",
            "drop-spec6": "Diseño vial y geométrico",
            "drop-spec7": "Diseño de pavimentos",
            "drop-serv2": "Implementación 2D a BIM",
            "drop-serv3": "Coordinación de Obra",
            "drop-serv4": "Construcción Eficiente",
            "opt-sel": "Selecciona un servicio...",
            "opt-serv1": "Diseño Integrado BIM",
            "opt-serv2": "Implementación 2D a BIM",
            "opt-serv3": "Coordinación de Obra",
            "opt-serv4": "Construcción Eficiente"
        },
        en: {
            "nav-nos": "About Us",
            "nav-serv": "Services",
            "nav-proy": "Projects",
            "nav-cli": "Clients",
            "nav-cont": "Contact",
            "btn-cot": "Request a Quote",
            "hero-title": "TOTAL PROJECT INTEGRATION, IN A SINGLE MODEL",
            "hero-sub": "We integrate architecture, structures, and MEP in a single digital model",
            "btn-serv": "Discover our Services",
            "btn-proy": "View Projects",
            "btn-cli": "Our Clients",
            "nos-title": "About <span class=\"highlight-primary\">Us</span>",
            "nos-desc1": "AlephBIM is a civil engineering consultancy specializing in the implementation of BIM (Building Information Modeling) methodology. We were born with the purpose of transforming the way planning, design, and construction are done in Colombia, bringing project digitalization to construction companies, real estate developers, and public entities nationwide.",
            "nos-desc2": "Our team is made up of area professionals and BIM specialists committed to technical excellence, innovation, and delivering measurable results for each project. We believe that BIM technology is not a luxury — it is the tool that reduces costs, eliminates errors, and guarantees quality construction.",
            "nos-cert-title": "International Accreditations",
            "ben-title": "Benefits of BIM Implementation",
            "ben-desc": "BIM centralizes all information into an intelligent digital model, eliminating the errors and cost overruns of traditional construction.",
            "ben1-title": "Efficiency and Cost Reduction",
            "ben1-desc": "Reduces costs by up to 30% and optimizes execution times by detecting clashes before construction.",
            "ben2-title": "Better Coordination",
            "ben2-desc": "Integrated, real-time collaboration across all disciplines, preventing miscommunication and rework.",
            "ben3-title": "Higher ROI",
            "ben3-desc": "Drives clear decisions and reduces late changes, accelerating progress and maximizing return on investment.",
            "serv-title": "Our <span class=\"highlight-accent\">Services</span>",
            "serv-sub": "Specialists in coordinated design and comprehensive BIM solutions.",
            "btn-brochure": "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line></svg> Download Brochure",
            "serv1-title": "Integrated Design Specialties with BIM Methodology",
            "serv1-desc": "We integrate architecture, structures, and MEP using BIM methodology to achieve an efficient, coordinated, and clash-free design from the early stages of the project, optimizing decision-making.<br><br><strong>Specialties included:</strong><div class='specialties-grid'><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M9 7h6M9 11h6'/></svg><span>Architectural design</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/></svg><span>Structural design</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'/></svg><span>Plumbing design</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg><span>Electrical design</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M17.5 19c-1.5 1.5-3.5 2-5.5 2s-4-0.5-5.5-2c-2.5-2.5-2-6.5-1-8.5C6 9 8 7.5 9.5 5.5c1.5-2 1.5-4.5 1.5-4.5s1 2.5 3 4.5C15.5 7.5 17 9 18 10.5C19 12.5 19.5 16.5 17.5 19z'/></svg><span>Fire protection design</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 18L12 22 21 18M3 14L12 18 21 14M12 2L3 6 12 10 21 6z'/></svg><span>Roadway & geometric</span></div><div class='spec-item'><svg class='spec-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='3' y='14' width='18' height='4' rx='1'/><rect x='3' y='8' width='18' height='4' rx='1'/><path d='M3 20h18'/></svg><span>Pavement design</span></div></div>",
            "serv2-title": "BIM Implementation for Existing Projects - From 2D to BIM",
            "serv2-desc": "We take your current projects from traditional 2D plans to intelligent 3D models, enriched with parametric information, facilitating visualization, quantification, and integral project management.",
            "serv3-title": "BIM Construction Coordination and Control",
            "serv3-desc": "We supervise and control the execution of the project using updated BIM models, optimizing logistics, detecting conflicts in the field, reducing cost overruns, and ensuring construction quality as designed.",
            "serv4-title": "Efficient Construction",
            "serv4-desc": "We apply advanced BIM tools and workflows to plan construction phases (4D) and accurately estimate costs (5D), achieving a more agile, transparent construction execution with less resource waste.",
            "preview-text": "View details...",
            "proy-title": "Our <span class=\"highlight-primary\">Projects</span>",
            "proy-sub": "Discover some of our most outstanding works.",
            "proy1-title": "El Encanto Country House",
            "proy1-desc": "Integrated BIM Design - Plumbing Design",
            "proy2-title": "Project 2",
            "proy2-desc": "Description pending",
            "proy3-title": "Project 3",
            "proy3-desc": "Description pending",
            "cli-title": "Our <span class=\"highlight-accent\">Clients</span>",
            "cli-sub": "Companies that trust us.",
            "cta-title": "Ready to elevate your next project?",
            "cta-sub": "Partner with ALEPHBIM for unparalleled precision and structural expertise.",
            "cta-btn": "Contact our Experts",
            "foot-desc": "Empowering construction through precision BIM solutions.",
            "foot-links": "Quick Links",
            "foot-cont": "Contact",
            "foot-copy": "&copy; 2026 ALEPHBIM. All rights reserved.",
            "mod-cot-title": "Request a <span class=\"highlight-accent\">Quote</span>",
            "mod-cot-sub": "Leave us your details and we will contact you to quote your project.",
            "mod-cot-name": "Name / Company",
            "mod-cot-email": "Email",
            "mod-cot-serv": "Service of interest",
            "mod-cot-det": "Project Details",
            "mod-cot-btn": "Send Request",
            "mod-serv-close": "Close",
            "drop-serv1": "Integrated BIM Design <span class=\"arrow-right\">▸</span>",
            "drop-spec1": "Architectural design",
            "drop-spec2": "Structural design",
            "drop-spec3": "Plumbing design",
            "drop-spec4": "Electrical design",
            "drop-spec5": "Fire protection design",
            "drop-spec6": "Roadway & geometric design",
            "drop-spec7": "Pavement design",
            "drop-serv2": "2D to BIM Implementation",
            "drop-serv3": "Construction Coordination",
            "drop-serv4": "Efficient Construction",
            "opt-sel": "Select a service...",
            "opt-serv1": "Integrated BIM Design",
            "opt-serv2": "2D to BIM Implementation",
            "opt-serv3": "Construction Coordination",
            "opt-serv4": "Efficient Construction"
        }
    };

    const elementsToTranslate = {
        "nav-nos": document.querySelector('.nav-links a[href="#nosotros"]'),
        "nav-serv": document.querySelector('.nav-links a[href="#servicios"]'),
        "nav-proy": document.querySelector('.nav-links a[href="#proyectos"]'),
        "nav-cli": document.querySelector('.nav-links a[href="#clientes"]'),
        "nav-cont": document.querySelector('.nav-links a[href="#contacto"]'),
        "btn-cot": document.getElementById('btn-cotizacion'),
        "hero-title": document.querySelector('.hero-content h1'),
        "hero-sub": document.querySelector('.hero-content p'),
        "btn-serv": document.querySelector('.hero-buttons a[href="#servicios"]'),
        "btn-proy": document.querySelector('.hero-buttons a[href="#proyectos"]'),
        "btn-cli": document.querySelector('.hero-buttons a[href="#clientes"]'),
        "nos-title": document.getElementById('nos-title'),
        "nos-desc1": document.getElementById('nos-desc1'),
        "nos-desc2": document.getElementById('nos-desc2'),
        "nos-cert-title": document.getElementById('nos-cert-title'),
        "ben-title": document.getElementById('ben-title'),
        "ben-desc": document.getElementById('ben-desc'),
        "ben1-title": document.getElementById('ben1-title'),
        "ben1-desc": document.getElementById('ben1-desc'),
        "ben2-title": document.getElementById('ben2-title'),
        "ben2-desc": document.getElementById('ben2-desc'),
        "ben3-title": document.getElementById('ben3-title'),
        "ben3-desc": document.getElementById('ben3-desc'),
        "serv-title": document.querySelector('#servicios .section-header h2'),
        "serv-sub": document.querySelector('#servicios .section-header p'),
        "btn-brochure": document.getElementById('btn-brochure'),
        "serv1-title": document.querySelectorAll('.clickable-service')[0]?.querySelector('h4'),
        "serv2-title": document.querySelectorAll('.clickable-service')[1]?.querySelector('h4'),
        "serv3-title": document.querySelectorAll('.clickable-service')[2]?.querySelector('h4'),
        "serv4-title": document.querySelectorAll('.clickable-service')[3]?.querySelector('h4'),
        "proy-title": document.querySelector('#proyectos h2'),
        "proy-sub": document.querySelector('#proyectos .section-subtitle'),
        "proy1-title": document.getElementById('proy1-title'),
        "proy1-desc": document.getElementById('proy1-desc'),
        "proy2-title": document.getElementById('proy2-title'),
        "proy2-desc": document.getElementById('proy2-desc'),
        "proy3-title": document.getElementById('proy3-title'),
        "proy3-desc": document.getElementById('proy3-desc'),
        "cli-title": document.querySelector('#clientes h2'),
        "cli-sub": document.querySelector('#clientes .section-subtitle'),
        "cta-title": document.querySelector('#contacto h2'),
        "cta-sub": document.querySelector('#contacto p'),
        "cta-btn": document.querySelector('#contacto .btn-primary'),
        "foot-desc": document.querySelector('.footer-brand p'),
        "foot-links": document.querySelector('.footer-links h4'),
        "foot-cont": document.querySelector('.footer-contact h4'),
        "foot-copy": document.querySelector('.footer-bottom p'),
        "mod-cot-title": document.querySelector('#modal-cotizacion h2'),
        "mod-cot-sub": document.querySelector('#modal-cotizacion p'),
        "mod-cot-name": document.querySelector('label[for="nombre"]'),
        "mod-cot-email": document.querySelector('label[for="email"]'),
        "mod-cot-serv": document.querySelector('label[for="servicio"]'),
        "mod-cot-det": document.querySelector('label[for="mensaje"]'),
        "mod-cot-btn": document.querySelector('#form-cotizacion .btn-accent'),
        "mod-serv-close": document.querySelector('#modal-servicio .close-modal-btn'),
        "drop-serv1": document.getElementById('drop-serv1'),
        "drop-spec1": document.getElementById('drop-spec1'),
        "drop-spec2": document.getElementById('drop-spec2'),
        "drop-spec3": document.getElementById('drop-spec3'),
        "drop-spec4": document.getElementById('drop-spec4'),
        "drop-spec5": document.getElementById('drop-spec5'),
        "drop-spec6": document.getElementById('drop-spec6'),
        "drop-spec7": document.getElementById('drop-spec7'),
        "drop-serv2": document.getElementById('drop-serv2'),
        "drop-serv3": document.getElementById('drop-serv3'),
        "drop-serv4": document.getElementById('drop-serv4'),
        "opt-sel": document.getElementById('opt-sel'),
        "opt-serv1": document.getElementById('opt-serv1'),
        "opt-serv2": document.getElementById('opt-serv2'),
        "opt-serv3": document.getElementById('opt-serv3'),
        "opt-serv4": document.getElementById('opt-serv4')
    };

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            langToggle.innerText = currentLang === 'es' ? '🇺🇸 EN' : '🇲🇽 ES';
            
            // Update static elements
            for (const key in elementsToTranslate) {
                if (elementsToTranslate[key] && translations[currentLang][key]) {
                    elementsToTranslate[key].innerHTML = translations[currentLang][key];
                }
            }

            // Update service preview texts
            document.querySelectorAll('.service-preview').forEach(el => {
                el.innerText = translations[currentLang]["preview-text"];
            });

            // Update data attributes for the modal
            const services = document.querySelectorAll('.clickable-service');
            if (services.length === 4) {
                services[0].setAttribute('data-title', translations[currentLang]["serv1-title"]);
                services[0].setAttribute('data-desc', translations[currentLang]["serv1-desc"]);
                services[1].setAttribute('data-title', translations[currentLang]["serv2-title"]);
                services[1].setAttribute('data-desc', translations[currentLang]["serv2-desc"]);
                services[2].setAttribute('data-title', translations[currentLang]["serv3-title"]);
                services[2].setAttribute('data-desc', translations[currentLang]["serv3-desc"]);
                services[3].setAttribute('data-title', translations[currentLang]["serv4-title"]);
                services[3].setAttribute('data-desc', translations[currentLang]["serv4-desc"]);
            }

            if (modalServicio && modalServicio.classList.contains('show') && activeServiceCard) {
                document.getElementById('modal-servicio-title').innerHTML = activeServiceCard.getAttribute('data-title');
                document.getElementById('modal-servicio-desc').innerHTML = activeServiceCard.getAttribute('data-desc');
            }
        });
    }
});
