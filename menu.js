// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger button if it doesn't exist
    const header = document.querySelector('header .container');
    if (header && !document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert before nav
        const nav = document.querySelector('nav');
        if (nav) {
            nav.parentNode.insertBefore(menuToggle, nav);
        }
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (menuToggle && nav) {
        // Toggle mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        body.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking a non-dropdown link
        const navLinks = nav.querySelectorAll('a:not(.has-dropdown)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
            });
        });
    }
    
    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a.has-dropdown');
    
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function(e) {
            // Only on mobile/tablet
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(function(d) {
                    if (d !== parent) {
                        d.classList.remove('active');
                    }
                });
                
                parent.classList.toggle('active');
            }
        });
    });
    
    // Close dropdowns when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
            
            document.querySelectorAll('.dropdown').forEach(function(d) {
                d.classList.remove('active');
            });
        }
    });
});
