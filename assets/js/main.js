/**
 * RotaVision Main JavaScript
 * 
 * This is the main JavaScript file for the RotaVision theme.
 * It initializes all components and handles global functionality.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme components
    initTheme();
  });
  
  /**
   * Initialize theme functionality
   */
  function initTheme() {
    // Initialize performance optimizations
    lazyLoadImages();
    deferNonCriticalStyles();
    
    // Initialize UI components
    initStickyHeader();
    initSmoothScroll();
    initTooltips();
    
    // Initialize advanced features
    initContactForm();
  }
  
  /**
   * Lazy load images for better performance
   */
  function lazyLoadImages() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
          }
        });
      });
      
      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  }
  
  /**
   * Defer loading of non-critical styles
   */
  function deferNonCriticalStyles() {
    const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    
    if (nonCriticalStyles.length === 0) return;
    
    // Load deferred stylesheets after page load
    window.addEventListener('load', () => {
      nonCriticalStyles.forEach(link => {
        link.rel = 'stylesheet';
        link.removeAttribute('data-defer');
      });
    });
  }
  
  /**
   * Initialize sticky header behavior
   */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    let lastScrollY = window.pageYOffset;
    const scrollThreshold = 100; // Pixels scrolled before header changes
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset;
      
      // Add sticky class when scrolling down past threshold
      if (currentScrollY > scrollThreshold) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }
  
  /**
   * Initialize smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL hash without scrolling
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  /**
   * Initialize tooltips for elements with data-tooltip attribute
   */
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    if (tooltipElements.length === 0) return;
    
    tooltipElements.forEach(element => {
      const tooltipText = element.getAttribute('data-tooltip');
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = tooltipText;
      
      // Add tooltip on hover
      element.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
        
        // Position tooltip relative to element
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.pageYOffset - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + window.pageXOffset + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        
        // Add active class to show tooltip with animation
        setTimeout(() => {
          tooltip.classList.add('active');
        }, 10);
      });
      
      // Remove tooltip on mouse leave
      element.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
        
        // Remove tooltip from DOM after animation
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      });
    });
  }
  
  /**
   * Initialize contact form validation and submission
   */
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      const isValid = validateForm(this);
      
      if (isValid) {
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual AJAX submission)
        setTimeout(() => {
          // Replace with actual form submission logic
          const formData = new FormData(contactForm);
          
          // Success message (for demonstration)
          const formContainer = contactForm.parentNode;
          formContainer.innerHTML = `
            <div class="form-success">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>Message Sent Successfully</h3>
              <p>Thank you for reaching out. We'll get back to you shortly.</p>
            </div>
          `;
        }, 1500);
      }
    });
    
    // Add real-time validation for inputs
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
    });
  }
  
  /**
   * Validate the entire form
   * @param {HTMLFormElement} form - The form to validate
   * @return {boolean} - Whether the form is valid
   */
  function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  /**
   * Validate a single form input
   * @param {HTMLElement} input - The input to validate
   * @return {boolean} - Whether the input is valid
   */
  function validateInput(input) {
    // Skip validation for non-required inputs with no value
    if (!input.hasAttribute('required') && input.value.trim() === '') {
      removeError(input);
      return true;
    }
    
    // Required field validation
    if (input.hasAttribute('required') && input.value.trim() === '') {
      showError(input, 'This field is required');
      return false;
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
    }
    
    // If we got here, the input is valid
    removeError(input);
    return true;
  }
  
  /**
   * Show validation error for an input
   * @param {HTMLElement} input - The input with an error
   * @param {string} message - The error message to display
   */
  function showError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove any existing error
    removeError(input);
    
    // Add error class to form group
    formGroup.classList.add('has-error');
    
    // Create and add error message
    const errorElement = document.createElement('div');
    errorElement.classList.add('form-error');
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
  }
  
  /**
   * Remove validation error from an input
   * @param {HTMLElement} input - The input to remove error from
   */
  function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('has-error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
  }