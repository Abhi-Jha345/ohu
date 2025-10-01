// Storage Keys
const STORAGE_KEYS = {
    PRODUCTS: 'ohui_products',
    CATEGORIES: 'ohui_categories',
    SETTINGS: 'ohui_settings'
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
        companyName: "OHU Solutions"
    }
};

// State
let productsData = null;
let categoriesData = null;
let settingsData = null;
let currentFilter = 'all';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    setupCategoryFilters();
    displayProducts();
    setupGeneralContact();
    setupEventListeners();
    watchForDataChanges();
});

// Watch for data changes from admin panel
function watchForDataChanges() {
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEYS.PRODUCTS ||
            e.key === STORAGE_KEYS.CATEGORIES ||
            e.key === STORAGE_KEYS.SETTINGS) {

            // Reload data
            loadDataFromStorage();

            // Refresh the display
            setupCategoryFilters();
            displayProducts();
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
    const message = `Hi! I'm interested in the following product from ${settingsData.companyName || 'OHUI Solutions'}:

*Product:* ${product.name}
*Category:* ${categoryLabel}
*Description:* ${product.description}

Could you please provide more information and pricing?`;

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
            const companyName = settingsData.companyName || 'OHUI Solutions';
            const message = `Hi! I would like to inquire about your products and services at ${companyName}.`;

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
