// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode first
    initializeDarkMode();
    
    // Initialize any interactive elements
    
    // Animation on scroll functionality
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                const animationClass = element.dataset.animation || 'fade-in-up';
                element.classList.add(animationClass);
                element.classList.remove('animate-on-scroll');
            }
        });
    };
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Example: Form validation
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fromLocation = this.querySelector('input[placeholder="Enter location"]').value;
            const toLocation = this.querySelector('input[placeholder="Enter destination"]').value;
            const date = this.querySelector('input[type="date"]').value;
            
            // Validate form
            if (!fromLocation || !toLocation || !date) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Submit form or redirect
            console.log('Search submitted:', { fromLocation, toLocation, date });
            // Uncomment to submit: this.submit();
        });
    }

    // Initialize AOS (Animate On Scroll) library with custom settings
    AOS.init({
        duration: 800,           // Animation duration in ms
        easing: 'ease-out-cubic', // Easing function
        once: true,              // Only animate once
        offset: 50,              // Offset (in px) from the original trigger point
        delay: 0,                // Default delay
        anchorPlacement: 'top-bottom' // Define which position of the element regarding to window should trigger the animation
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroElements = document.querySelectorAll('.parallax-element');
        
        heroElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Counter animation for statistics
    const counterAnimation = () => {
        const counters = document.querySelectorAll('.counter-value');
        const speed = 200; // Animation speed

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-count');
                const data = +counter.innerText;
                const time = value / speed;
                
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            }
            animate();
        });
    };

    // Trigger counter animation when statistics section is in view
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counterAnimation();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }

    // Smooth hover effects for cards
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Path animation for route illustration
    const routePaths = document.querySelectorAll('.route-path-animation');
    routePaths.forEach(path => {
        const length = path.getTotalLength();
        
        // Set up the starting position
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        // Trigger animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    path.style.transition = 'stroke-dashoffset 2s ease-in-out';
                    path.style.strokeDashoffset = '0';
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(path);
    });

    // FAQ Accordion Animation
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Add animation class
            this.classList.add('accordion-button-animated');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('accordion-button-animated');
            }, 300);
        });
    });
});

// Dark Mode Toggle Functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply the saved theme immediately
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update toggle button state
        if (savedTheme === 'dark') {
            darkModeToggle.classList.add('active');
        }

        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button state
            if (newTheme === 'dark') {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    }
}
