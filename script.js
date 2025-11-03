// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Section indicator functionality
const sections = document.querySelectorAll('section');
const indicators = document.querySelectorAll('.indicator');

function updateActiveSection() {
  const scrollPosition = window.scrollY + window.innerHeight / 2;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      indicators.forEach(ind => ind.classList.remove('active'));
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }

      // Update navigation active state
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Create section indicators dynamically
function createSectionIndicators() {
  const indicatorContainer = document.querySelector('.section-indicator');
  if (!indicatorContainer) return;

  // Clear existing indicators
  indicatorContainer.innerHTML = '';

  // Add indicators for each section
  sections.forEach((section, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    indicatorContainer.appendChild(indicator);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animations to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Typing effect for terminal
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Apply typing effect to terminal lines
document.addEventListener('DOMContentLoaded', () => {
  const terminalLines = document.querySelectorAll('.terminal-line');
  terminalLines.forEach((line, index) => {
    setTimeout(() => {
      typeWriter(line, line.textContent, 30);
    }, index * 500);
  });
});

// Parallax effect for floating icons
function parallaxIcons() {
  const icons = document.querySelectorAll('.icon');
  const scrolled = window.scrollY;
  const rate = scrolled * -0.5;

  icons.forEach((icon, index) => {
    const speed = (index + 1) * 0.1;
    icon.style.transform = `translateY(${rate * speed}px)`;
  });
}

// Hover effects for skill items
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px) scale(1.05)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Form submission handling
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert('Thank you for your message! I\'ll get back to you soon.');
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createSectionIndicators();
  updateActiveSection();
});

// Update active section on scroll
window.addEventListener('scroll', () => {
  updateActiveSection();
  parallaxIcons();
});

// Resize handler
window.addEventListener('resize', createSectionIndicators);
