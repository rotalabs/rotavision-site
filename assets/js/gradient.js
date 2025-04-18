/**
 * RotaVision Enhanced Gradient Animation
 * 
 * This script creates a dynamic, animated gradient background
 * that responds subtly to user interaction.
 */

class Gradient {
  constructor() {
    this.canvas = document.getElementById('gradient-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.gradientColors = [
      '#0094ff',  // Bright tech blue
      '#9900ff',  // Deep violet
      '#00dcff',  // Electric cyan
      '#ff7c3a'   // Warm orange accent
    ];
    
    this.circleCount = 18; // Increased from 12 for more visual complexity
    this.circles = [];
    
    this.lastTime = 0;
    this.isAnimating = true;
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.init();
    this.animate(0);
    
    // Track mouse movement to influence animation
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
    // Handle window resize
    window.addEventListener('resize', this.resize.bind(this));
    
    // Pause animation when not visible for performance
    this.observer = new IntersectionObserver((entries) => {
      this.isAnimating = entries[0].isIntersecting;
      if (this.isAnimating) {
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
      }
    }, { threshold: 0.1 });
    
    this.observer.observe(this.canvas);
  }
  
  handleMouseMove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    // Subtly influence circles near the mouse position
    this.circles.forEach(circle => {
      const dx = this.mouseX - circle.x;
      const dy = this.mouseY - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 300) {
        // Create a gentle push effect away from the cursor
        const angle = Math.atan2(dy, dx);
        const push = 0.3 * (1 - distance / 300);
        
        circle.speedX -= Math.cos(angle) * push;
        circle.speedY -= Math.sin(angle) * push;
        
        // Limit maximum speed
        const maxSpeed = 0.8;
        const currentSpeed = Math.sqrt(circle.speedX * circle.speedX + circle.speedY * circle.speedY);
        
        if (currentSpeed > maxSpeed) {
          circle.speedX = circle.speedX / currentSpeed * maxSpeed;
          circle.speedY = circle.speedY / currentSpeed * maxSpeed;
        }
      }
    });
  }
  
  init() {
    this.resize();
    this.createCircles();
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * devicePixelRatio;
    this.canvas.height = rect.height * devicePixelRatio;
    
    // Recreate circles after resize
    this.createCircles();
  }
  
  createCircles() {
    this.circles = [];
    
    for (let i = 0; i < this.circleCount; i++) {
      const colorIndex = i % this.gradientColors.length;
      const color = this.gradientColors[colorIndex];
      
      this.circles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: this.canvas.width * (0.1 + Math.random() * 0.2),
        color: color,
        opacity: 0.2 + Math.random() * 0.5, // Increased opacity for more vibrant colors
        speedX: (Math.random() - 0.5) * 0.8, // Increased speed
        speedY: (Math.random() - 0.5) * 0.8  // Increased speed
      });
    }
  }
  
  animate(currentTime) {
    if (!this.isAnimating) return;
    
    let deltaTime = 0;
    
    if (this.lastTime !== 0) {
      deltaTime = currentTime - this.lastTime;
    }
    
    this.lastTime = currentTime;
    
    requestAnimationFrame(this.animate.bind(this));
    this.drawGradient(deltaTime);
  }
  
  drawGradient(deltaTime) {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Add a subtle base gradient
    const baseGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    baseGradient.addColorStop(0, 'rgba(0, 10, 30, 0.05)');
    baseGradient.addColorStop(1, 'rgba(10, 0, 30, 0.05)');
    this.ctx.fillStyle = baseGradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Move and draw each circle
    for (let circle of this.circles) {
      // Move circle
      circle.x += circle.speedX * deltaTime;
      circle.y += circle.speedY * deltaTime;
      
      // Bounce off edges with slight randomization
      if (circle.x < -circle.radius) {
        circle.x = this.canvas.width + circle.radius;
        circle.y = Math.random() * this.canvas.height; // Randomize y-position when wrapping
      }
      if (circle.x > this.canvas.width + circle.radius) {
        circle.x = -circle.radius;
        circle.y = Math.random() * this.canvas.height; // Randomize y-position when wrapping
      }
      if (circle.y < -circle.radius) {
        circle.y = this.canvas.height + circle.radius;
        circle.x = Math.random() * this.canvas.width; // Randomize x-position when wrapping
      }
      if (circle.y > this.canvas.height + circle.radius) {
        circle.y = -circle.radius;
        circle.x = Math.random() * this.canvas.width; // Randomize x-position when wrapping
      }
      
      // Apply a small random variation to speed for more natural movement
      if (Math.random() < 0.01) {
        circle.speedX += (Math.random() - 0.5) * 0.1;
        circle.speedY += (Math.random() - 0.5) * 0.1;
        
        // Limit max speed
        const maxSpeed = 1.0;
        const speed = Math.sqrt(circle.speedX * circle.speedX + circle.speedY * circle.speedY);
        if (speed > maxSpeed) {
          circle.speedX = (circle.speedX / speed) * maxSpeed;
          circle.speedY = (circle.speedY / speed) * maxSpeed;
        }
      }
      
      // Draw gradient circle
      const gradient = this.ctx.createRadialGradient(
        circle.x, circle.y, 0,
        circle.x, circle.y, circle.radius
      );
      
      // Create more vibrant gradients
      const rgbaColor = this.hexToRgba(circle.color, circle.opacity);
      gradient.addColorStop(0, rgbaColor);
      gradient.addColorStop(0.7, this.hexToRgba(circle.color, circle.opacity * 0.5));
      gradient.addColorStop(1, this.hexToRgba(circle.color, 0));
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Apply a subtle bloom effect
    this.applyBloom();
  }
  
  // Helper function to convert hex to rgba
  hexToRgba(hex, alpha) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    // Extract RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Return rgba string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Apply a subtle bloom effect to enhance colors
  applyBloom() {
    // This is a simplified bloom effect
    this.ctx.globalCompositeOperation = 'lighter';
    
    for (let circle of this.circles) {
      const bloomRadius = circle.radius * 0.7;
      const bloomGradient = this.ctx.createRadialGradient(
        circle.x, circle.y, 0,
        circle.x, circle.y, bloomRadius
      );
      
      // Make the bloom very subtle
      bloomGradient.addColorStop(0, this.hexToRgba(circle.color, circle.opacity * 0.2));
      bloomGradient.addColorStop(1, this.hexToRgba(circle.color, 0));
      
      this.ctx.fillStyle = bloomGradient;
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, bloomRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Reset composite operation
    this.ctx.globalCompositeOperation = 'source-over';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gradientCanvas = document.getElementById('gradient-canvas');
  if (gradientCanvas) {
    new Gradient();
  }
});