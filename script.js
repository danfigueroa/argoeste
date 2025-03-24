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
            const phoneNumber = '5500000000000' // Example: 55 for Brazil + actual number

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
