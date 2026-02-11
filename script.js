/* ===================================
   ORANGE HOMECARE - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    const scrollLinks = document.querySelectorAll('a[href^="#"], .scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (mobileMenuBtn && navLinks) {
                        mobileMenuBtn.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                    
                    // Get navbar height for offset
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    
                    // Calculate position
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ===================================
    // ORDER FORM SUBMISSION VIA WHATSAPP
    // ===================================
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const plan = document.getElementById('plan').value;
            const city = document.getElementById('city').value.trim();
            const quantity = document.getElementById('quantity').value;
            const address = document.getElementById('address').value.trim();
            const notes = document.getElementById('notes').value.trim();
            
            // Validate required fields
            if (!fullName || !phone || !plan || !city || !address) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Build WhatsApp message
            let message = `🛒 *NEW ORDER - GLEAM DISH WASH*\n\n`;
            message += `*Customer Details:*\n`;
            message += `👤 Name: ${fullName}\n`;
            message += `📞 Phone: ${phone}\n`;
            if (email) message += `📧 Email: ${email}\n`;
            message += `\n*Order Details:*\n`;
            message += `📦 Product: ${plan}\n`;
            message += `🔢 Quantity: ${quantity}\n`;
            message += `\n*Delivery Address:*\n`;
            message += `🏙️ City: ${city}\n`;
            message += `📍 Address: ${address}\n`;
            if (notes) message += `\n📝 Notes: ${notes}\n`;
            message += `\n---\n_Sent from Orange Homecare Website_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp number
            const whatsappNumber = '2348134566721';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Show confirmation
            alert('Great! Your order details will be sent to WhatsApp. Please confirm and send the message to complete your order.');
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // ===================================
    // CONTACT FORM SUBMISSION VIA WHATSAPP
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Build WhatsApp message
            let whatsappMessage = `💬 *NEW MESSAGE - ORANGE HOMECARE*\n\n`;
            whatsappMessage += `*From:*\n`;
            whatsappMessage += `👤 Name: ${name}\n`;
            whatsappMessage += `📧 Email: ${email}\n`;
            if (phone) whatsappMessage += `📞 Phone: ${phone}\n`;
            whatsappMessage += `\n*Subject:* ${subject}\n`;
            whatsappMessage += `\n*Message:*\n${message}\n`;
            whatsappMessage += `\n---\n_Sent from Orange Homecare Website_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp number
            const whatsappNumber = '2348134566721';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Show confirmation
            alert('Your message will be sent to WhatsApp. Please confirm and send to reach us.');
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // ===================================
    // SCROLL ANIMATIONS (FADE IN)
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const fadeElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial, .value-card, .step-card, .faq-item, .about-block');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ===================================
    // HANDLE HASH ON PAGE LOAD
    // ===================================
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // ===================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        link.getAttribute('href') === `index.html#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
});

// ===================================
// CSS FOR FADE IN ANIMATION (ADD TO STYLES)
// ===================================
// Add these styles via JavaScript
const fadeStyles = document.createElement('style');
fadeStyles.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(fadeStyles);
