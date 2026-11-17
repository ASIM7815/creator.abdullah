/* ============================================
   CREATOR.ABDULLAH - ANIMATIONS JAVASCRIPT
   Advanced Animation Controllers
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // GSAP SCROLL TRIGGER (Optional - if GSAP is added)
    // ============================================
    /*
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero parallax
        gsap.to('.hero-content', {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Stats animation
        gsap.from('.stat-item', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%'
            }
        });
    }
    */

    // ============================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-scroll-reveal
    document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    class TypeWriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.text = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.isDeleting = false;
            this.type();
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullText = this.words[current];

            if (this.isDeleting) {
                this.text = fullText.substring(0, this.text.length - 1);
            } else {
                this.text = fullText.substring(0, this.text.length + 1);
            }

            this.element.textContent = this.text;

            let typeSpeed = 150;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.text === fullText) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.text === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Initialize typewriter if element exists
    const typeElement = document.querySelector('.typewriter');
    if (typeElement) {
        const words = JSON.parse(typeElement.getAttribute('data-words'));
        new TypeWriter(typeElement, words, 2000);
    }

    // ============================================
    // PARTICLE BACKGROUND EFFECT (Optional)
    // ============================================
    class ParticleEffect {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 50;
            
            this.resize();
            this.init();
            this.animate();
            
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        init() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: Math.random() * 2 - 1,
                    vy: Math.random() * 2 - 1,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 107, 53, 0.5)';
                this.ctx.fill();
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize particles if canvas exists
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        new ParticleEffect(particleCanvas);
    }

    // ============================================
    // MOUSE FOLLOW EFFECT
    // ============================================
    class MouseFollower {
        constructor() {
            this.cursor = document.createElement('div');
            this.cursor.className = 'cursor-dot';
            this.cursorOutline = document.createElement('div');
            this.cursorOutline.className = 'cursor-outline';
            
            document.body.appendChild(this.cursor);
            document.body.appendChild(this.cursorOutline);
            
            this.posX = 0;
            this.posY = 0;
            this.mouseX = 0;
            this.mouseY = 0;
            
            this.init();
        }

        init() {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            this.animate();

            // Scale up on hover over interactive elements
            document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.style.transform = 'scale(2)';
                    this.cursorOutline.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    this.cursor.style.transform = 'scale(1)';
                    this.cursorOutline.style.transform = 'scale(1)';
                });
            });
        }

        animate() {
            this.posX += (this.mouseX - this.posX) * 0.9;
            this.posY += (this.mouseY - this.posY) * 0.9;

            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
            
            this.cursorOutline.style.left = this.posX + 'px';
            this.cursorOutline.style.top = this.posY + 'px';

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize custom cursor (desktop only)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        // Uncomment to enable custom cursor
        // new MouseFollower();
    }

    // ============================================
    // TILT EFFECT ON CARDS
    // ============================================
    class TiltEffect {
        constructor(element, settings = {}) {
            this.element = element;
            this.settings = {
                maxTilt: settings.maxTilt || 15,
                perspective: settings.perspective || 1000,
                scale: settings.scale || 1.05,
                speed: settings.speed || 400,
                easing: settings.easing || 'cubic-bezier(.03,.98,.52,.99)'
            };
            
            this.init();
        }

        init() {
            this.element.style.transform = 'perspective(' + this.settings.perspective + 'px)';
            this.element.style.transition = 'all ' + this.settings.speed + 'ms ' + this.settings.easing;

            this.element.addEventListener('mouseenter', () => this.onEnter());
            this.element.addEventListener('mousemove', (e) => this.onMove(e));
            this.element.addEventListener('mouseleave', () => this.onLeave());
        }

        onEnter() {
            this.element.style.transform = 'perspective(' + this.settings.perspective + 'px) scale3d(' + 
                this.settings.scale + ', ' + this.settings.scale + ', ' + this.settings.scale + ')';
        }

        onMove(e) {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const tiltX = percentY * this.settings.maxTilt;
            const tiltY = -percentX * this.settings.maxTilt;

            this.element.style.transform = 
                'perspective(' + this.settings.perspective + 'px) ' +
                'scale3d(' + this.settings.scale + ', ' + this.settings.scale + ', ' + this.settings.scale + ') ' +
                'rotateX(' + tiltX + 'deg) ' +
                'rotateY(' + tiltY + 'deg)';
        }

        onLeave() {
            this.element.style.transform = 'perspective(' + this.settings.perspective + 'px) ' +
                'scale3d(1, 1, 1) ' +
                'rotateX(0deg) ' +
                'rotateY(0deg)';
        }
    }

    // Apply tilt effect to cards (desktop only)
    if (window.innerWidth > 768) {
        document.querySelectorAll('.blog-card, .reel-card, .testimonial-card').forEach(card => {
            // Uncomment to enable tilt effect
            // new TiltEffect(card);
        });
    }

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    class MagneticButton {
        constructor(element) {
            this.element = element;
            this.boundingRect = element.getBoundingClientRect();
            this.magneticArea = 100;
            
            this.init();
        }

        init() {
            document.addEventListener('mousemove', (e) => {
                const distance = this.getDistance(e.clientX, e.clientY);
                
                if (distance < this.magneticArea) {
                    this.moveMagnetic(e.clientX, e.clientY);
                } else {
                    this.reset();
                }
            });
        }

        getDistance(x, y) {
            const centerX = this.boundingRect.left + this.boundingRect.width / 2;
            const centerY = this.boundingRect.top + this.boundingRect.height / 2;
            
            return Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );
        }

        moveMagnetic(x, y) {
            const centerX = this.boundingRect.left + this.boundingRect.width / 2;
            const centerY = this.boundingRect.top + this.boundingRect.height / 2;
            
            const deltaX = (x - centerX) * 0.3;
            const deltaY = (y - centerY) * 0.3;
            
            this.element.style.transform = 'translate3d(' + deltaX + 'px, ' + deltaY + 'px, 0)';
        }

        reset() {
            this.element.style.transform = 'translate3d(0, 0, 0)';
        }
    }

    // Apply magnetic effect to buttons (desktop only)
    if (window.innerWidth > 768) {
        document.querySelectorAll('.btn-primary, .btn-explore').forEach(btn => {
            // Uncomment to enable magnetic effect
            // new MagneticButton(btn);
        });
    }

    // ============================================
    // IMAGE PARALLAX ON SCROLL
    // ============================================
    function parallaxImages() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(window.pageYOffset * speed);
                element.style.transform = 'translateY(' + yPos + 'px)';
            });
        });
    }

    parallaxImages();

    // ============================================
    // SMOOTH REVEAL ANIMATION
    // ============================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    }

    revealOnScroll();

    // ============================================
    // STAGGER ANIMATION ON SCROLL
    // ============================================
    function staggerAnimation() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(container => {
            const items = container.children;
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(items).forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('stagger-item');
                            }, index * 100);
                        });
                        staggerObserver.unobserve(entry.target);
                    }
                });
            });
            
            staggerObserver.observe(container);
        });
    }

    staggerAnimation();

    // ============================================
    // COUNTER ANIMATION WITH INTERSECTION OBSERVER
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.count-up');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounters();

    // ============================================
    // TEXT SPLIT ANIMATION
    // ============================================
    function splitTextAnimation() {
        const textElements = document.querySelectorAll('.split-text');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = (index * 0.05) + 's';
                span.classList.add('char');
                element.appendChild(span);
            });
        });
    }

    // Uncomment to enable split text animation
    // splitTextAnimation();

    // ============================================
    // RIPPLE EFFECT ON CLICK
    // ============================================
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = diameter + 'px';
        ripple.style.left = event.clientX - button.offsetLeft - radius + 'px';
        ripple.style.top = event.clientY - button.offsetTop - radius + 'px';
        ripple.classList.add('ripple');
        
        const oldRipple = button.querySelector('.ripple');
        if (oldRipple) {
            oldRipple.remove();
        }
        
        button.appendChild(ripple);
    }

    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ============================================
    // CONSOLE ART
    // ============================================
    console.log(`
    ╔═══════════════════════════════════════╗
    ║     CREATOR.ABDULLAH                  ║
    ║     The Foodie Hyderabadi            ║
    ║                                       ║
    ║  🍜  Exploring Culinary Gems          ║
    ║  📸  @creator.abdullah_               ║
    ║  🎥  YouTube: thefoodiehyderabadi    ║
    ╚═══════════════════════════════════════╝
    `);

})();
