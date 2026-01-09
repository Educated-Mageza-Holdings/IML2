// ===== Mobile Navigation Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== Featured Products Slider =====
let currentSlide = 0;
const featuredCards = document.querySelectorAll('.featured-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const totalSlides = featuredCards.length;

function showSlide(index) {
    // Wrap around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Remove active class from all cards and dots
    featuredCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current card and dot
    featuredCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next/Previous button handlers
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play slider (optional - every 5 seconds)
let autoPlayInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto-play on hover
const featuredSlider = document.querySelector('.featured-slider');
if (featuredSlider) {
    featuredSlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    featuredSlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (featuredSlider) {
    featuredSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    featuredSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            showSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            showSlide(currentSlide - 1);
        }
    }
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animated Counter for Stats =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0' || stat.textContent === stat.getAttribute('data-target')) {
                    animateCounter(stat);
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statObserver.observe(aboutSection);
}

// ===== Intersection Observer for Fade-In Animations =====
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to various elements
document.querySelectorAll('.product-card, .value-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ===== Product Card Interactive Colors =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const color = card.getAttribute('data-color');

    card.addEventListener('mouseenter', () => {
        card.style.borderTop = `5px solid ${color}`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.borderTop = 'none';
    });
});

// ===== Parallax Effect for Hero Section =====
const heroSection = document.querySelector('.hero');
const juiceCircles = document.querySelectorAll('.juice-circle');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;

    if (scrolled < heroHeight) {
        juiceCircles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.2);
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show success message
    const button = contactForm.querySelector('.btn-primary');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 3000);
    }, 1500);
});

// ===== Dynamic Background Colors for Sections =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== Add Floating Animation to Product Bottles =====
document.querySelectorAll('.product-bottle, .featured-bottle').forEach((bottle, index) => {
    bottle.style.animationDelay = `${index * 0.2}s`;
});

// ===== Scroll Progress Indicator =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #007A3D, #FFB81C);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

createScrollProgress();

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Interactive Cursor Effect (Desktop Only) =====
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #007A3D;
        border-radius: 50%;
        pointer-events: none;
        transition: transform 0.2s ease, border-color 0.2s ease;
        z-index: 9999;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
    });

    document.querySelectorAll('a, button, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#FFB81C';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#007A3D';
        });
    });
}

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
const createTypingEffect = () => {
    const gradientText = document.querySelector('.gradient-text');
    if (!gradientText) return;

    const text = gradientText.textContent;
    gradientText.textContent = '';
    gradientText.style.borderRight = '3px solid #007A3D';

    let index = 0;
    const typeSpeed = 100;

    const type = () => {
        if (index < text.length) {
            gradientText.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(() => {
                gradientText.style.borderRight = 'none';
            }, 500);
        }
    };

    setTimeout(type, 500);
};

// Uncomment to enable typing effect
// createTypingEffect();

// ===== Add Ripple Effect to Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to styles
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

// ===== Lazy Loading for Images (if images are added later) =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// ===== Console Message =====
console.log('%c🍊 Santé Juices SA ', 'background: linear-gradient(135deg, #007A3D, #FFB81C); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
console.log('%cBetter Juice, Better Day!', 'color: #007A3D; font-size: 14px; font-weight: bold;');
console.log('%cProudly South African 🇿🇦', 'color: #FFB81C; font-size: 12px;');
