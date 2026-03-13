// Component templates for modular HTML
const navbarTemplate = `
<!-- Navigation -->
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">
            <a href="index.html">
                <img src="imgs/text-logo.png" alt="Archie & Bert" class="logo-image">
            </a>
        </div>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="books.html" class="nav-link">Books</a></li>
            <li><a href="characters.html" class="nav-link">Characters</a></li>
            <li><a href="funschool.html" class="nav-link nav-link-funschool">Fun School <span class="nav-tag">Episodes</span></a></li>
            <li><a href="support.html" class="nav-link">Support</a></li>
        </ul>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>
`;

const bannerTemplate = `
<!-- Book 3 Banner -->
<div id="book2-banner" class="book2-banner">
    <div class="banner-content">
        <div class="banner-text">
            <span class="banner-badge">OUT NOW!</span>
            <span class="banner-title">Book 3: The Meeting - The Hippocampus</span>
            <span class="banner-subtitle">available on Amazon</span>
        </div>
        <a href="https://amazon.com/ARCHIE-BERT-3-MEETING-HIPPOCAMPUS/dp/B0GMZFX73B" target="_blank" class="banner-btn">
            <i class="fas fa-shopping-cart"></i>
            Buy Now
        </a>
        <button class="banner-close" onclick="closeBanner()">
            <i class="fas fa-times"></i>
        </button>
    </div>
</div>
`;

const footerTemplate = `
<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Archie &amp; Bert</h3>
                <p>Adventures that inspire friendship, courage, and wonder in young hearts. Every penny of book profit is donated to <strong style="color: var(--warm-gold);">Tormohun Rotary Club</strong>.</p>
                <div class="social-links">
                    <a href="mailto:hello@archieandbert.com" class="social-link" title="Email us"><i class="fas fa-envelope"></i></a>
                    <a href="https://www.instagram.com/archieandbert" class="social-link" title="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@archieandbert" class="social-link" title="TikTok" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.youtube.com/@ArchieBert-y8y" class="social-link" title="YouTube" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="books.html">Books</a></li>
                    <li><a href="characters.html">Characters</a></li>
                    <li><a href="funschool.html">Fun School</a></li>
                    <li><a href="support.html">Support</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Our Mission</h4>
                <p style="font-size: 0.9rem; opacity: 0.85; line-height: 1.6;">Every penny of book profit is donated to <strong style="color: var(--warm-gold);">Tormohun Rotary Club</strong>, based in Torquay, Devon, UK — supporting people and animals in need.</p>
                <a href="support.html" style="display: inline-block; margin-top: 0.5rem; color: var(--warm-gold); text-decoration: none; font-weight: 600; font-size: 0.9rem;">Learn more &rarr;</a>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 Archie &amp; Bert Adventures. All rights reserved.</p>
            <p style="font-size: 0.8rem; opacity: 0.5; margin-top: 0.25rem;">Fun School content is completely free. No subscriptions. No hidden fees.</p>
        </div>
    </div>
</footer>
`;

// Load components using templates
function loadComponent(elementId, template) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = template;
    }
}

// Banner functionality with smooth cross-page transitions
let bannerDismissed = false;
let bannerFullyShown = false;

function isMobile() {
    return window.innerWidth <= 768;
}

function showBanner(skipAnimation = false) {
    if (bannerDismissed) return;
    
    const banner = document.getElementById('book2-banner');
    if (banner) {
        if (skipAnimation) {
            // Disable transition temporarily for instant show
            banner.style.transition = 'none';
            banner.classList.add('show');
            document.body.classList.add('banner-shown');
            bannerFullyShown = true;
            // Store that banner is fully shown
            sessionStorage.setItem('bannerFullyShown', 'true');
            // Re-enable transition after a frame
            requestAnimationFrame(() => {
                banner.style.transition = '';
            });
        } else {
            banner.classList.add('show');
            document.body.classList.add('banner-shown');
            // Mark as fully shown after animation completes (400ms transition)
            setTimeout(() => {
                bannerFullyShown = true;
                sessionStorage.setItem('bannerFullyShown', 'true');
            }, 400);
        }
    }
}

