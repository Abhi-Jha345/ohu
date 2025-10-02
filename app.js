// Storage Keys
const STORAGE_KEYS = {
    PRODUCTS: 'ohui_products',
    CATEGORIES: 'ohui_categories',
    SETTINGS: 'ohui_settings',
    BUSINESS: 'ohui_business',
    HERO: 'ohui_hero',
    VIDEO: 'ohui_video',
    FEATURES: 'ohui_features',
    PARTNERS: 'ohui_partners',
    CLIENTS: 'ohui_clients',
    SERVICES: 'ohui_services',
    REVIEWS: 'ohui_reviews',
    REVIEW_SETTINGS: 'ohui_review_settings',
    ABOUT: 'ohui_about'
};

// Default Data (fallback if no admin data exists)
const DEFAULT_DATA = {
    products: [
        {
            id: 1,
            name: "4K Ultra HD CCTV Camera",
            category: "cctv",
            description: "High-resolution 4K security camera with night vision and weatherproof design.",
            price: "Contact for Price",
            image: "📹"
        },
        {
            id: 2,
            name: "Dome CCTV Camera",
            category: "cctv",
            description: "Indoor/outdoor dome camera with 360° coverage and motion detection.",
            price: "Contact for Price",
            image: "🎥"
        },
        {
            id: 3,
            name: "PTZ Security Camera",
            category: "cctv",
            description: "Pan-Tilt-Zoom camera with remote control and auto-tracking features.",
            price: "Contact for Price",
            image: "📷"
        },
        {
            id: 4,
            name: "Wireless IP Camera",
            category: "cctv",
            description: "WiFi-enabled camera with mobile app access and cloud storage.",
            price: "Contact for Price",
            image: "📸"
        },
        {
            id: 5,
            name: "NVR 16 Channel System",
            category: "cctv",
            description: "Network Video Recorder supporting up to 16 cameras with 4TB storage.",
            price: "Contact for Price",
            image: "💾"
        },
        {
            id: 6,
            name: "Gaming Desktop PC",
            category: "computer",
            description: "High-performance gaming PC with latest graphics card and processor.",
            price: "Contact for Price",
            image: "🖥️"
        },
        {
            id: 7,
            name: "Business Laptop",
            category: "computer",
            description: "Professional laptop with Intel i7, 16GB RAM, and 512GB SSD.",
            price: "Contact for Price",
            image: "💻"
        },
        {
            id: 8,
            name: "All-in-One PC",
            category: "computer",
            description: "Space-saving all-in-one computer with touchscreen display.",
            price: "Contact for Price",
            image: "🖥️"
        },
        {
            id: 9,
            name: "Wireless Mouse & Keyboard",
            category: "computer",
            description: "Ergonomic wireless combo with long battery life.",
            price: "Contact for Price",
            image: "⌨️"
        },
        {
            id: 10,
            name: "External SSD 1TB",
            category: "computer",
            description: "Ultra-fast portable SSD with USB-C connection.",
            price: "Contact for Price",
            image: "💿"
        },
        {
            id: 11,
            name: "27-inch Monitor",
            category: "computer",
            description: "Full HD LED monitor with IPS panel and HDMI connectivity.",
            price: "Contact for Price",
            image: "🖥️"
        },
        {
            id: 12,
            name: "UPS Battery Backup",
            category: "computer",
            description: "Uninterruptible power supply for computers and networking equipment.",
            price: "Contact for Price",
            image: "🔋"
        }
    ],
    categories: [
        { id: "cctv", name: "CCTV Cameras" },
        { id: "computer", name: "Computer Appliances" }
    ],
    settings: {
        whatsappNumber: "+917000651491",
        companyName: "OHU Security Solutions"
    }
};

// State
let productsData = null;
let categoriesData = null;
let settingsData = null;
let businessData = null;
let heroData = null;
let featuresData = null;
let partnersData = null;
let clientsData = null;
let servicesData = null;
let reviewsData = null;
let reviewSettingsData = null;
let aboutData = null;
let currentFilter = 'all';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    setupCategoryFilters();
    displayProducts();
    renderDynamicSections();
    setupGeneralContact();
    setupEventListeners();
    watchForDataChanges();
    setupScrollToTop();
    setupContactForm();
    setupAnimations();
    setupMobileMenu();
});

