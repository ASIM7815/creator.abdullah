/* ============================================
   CREATOR.ABDULLAH - MAIN JAVASCRIPT
   Interactive Functionality & Animations
   ============================================ */

(function($) {
    'use strict';

    // ============================================
    // PRELOADER
    // ============================================
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('hidden');
        }, 1000);
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    $('a.nav-link[href*="#"]:not([href="#"])').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.hash);
        const offset = 80;
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 800, 'swing');
            
            // Close mobile menu
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ============================================
    // ACTIVE MENU ON SCROLL
    // ============================================
    $(window).on('scroll', function() {
        const scrollPos = $(document).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            } else {
                currLink.removeClass('active');
            }
        });
    });

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(function() {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.text(Math.floor(start / 100) / 10 + 'K');
            } else {
                element.text(Math.floor(start) + '+');
            }
        }, 16);
    }

    let counterAnimated = false;
    $(window).on('scroll', function() {
        const statsSection = $('.stats-section');
        if (statsSection.length && !counterAnimated) {
            const statsSectionTop = statsSection.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > statsSectionTop) {
                counterAnimated = true;
                $('.stat-number').each(function() {
                    const $this = $(this);
                    const countTo = $this.data('count');
                    animateCounter($this, countTo, 2000);
                });
            }
        }
    });

    // ============================================
    // BLOG FILTER FUNCTIONALITY
    // ============================================
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter blog cards
        if (filterValue === 'all') {
            $('.blog-card').fadeIn(400).removeClass('hidden');
        } else {
            $('.blog-card').each(function() {
                const category = $(this).data('category');
                if (category === filterValue) {
                    $(this).fadeIn(400).removeClass('hidden');
                } else {
                    $(this).fadeOut(400).addClass('hidden');
                }
            });
        }
    });

    // ============================================
    // LOAD MORE BLOG POSTS
    // ============================================
    let visiblePosts = 6;
    
    // Hide posts beyond initial visible count
    $('.blog-card').each(function(index) {
        if (index >= visiblePosts) {
            $(this).hide();
        }
    });
    
    $('#loadMoreBtn').on('click', function() {
        const $btn = $(this);
        const $hiddenPosts = $('.blog-card:hidden');
        
        if ($hiddenPosts.length > 0) {
            $hiddenPosts.slice(0, 3).fadeIn(400);
            
            // Hide button if no more posts
            if ($('.blog-card:hidden').length === 0) {
                $btn.fadeOut(400);
            }
        }
    });

    // ============================================
    // SWIPER TESTIMONIALS SLIDER
    // ============================================
    if ($('.testimonialsSwiper').length) {
        const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find('.btn-submit');
        const $message = $('#formMessage');
        
        // Disable button during submission
        $submitBtn.prop('disabled', true).html(
            '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
        );
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(function() {
            // Success message
            $message.removeClass('error').addClass('success')
                .html('<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.')
                .fadeIn();
            
            // Reset form
            $form[0].reset();
            
            // Re-enable button
            $submitBtn.prop('disabled', false).html(
                '<span>Send Message</span><i class="fas fa-paper-plane"></i>'
            );
            
            // Hide message after 5 seconds
            setTimeout(function() {
                $message.fadeOut();
            }, 5000);
        }, 2000);
        
        /* 
        // Actual AJAX implementation example:
        $.ajax({
            url: 'your-backend-endpoint.php',
            type: 'POST',
            data: $form.serialize(),
            success: function(response) {
                $message.removeClass('error').addClass('success')
                    .html('<i class="fas fa-check-circle"></i> Message sent successfully!')
                    .fadeIn();
                $form[0].reset();
            },
            error: function() {
                $message.removeClass('success').addClass('error')
                    .html('<i class="fas fa-exclamation-circle"></i> Error sending message. Please try again.')
                    .fadeIn();
            },
            complete: function() {
                $submitBtn.prop('disabled', false).html(
                    '<span>Send Message</span><i class="fas fa-paper-plane"></i>'
                );
            }
        });
        */
    });

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const $scrollTopBtn = $('#scrollTopBtn');
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $scrollTopBtn.addClass('show');
        } else {
            $scrollTopBtn.removeClass('show');
        }
    });
    
    $scrollTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // ============================================
    // AOS ANIMATION INITIALIZATION
    // ============================================
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // ============================================
    // PARALLAX EFFECT ON SCROLL
    // ============================================
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        
        // Hero parallax
        $('.hero-content').css({
            'transform': 'translateY(' + (scrolled * 0.3) + 'px)',
            'opacity': 1 - (scrolled / 500)
        });
        
        // About image parallax
        if ($('.about-image').length) {
            const aboutOffset = $('.about-section').offset().top;
            const aboutScroll = scrolled - aboutOffset + $(window).height();
            if (aboutScroll > 0 && aboutScroll < $(window).height() * 2) {
                $('.about-image img').css({
                    'transform': 'translateY(' + (aboutScroll * 0.05) + 'px)'
                });
            }
        }
    });

    // ============================================
    // HERO BACKGROUND SLIDESHOW (Optional)
    // ============================================
    const heroImages = [
        'images/hero-bg-1.jpg',
        'images/hero-bg-2.jpg',
        'images/hero-bg-3.jpg'
    ];
    
    let currentSlide = 0;
    
    function changeHeroBackground() {
        currentSlide = (currentSlide + 1) % heroImages.length;
        $('.hero-slide').css('background-image', 'url(' + heroImages[currentSlide] + ')');
    }
    
    // Change background every 5 seconds
    // setInterval(changeHeroBackground, 5000);

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // REEL CARD INTERACTIONS
    // ============================================
    $('.reel-card').on('mouseenter', function() {
        $(this).find('.play-overlay i').addClass('animate-pulse');
    }).on('mouseleave', function() {
        $(this).find('.play-overlay i').removeClass('animate-pulse');
    });

    // ============================================
    // INSTAGRAM FEED HOVER EFFECT
    // ============================================
    $('.insta-post').on('mouseenter', function() {
        $(this).find('img').css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================
    $('#currentYear').text(new Date().getFullYear());

    // ============================================
    // DISABLE RIGHT CLICK ON IMAGES (Optional)
    // ============================================
    /*
    $('img').on('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    */

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    $(document).on('keydown', function(e) {
        // ESC key - close mobile menu
        if (e.key === 'Escape') {
            $('.navbar-collapse').collapse('hide');
        }
        
        // Home key - scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 800);
        }
    });

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if ($('.scroll-progress').length === 0) {
            $('body').prepend('<div class="scroll-progress"></div>');
        }
        $('.scroll-progress').css('width', scrolled + '%');
    }
    
    $(window).on('scroll', updateScrollProgress);

    // ============================================
    // DETECT MOBILE DEVICE
    // ============================================
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    if (isMobile()) {
        $('body').addClass('mobile-device');
        // Disable hover effects on mobile
        $('.hover-lift, .hover-scale').removeClass('hover-lift hover-scale');
    }

    // ============================================
    // PERFORMANCE: DEBOUNCE SCROLL EVENTS
    // ============================================
    function debounce(func, wait) {
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
    
    // Apply debounce to expensive scroll operations
    $(window).on('scroll', debounce(function() {
        // Heavy operations here
    }, 100));

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c👋 Welcome to creator.abdullah!', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
    console.log('%c🍜 Exploring Hyderabad\'s Culinary Scene', 'font-size: 14px; color: #F7931E;');
    console.log('%c📸 Follow: @creator.abdullah_', 'font-size: 14px; color: #4CAF50;');

    // ============================================
    // TOOLTIP INITIALIZATION (Bootstrap)
    // ============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ============================================
    // PREVENT FLASH OF UNSTYLED CONTENT
    // ============================================
    $(document).ready(function() {
        $('body').removeClass('preload');
    });

})(jQuery);

// ============================================
// VANILLA JS - NO JQUERY DEPENDENCIES
// ============================================

// Service Worker Registration (for PWA - Optional)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
            function(registration) {
                console.log('ServiceWorker registration successful');
            },
            function(err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}
*/

// Google Analytics (Replace with your tracking ID)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_TRACKING_ID');
*/

// Facebook Pixel (Replace with your pixel ID)
/*
!function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
*/
