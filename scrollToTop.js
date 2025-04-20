/**
 * Scroll to Top Button Component for RideTogether
 * Adds a simple sphere button with an arrow to scroll back to the top of the page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create and style the scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (!scrollTopBtn) return;
    
    // Apply styles to the button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = '#007bff';
    scrollTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.transform = 'scale(0)';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.zIndex = '1000';
    
    // Add arrow icon
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Function to toggle button visibility
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.transform = 'scale(1)';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.transform = 'scale(0)';
            scrollTopBtn.style.opacity = '0';
        }
    }
    
    // Add hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = window.scrollY > 300 ? 'scale(1)' : 'scale(0)';
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', toggleScrollButton);
    
    // Initial check for button visibility
    toggleScrollButton();
}); 