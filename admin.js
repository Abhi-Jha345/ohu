// Admin Authentication
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Storage Keys
const STORAGE_KEYS = {
    AUTH: 'ohui_admin_auth',
    PRODUCTS: 'ohui_products',
    CATEGORIES: 'ohui_categories',
    SETTINGS: 'ohui_settings',
    BUSINESS: 'ohui_business',
    HERO: 'ohui_hero',
    VIDEO: 'ohui_video',
    REVIEWS: 'ohui_reviews',
    REVIEW_SETTINGS: 'ohui_review_settings',
    SOCIAL: 'ohui_social',
    ABOUT: 'ohui_about',
    FEATURES: 'ohui_features',
    PARTNERS: 'ohui_partners',
    CLIENTS: 'ohui_clients',
    SERVICES: 'ohui_services',
    LEGAL: 'ohui_legal'
};

// Default Data
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
            name: "Gaming Desktop PC",
            category: "computer",
            description: "High-performance gaming PC with latest graphics card and processor.",
            price: "Contact for Price",
            image: "🖥️"
        }
    ],
    categories: [
        { id: "cctv", name: "CCTV Cameras" },
        { id: "computer", name: "Computer Appliances" }
    ],
    settings: {
        whatsappNumber: "+917000651491",
        companyName: "OHU Security Solutions"
    },
    business: {
        companyName: "OHU Security Solutions",
        tagline: "Your Trusted Security Partner in Gwalior",
        whatsapp: "+917000651491",
        email: "info@ohusolutions.com",
        address: "Achleshwar Complex, Naka Chandravadni, Lashkar, Gwalior - 474001",
        hours: "Mon - Sun: 10:00 AM - 7:00 PM",
        mapsUrl: "https://www.google.com/maps/place/OhU+Security+Solutions",
        established: "2009"
    },
    hero: {
        heading: "Complete Security & Technology Solutions in Gwalior",
        subheading: "Premium CCTV Surveillance Systems • Computer Appliances • Professional Installation",
        badge1Number: "5+",
        badge1Text: "Years Experience",
        badge2Number: "500+",
        badge2Text: "Happy Customers",
        badge3Number: "4.5/5",
        badge3Text: "Google Rating",
        badge4Number: "24/7",
        badge4Text: "Support Available"
    },
    reviewSettings: {
        rating: "4.5",
        count: "120+",
        googleLink: "https://search.google.com/local/writereview?placeid=ChIJt8rhhDEudDkR7bGrQIHuq9I",
        justdialLink: "https://www.justdial.com/Gwalior/OhU-Security-Solutions-Naka-Chandravadni-Lashkar/9999PX751-X751-210517100018-M9W4_BZDET"
    },
    reviews: [
        {
            id: 1,
            name: "Sumit Jha",
            rating: 5,
            text: "Good work as always. Best quality as always. Unlike any other, humble and helpful in their work. This place is free from rooking.",
            date: "18th May, 2021",
            source: "JustDial"
        },
        {
            id: 2,
            name: "Aditya Pratap",
            rating: 5,
            text: "Best Shop of CCTV Cameras in Gwalior",
            date: "5th June, 2021",
            source: "JustDial"
        },
        {
            id: 3,
            name: "D Kumar",
            rating: 5,
            text: "Overall very outstanding service.",
            date: "29th May, 2021",
            source: "JustDial"
        },
        {
            id: 4,
            name: "Kamlesh",
            rating: 5,
            text: "Best cctv shop in Gwalior.",
            date: "22nd May, 2021",
            source: "JustDial"
        }
    ],
    social: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: ""
    },
    about: {
        intro: "Leading provider of CCTV surveillance systems and computer appliances in Gwalior. We specialize in delivering comprehensive security solutions for homes, businesses, and institutions across Gwalior and surrounding regions. Our commitment is to provide reliable, cutting-edge technology with professional installation and exceptional after-sales support.",
        mission: "To provide cutting-edge security and technology solutions that protect what matters most to our clients, while delivering exceptional service and value.",
        vision: "To be the most trusted name in security and technology solutions, known for innovation, reliability, and customer-first approach."
    },
    video: {
        enabled: true,
        sectionTitle: "See Our Work in Action",
        sectionSubtitle: "Watch how we transform security and technology solutions for our clients",
        videoUrl: "",
        contentTitle: "Our Latest Project",
        contentDescription: "Explore our professional installation services and customer testimonials"
    }
};

// State
let currentProductId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    checkAuth();
    setupEventListeners();
});

// Initialize default data if not exists
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_DATA.products));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_DATA.categories));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_DATA.settings));
    }
}

// Check Authentication
function checkAuth() {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';

    if (isAuthenticated) {
        showAdminPanel();
    } else {
        showLoginPanel();
    }
}

function showLoginPanel() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('admin-section').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    loadProducts();
    loadCategories();
    loadSettings();
}

