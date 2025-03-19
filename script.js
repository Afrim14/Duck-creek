/**
 * Duck Creek Pancake House - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initBackToTop();
    initMenuTabs();
    initGalleryFilter();
    initGalleryModal();
    initMobileMenu();
    initTestimonialSlider();
    initAccessibility();
    initContactForm();
    initLazyLoading();
    addStructuredData();
});

/**
 * Back to Top Button Functionality
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Menu Tabs Functionality
 */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.menu-category').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Gallery Filter Functionality
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Gallery Modal Functionality
 */
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('photoModal');
    
    if (!modal || galleryItems.length === 0) return;
    
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            modalImg.setAttribute('src', imgSrc);
            modalImg.setAttribute('alt', imgAlt);
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the X button
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
        }
    });
}

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    // Create menu toggle button if it doesn't exist
    const navContainer = document.querySelector('.top-menu .container');
    
    if (!navContainer) return;
    
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navContainer.appendChild(menuToggle);
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.top-menu ul');
    
    // Create close button for mobile menu
    if (navMenu && !document.querySelector('.close-menu')) {
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close navigation menu');
        navMenu.appendChild(closeBtn);
    }
    
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuToggle && navMenu) {
        // Toggle menu when hamburger icon is clicked
        menuToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
        });
        
        // Close menu when X is clicked
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && e.target !== menuToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Testimonial Slider Functionality
 * Note: This is already implemented in index.html but moved here for consistency
 */
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialItems.length === 0) return;
    
    let currentIndex = 0;
    let intervalId;
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show testimonial at the given index
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Set up dot click events
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            
            // Reset auto-rotation timer when manually changed
            clearInterval(intervalId);
            startAutoRotation();
        });
    });
    
    // Auto-rotate testimonials
    function startAutoRotation() {
        intervalId = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Start auto-rotation
    startAutoRotation();
    
    // Pause rotation on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(intervalId);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            startAutoRotation();
        });
    }
}

/**
 * Accessibility Improvements
 */
function initAccessibility() {
    // Add ARIA labels to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('aria-label', link.textContent + ' page');
    });
    
    // Make gallery items focusable for keyboard navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View ' + item.querySelector('img').getAttribute('alt'));
        
        // Allow keyboard activation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Add ARIA roles to menu tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
    });
    
    // Add skip to content link for screen readers
    const body = document.body;
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.innerText = 'Skip to main content';
        skipLink.href = '#main-content';
        
        // Apply styles to make it visible only when focused
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '0';
        skipLink.style.background = 'var(--primary-color)';
        skipLink.style.color = 'white';
        skipLink.style.padding = '8px 15px';
        skipLink.style.zIndex = '999';
        skipLink.style.transition = 'top 0.3s';
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        body.insertBefore(skipLink, body.firstChild);
    }
    
    // Add main content id if not present
    const mainContent = document.querySelector('section');
    if (mainContent && !document.getElementById('main-content')) {
        mainContent.id = 'main-content';
    }
}

/**
 * Contact Form Functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        let isValid = true;
        
        if (!name || !email || !subject || !message) {
            isValid = false;
            alert('Please fill in all fields.');
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            alert('Please enter a valid email address.');
        }
        
        // Form is valid - would normally submit to server
        if (isValid) {
            // Create thank you message
            const formContainer = contactForm.parentElement;
            const thankYouMessage = document.createElement('div');
            thankYouMessage.className = 'thank-you-message';
            thankYouMessage.innerHTML = `
                <h3>Thank You!</h3>
                <p>Your message has been sent. We'll get back to you as soon as possible.</p>
                <button id="newMessage" class="btn">Send Another Message</button>
            `;
            
            // Hide form and show thank you message
            contactForm.style.display = 'none';
            formContainer.appendChild(thankYouMessage);
            
            // Add button to show form again
            document.getElementById('newMessage').addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                thankYouMessage.remove();
            });
        }
    });
}

/**
 * Image Lazy Loading
 */
function initLazyLoading() {
    // Check if the browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            // Add a fade-in effect
            image.style.transition = 'opacity 0.3s';
            image.style.opacity = '0';
            
            imageObserver.observe(image);
            
            // Add load event to set opacity to 1 when loaded
            image.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            // If the image is already loaded
            if (image.complete) {
                image.style.opacity = '1';
            }
        });
    }
}

/**
 * Add Structured Data for SEO
 */
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Duck Creek Pancake House",
        "image": "Images/Land.JPG",
        "url": window.location.origin,
        "telephone": "(563) 555-1234",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "4405 State Street",
            "addressLocality": "Riverdale",
            "addressRegion": "IA",
            "postalCode": "52722",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 41.53963897924957,
            "longitude": -90.47751748456548
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "06:00",
                "closes": "14:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "06:00",
                "closes": "15:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "07:00",
                "closes": "15:00"
            }
        ],
        "servesCuisine": ["American", "Breakfast", "Brunch"],
        "priceRange": "$$",
        "paymentAccepted": "Cash, Credit Card"
    };
    
    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
}