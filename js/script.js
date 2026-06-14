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
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
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
    const line1 = "Crafted Through Tradition".split(' ');
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
        span.style.animationDelay = `${0.4 + (charIndex * 0.03)}s`;
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

  // Cinematic Scroll Sequence Engine
  const cinematicBgContainer = document.getElementById('cinematic-bg-container');
  const cinematicFrames = document.querySelectorAll('.cinematic-frame');
  const timeLighting = document.querySelector('.cinematic-time-lighting');
  
  if (cinematicFrames.length > 0) {
    const totalFrames = cinematicFrames.length;
    
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
    
    loadFrame(cinematicFrames[0]);
    if (cinematicFrames.length > 1) loadFrame(cinematicFrames[1]);

    // Inertia & Handheld Variables
    let targetScrollY = 0;
    let currentScrollY = 0;
    let time = 0;

    window.addEventListener('scroll', () => {
      targetScrollY = window.scrollY;
    });

    const humanizedLoop = () => {
      // Inertia Dampening
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      
      // Handheld Camera Breathing (Math.sin/Math.cos)
      time += 0.02;
      const breathX = Math.sin(time * 0.5) * 8 + Math.cos(time * 0.3) * 4;
      const breathY = Math.cos(time * 0.4) * 8 + Math.sin(time * 0.6) * 4;
      
      // Apply breathing to entire container
      if (cinematicBgContainer) {
        cinematicBgContainer.style.transform = `translate3d(${breathX}px, ${breathY}px, 0) scale(1.05)`;
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(1, currentScrollY / maxScroll));
      
      // Time of day lighting (morning at top, neutral at bottom)
      if (timeLighting) {
        timeLighting.style.opacity = Math.max(0, 1 - (scrollPercent * 2));
      }
      
      const rawIndex = scrollPercent * (totalFrames - 1);
      const currentIndex = Math.floor(rawIndex);
      const nextIndex = Math.min(currentIndex + 1, totalFrames - 1);
      const fadeProgress = rawIndex - currentIndex;
      
      // Calculate Scroll Velocity for focal blur
      const velocity = Math.abs(targetScrollY - currentScrollY);
      const dynamicBlur = Math.min(velocity * 0.05, 5); // Smooth subtle blur on fast scroll
      
      cinematicFrames.forEach((frame, idx) => {
        if (Math.abs(idx - currentIndex) <= 1) loadFrame(frame);
        
        const baseZoom = 1.02; // Very subtle base zoom
        
        if (idx === currentIndex) {
          frame.style.opacity = 1 - fadeProgress;
          frame.style.transform = `scale(${baseZoom + (fadeProgress * 0.05)})`;
          frame.style.filter = `blur(${dynamicBlur}px)`;
          frame.style.zIndex = 1;
        } else if (idx === nextIndex) {
          frame.style.opacity = fadeProgress;
          frame.style.transform = `scale(${baseZoom + ((fadeProgress - 1) * 0.05)})`;
          frame.style.filter = `blur(${dynamicBlur}px)`;
          frame.style.zIndex = 2;
        } else {
          frame.style.opacity = 0;
          frame.style.zIndex = 0;
          frame.style.filter = `blur(0px)`;
        }
      });
      
      requestAnimationFrame(humanizedLoop);
    };
    
    requestAnimationFrame(humanizedLoop);
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
        }
        if (heroBg) heroBg.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0) scale(1.08)`;
        if (heroDepthLayer) heroDepthLayer.style.transform = `translate3d(0, ${scrollY * 0.25}px, -1px) scale(1.2)`;
        if (heroParticles) heroParticles.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
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