// Setup Event Listeners
function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Products
    document.getElementById('add-product-btn').addEventListener('click', () => openProductModal());
    document.getElementById('product-form').addEventListener('submit', handleSaveProduct);

    // Categories
    document.getElementById('add-category-btn').addEventListener('click', openCategoryModal);
    document.getElementById('category-form').addEventListener('submit', handleSaveCategory);

    // Settings
    document.getElementById('save-settings-btn').addEventListener('click', handleSaveSettings);
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('import-data-btn').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', importData);
    document.getElementById('reset-data-btn').addEventListener('click', resetData);

    // Modal close buttons
    document.querySelectorAll('.close, .close-modal').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        showAdminPanel();
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
    }
}

function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    showLoginPanel();
}

// Tab Switching
function switchTab(tabName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Products Functions
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="product-image-cell">${product.image}</td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${product.description.substring(0, 50)}...</td>
            <td>${product.price}</td>
            <td>
                <div class="actions-cell">
                    <button class="btn btn-small btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('modal-title');

    // Load categories into select
    loadCategoryOptions();

    if (productId) {
        const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
        const product = products.find(p => p.id === productId);

        title.textContent = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
    } else {
        title.textContent = 'Add New Product';
        form.reset();
        document.getElementById('product-id').value = '';
    }

    modal.classList.add('active');
}

function loadCategoryOptions() {
    const categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
    const select = document.getElementById('product-category');
    select.innerHTML = '';

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function handleSaveProduct(e) {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    const productId = document.getElementById('product-id').value;

    const productData = {
        id: productId ? parseInt(productId) : Date.now(),
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value || '📦'
    };

    if (productId) {
        // Update existing
        const index = products.findIndex(p => p.id === parseInt(productId));
        products[index] = productData;
    } else {
        // Add new
        products.push(productData);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    loadProducts();
    closeModals();
    showSuccess('Product saved successfully!');
}

function editProduct(id) {
    openProductModal(id);
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
        products = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        loadProducts();
        showSuccess('Product deleted successfully!');
    }
}

// Categories Functions
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
    const container = document.getElementById('categories-list');
    container.innerHTML = '';

    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>ID: ${category.id}</p>
            </div>
            <div class="category-actions">
                <button class="btn btn-small btn-danger" onclick="deleteCategory('${category.id}')">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function openCategoryModal() {
    const modal = document.getElementById('category-modal');
    document.getElementById('category-form').reset();
    modal.classList.add('active');
}

function handleSaveCategory(e) {
    e.preventDefault();

    const categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
    const categoryId = document.getElementById('category-id').value.toLowerCase().replace(/\s+/g, '-');
    const categoryName = document.getElementById('category-name').value;

    // Check if category already exists
    if (categories.find(c => c.id === categoryId)) {
        alert('Category ID already exists!');
        return;
    }

    categories.push({
        id: categoryId,
        name: categoryName
    });

    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    loadCategories();
    closeModals();
    showSuccess('Category added successfully!');
}

function deleteCategory(id) {
    // Check if any products use this category
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS));
    const hasProducts = products.some(p => p.category === id);

    if (hasProducts) {
        alert('Cannot delete category that has products. Please delete or reassign products first.');
        return;
    }

    if (confirm('Are you sure you want to delete this category?')) {
        let categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES));
        categories = categories.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
        loadCategories();
        showSuccess('Category deleted successfully!');
    }
}

function getCategoryName(categoryId) {
    const categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

// Settings Functions
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    document.getElementById('whatsapp-number').value = settings.whatsappNumber || '';
    document.getElementById('company-name').value = settings.companyName || '';
}

function handleSaveSettings() {
    const settings = {
        whatsappNumber: document.getElementById('whatsapp-number').value,
        companyName: document.getElementById('company-name').value
    };

    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    showSuccess('Settings saved successfully!');
}

// Data Management
function exportData() {
    const data = {
        products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)),
        categories: JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)),
        settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)),
        business: JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESS)),
        hero: JSON.parse(localStorage.getItem(STORAGE_KEYS.HERO)),
        video: JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEO)),
        features: JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES)),
        partners: JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS)),
        clients: JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS)),
        services: JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)),
        reviews: JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)),
        reviewSettings: JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS)),
        social: JSON.parse(localStorage.getItem(STORAGE_KEYS.SOCIAL)),
        about: JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT)),
        legal: JSON.parse(localStorage.getItem(STORAGE_KEYS.LEGAL))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ohui-data-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showSuccess('Data exported successfully!');
}

