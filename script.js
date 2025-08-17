// EmailJS Configuration
// IMPORTANT: Replace these placeholder values with your actual EmailJS credentials
// Get these from your EmailJS dashboard: https://dashboard.emailjs.com/
(function() {
    emailjs.init({
        publicKey: "LPGjJRY-FM5tjSPWX", // Get from Account > General in EmailJS dashboard
    });
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Remove no-js class and add js class for progressive enhancement
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.animate-on-scroll, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation delays to cards
    const cards = document.querySelectorAll('.card, .offer');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic form validation
            const requiredFields = ['parentName', 'email', 'phone', 'childName'];
            let isValid = true;
            let firstErrorField = null;

            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                const value = formObject[field];
                
                if (!value || value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                    if (!firstErrorField) {
                        firstErrorField = input;
                    }
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.email && !emailRegex.test(formObject.email)) {
                isValid = false;
                emailField.style.borderColor = '#ff6b6b';
                if (!firstErrorField) {
                    firstErrorField = emailField;
                }
            }

            // Phone validation (basic)
            const phoneField = contactForm.querySelector('[name="phone"]');
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (formObject.phone && !phoneRegex.test(formObject.phone)) {
                isValid = false;
                phoneField.style.borderColor = '#ff6b6b';
                if (!firstErrorField) {
                    firstErrorField = phoneField;
                }
            }

            if (!isValid) {
                // Show error message
                showMessage('Please fill in all required fields correctly.', 'error');
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                return;
            }

            // Send email using EmailJS
            sendEnquiryEmail(formObject);
        });
    }

    // Function to send enquiry email
    function sendEnquiryEmail(formData) {
        // Show loading message
        showMessage('Sending your enquiry...', 'info');
        
        // Format form data into HTML table
        const emailContent = formatFormDataAsTable(formData);
        
        // EmailJS template parameters
        const templateParams = {
            to_email: 'sekar.badri@gmail.com',
            from_name: formData.parentName,
            from_email: formData.email,
            subject: 'New Enquiry from Crayons Montessori Website',
            message_html: emailContent,
            reply_to: formData.email
        };

        // Send email using EmailJS
        // IMPORTANT: Replace with your actual EmailJS Service ID and Template ID
        emailjs.send('service_iaa3s7k', 'template_pxylr7q', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showMessage('Thank you for your enquiry! We will contact you soon.', 'success');
                document.getElementById('contactForm').reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showMessage('Sorry, there was an error sending your enquiry. Please try again or contact us directly.', 'error');
            });
    }

    // Function to format form data as HTML table
    function formatFormDataAsTable(formData) {
        const currentDate = new Date().toLocaleString();
        
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
                    New Enquiry - Crayons Montessori
                </h2>
                
                <p style="color: #555; margin-bottom: 20px;">
                    <strong>Submitted on:</strong> ${currentDate}
                </p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <thead>
                        <tr style="background-color: #3498db; color: white;">
                            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Field</th>
                            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Parent/Guardian Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.parentName || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email Address</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.email || 'Not provided'}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone Number</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.phone || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Child's Name</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.childName || 'Not provided'}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Child's Age</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.childAge || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Program of Interest</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.program || 'Not specified'}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Preferred Start Date</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.preferredStartDate || 'Not specified'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Type of Enquiry</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.enquiryType || 'General enquiry'}</td>
                        </tr>
                        <tr style="background-color: #f9f9f9;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Newsletter Subscription</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.newsletter === 'yes' ? 'Yes, wants to receive updates' : 'No'}</td>
                        </tr>
                        ${formData.message ? `
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message/Additional Information</td>
                            <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${formData.message}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
                
                <div style="background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 20px;">
                    <p style="margin: 0; color: #555; font-size: 14px;">
                        <strong>Note:</strong> This enquiry was submitted through the Crayons Montessori website contact form. 
                        Please respond to the parent's email address: <a href="mailto:${formData.email}">${formData.email}</a>
                    </p>
                </div>
            </div>
        `;
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 10px;
            font-weight: 600;
            text-align: center;
            animation: slideInDown 0.3s ease;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                type === 'info' ?
                'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' :
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;

        // Insert message after form
        contactForm.insertAdjacentElement('afterend', messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutUp 0.3s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }
        }, 5000);
    }

    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero background shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-copy > *, .hero-photo');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Initialize hero elements for animation
    const heroElements = document.querySelectorAll('.hero-copy > *, .hero-photo');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });

    // Add hover effects to cards
    const allCards = document.querySelectorAll('.card, .offer');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
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

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Age calculator for programs (if needed)
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Add program recommendation based on child age (if birth date is provided)
    const childAgeInput = document.querySelector('[name="childAge"]');
    if (childAgeInput) {
        childAgeInput.addEventListener('change', function() {
            const age = parseFloat(this.value);
            let recommendedProgram = '';
            
            if (age >= 1.5 && age < 2.5) {
                recommendedProgram = 'Toddler Program';
            } else if (age >= 2.5 && age < 3.5) {
                recommendedProgram = 'Playgroup';
            } else if (age >= 3.5 && age < 4.5) {
                recommendedProgram = 'Pre-Nursery';
            } else if (age >= 4.5 && age < 5.5) {
                recommendedProgram = 'Nursery';
            }
            
            const programSelect = document.querySelector('[name="interestedProgram"]');
            if (programSelect && recommendedProgram) {
                // Find and select the recommended program
                const options = programSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent.includes(recommendedProgram)) {
                        option.selected = true;
                    }
                });
                
                // Show recommendation message
                const recommendationDiv = document.createElement('div');
                recommendationDiv.className = 'program-recommendation';
                recommendationDiv.innerHTML = `
                    <i class="fa-solid fa-lightbulb"></i>
                    Based on your child's age, we recommend the <strong>${recommendedProgram}</strong>.
                `;
                recommendationDiv.style.cssText = `
                    background: #e8f5e8;
                    color: #2d5a2d;
                    padding: 0.8rem;
                    border-radius: 8px;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    border-left: 4px solid #48c78e;
                `;
                
                // Remove existing recommendation
                const existingRec = document.querySelector('.program-recommendation');
                if (existingRec) {
                    existingRec.remove();
                }
                
                // Add new recommendation
                this.parentNode.appendChild(recommendationDiv);
            }
        });
    }
});