// Watch for data changes from admin panel
function watchForDataChanges() {
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', (e) => {
        const watchedKeys = [
            STORAGE_KEYS.PRODUCTS,
            STORAGE_KEYS.CATEGORIES,
            STORAGE_KEYS.SETTINGS,
            STORAGE_KEYS.BUSINESS,
            STORAGE_KEYS.HERO,
            STORAGE_KEYS.VIDEO,
            STORAGE_KEYS.FEATURES,
            STORAGE_KEYS.PARTNERS,
            STORAGE_KEYS.CLIENTS,
            STORAGE_KEYS.SERVICES,
            STORAGE_KEYS.REVIEWS,
            STORAGE_KEYS.REVIEW_SETTINGS,
            STORAGE_KEYS.ABOUT
        ];

        if (watchedKeys.includes(e.key)) {
            // Reload data
            loadDataFromStorage();

            // Refresh all displays
            setupCategoryFilters();
            displayProducts();
            renderDynamicSections();
            setupGeneralContact();
            setupEventListeners();

            // Show notification
            showUpdateNotification();
        }
    });
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = '✓ Content updated from admin panel!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load data from localStorage or use defaults
function loadDataFromStorage() {
    productsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || DEFAULT_DATA.products;
    categoriesData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || DEFAULT_DATA.categories;
    settingsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_DATA.settings;
    businessData = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESS)) || null;
    heroData = JSON.parse(localStorage.getItem(STORAGE_KEYS.HERO)) || null;
    featuresData = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES)) || null;
    partnersData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS)) || null;
    clientsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS)) || null;
    servicesData = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)) || null;
    reviewsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || null;
    reviewSettingsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS)) || null;
    aboutData = JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT)) || null;
}

// Render all dynamic sections from admin data
function renderDynamicSections() {
    renderHeroSection();
    renderFeaturesSection();
    renderPartnersSection();
    renderClientsSection();
    renderServicesSection();
    renderReviewsSection();
    renderAboutSection();
    renderVideoSection();
}

// Render Hero Section
function renderHeroSection() {
    if (!heroData) return;

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle && heroData.heading) {
        heroTitle.textContent = heroData.heading;
    }
    if (heroSubtitle && heroData.subheading) {
        heroSubtitle.textContent = heroData.subheading;
    }

    // Update trust badges
    const badges = document.querySelectorAll('.trust-badge');
    if (badges.length >= 4) {
        if (heroData.badge1Number) badges[0].querySelector('h3').textContent = heroData.badge1Number;
        if (heroData.badge1Text) badges[0].querySelector('p').textContent = heroData.badge1Text;
        if (heroData.badge2Number) badges[1].querySelector('h3').textContent = heroData.badge2Number;
        if (heroData.badge2Text) badges[1].querySelector('p').textContent = heroData.badge2Text;
        if (heroData.badge3Number) badges[2].querySelector('h3').textContent = heroData.badge3Number;
        if (heroData.badge3Text) badges[2].querySelector('p').textContent = heroData.badge3Text;
        if (heroData.badge4Number) badges[3].querySelector('h3').textContent = heroData.badge4Number;
        if (heroData.badge4Text) badges[3].querySelector('p').textContent = heroData.badge4Text;
    }
}

// Render Features Section
function renderFeaturesSection() {
    if (!featuresData || featuresData.length === 0) return;

    const container = document.querySelector('#features .features-grid');
    if (!container) return;

    container.innerHTML = '';

    featuresData.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        container.appendChild(card);
    });
}

// Render Partners Section
function renderPartnersSection() {
    if (!partnersData || partnersData.length === 0) return;

    const container = document.querySelector('#partners .partners-grid');
    if (!container) return;

    container.innerHTML = '';

    partnersData.forEach(partner => {
        const logo = document.createElement('div');
        logo.className = 'partner-logo';
        logo.textContent = partner.logo;
        logo.title = partner.name;
        container.appendChild(logo);
    });
}

// Render Clients Section
function renderClientsSection() {
    if (!clientsData || clientsData.length === 0) return;

    const container = document.querySelector('#clients .clients-grid');
    if (!container) return;

    container.innerHTML = '';

    clientsData.forEach(client => {
        const card = document.createElement('div');
        card.className = 'client-card';
        card.innerHTML = `
            <div class="client-icon">${client.icon}</div>
            <h4>${client.name}</h4>
        `;
        container.appendChild(card);
    });
}

// Render Services Section
function renderServicesSection() {
    if (!servicesData || servicesData.length === 0) return;

    const container = document.querySelector('#services .services-grid');
    if (!container) return;

    container.innerHTML = '';

    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        container.appendChild(card);
    });
}

