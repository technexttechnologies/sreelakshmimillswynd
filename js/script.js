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

  // Hero Content Parallax & Fade
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight && heroContent) {
      heroContent.style.transform = `translate3d(0, ${window.scrollY * 0.4}px, 0)`;
      heroContent.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.5;
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
});
