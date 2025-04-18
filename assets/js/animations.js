/**
 * RotaVision Enhanced Animations
 * 
 * This script handles various animation effects across the site.
 * Including floating elements, scroll animations, interactive UI components,
 * and mouse-following effects.
 */

document.addEventListener('DOMContentLoaded', function() {
  initFloatingElements();
  initScrollReveal();
  initMobileNavigation();
  initParallaxEffect();
  initCursorEffect();
  initTiltEffect();
  initGlitchEffect();
});

/**
 * Initialize floating elements animation
 * This adds subtle movement to elements with the floating-element class
 */
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach(element => {
    // Get or set data-depth attribute (controls animation intensity)
    const depth = element.getAttribute('data-depth') || 0.1;
    
    // Randomize the animation delay for a more natural effect
    const delay = Math.random() * 2;
    
    // Randomize the animation duration between 4-6 seconds
    const duration = 4 + Math.random() * 4;
    
    // Apply the enhanced animation styles
    element.style.animation = `enhancedFloating ${duration}s ease-in-out infinite`;
    element.style.animationDelay = `${delay}s`;
    
    // Add slight rotation to some elements for variety
    if (Math.random() > 0.7) {
      element.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
    }
    
    // Add interactive hover effect
    element.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.transform = 'translateY(-5px) scale(1.03)';
      this.style.transition = 'transform 0.3s ease';
      
      // Add glitch effect on hover for some elements
      if (Math.random() > 0.7) {
        this.classList.add('glitch-effect');
      }
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.transform = '';
      this.style.transition = 'transform 0.3s ease';
      this.classList.remove('glitch-effect');
    });
  });
}

/**
 * Initialize scroll reveal animations
 * Elements will animate in as they enter the viewport
 */
function initScrollReveal() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Only proceed if there are elements to animate
  if (!animateElements.length) return;
  
  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the animation type from data attribute or default to fade-in
        const animationType = entry.target.dataset.animation || 'fade-in';
        
        // Add the appropriate animation class
        entry.target.classList.add(`animate-${animationType}`);
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when at least 10% of the item is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset to trigger before fully in view
  });
  
  // Start observing each element
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize mobile navigation
 */
function initMobileNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.getElementById('main-menu');
  
  if (!menuToggle || !mainMenu) return;
  
  menuToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    
    // Toggle aria-expanded
    this.setAttribute('aria-expanded', !expanded);
    
    // Toggle menu visibility
    mainMenu.classList.toggle('active');
    this.classList.toggle('active');
    
    // Prevent scroll when menu is open
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mainMenu.classList.contains('active') && 
        !mainMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      mainMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mainMenu.classList.contains('active')) {
      mainMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Initialize parallax effect on scroll
 */
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  // Initial calculation
  updateParallax();
  
  // Update on scroll
  window.addEventListener('scroll', updateParallax);
  
  function updateParallax() {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.2;
      const offset = scrollTop * speed;
      const reverse = element.hasAttribute('data-parallax-reverse');
      
      if (reverse) {
        element.style.transform = `translateY(-${offset}px)`;
      } else {
        element.style.transform = `translateY(${offset}px)`;
      }
    });
  }
}

/**
 * Initialize cursor effect
 * Creates a dynamic, interactive cursor follower
 */
function initCursorEffect() {
  // Create cursor effect element
  const cursorEffect = document.createElement('div');
  cursorEffect.classList.add('cursor-effect');
  document.body.appendChild(cursorEffect);
  
  // Variables for smooth animation
  let cursorX = 0;
  let cursorY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', function(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    // Add class when hovering over interactive elements
    const target = e.target;
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.classList.contains('floating-element') ||
      target.closest('.floating-element')
    ) {
      cursorEffect.classList.add('cursor-hover');
    } else {
      cursorEffect.classList.remove('cursor-hover');
    }
  });
  
  // Smoothly animate cursor position
  function animateCursor() {
    // Calculate the difference between current and target positions
    const dx = cursorX - currentX;
    const dy = cursorY - currentY;
    
    // Smoothly update current position (easing effect)
    currentX += dx * 0.1;
    currentY += dy * 0.1;
    
    // Apply the position
    cursorEffect.style.left = `${currentX}px`;
    cursorEffect.style.top = `${currentY}px`;
    
    // Request next frame
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
  
  // Hide native cursor if this effect is active
  document.body.classList.add('custom-cursor');
}

