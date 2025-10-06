document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon')
    const nav = document.querySelector('nav')

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function () {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block'
        })
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const targetId = this.getAttribute('href')
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                })

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none'
                }
            }
        })
    })

    // WhatsApp Button Functionality
    const whatsappBtn = document.getElementById('whatsapp-btn')

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function (e) {
            e.preventDefault()

            // Replace with the actual phone number (with country code)
            const phoneNumber = '5577999742551' // Número correto: 55 (Brasil) + 77 (DDD) + 999742551

            // Pre-programmed message
            const message =
                'Olá! Vim pelo site da Argoeste e gostaria de mais informações sobre os produtos.'

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                message
            )}`

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank')
        })
    }

    // Product Carousel
    class ProductCarousel {
        constructor() {
            this.currentSlide = 0;
            this.slides = document.querySelectorAll('.product-slide');
            this.indicators = document.querySelectorAll('.indicator');
            this.prevBtn = document.querySelector('.carousel-btn-prev');
            this.nextBtn = document.querySelector('.carousel-btn-next');
            this.autoplayInterval = null;
            this.autoplayDelay = 5000;
            this.isPlaying = true;
            
            this.init();
        }
        
        init() {
            if (this.slides.length === 0) return;
            
            // Event listeners for navigation buttons
            this.prevBtn?.addEventListener('click', () => this.prevSlide());
            this.nextBtn?.addEventListener('click', () => this.nextSlide());
            
            // Event listeners for indicators
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
            
            // Touch/swipe support
            this.addTouchSupport();
            
            // Auto-play functionality
            this.startAutoplay();
            
            // Pause on hover
            const carousel = document.querySelector('.product-carousel');
            carousel?.addEventListener('mouseenter', () => this.pauseAutoplay());
            carousel?.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        goToSlide(index) {
            // Remove active class from current slide and indicator
            this.slides[this.currentSlide]?.classList.remove('active');
            this.indicators[this.currentSlide]?.classList.remove('active');
            
            // Update current slide
            this.currentSlide = index;
            
            // Add active class to new slide and indicator
            this.slides[this.currentSlide]?.classList.add('active');
            this.indicators[this.currentSlide]?.classList.add('active');
            
            // Update carousel track position
            const track = document.querySelector('.carousel-track');
            if (track) {
                track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            }
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex);
        }
        
        startAutoplay() {
            if (!this.isPlaying) return;
            
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        }
        
        pauseAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
        
        addTouchSupport() {
            const carousel = document.querySelector('.carousel-container');
            if (!carousel) return;
            
            let startX = 0;
            let endX = 0;
            
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
            
            const handleSwipe = () => {
                const threshold = 50;
                const diff = startX - endX;
                
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            };
            
            this.handleSwipe = handleSwipe;
        }
    }

    // Initialize carousel
    new ProductCarousel();

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form')

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault()

            // Get the email input value
            const emailInput = this.querySelector('input[type="email"]')
            const email = emailInput.value

            // Here you would typically send the email to your server
            // For now, we'll just show an alert
            alert(`Obrigado por se inscrever com o email: ${email}`)

            // Clear the form
            this.reset()
        })
    }

    // Header Scroll Effect
    const header = document.querySelector('header')

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)'
        } else {
            header.style.padding = '15px 0'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
        }
    })
})