function hideBanner(skipAnimation = false) {
    const banner = document.getElementById('book2-banner');
    if (banner) {
        if (skipAnimation) {
            // Disable transition temporarily for instant hide
            banner.style.transition = 'none';
            banner.classList.remove('show');
            document.body.classList.remove('banner-shown');
            bannerFullyShown = false;
            // Remove banner shown state
            sessionStorage.removeItem('bannerFullyShown');
            // Re-enable transition after a frame
            requestAnimationFrame(() => {
                banner.style.transition = '';
            });
        } else {
            banner.classList.remove('show');
            document.body.classList.remove('banner-shown');
            bannerFullyShown = false;
            // Remove banner shown state
            sessionStorage.removeItem('bannerFullyShown');
        }
    }
}

// Make closeBanner globally available
window.closeBanner = function() {
    bannerDismissed = true;
    hideBanner();
    // Store dismissal in localStorage (persists across sessions)
    localStorage.setItem('bannerDismissed', 'true');
    // Remove from sessionStorage
    sessionStorage.removeItem('bannerFullyShown');
}

function handleScroll() {
    if (bannerDismissed) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show banner when at the very top (within 50px)
    if (scrollTop <= 50) {
        showBanner();
    } else {
        hideBanner();
    }
}

// Handle window resize to update mobile/desktop behavior
function handleResize() {
    // Force recalculation of banner positioning on resize
    const banner = document.getElementById('book2-banner');
    if (banner && banner.classList.contains('show')) {
        // Temporarily hide and show to trigger CSS recalculation
        banner.classList.remove('show');
        setTimeout(() => {
            if (!bannerDismissed && (window.pageYOffset || document.documentElement.scrollTop) <= 50) {
                banner.classList.add('show');
            }
        }, 10);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if banner was previously dismissed (persists across sessions)
    bannerDismissed = localStorage.getItem('bannerDismissed') === 'true';
    
    // Check if banner was FULLY shown on previous page (only for current session)
    const wasBannerFullyShown = sessionStorage.getItem('bannerFullyShown') === 'true';
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Pre-apply banner-shown class if needed BEFORE loading components to prevent layout shift
    // Don't add transitions-enabled yet - that will prevent animations
    if (scrollTop <= 50 && wasBannerFullyShown && !bannerDismissed) {
        document.body.classList.add('banner-shown');
    }
    
    // Load banner first (before navbar)
    loadComponent('banner-placeholder', bannerTemplate);
    
    // Load navbar
    loadComponent('navbar-placeholder', navbarTemplate);
    
    // Load footer
    loadComponent('footer-placeholder', footerTemplate);
    
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Initialize mobile menu after navbar is loaded
    setTimeout(initializeMobileMenu, 100);
    
    // Initialize banner immediately after components load
    requestAnimationFrame(() => {
        const banner = document.getElementById('book2-banner');
        
        // If banner should be shown instantly (was shown on previous page)
        if (scrollTop <= 50 && wasBannerFullyShown && !bannerDismissed && banner) {
            // Add show class immediately - CSS will prevent animation via body.banner-shown:not(.transitions-enabled)
            banner.classList.add('show');
            bannerFullyShown = true;
            
            // After rendering is complete, enable transitions for future interactions
            requestAnimationFrame(() => {
                document.body.classList.add('transitions-enabled');
            });
        } else {
            // Normal behavior - enable transitions immediately and check scroll position
            document.body.classList.add('transitions-enabled');
            handleScroll();
        }
        
        // Add scroll listener
        window.addEventListener('scroll', handleScroll);
        
        // Add resize listener for mobile/desktop switching
        window.addEventListener('resize', handleResize);
    });
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}