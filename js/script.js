document.addEventListener('DOMContentLoaded', () => {
  // Page Loader
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }, 500); // Small delay to ensure smooth transition
  });

  // Scroll Progress Bar
  const scrollProgress = document.getElementById('scroll-progress');
  
  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    // Progress Bar
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
    
    // Navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Section Gold Divider Observer
  const sectionElements = document.querySelectorAll('.section-padding');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('divider-visible');
      }
    });
  }, { threshold: 0.3 });
  sectionElements.forEach(el => dividerObserver.observe(el));

  // Section Header H2 Underline Observer
  const sectionH2s = document.querySelectorAll('.section-header h2');
  const h2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('underline-visible');
      }
    });
  }, { threshold: 0.5 });
  sectionH2s.forEach(el => h2Observer.observe(el));

  // WhatsApp Form Integration
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('wa-name').value;
      const product = document.getElementById('wa-product').value;
      const message = document.getElementById('wa-message').value;
      
      // Format the message for WhatsApp
      const whatsappText = `Hello Sreelakshmi Mills,%0A%0A*Name:* ${name}%0A*Interested In:* ${product}%0A*Message:* ${message}`;
      
      // Phone number
      const phone = "919846760709";
      
      // Open WhatsApp
      window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
    });
  }

  // Staggered reveals for product cards
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card, index) => {
    card.style.transitionDelay = `${(index % 3) * 0.15}s`;
  });

  // Premium Headline Split Text Animation
  const headline = document.querySelector('.hero-content h1');
  if (headline) {
    const line1 = "Premium Rice & Flour Mill".split(' ');
    const line2 = "Defined by Quality".split(' ');
    
    headline.innerHTML = '';
    
    let charIndex = 0;

    const appendWord = (word, parent) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      
      word.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        span.style.animationDelay = `${1.3 + (charIndex * 0.035)}s`;
        wordSpan.appendChild(span);
        charIndex++;
      });
      parent.appendChild(wordSpan);
      parent.appendChild(document.createTextNode(' '));
    };

    line1.forEach(word => appendWord(word, headline));
    
    headline.appendChild(document.createElement('br'));
    
    const iTag = document.createElement('i');
    line2.forEach(word => appendWord(word, iTag));
    headline.appendChild(iTag);
  }


  // Cinematic Background Scene System (IntersectionObserver)
  const cinematicBgContainer = document.getElementById('cinematic-bg-container');
  const cinematicFrames = document.querySelectorAll('.cinematic-frame');
  const sections = document.querySelectorAll('section[data-scene]');
  
  if (cinematicFrames.length > 0 && sections.length > 0) {
    const totalFrames = cinematicFrames.length;
    let activeSceneIndex = 0;
    
    // Lazy load logic for frames
    const loadFrame = (frame) => {
      if (frame.tagName === 'IMG' && frame.dataset.src && !frame.src) {
        frame.src = frame.dataset.src;
      } else if (frame.tagName === 'DIV') {
        const imgs = frame.querySelectorAll('img');
        imgs.forEach(img => {
          if (img.dataset.src && !img.src) img.src = img.dataset.src;
        });
      }
    };
    
    // Initial load
    loadFrame(cinematicFrames[0]);
    if (totalFrames > 1) loadFrame(cinematicFrames[1]);

    // IntersectionObserver to detect which section is in view
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px', // Trigger when section is in middle of viewport
      threshold: 0.1
    };

    const sceneObserver = new IntersectionObserver((entries) => {
      let maxIntersection = 0;
      let newSceneIndex = activeSceneIndex;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersection) {
          maxIntersection = entry.intersectionRatio;
          const sceneVal = parseInt(entry.target.getAttribute('data-scene'));
          if (!isNaN(sceneVal)) {
            newSceneIndex = sceneVal;
          }
        }
      });
      
      if (newSceneIndex !== activeSceneIndex) {
        activeSceneIndex = newSceneIndex;
      }
    }, observerOptions);

    sections.forEach(section => sceneObserver.observe(section));

    // Smooth Transition Loop
    let currentFade = 0;
    let time = 0;

    const transitionLoop = () => {
      // Smoothly approach the active scene index
      currentFade += (activeSceneIndex - currentFade) * 0.025;
      
      // Handheld Camera Breathing (Math.sin/Math.cos)
      time += 0.02;
      const breathX = Math.sin(time * 0.5) * 8 + Math.cos(time * 0.3) * 4;
      const breathY = Math.cos(time * 0.4) * 8 + Math.sin(time * 0.6) * 4;
      
      if (cinematicBgContainer) {
        cinematicBgContainer.style.transform = `translate3d(${breathX}px, ${breathY}px, 0) scale(1.05)`;
      }

      // Calculate opacity for all frames
      cinematicFrames.forEach((frame, idx) => {
        // Preload nearby frames
        if (Math.abs(idx - activeSceneIndex) <= 1) loadFrame(frame);
        
        // Calculate distance from the current fade value to this frame's index
        const distance = Math.abs(currentFade - idx);
        
        // If distance is within 1, it has some opacity. Otherwise 0.
        let opacity = 0;
        if (distance < 1) {
          opacity = 1 - distance;
        }
        
        // Apply optimized styles
        if (opacity > 0) {
          frame.style.opacity = opacity;
          frame.style.zIndex = opacity > 0.5 ? 2 : 1;
          if (opacity > 0.5) {
            frame.classList.add('active-frame');
          } else {
            frame.classList.remove('active-frame');
          }
        } else {
          frame.style.opacity = 0;
          frame.style.zIndex = 0;
          frame.classList.remove('active-frame');
        }
        // Use static hardware acceleration
        frame.style.transform = `translateZ(0) scale(1.02)`;
      });
      
      requestAnimationFrame(transitionLoop);
    };
    
    requestAnimationFrame(transitionLoop);
  }

  // Desktop-only Premium Interactions
  if (window.matchMedia("(min-width: 768px) and (hover: hover)").matches) {
    // Interactive Cursor Glow
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.transform = `translate3d(${glowX - 300}px, ${glowY - 300}px, 0)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hero Content Parallax & Fade
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    const heroParticles = document.querySelector('.hero-particles');
    const heroDepthLayer = document.querySelector('.hero-depth-layer');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        if (heroContent) {
          heroContent.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
          heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
          heroContent.style.filter = `blur(${(scrollY / window.innerHeight) * 6}px)`;
        }
        if (heroBg) heroBg.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0) scale(1.08)`;
        if (heroDepthLayer) heroDepthLayer.style.transform = `translate3d(0, ${scrollY * 0.25}px, -1px) scale(1.2)`;
        if (heroParticles) heroParticles.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
        
        // Fade out scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          scrollIndicator.style.opacity = Math.max(0, 1 - (scrollY / (window.innerHeight * 0.3)));
        }
      }
    });

    // Magnetic Premium Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
  }
});