/**
 * Initialize 3D tilt effect for cards
 */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.service-card, .case-study-card');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', handleTilt);
    element.addEventListener('mouseleave', resetTilt);
  });
  
  function handleTilt(e) {
    const el = this;
    const rect = el.getBoundingClientRect();
    
    // Calculate mouse position relative to the element
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate the percentage position
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    // Calculate the tilt angle (max 10 degrees)
    const tiltX = -(yPercent - 0.5) * 10; // Reverse direction for natural feel
    const tiltY = (xPercent - 0.5) * 10;
    
    // Apply the tilt effect
    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Add a subtle light reflection effect
    const glare = el.querySelector('.tilt-glare') || createGlareElement(el);
    glare.style.opacity = '0.2';
    glare.style.transform = `translate(${xPercent * 100}%, ${yPercent * 100}%)`;
  }
  
  function resetTilt() {
    this.style.transform = '';
    const glare = this.querySelector('.tilt-glare');
    if (glare) {
      glare.style.opacity = '0';
    }
  }
  
  function createGlareElement(parent) {
    const glare = document.createElement('div');
    glare.classList.add('tilt-glare');
    glare.style.position = 'absolute';
    glare.style.top = '0';
    glare.style.left = '0';
    glare.style.width = '100px';
    glare.style.height = '100px';
    glare.style.borderRadius = '50%';
    glare.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)';
    glare.style.opacity = '0';
    glare.style.pointerEvents = 'none';
    glare.style.transition = 'opacity 0.3s ease';
    glare.style.transform = 'translate(-50%, -50%)';
    
    // Set parent to relative if not already
    if (window.getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }
    
    // Add overflow hidden to parent
    parent.style.overflow = 'hidden';
    
    parent.appendChild(glare);
    return glare;
  }
}

/**
 * Initialize glitch effect for elements
 */
function initGlitchEffect() {
  // Create stylesheet for glitch effect
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glitch1 {
      0% { transform: translate(0); }
      20% { transform: translate(-3px, 3px); }
      40% { transform: translate(-3px, -3px); }
      60% { transform: translate(3px, 3px); }
      80% { transform: translate(3px, -3px); }
      100% { transform: translate(0); }
    }
    @keyframes glitch2 {
      0% { transform: translate(0); opacity: 0.5; }
      20% { transform: translate(3px, -3px); opacity: 0.7; }
      40% { transform: translate(3px, 3px); opacity: 0.5; }
      60% { transform: translate(-3px, -3px); opacity: 0.7; }
      80% { transform: translate(-3px, 3px); opacity: 0.5; }
      100% { transform: translate(0); opacity: 0.5; }
    }
    .glitch-effect {
      position: relative;
    }
    .glitch-effect::before,
    .glitch-effect::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      pointer-events: none;
    }
    .glitch-effect::before {
      left: -2px;
      animation: glitch1 0.3s infinite linear alternate-reverse;
      background-position: -2px 0;
      opacity: 0.7;
      border: 2px solid rgba(0, 148, 255, 0.2);
      z-index: -1;
    }
    .glitch-effect::after {
      left: 2px;
      animation: glitch2 0.2s infinite linear alternate-reverse;
      background-position: 2px 0;
      opacity: 0.5;
      border: 2px solid rgba(153, 0, 255, 0.2);
      z-index: -2;
    }
  `;
  document.head.appendChild(style);
  
  // Apply glitch effect to elements with .glitch-text class
  const glitchTexts = document.querySelectorAll('.glitch-text');
  glitchTexts.forEach(element => {
    element.setAttribute('data-text', element.textContent);
  });
}

/**
 * Create subtle mouse follow effect for hero section
 */
function createMouseFollowEffect() {
  const hero = document.querySelector('.gradient-hero');
  
  if (!hero) return;
  
  hero.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Apply subtle transform to hero content based on mouse position
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
    }
    
    // Add subtle light effect where mouse is
    const light = document.createElement('div');
    light.classList.add('mouse-light');
    light.style.left = e.pageX + 'px';
    light.style.top = e.pageY + 'px';
    
    document.body.appendChild(light);
    
    // Remove light after animation
    setTimeout(() => {
      light.remove();
    }, 1000);
  });
}

/**
 * Add form input animations
 */
function enhanceFormInputs() {
  const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
  
  formInputs.forEach(input => {
    // Wrap input in container if not already
    let inputContainer = input.parentElement;
    if (!inputContainer.classList.contains('input-container')) {
      inputContainer = document.createElement('div');
      inputContainer.classList.add('input-container');
      input.parentNode.insertBefore(inputContainer, input);
      inputContainer.appendChild(input);
    }
    
    // Add active class to parent when focused
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('active');
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('input-ripple');
      this.parentElement.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('active');
      }
    });
    
    // Initialize with active class if it has a value
    if (input.value !== '') {
      input.parentElement.classList.add('active');
    }
  });
}

/**
 * Initialize text scramble effect
 */
function initTextScramble() {
  // Create a class for text scramble effect
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#_';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  // Apply to elements with scramble-text class
  const elements = document.querySelectorAll('.scramble-text');
  elements.forEach(el => {
    const fx = new TextScramble(el);
    const originalText = el.textContent;
    
    // Scramble on hover
    el.addEventListener('mouseenter', () => {
      fx.setText(originalText);
    });
  });
}

// Run these additional animations after the page is fully loaded
window.addEventListener('load', function() {
  createMouseFollowEffect();
  enhanceFormInputs();
  initTextScramble();
  
  // Add tech mesh overlay to hero section
  const heroSection = document.querySelector('.gradient-hero');
  if (heroSection) {
    const techMesh = document.createElement('div');
    techMesh.classList.add('tech-mesh-overlay');
    heroSection.appendChild(techMesh);
  }
  
  // Add animation classes to section titles
  document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('animate-on-scroll');
    title.setAttribute('data-animation', 'fade-in-up');
  });
  
  // Add data-parallax attribute to some background elements
  document.querySelectorAll('.services-section::before, .services-section::after').forEach(el => {
    el.setAttribute('data-parallax', '0.1');
  });
});