// Utility functions
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

// Optimized scroll handler
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Parallax shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
}, 10);

window.addEventListener('scroll', handleScroll);

// Dropdown functionality for mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    // Add click handler for mobile
    dropdownLink.addEventListener('click', function(e) {
        // Only prevent default on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Toggle dropdown visibility
            const isVisible = dropdownMenu.style.display === 'block';
            
            // Close all other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector('.dropdown-menu').style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const isDropdownClick = event.target.closest('.dropdown');
        if (!isDropdownClick) {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-menu').style.display = 'none';
            });
        }
    }
});

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
} else {
    document.documentElement.style.setProperty('--animation-duration', '0.8s');
}

// Infinite Gallery Functionality
function initializeInfiniteGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack) return;

    // Clone gallery items for seamless infinite scroll
    const galleryItems = Array.from(galleryTrack.children);
    const itemsToClone = Math.max(galleryItems.length, 8); // Ensure enough items for smooth scroll
    
    // Clone items multiple times to create seamless loop
    for (let i = 0; i < 2; i++) {
        galleryItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryTrack.appendChild(clone);
        });
    }

    // Handle image loading errors with placeholder
    const images = galleryTrack.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder div with gradient background
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                text-align: center;
                padding: 1rem;
            `;
            placeholder.innerHTML = `
                <div>
                    <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    ${this.alt || 'Image Coming Soon'}
                </div>
            `;
            
            // Replace the image with placeholder
            this.parentNode.insertBefore(placeholder, this);
            this.style.display = 'none';
        });
    });

    // Pause animation on hover for better UX
    galleryTrack.addEventListener('mouseenter', () => {
        galleryTrack.style.animationPlayState = 'paused';
    });

    galleryTrack.addEventListener('mouseleave', () => {
        galleryTrack.style.animationPlayState = 'running';
    });

    // Adjust animation speed based on screen size
    function adjustGallerySpeed() {
        const screenWidth = window.innerWidth;
        let duration = '30s'; // default
        
        if (screenWidth < 768) {
            duration = '25s'; // faster on mobile
        } else if (screenWidth > 1200) {
            duration = '35s'; // slower on large screens
        }
        
        galleryTrack.style.animationDuration = duration;
    }

    // Initialize and handle resize
    adjustGallerySpeed();
    window.addEventListener('resize', adjustGallerySpeed);

    // Intersection Observer for performance optimization
    if ('IntersectionObserver' in window) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    galleryTrack.style.animationPlayState = 'running';
                } else {
                    galleryTrack.style.animationPlayState = 'paused';
                }
            });
        }, {
            threshold: 0.1
        });

        galleryObserver.observe(galleryTrack.parentElement);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeInfiniteGallery);