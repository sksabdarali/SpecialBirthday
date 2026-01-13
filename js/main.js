// Main JavaScript file for the romantic birthday website

// DOM Elements
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const enterBtn = document.getElementById('enterBtn');

// Floating Hearts Animation
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        
        container.appendChild(heart);
    }
}

// Music Controls
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// Navigation Functions
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation active state
    document.querySelectorAll('.navigation a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + pageId) {
            link.classList.add('active');
        }
    });
}

// Gallery Lightbox Functions
let currentImageIndex = 0;
const galleryImages = [
    'gallery_photos/photo1.jpg',
    'gallery_photos/photo2.jpg',
    'gallery_photos/photo3.jpg',
    'gallery_photos/photo4.jpg',
    'gallery_photos/photo5.jpg',
    'gallery_photos/photo6.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = galleryImages[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function changeSlide(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

// Music Player Functions
function playPause() {
    const song = document.getElementById('romanticSong');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (song.paused) {
        song.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    } else {
        song.pause();
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
}

// Wishes Carousel Functions
let currentWishIndex = 0;
const wishCards = document.querySelectorAll('.wish-card');
const indicators = document.querySelectorAll('.indicator');

function showWish(index) {
    // Hide all wishes
    wishCards.forEach(card => card.classList.remove('active'));
    
    // Show current wish
    wishCards[index].classList.add('active');
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function changeWish(direction) {
    currentWishIndex += direction;
    
    if (currentWishIndex >= wishCards.length) {
        currentWishIndex = 0;
    } else if (currentWishIndex < 0) {
        currentWishIndex = wishCards.length - 1;
    }
    
    showWish(currentWishIndex);
}

function currentWish(index) {
    currentWishIndex = index;
    showWish(index);
}

// Gift Reveal Function
function revealGift() {
    const giftContent = document.getElementById('giftContent');
    giftContent.style.display = 'block';
    
    // Scroll to gift content
    giftContent.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Set up event listeners
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            // Navigate to the about page after clicking enter
            window.location.href = 'about.html';
        });
    }
    
    // Set up lightbox close on outside click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Set up gift button
    const giftBtn = document.getElementById('giftBtn');
    if (giftBtn) {
        giftBtn.addEventListener('click', revealGift);
    }
    
    // Auto-start wishes carousel
    if (wishCards.length > 0) {
        setInterval(() => {
            changeWish(1);
        }, 4000); // Change every 4 seconds
    }
    
    // Auto-play background music on first interaction (to comply with browser policies)
    document.body.addEventListener('click', function() {
        if (bgMusic && bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Auto-play prevented by browser:", e));
        }
    }, { once: true }); // Only run once
    
    // Initialize active navigation link based on current page
    updateActiveNav();
    
    // Special effect for home page
    if (getCurrentPage() === 'index' || getCurrentPage() === '') {
        startHomePageAnimation();
    }
});

// Special home page animation
function startHomePageAnimation() {
    // Add typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
}

// Update active navigation link
function updateActiveNav() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Get current page name from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page || 'index';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});