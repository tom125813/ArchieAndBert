// Banner functionality - works on all pages
let bannerDismissed = false;
let bannerWasShown = false;

function showBanner(skipAnimation = false) {
    if (bannerDismissed) return;
    
    const banner = document.getElementById('book2-banner');
    if (banner) {
        if (skipAnimation) {
            banner.style.transition = 'none';
            banner.classList.add('show');
            document.body.classList.add('banner-shown');
            requestAnimationFrame(() => {
                banner.style.transition = '';
            });
        } else {
            banner.classList.add('show');
            document.body.classList.add('banner-shown');
        }
        bannerWasShown = true;
        sessionStorage.setItem('bannerShown', 'true');
    }
}

function hideBanner(skipAnimation = false) {
    const banner = document.getElementById('book2-banner');
    if (banner) {
        if (skipAnimation) {
            banner.style.transition = 'none';
            banner.classList.remove('show');
            document.body.classList.remove('banner-shown');
            requestAnimationFrame(() => {
                banner.style.transition = '';
            });
        } else {
            banner.classList.remove('show');
            document.body.classList.remove('banner-shown');
        }
        bannerWasShown = false;
        sessionStorage.removeItem('bannerShown');
    }
}

function closeBanner() {
    bannerDismissed = true;
    hideBanner();
    localStorage.setItem('bannerDismissed', 'true');
    sessionStorage.removeItem('bannerShown');
}

function handleBannerScroll() {
    if (bannerDismissed) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop <= 50) {
        showBanner();
    } else {
        hideBanner();
    }
}

// Initialize banner on all pages
document.addEventListener('DOMContentLoaded', function() {
    bannerDismissed = localStorage.getItem('bannerDismissed') === 'true';
    const wasBannerShown = sessionStorage.getItem('bannerShown') === 'true';
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop <= 50 && wasBannerShown && !bannerDismissed) {
        const hero = document.querySelector('.hero, .page-hero, .books-hero');
        const navbar = document.querySelector('.navbar');
        
        if (hero) hero.style.transition = 'none';
        if (navbar) navbar.style.transition = 'none';
        
        showBanner(true);
        
        requestAnimationFrame(() => {
            if (hero) hero.style.transition = '';
            if (navbar) navbar.style.transition = '';
        });
    } else {
        handleBannerScroll();
    }
    
    window.addEventListener('scroll', handleBannerScroll);
});

// Make closeBanner available globally
window.closeBanner = closeBanner;

// Hamburger menu functionality - immediate initialization for hardcoded navbar
console.log('Script loaded, initializing hamburger menu...');

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    
    if (hamburger && navMenu) {
        console.log('Hamburger menu elements found, adding event listeners...');
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Hamburger active:', hamburger.classList.contains('active'));
            console.log('Nav menu active:', navMenu.classList.contains('active'));
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
        
        return true;
    } else {
        console.log('Hamburger menu elements not found');
        return false;
    }
}

// Try to initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    initHamburgerMenu();
}

// Also try after a delay for dynamic content
setTimeout(initHamburgerMenu, 100);
setTimeout(initHamburgerMenu, 500);

// Smooth scrolling for navigation links
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

// Book preview modal functionality
function openPreview() {
    // This would open a modal with book preview
    alert('Book preview feature coming soon! For now, you can purchase the full book on Amazon.');
}

// Notify me functionality for upcoming books
function notifyMe(bookId) {
    const bookTitles = {
        'book2': 'The Safari Tourist Invasion',
        'book3': 'Secrets of the Watering Hole',
        'collection': 'The Complete Collection'
    };
    
    const email = prompt(`Enter your email to be notified when "${bookTitles[bookId]}" is available:`);
    if (email && email.includes('@')) {
        alert(`Thank you! We'll notify you at ${email} when ${bookTitles[bookId]} is ready!`);
        // Here you would typically send this to your backend
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}

// Share book functionality
function shareBook(bookId) {
    const bookTitles = {
        'chaos-savanna': 'Chaos on the Savanna',
        'safari-tourist-invasion': 'The Safari Tourist Invasion'
    };
    
    const bookLinks = {
        'chaos-savanna': 'https://www.amazon.co.uk/Archie-Bert-Mr-Stephen-MORRIS/dp/B0G51VD5V4',
        'safari-tourist-invasion': 'https://www.amazon.co.uk/ARCHIE-BERT-SAFARI-TOURIST-INVASION/dp/B0GDWR7R9T'
    };
    
    if (navigator.share) {
        navigator.share({
            title: `Archie & Bert: ${bookTitles[bookId]}`,
            text: `Check out this amazing children's book: ${bookTitles[bookId]}`,
            url: bookLinks[bookId]
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Check out this amazing children's book: ${bookTitles[bookId]} - ${bookLinks[bookId]}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Book link copied to clipboard!');
        }).catch(() => {
            alert(`Share this book: ${shareText}`);
        });
    }
}

// Notify me functionality for upcoming book (legacy support)
document.addEventListener('DOMContentLoaded', function() {
    const notifyBtn = document.querySelector('.upcoming-details .btn-outline');
    if (notifyBtn && notifyBtn.textContent === 'Notify Me') {
        notifyBtn.addEventListener('click', function() {
            notifyMe('book2');
        });
    }
    
    // Hamburger menu functionality - robust implementation
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            console.log('Hamburger menu elements found, initializing...');
            
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Hamburger clicked');
                
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
        } else {
            console.log('Hamburger menu elements not found, retrying...');
            // Retry after a short delay if elements aren't found
            setTimeout(initHamburgerMenu, 500);
        }
    }
    
    // Initialize hamburger menu
    initHamburgerMenu();
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.book-feature, .upcoming-book, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});