// Render Reviews Section
function renderReviewsSection() {
    if (!reviewsData || reviewsData.length === 0) return;

    // Update review stats
    if (reviewSettingsData) {
        const ratingEl = document.querySelector('.google-rating h3');
        const countEl = document.querySelector('.google-rating p');

        if (ratingEl && reviewSettingsData.rating) {
            ratingEl.innerHTML = `${reviewSettingsData.rating} <span style="color: #ffa726;">★★★★★</span>`;
        }
        if (countEl && reviewSettingsData.count) {
            countEl.textContent = `Based on ${reviewSettingsData.count} reviews`;
        }
    }

    // Render visible reviews only
    const container = document.querySelector('#reviews .testimonials-grid');
    if (!container) return;

    container.innerHTML = '';

    const visibleReviews = reviewsData.filter(r => r.visible !== false);

    visibleReviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        // Get first letter for avatar
        const initial = review.name.charAt(0).toUpperCase();

        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-avatar">${initial}</div>
                <div class="reviewer-info">
                    <strong>${review.name}</strong>
                    <div class="stars">${stars}</div>
                </div>
                <span class="review-source">${review.source}</span>
            </div>
            <p class="testimonial-text">"${review.text}"</p>
            <div class="review-date">${review.date}</div>
        `;
        container.appendChild(card);
    });
}

// Render About Section
function renderAboutSection() {
    if (!aboutData) return;

    if (aboutData.intro) {
        const introEl = document.querySelector('#about .about-intro p');
        if (introEl) introEl.textContent = aboutData.intro;
    }

    if (aboutData.mission) {
        const missionEl = document.querySelector('.mission-box p');
        if (missionEl) missionEl.textContent = aboutData.mission;
    }

    if (aboutData.vision) {
        const visionEl = document.querySelector('.vision-box p');
        if (visionEl) visionEl.textContent = aboutData.vision;
    }
}

// Render Video Section
function renderVideoSection() {
    const videoData = JSON.parse(localStorage.getItem('ohui_video')) || null;
    if (!videoData) return;

    const videoSection = document.querySelector('#video');
    if (!videoSection) return;

    // Hide/show section based on enabled state
    if (videoData.enabled === false) {
        videoSection.style.display = 'none';
        return;
    } else {
        videoSection.style.display = 'block';
    }

    // Update section title and subtitle
    if (videoData.sectionTitle) {
        const title = videoSection.querySelector('.section-title');
        if (title) title.textContent = videoData.sectionTitle;
    }
    if (videoData.sectionSubtitle) {
        const subtitle = videoSection.querySelector('.section-subtitle');
        if (subtitle) subtitle.textContent = videoData.sectionSubtitle;
    }

    // Update video URL
    if (videoData.videoUrl) {
        const iframe = document.getElementById('main-video');
        if (iframe) iframe.src = videoData.videoUrl;
    }

    // Update video info
    if (videoData.contentTitle) {
        const title = document.getElementById('video-title');
        if (title) title.textContent = videoData.contentTitle;
    }
    if (videoData.contentDescription) {
        const description = document.getElementById('video-description');
        if (description) description.textContent = videoData.contentDescription;
    }
}

// Setup category filter buttons dynamically
function setupCategoryFilters() {
    const filterContainer = document.querySelector('.category-filter');

    // Keep "All Products" button
    filterContainer.innerHTML = '<button class="filter-btn active" data-category="all">All Products</button>';

    // Add category buttons dynamically
    categoriesData.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-category', category.id);
        btn.textContent = category.name;
        filterContainer.appendChild(btn);
    });
}

// Display products based on current filter
function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const filteredProducts = currentFilter === 'all'
        ? productsData
        : productsData.filter(p => p.category === currentFilter);

    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    // Get category name
    const category = categoriesData.find(c => c.id === product.category);
    const categoryLabel = category ? category.name : product.category;

    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <span class="product-category">${categoryLabel}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price}</div>
            <a href="#" class="whatsapp-btn" data-product-id="${product.id}">
                Inquire on WhatsApp
            </a>
        </div>
    `;

    // Add WhatsApp click handler
    const whatsappBtn = card.querySelector('.whatsapp-btn');
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sendWhatsAppMessage(product);
    });

    return card;
}

// Generate WhatsApp link and open it
function sendWhatsAppMessage(product) {
    // Get category name
    const category = categoriesData.find(c => c.id === product.category);
    const categoryLabel = category ? category.name : product.category;

    // Create formatted message
    const message = `Hi! I'm interested in the following product from ${settingsData.companyName || 'OHU Security Solutions'}:

*Product:* ${product.name}
*Category:* ${categoryLabel}
*Description:* ${product.description}

Could you please provide more information and pricing?

📍 Enquiring from: Gwalior Region`;

    // Clean phone number (remove +, spaces, dashes)
    const cleanNumber = settingsData.whatsappNumber;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Setup general contact button
function setupGeneralContact() {
    const generalContactBtn = document.getElementById('general-contact');
    if (generalContactBtn) {
        generalContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const companyName = settingsData.companyName || 'OHU Security Solutions';
            const message = `Hi! I would like to inquire about your security and technology products and services.

I'm interested in learning more about:
- CCTV Installation & Surveillance Systems
- Computer Appliances
- Professional Installation Services
- After-sales Support

📍 Location: Gwalior Region

Please share more details. Thank you!`;

            // Clean phone number (remove +, spaces, dashes)
            const cleanNumber = settingsData.whatsappNumber.replace(/[\+\s\-]/g, '');

            const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update filter and display products
            currentFilter = btn.getAttribute('data-category');
            displayProducts();
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Setup scroll to top button
function setupScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');

    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `*New Inquiry from Website*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Interest:* ${interest}

*Message:*
${message}

---
Sent from OHU Solutions Website`;

        // Clean phone number
        const cleanNumber = settingsData.whatsappNumber.replace(/[\+\s\-]/g, '');

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification('✓ Opening WhatsApp...', 'success');

        // Reset form
        form.reset();
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Setup animations on scroll
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .product-card,
        .partner-logo,
        .service-card,
        .testimonial-card,
        .stat-box,
        .mission-box
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav ul');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            nav.classList.remove('active');
        }
    });
}

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