function exportForDeployment() {
    const data = {
        products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)),
        categories: JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)),
        settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)),
        business: JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESS)),
        hero: JSON.parse(localStorage.getItem(STORAGE_KEYS.HERO)),
        video: JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEO)),
        features: JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES)),
        partners: JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS)),
        clients: JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS)),
        services: JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)),
        reviews: JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)),
        reviewSettings: JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS)),
        social: JSON.parse(localStorage.getItem(STORAGE_KEYS.SOCIAL)),
        about: JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT)),
        legal: JSON.parse(localStorage.getItem(STORAGE_KEYS.LEGAL))
    };

    // Create JavaScript file that will initialize data on the hosted website
    const jsContent = `// OHU Security Solutions - Website Data
// Auto-generated from admin panel on ${new Date().toLocaleString()}
// Upload this file to your server and include it in index.html before app.js

(function() {
    'use strict';

    // Initialize all data in localStorage
    const websiteData = ${JSON.stringify(data, null, 4)};

    // Storage keys
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
        SOCIAL: 'ohui_social',
        ABOUT: 'ohui_about',
        LEGAL: 'ohui_legal'
    };

    // Set all data to localStorage
    if (websiteData.products) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(websiteData.products));
    if (websiteData.categories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(websiteData.categories));
    if (websiteData.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(websiteData.settings));
    if (websiteData.business) localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(websiteData.business));
    if (websiteData.hero) localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(websiteData.hero));
    if (websiteData.video) localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(websiteData.video));
    if (websiteData.features) localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(websiteData.features));
    if (websiteData.partners) localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(websiteData.partners));
    if (websiteData.clients) localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(websiteData.clients));
    if (websiteData.services) localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(websiteData.services));
    if (websiteData.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(websiteData.reviews));
    if (websiteData.reviewSettings) localStorage.setItem(STORAGE_KEYS.REVIEW_SETTINGS, JSON.stringify(websiteData.reviewSettings));
    if (websiteData.social) localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(websiteData.social));
    if (websiteData.about) localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(websiteData.about));
    if (websiteData.legal) localStorage.setItem(STORAGE_KEYS.LEGAL, JSON.stringify(websiteData.legal));

    console.log('OHU Solutions: Website data loaded successfully');
})();`;

    const blob = new Blob([jsContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-data.js`;
    a.click();
    URL.revokeObjectURL(url);

    // Show instructions
    alert(`✅ Deployment file created!

📝 Instructions:
1. Upload the downloaded 'website-data.js' file to your web server
2. In index.html, add this line BEFORE the <script src="app.js"> line:
   <script src="website-data.js"></script>
3. Your website will now load with all your content!

🔄 To update content:
- Make changes in this admin panel
- Export for deployment again
- Replace the old website-data.js file on your server`);

    showSuccess('Deployment file exported! Check the alert for instructions.');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);

            if (data.products) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
            if (data.categories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
            if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
            if (data.business) localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(data.business));
            if (data.hero) localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(data.hero));
            if (data.video) localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(data.video));
            if (data.features) localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(data.features));
            if (data.partners) localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(data.partners));
            if (data.clients) localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(data.clients));
            if (data.services) localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
            if (data.reviews) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(data.reviews));
            if (data.reviewSettings) localStorage.setItem(STORAGE_KEYS.REVIEW_SETTINGS, JSON.stringify(data.reviewSettings));
            if (data.social) localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(data.social));
            if (data.about) localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data.about));
            if (data.legal) localStorage.setItem(STORAGE_KEYS.LEGAL, JSON.stringify(data.legal));

            loadAllNewData();
            loadProducts();
            loadCategories();
            loadSettings();
            showSuccess('Data imported successfully!');
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

function resetData() {
    if (confirm('This will reset all data to default. Are you sure?')) {
        Object.keys(DEFAULT_DATA).forEach(key => {
            const storageKey = STORAGE_KEYS[key.toUpperCase()] || STORAGE_KEYS[key.toUpperCase().replace(/([A-Z])/g, '_$1')];
            if (storageKey && DEFAULT_DATA[key]) {
                localStorage.setItem(storageKey, JSON.stringify(DEFAULT_DATA[key]));
            }
        });

        loadAllNewData();
        loadProducts();
        loadCategories();
        loadSettings();
        showSuccess('Data reset to default!');
    }
}

// UI Helper Functions
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showSuccess(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;

    // Insert at top of admin content
    const adminContent = document.querySelector('.admin-content');
    adminContent.insertBefore(successDiv, adminContent.firstChild);

    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ========== NEW FUNCTIONALITY ==========

// Initialize new data structures
function initializeNewData() {
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESS)) {
        localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(DEFAULT_DATA.business));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HERO)) {
        localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(DEFAULT_DATA.hero));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FEATURES)) {
        localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(DEFAULT_DATA.features));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PARTNERS)) {
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(DEFAULT_DATA.partners));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(DEFAULT_DATA.clients));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_DATA.services));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_DATA.reviews));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS)) {
        localStorage.setItem(STORAGE_KEYS.REVIEW_SETTINGS, JSON.stringify(DEFAULT_DATA.reviewSettings));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SOCIAL)) {
        localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(DEFAULT_DATA.social));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ABOUT)) {
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(DEFAULT_DATA.about));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEGAL)) {
        localStorage.setItem(STORAGE_KEYS.LEGAL, JSON.stringify(DEFAULT_DATA.legal));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VIDEO)) {
        localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(DEFAULT_DATA.video));
    }
}

// Call this in the existing initializeData function
document.addEventListener('DOMContentLoaded', () => {
    initializeNewData();
});

// Setup new event listeners
function setupNewEventListeners() {
    // Business Info
    const saveBusiness = document.getElementById('save-business-btn');
    if (saveBusiness) saveBusiness.addEventListener('click', handleSaveBusinessInfo);

    // Hero Section
    const saveHero = document.getElementById('save-hero-btn');
    if (saveHero) saveHero.addEventListener('click', handleSaveHero);

    // Features
    const addFeature = document.getElementById('add-feature-btn');
    if (addFeature) addFeature.addEventListener('click', () => openFeatureModal());

    const featureForm = document.getElementById('feature-form');
    if (featureForm) featureForm.addEventListener('submit', handleSaveFeature);

    // Partners
    const addPartner = document.getElementById('add-partner-btn');
    if (addPartner) addPartner.addEventListener('click', () => openPartnerModal());

    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) partnerForm.addEventListener('submit', handleSavePartner);

    // Clients
    const addClient = document.getElementById('add-client-btn');
    if (addClient) addClient.addEventListener('click', () => openClientModal());

    const clientForm = document.getElementById('client-form');
    if (clientForm) clientForm.addEventListener('submit', handleSaveClient);

    // Services
    const addService = document.getElementById('add-service-btn');
    if (addService) addService.addEventListener('click', () => openServiceModal());

    const serviceForm = document.getElementById('service-form');
    if (serviceForm) serviceForm.addEventListener('submit', handleSaveService);

    // Reviews
    const addReview = document.getElementById('add-review-btn');
    if (addReview) addReview.addEventListener('click', () => openReviewModal());

    const importReview = document.getElementById('import-reviews-btn');
    if (importReview) importReview.addEventListener('click', openImportReviewModal);

    const parseImport = document.getElementById('parse-import-btn');
    if (parseImport) parseImport.addEventListener('click', parseAndPreviewReviews);

    const reviewForm = document.getElementById('review-form');
    if (reviewForm) reviewForm.addEventListener('submit', handleSaveReview);

    const saveReviewSettings = document.getElementById('save-review-settings-btn');
    if (saveReviewSettings) saveReviewSettings.addEventListener('click', handleSaveReviewSettings);

    // Legal Pages
    const saveLegal = document.getElementById('save-legal-btn');
    if (saveLegal) saveLegal.addEventListener('click', handleSaveLegal);

    // Video Section
    const saveVideo = document.getElementById('save-video-btn');
    if (saveVideo) saveVideo.addEventListener('click', handleSaveVideo);

    // Social & About
    const saveSocial = document.getElementById('save-social-btn');
    if (saveSocial) saveSocial.addEventListener('click', handleSaveSocial);

    const saveAbout = document.getElementById('save-about-btn');
    if (saveAbout) saveAbout.addEventListener('click', handleSaveAbout);

    // Modal close buttons
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModals();
            }
        });
    });
}

// Call this in existing setup
window.addEventListener('load', setupNewEventListeners);

// Load functions for new tabs
function loadAllNewData() {
    loadBusinessInfo();
    loadHeroSection();
    loadReviews();
    loadReviewSettings();
    loadSocial();
    loadAbout();
    loadFeatures();
    loadPartners();
    loadClients();
    loadServices();
    loadLegal();
    loadVideo();
}

// Business Info Functions
function loadBusinessInfo() {
    const business = JSON.parse(localStorage.getItem(STORAGE_KEYS.BUSINESS) || '{}');
    const fields = ['company-name', 'tagline', 'whatsapp', 'email', 'address', 'hours', 'maps-url', 'established'];
    
    fields.forEach(field => {
        const el = document.getElementById(`business-${field}`);
        if (el && business[field.replace(/-/g, '')]) {
            el.value = business[field.replace(/-/g, '')];
        }
    });
}

function handleSaveBusinessInfo() {
    const business = {
        companyName: document.getElementById('business-company-name').value,
        tagline: document.getElementById('business-tagline').value,
        whatsapp: document.getElementById('business-whatsapp').value,
        email: document.getElementById('business-email').value,
        address: document.getElementById('business-address').value,
        hours: document.getElementById('business-hours').value,
        mapsUrl: document.getElementById('business-maps-url').value,
        established: document.getElementById('business-established').value
    };

    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(business));
    showSuccess('Business information saved successfully!');
}

// Hero Section Functions
function loadHeroSection() {
    const hero = JSON.parse(localStorage.getItem(STORAGE_KEYS.HERO) || '{}');
    
    const fields = [
        'heading', 'subheading',
        'badge1-number', 'badge1-text',
        'badge2-number', 'badge2-text',
        'badge3-number', 'badge3-text',
        'badge4-number', 'badge4-text'
    ];
    
    fields.forEach(field => {
        const el = document.getElementById(`hero-${field}`);
        if (el && hero[field.replace(/-/g, '')]) {
            el.value = hero[field.replace(/-/g, '')];
        }
    });
}

function handleSaveHero() {
    const hero = {
        heading: document.getElementById('hero-heading').value,
        subheading: document.getElementById('hero-subheading').value,
        badge1Number: document.getElementById('badge1-number').value,
        badge1Text: document.getElementById('badge1-text').value,
        badge2Number: document.getElementById('badge2-number').value,
        badge2Text: document.getElementById('badge2-text').value,
        badge3Number: document.getElementById('badge3-number').value,
        badge3Text: document.getElementById('badge3-text').value,
        badge4Number: document.getElementById('badge4-number').value,
        badge4Text: document.getElementById('badge4-text').value
    };

    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(hero));
    showSuccess('Hero section saved successfully!');
}

// Reviews Functions
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    const tbody = document.getElementById('reviews-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${review.name}</td>
            <td>${stars}</td>
            <td>${review.text.substring(0, 50)}...</td>
            <td>${review.date}</td>
            <td><span style="background: #ff6f00; color: white; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.8rem;">${review.source}</span></td>
            <td>
                <div class="actions-cell">
                    <button class="btn btn-small btn-secondary" onclick="editReview(${review.id})">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteReview(${review.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadReviewSettings() {
    const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEW_SETTINGS) || '{}');
    
    if (document.getElementById('reviews-rating')) {
        document.getElementById('reviews-rating').value = settings.rating || '';
    }
    if (document.getElementById('reviews-count')) {
        document.getElementById('reviews-count').value = settings.count || '';
    }
    if (document.getElementById('reviews-google-link')) {
        document.getElementById('reviews-google-link').value = settings.googleLink || '';
    }
    if (document.getElementById('reviews-justdial-link')) {
        document.getElementById('reviews-justdial-link').value = settings.justdialLink || '';
    }
}

function handleSaveReviewSettings() {
    const settings = {
        rating: document.getElementById('reviews-rating').value,
        count: document.getElementById('reviews-count').value,
        googleLink: document.getElementById('reviews-google-link').value,
        justdialLink: document.getElementById('reviews-justdial-link').value
    };

    localStorage.setItem(STORAGE_KEYS.REVIEW_SETTINGS, JSON.stringify(settings));
    showSuccess('Review settings saved successfully!');
}

function openReviewModal(reviewId = null) {
    const modal = document.getElementById('review-modal');
    const form = document.getElementById('review-form');
    const title = document.getElementById('review-modal-title');

    if (reviewId) {
        const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS));
        const review = reviews.find(r => r.id === reviewId);

        title.textContent = 'Edit Review';
        document.getElementById('review-id').value = review.id;
        document.getElementById('review-name').value = review.name;
        document.getElementById('review-rating').value = review.rating;
        document.getElementById('review-text').value = review.text;
        document.getElementById('review-date').value = review.date;
        document.getElementById('review-source').value = review.source;
    } else {
        title.textContent = 'Add New Review';
        form.reset();
        document.getElementById('review-id').value = '';
    }

    modal.classList.add('active');
}

function handleSaveReview(e) {
    e.preventDefault();

    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');
    const reviewId = document.getElementById('review-id').value;

    const reviewData = {
        id: reviewId ? parseInt(reviewId) : Date.now(),
        name: document.getElementById('review-name').value,
        rating: parseInt(document.getElementById('review-rating').value),
        text: document.getElementById('review-text').value,
        date: document.getElementById('review-date').value,
        source: document.getElementById('review-source').value
    };

    if (reviewId) {
        const index = reviews.findIndex(r => r.id === parseInt(reviewId));
        reviews[index] = reviewData;
    } else {
        reviews.push(reviewData);
    }

    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    loadReviews();
    closeModals();
    showSuccess('Review saved successfully!');
}

function editReview(id) {
    openReviewModal(id);
}

function deleteReview(id) {
    if (confirm('Are you sure you want to delete this review?')) {
        let reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS));
        reviews = reviews.filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        loadReviews();
        showSuccess('Review deleted successfully!');
    }
}

// Social Media Functions
function loadSocial() {
    const social = JSON.parse(localStorage.getItem(STORAGE_KEYS.SOCIAL) || '{}');
    
    ['facebook', 'instagram', 'twitter', 'linkedin'].forEach(platform => {
        const el = document.getElementById(`social-${platform}`);
        if (el && social[platform]) {
            el.value = social[platform];
        }
    });
}

function handleSaveSocial() {
    const social = {
        facebook: document.getElementById('social-facebook').value,
        instagram: document.getElementById('social-instagram').value,
        twitter: document.getElementById('social-twitter').value,
        linkedin: document.getElementById('social-linkedin').value
    };

    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(social));
    showSuccess('Social media links saved successfully!');
}

// About Section Functions
function loadAbout() {
    const about = JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT) || '{}');
    
    if (document.getElementById('about-intro')) {
        document.getElementById('about-intro').value = about.intro || '';
    }
    if (document.getElementById('about-mission')) {
        document.getElementById('about-mission').value = about.mission || '';
    }
    if (document.getElementById('about-vision')) {
        document.getElementById('about-vision').value = about.vision || '';
    }
}

function handleSaveAbout() {
    const about = {
        intro: document.getElementById('about-intro').value,
        mission: document.getElementById('about-mission').value,
        vision: document.getElementById('about-vision').value
    };

    localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(about));
    showSuccess('About section saved successfully!');
}

// Features Management Functions
function loadFeatures() {
    const features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES) || '[]');
    const container = document.getElementById('features-list');
    if (!container) return;

    container.innerHTML = '';

    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2.5rem;">${feature.icon}</div>
                <div style="flex: 1;">
                    <strong style="font-size: 1.1rem;">${feature.title}</strong>
                    <p style="margin: 0.3rem 0 0 0; color: #666;">${feature.description}</p>
                </div>
                <div>
                    <button class="btn btn-small btn-secondary" onclick="editFeature(${feature.id})" style="margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteFeature(${feature.id})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openFeatureModal(featureId = null) {
    const modal = document.getElementById('feature-modal');
    const form = document.getElementById('feature-form');
    const title = document.getElementById('feature-modal-title');

    if (featureId) {
        const features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES));
        const feature = features.find(f => f.id === featureId);

        title.textContent = 'Edit Feature';
        document.getElementById('feature-id').value = feature.id;
        document.getElementById('feature-icon').value = feature.icon;
        document.getElementById('feature-title').value = feature.title;
        document.getElementById('feature-description').value = feature.description;
    } else {
        title.textContent = 'Add New Feature';
        form.reset();
        document.getElementById('feature-id').value = '';
    }

    modal.classList.add('active');
}

function handleSaveFeature(e) {
    e.preventDefault();

    const features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES) || '[]');
    const featureId = document.getElementById('feature-id').value;

    const featureData = {
        id: featureId ? parseInt(featureId) : Date.now(),
        icon: document.getElementById('feature-icon').value,
        title: document.getElementById('feature-title').value,
        description: document.getElementById('feature-description').value
    };

    if (featureId) {
        const index = features.findIndex(f => f.id === parseInt(featureId));
        features[index] = featureData;
    } else {
        features.push(featureData);
    }

    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
    loadFeatures();
    closeModals();
    showSuccess('Feature saved successfully!');
}

function editFeature(id) {
    openFeatureModal(id);
}

function deleteFeature(id) {
    if (confirm('Are you sure you want to delete this feature?')) {
        let features = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEATURES));
        features = features.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
        loadFeatures();
        showSuccess('Feature deleted successfully!');
    }
}

// Partners Management Functions
function loadPartners() {
    const partners = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS) || '[]');
    const container = document.getElementById('partners-list');
    if (!container) return;

    container.innerHTML = '';

    partners.forEach(partner => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 3rem; background: #f5f5f5; padding: 1rem; border-radius: 8px;">${partner.logo}</div>
                <div style="flex: 1;">
                    <strong style="font-size: 1.1rem;">${partner.name}</strong>
                </div>
                <div>
                    <button class="btn btn-small btn-secondary" onclick="editPartner(${partner.id})" style="margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deletePartner(${partner.id})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openPartnerModal(partnerId = null) {
    const modal = document.getElementById('partner-modal');
    const form = document.getElementById('partner-form');
    const title = document.getElementById('partner-modal-title');

    if (partnerId) {
        const partners = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS));
        const partner = partners.find(p => p.id === partnerId);

        title.textContent = 'Edit Partner';
        document.getElementById('partner-id').value = partner.id;
        document.getElementById('partner-logo').value = partner.logo;
        document.getElementById('partner-name').value = partner.name;
    } else {
        title.textContent = 'Add New Partner';
        form.reset();
        document.getElementById('partner-id').value = '';
    }

    modal.classList.add('active');
}

function handleSavePartner(e) {
    e.preventDefault();

    const partners = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS) || '[]');
    const partnerId = document.getElementById('partner-id').value;

    const partnerData = {
        id: partnerId ? parseInt(partnerId) : Date.now(),
        logo: document.getElementById('partner-logo').value,
        name: document.getElementById('partner-name').value
    };

    if (partnerId) {
        const index = partners.findIndex(p => p.id === parseInt(partnerId));
        partners[index] = partnerData;
    } else {
        partners.push(partnerData);
    }

    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
    loadPartners();
    closeModals();
    showSuccess('Partner saved successfully!');
}

function editPartner(id) {
    openPartnerModal(id);
}

function deletePartner(id) {
    if (confirm('Are you sure you want to delete this partner?')) {
        let partners = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTNERS));
        partners = partners.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
        loadPartners();
        showSuccess('Partner deleted successfully!');
    }
}

// Clients Management Functions
function loadClients() {
    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
    const container = document.getElementById('clients-list');
    if (!container) return;

    container.innerHTML = '';

    clients.forEach(client => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2.5rem;">${client.icon}</div>
                <div style="flex: 1;">
                    <strong style="font-size: 1.1rem;">${client.name}</strong>
                </div>
                <div>
                    <button class="btn btn-small btn-secondary" onclick="editClient(${client.id})" style="margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteClient(${client.id})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openClientModal(clientId = null) {
    const modal = document.getElementById('client-modal');
    const form = document.getElementById('client-form');
    const title = document.getElementById('client-modal-title');

    if (clientId) {
        const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS));
        const client = clients.find(c => c.id === clientId);

        title.textContent = 'Edit Client';
        document.getElementById('client-id').value = client.id;
        document.getElementById('client-icon').value = client.icon;
        document.getElementById('client-name').value = client.name;
    } else {
        title.textContent = 'Add New Client';
        form.reset();
        document.getElementById('client-id').value = '';
    }

    modal.classList.add('active');
}

function handleSaveClient(e) {
    e.preventDefault();

    const clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
    const clientId = document.getElementById('client-id').value;

    const clientData = {
        id: clientId ? parseInt(clientId) : Date.now(),
        icon: document.getElementById('client-icon').value,
        name: document.getElementById('client-name').value
    };

    if (clientId) {
        const index = clients.findIndex(c => c.id === parseInt(clientId));
        clients[index] = clientData;
    } else {
        clients.push(clientData);
    }

    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    loadClients();
    closeModals();
    showSuccess('Client saved successfully!');
}

function editClient(id) {
    openClientModal(id);
}

function deleteClient(id) {
    if (confirm('Are you sure you want to delete this client?')) {
        let clients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS));
        clients = clients.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
        loadClients();
        showSuccess('Client deleted successfully!');
    }
}

// Services Management Functions
function loadServices() {
    const services = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]');
    const container = document.getElementById('services-list');
    if (!container) return;

    container.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2.5rem;">${service.icon}</div>
                <div style="flex: 1;">
                    <strong style="font-size: 1.1rem;">${service.title}</strong>
                    <p style="margin: 0.3rem 0 0 0; color: #666;">${service.description}</p>
                </div>
                <div>
                    <button class="btn btn-small btn-secondary" onclick="editService(${service.id})" style="margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteService(${service.id})">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function openServiceModal(serviceId = null) {
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    const title = document.getElementById('service-modal-title');

    if (serviceId) {
        const services = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES));
        const service = services.find(s => s.id === serviceId);

        title.textContent = 'Edit Service';
        document.getElementById('service-id').value = service.id;
        document.getElementById('service-icon').value = service.icon;
        document.getElementById('service-title').value = service.title;
        document.getElementById('service-description').value = service.description;
    } else {
        title.textContent = 'Add New Service';
        form.reset();
        document.getElementById('service-id').value = '';
    }

    modal.classList.add('active');
}

function handleSaveService(e) {
    e.preventDefault();

    const services = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || '[]');
    const serviceId = document.getElementById('service-id').value;

    const serviceData = {
        id: serviceId ? parseInt(serviceId) : Date.now(),
        icon: document.getElementById('service-icon').value,
        title: document.getElementById('service-title').value,
        description: document.getElementById('service-description').value
    };

    if (serviceId) {
        const index = services.findIndex(s => s.id === parseInt(serviceId));
        services[index] = serviceData;
    } else {
        services.push(serviceData);
    }

    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    loadServices();
    closeModals();
    showSuccess('Service saved successfully!');
}

function editService(id) {
    openServiceModal(id);
}

function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        let services = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES));
        services = services.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
        loadServices();
        showSuccess('Service deleted successfully!');
    }
}

// Review Import Functions
function openImportReviewModal() {
    const modal = document.getElementById('import-review-modal');
    document.getElementById('import-reviews-text').value = '';
    document.getElementById('import-preview').innerHTML = '';
    modal.classList.add('active');
}

function parseAndPreviewReviews() {
    const text = document.getElementById('import-reviews-text').value;
    const lines = text.split('\n').filter(line => line.trim());

    if (lines.length === 0) {
        alert('Please paste some reviews first!');
        return;
    }

    const preview = document.getElementById('import-preview');
    preview.innerHTML = '<h3 style="margin: 1rem 0;">Preview & Select Reviews to Import:</h3>';

    let parsedReviews = [];

    lines.forEach((line, index) => {
        const parts = line.split('|').map(p => p.trim());

        if (parts.length >= 4) {
            const review = {
                name: parts[0],
                rating: parseInt(parts[1]) || 5,
                text: parts[2],
                date: parts[3],
                source: parts[4] || 'Google'
            };

            parsedReviews.push(review);

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            const reviewCard = document.createElement('div');
            reviewCard.style.cssText = 'background: #f9f9f9; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; border-left: 3px solid #667eea;';
            reviewCard.innerHTML = `
                <label style="display: flex; gap: 1rem; cursor: pointer;">
                    <input type="checkbox" checked data-review-index="${index}" style="width: 20px; height: 20px;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <strong>${review.name}</strong>
                            <span style="background: #ff6f00; color: white; padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.8rem;">${review.source}</span>
                        </div>
                        <div style="color: #ffa726; margin-bottom: 0.5rem;">${stars}</div>
                        <p style="margin: 0.5rem 0; color: #555;">"${review.text}"</p>
                        <small style="color: #999;">${review.date}</small>
                    </div>
                </label>
            `;
            preview.appendChild(reviewCard);
        }
    });

    // Store parsed reviews temporarily
    window.parsedReviewsData = parsedReviews;

    // Add import button
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = 'margin-top: 1.5rem; text-align: center;';
    btnContainer.innerHTML = '<button class="btn btn-primary" onclick="confirmImportReviews()">✓ Import Selected Reviews</button>';
    preview.appendChild(btnContainer);
}

function confirmImportReviews() {
    const checkboxes = document.querySelectorAll('#import-preview input[type="checkbox"]:checked');
    const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.dataset.reviewIndex));

    if (selectedIndices.length === 0) {
        alert('Please select at least one review to import!');
        return;
    }

    const reviews = JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS) || '[]');

    selectedIndices.forEach(index => {
        const review = window.parsedReviewsData[index];
        review.id = Date.now() + index;
        review.visible = true;
        reviews.push(review);
    });

    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    loadReviews();
    closeModals();
    showSuccess(`Successfully imported ${selectedIndices.length} reviews!`);
}

// Legal Pages Functions
function loadLegal() {
    const legal = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEGAL) || '{}');

    if (document.getElementById('privacy-enabled')) {
        document.getElementById('privacy-enabled').checked = legal.privacyEnabled !== false;
    }
    if (document.getElementById('privacy-content')) {
        document.getElementById('privacy-content').value = legal.privacyContent || '';
    }
    if (document.getElementById('terms-enabled')) {
        document.getElementById('terms-enabled').checked = legal.termsEnabled !== false;
    }
    if (document.getElementById('terms-content')) {
        document.getElementById('terms-content').value = legal.termsContent || '';
    }
}

function handleSaveLegal() {
    const legal = {
        privacyEnabled: document.getElementById('privacy-enabled').checked,
        privacyContent: document.getElementById('privacy-content').value,
        termsEnabled: document.getElementById('terms-enabled').checked,
        termsContent: document.getElementById('terms-content').value
    };

    localStorage.setItem(STORAGE_KEYS.LEGAL, JSON.stringify(legal));
    showSuccess('Legal pages saved successfully!');
}

// Video Section Functions
function loadVideo() {
    const video = JSON.parse(localStorage.getItem(STORAGE_KEYS.VIDEO) || '{}');

    if (document.getElementById('video-enabled')) {
        document.getElementById('video-enabled').checked = video.enabled !== false;
    }
    if (document.getElementById('video-section-title')) {
        document.getElementById('video-section-title').value = video.sectionTitle || '';
    }
    if (document.getElementById('video-section-subtitle')) {
        document.getElementById('video-section-subtitle').value = video.sectionSubtitle || '';
    }
    if (document.getElementById('video-url')) {
        document.getElementById('video-url').value = video.videoUrl || '';
    }
    if (document.getElementById('video-content-title')) {
        document.getElementById('video-content-title').value = video.contentTitle || '';
    }
    if (document.getElementById('video-content-description')) {
        document.getElementById('video-content-description').value = video.contentDescription || '';
    }
}

function handleSaveVideo() {
    const video = {
        enabled: document.getElementById('video-enabled').checked,
        sectionTitle: document.getElementById('video-section-title').value,
        sectionSubtitle: document.getElementById('video-section-subtitle').value,
        videoUrl: document.getElementById('video-url').value,
        contentTitle: document.getElementById('video-content-title').value,
        contentDescription: document.getElementById('video-content-description').value
    };

    localStorage.setItem(STORAGE_KEYS.VIDEO, JSON.stringify(video));
    showSuccess('Video section saved successfully!');
}

// Update the showAdminPanel function to load new data
const originalShowAdminPanel = showAdminPanel;
showAdminPanel = function() {
    originalShowAdminPanel();
    loadAllNewData();
};
