// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typingName = document.getElementById('typing-name');
const particlesContainer = document.getElementById('particles');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
    initTypingAnimation();
    initParticleSystem();
    initScrollAnimations();
    initSkillBars();
    initBackToTop();
    initContactForm();
});

// Mobile Navigation Toggle
function initMobileMenu() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    if (!typingName) return;
    
    const text = 'Shreshth Gupt';
    let index = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeWriter() {
        if (!isDeleting && index < text.length) {
            currentText += text.charAt(index);
            index++;
        } else if (isDeleting && index > 0) {
            currentText = currentText.slice(0, -1);
            index--;
        } else if (index === text.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (index === 0 && isDeleting) {
            isDeleting = false;
        }
        
        typingName.textContent = currentText;
        
        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Particle System for Background
function initParticleSystem() {
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 5;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create particles at intervals
    setInterval(createParticle, 300);
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Skill Bar Animations
function initSkillBars() {
    function animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }
    
    // Store the function globally so it can be called from intersection observer
    window.animateSkillBars = animateSkillBars;
}

// Back to Top Button
function initBackToTop() {
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Handling
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        ${type === 'success' ? 'background: #10B981;' : 'background: #EF4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 11, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
}

// Initialize navbar scroll effect
initNavbarScroll();

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-item, .project-card, .cert-card, .achievement-card, .experience-card');
    
    elements.forEach((element, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        observer.observe(element);
    });
}

// Initialize scroll animations
animateOnScroll();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Any additional scroll handling can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add smooth reveal animation for hero section
function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// Initialize hero animation
initHeroAnimation();

// Add click effects to buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize button effects
initButtonEffects();

// Add parallax effect to hero background
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax
initParallax();

// Experience section animations
function initExperienceAnimations() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });
    
    experienceItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize experience animations
initExperienceAnimations();

// Achievement section animations
function initAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease';
        
        observer.observe(card);
    });
}

// Initialize achievement animations
initAchievementAnimations();

// Enhanced certification animations
function initCertificationAnimations() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0) translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial state with alternating slide directions
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-50px) translateY(20px)' : 'translateX(50px) translateY(20px)';
        card.style.transition = 'all 0.7s ease';
        
        observer.observe(card);
    });
}

// Initialize certification animations
initCertificationAnimations();

// Console message for developers
console.log(`
🚀 Welcome to Shreshth Gupt's Portfolio!
🔧 Built with: HTML5, CSS3, JavaScript
💡 Features: Responsive Design, Smooth Animations, Interactive Elements
📧 Contact: shreshthgupt@gmail.com
🌟 Thanks for checking out the code!
`);

// Export functions for potential use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initSmoothScrolling,
        initTypingAnimation,
        initParticleSystem,
        initScrollAnimations,
        showNotification,
        isValidEmail
    };
}