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
    SETTINGS: 'ohui_settings'
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
        whatsappNumber: "+415255867075",
        companyName: "OHU Solutions"
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
        settings: JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ohui-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_DATA.products));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_DATA.categories));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_DATA.settings));

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
