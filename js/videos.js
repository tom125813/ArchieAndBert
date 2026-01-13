// Video page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Video category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const videoCards = document.querySelectorAll('.video-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter videos
            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Video placeholder click handlers
    const videoPlaceholders = document.querySelectorAll('.video-placeholder, .thumbnail-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('Video content coming soon! We\'re working on creating engaging animated content for young readers.');
        });
        
        // Add hover effect
        placeholder.style.cursor = 'pointer';
    });
});

// Add CSS animation for fade in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);