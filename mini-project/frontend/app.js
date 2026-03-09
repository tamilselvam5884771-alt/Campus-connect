const API_BASE_URL = 'http://localhost:5000/api';
const BACKEND_URL = 'http://localhost:5000'; // To fetch images

// --- Utility Functions ---

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icon based on type
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300); // 300ms for slide out animation
    }, 3000);
}

function switchTab(tabId) {
    // Hide all sections smoothly
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('fade-enter');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section & set active button
    const activeSection = document.getElementById(`${tabId}-section`);
    activeSection.classList.remove('hidden');
    // small timeout to trigger animation
    setTimeout(() => activeSection.classList.add('fade-enter'), 10);
    
    event.currentTarget.classList.add('active');

    if (tabId === 'reports') fetchReports();
    if (tabId === 'resources') fetchResources();
}

// --- Modal Logic ---
function openModal(modalId) {
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById(modalId).classList.add('hidden');
}

function closeAllModals(event) {
    if(event.target.id === 'modal-overlay') {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('report-modal').classList.add('hidden');
        document.getElementById('resource-modal').classList.add('hidden');
    }
}

// Format date into a readable string
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

function renderSkeletons(containerId, count = 3) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';
    for(let i=0; i<count; i++) {
        grid.innerHTML += `
            <div class="card" style="box-shadow: none; border: 1px solid rgba(0,0,0,0.05);">
                <div class="card-img-wrapper skeleton"></div>
                <div class="card-content">
                    <div class="skeleton" style="height: 24px; width: 80%; margin-bottom: 0.5rem;"></div>
                    <div class="skeleton" style="height: 16px; width: 100%; margin-bottom: 0.4rem;"></div>
                    <div class="skeleton" style="height: 16px; width: 60%; margin-bottom: 1.5rem;"></div>
                    <div class="card-meta">
                        <div class="skeleton" style="height: 16px; width: 30%;"></div>
                        <div class="skeleton" style="height: 20px; width: 25%; border-radius: 99px;"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

// --- File Input UI Update ---
document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', function(e) {
        const ui = this.nextElementSibling;
        if(this.files && this.files.length > 0) {
            ui.textContent = this.files[0].name;
            ui.style.borderColor = 'var(--primary)';
            ui.style.color = 'var(--primary)';
            ui.style.fontWeight = '600';
        } else {
            ui.textContent = 'Choose an image...';
        }
    });
});

// --- Reports API Integration ---

async function fetchReports() {
    renderSkeletons('reports-grid', 3);
    
    try {
        const response = await fetch(`${API_BASE_URL}/reports`);
        const reports = await response.json();
        
        const grid = document.getElementById('reports-grid');
        grid.innerHTML = '';

        if (reports.length === 0) {
            grid.innerHTML = '<p class="subtitle" style="text-align:center; width: 100%; grid-column: 1/-1; padding: 3rem 0;">No reports found. Be the first to add one! ✨</p>';
            return;
        }

        reports.forEach(report => {
            const card = document.createElement('div');
            card.className = 'card fade-enter';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${BACKEND_URL}${report.imagePath}" alt="${report.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${report.title}</h3>
                    <p class="card-desc">${report.description}</p>
                    <div class="card-meta">
                        <span>📍 ${report.location}</span>
                        <span class="status-badge">${report.status}</span>
                    </div>
                    <div class="card-meta" style="border-top: none; padding-top: 0.5rem; justify-content: flex-end;">
                        <span style="font-size:0.75rem; color:var(--text-muted)">${formatDate(report.createdAt)}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to fetch reports:', error);
        showToast('Failed to load reports', 'error');
    }
}

async function submitReport(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    
    const formData = new FormData();
    formData.append('title', document.getElementById('report-title').value);
    formData.append('description', document.getElementById('report-desc').value);
    formData.append('location', document.getElementById('report-loc').value);
    formData.append('status', 'Pending');
    formData.append('image', document.getElementById('report-image').files[0]);

    try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            document.getElementById('report-form').reset();
            document.querySelector('#report-form .file-upload-ui').textContent = 'Choose an image...';
            closeModal('report-modal');
            fetchReports();
            showToast('Report submitted successfully! 🎉');
        } else {
            const err = await response.json();
            showToast(err.error || 'Failed to submit report', 'error');
        }
    } catch (error) {
        showToast('Server error while submitting report', 'error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// --- Resources API Integration ---

async function fetchResources() {
    renderSkeletons('resources-grid', 3);
    
    try {
        const response = await fetch(`${API_BASE_URL}/resources`);
        const resources = await response.json();
        
        const grid = document.getElementById('resources-grid');
        grid.innerHTML = '';

        if (resources.length === 0) {
            grid.innerHTML = '<p class="subtitle" style="text-align:center; width: 100%; grid-column: 1/-1; padding: 3rem 0;">No resources found. Add one now! ✨</p>';
            return;
        }

        resources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'card fade-enter';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${BACKEND_URL}${resource.imagePath}" alt="${resource.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${resource.title}</h3>
                    <p class="card-desc">${resource.description}</p>
                    <div class="card-meta">
                        <span>🏫 Dept: ${resource.department}</span>
                    </div>
                    <div class="card-meta" style="border-top: none; padding-top: 0.5rem; justify-content: flex-end;">
                        <span style="font-size:0.75rem; color:var(--text-muted)">Added on ${formatDate(resource.createdAt)}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to fetch resources:', error);
        showToast('Failed to load resources', 'error');
    }
}

async function submitResource(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Adding...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('title', document.getElementById('res-title').value);
    formData.append('description', document.getElementById('res-desc').value);
    formData.append('department', document.getElementById('res-dept').value);
    formData.append('image', document.getElementById('res-image').files[0]);

    try {
        const response = await fetch(`${API_BASE_URL}/resources`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            document.getElementById('resource-form').reset();
            document.querySelector('#resource-form .file-upload-ui').textContent = 'Choose an image...';
            closeModal('resource-modal');
            fetchResources();
            showToast('Resource added successfully! 📚');
        } else {
            const err = await response.json();
            showToast(err.error || 'Failed to add resource', 'error');
        }
    } catch (error) {
        showToast('Server error while adding resource', 'error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', fetchReports);
