let currentUser = null;
let isAdmin = false;
let currentRating = 0;

let projects = [
    {
        id: 'innovation',
        name: 'Kigali Innovation City',
        category: 'tech',
        progress: 75,
        description: "Africa's premier tech hub fostering innovation and digital transformation.",
        icon: 'fa-microchip',
        color: '#00A1DE',
        location: { region: 'Kigali' },
        startDate: '2022-01-15',
        budget: '$150M',
        status: 'active'
    },
    {
        id: 'airport',
        name: 'Bugesera International Airport',
        category: 'infra',
        progress: 60,
        description: 'Modern aviation hub connecting Rwanda to the world.',
        icon: 'fa-plane',
        color: '#007A33',
        location: { region: 'Eastern' },
        startDate: '2020-06-01',
        budget: '$1.2B',
        status: 'active'
    },
    {
        id: 'hydro',
        name: 'Nyabarongo II Hydro',
        category: 'energy',
        progress: 90,
        description: 'Sustainable hydroelectric power for national grid expansion.',
        icon: 'fa-water',
        color: '#2E7D32',
        location: { region: 'Western' },
        startDate: '2021-03-10',
        budget: '$200M',
        status: 'active'
    },
    {
        id: 'smart-city',
        name: 'Smart City Initiative',
        category: 'tech',
        progress: 45,
        description: 'IoT-enabled urban management and smart infrastructure.',
        icon: 'fa-city',
        color: '#9C27B0',
        location: { region: 'Kigali' },
        startDate: '2023-01-20',
        budget: '$80M',
        status: 'active'
    },
    {
        id: 'broadband',
        name: 'National Broadband Network',
        category: 'infra',
        progress: 55,
        description: 'High-speed fiber optic connectivity nationwide.',
        icon: 'fa-wifi',
        color: '#FF9800',
        location: { region: 'Nationwide' },
        startDate: '2021-09-01',
        budget: '$300M',
        status: 'active'
    },
    {
        id: 'solar-farm',
        name: 'Agahozo Solar Farm',
        category: 'energy',
        progress: 85,
        description: 'Renewable energy project powering rural communities.',
        icon: 'fa-solar-panel',
        color: '#FFC107',
        location: { region: 'Eastern' },
        startDate: '2019-05-15',
        budget: '$100M',
        status: 'active'
    }
];

function initUser() {
    const userData = localStorage.getItem('rds_active_user');
    if (!userData) {
        window.location.href = "index.html";
        return false;
    }
    
    try {
        currentUser = JSON.parse(userData);
        isAdmin = currentUser.email === 'admin@rds.gov.rw' || currentUser.isAdmin === true;
        
        document.getElementById('display-name').innerText = currentUser.name || currentUser.email.split('@')[0];
        document.getElementById('welcome-name').innerText = currentUser.name ? currentUser.name.split(' ')[0] : 'Citizen';
        document.getElementById('profile-name').innerText = currentUser.name || 'User';
        document.getElementById('profile-email').innerText = currentUser.email;
        
        if (isAdmin) {
            document.getElementById('admin-menu-item').style.display = 'block';
            const profileBadge = document.getElementById('profile-badge');
            profileBadge.innerHTML = '<i class="fa-solid fa-shield-hooded"></i> Administrator';
            profileBadge.style.background = 'linear-gradient(135deg, #f59e0b, #f97316)';
        } else {
            const impactPoints = currentUser.impactPoints || 0;
            let badge = 'Citizen';
            if (impactPoints >= 1000) badge = 'Community Champion';
            else if (impactPoints >= 500) badge = 'Active Citizen';
            else if (impactPoints >= 100) badge = 'Contributor';
            document.getElementById('profile-badge').innerText = badge;
        }
        
        return true;
    } catch (error) {
        console.error('Error:', error);
        window.location.href = "index.html";
        return false;
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    const icon = document.querySelector('#theme-toggle i');
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('rds_theme', isDark ? 'dark' : 'light');
}

function renderProjects(category = 'all') {
    const grid = document.getElementById('project-grid');
    const filtered = category === 'all' ? projects : projects.filter(p => p.category === category);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fa-solid fa-folder-open"></i><p>No projects in this category</p></div>';
        return;
    }
    
    grid.innerHTML = filtered.map(project => `
        <div class="card" onclick="openModal('${project.id}')">
            <div class="card-header" style="background: linear-gradient(135deg, ${project.color}20, ${project.color}40);">
                <i class="fa-solid ${project.icon} project-icon" style="color: ${project.color};"></i>
                <div class="progress-indicator">${project.progress}%</div>
            </div>
            <div class="card-content">
                <h3>${project.name}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%; background: ${project.color};"></div>
                </div>
                <button class="join-btn"><i class="fa-solid fa-pen"></i> Submit Feedback</button>
            </div>
        </div>
    `).join('');
}

function showInteractiveMap() {
    const modal = document.getElementById("actionModal");
    const body = document.getElementById("actionModalBody");
    modal.style.display = "block";
    
    body.innerHTML = `
        <div class="map-container-full">
            <h2><i class="fa-solid fa-map-location-dot"></i> Rwanda Project Map</h2>
            <div class="map-legend">
                <div class="legend-item"><i class="fa-solid fa-circle" style="color: #00A1DE;"></i> Tech Hub</div>
                <div class="legend-item"><i class="fa-solid fa-circle" style="color: #007A33;"></i> Infrastructure</div>
                <div class="legend-item"><i class="fa-solid fa-circle" style="color: #FF9800;"></i> Energy</div>
            </div>
            <div class="rwanda-map">
                <svg viewBox="0 0 800 600" style="width:100%; height:auto; background: #e8f4f8; border-radius: 12px;">
                    <path d="M200,100 L300,80 L400,90 L500,120 L550,180 L520,250 L480,320 L400,350 L300,340 L220,300 L180,240 L160,180 L180,120 L200,100" fill="#c8e6f5" stroke="#2c3e50" stroke-width="2"/>
                    <text x="250" y="150" class="province-label">Northern</text>
                    <text x="350" y="250" class="province-label">Kigali City</text>
                    <text x="450" y="200" class="province-label">Eastern</text>
                    <text x="300" y="350" class="province-label">Southern</text>
                    <text x="200" y="300" class="province-label">Western</text>
                    ${projects.map((project, index) => {
                        const positions = {
                            'innovation': { x: 380, y: 220 },
                            'airport': { x: 480, y: 280 },
                            'hydro': { x: 260, y: 290 },
                            'smart-city': { x: 390, y: 210 },
                            'broadband': { x: 350, y: 180 },
                            'solar-farm': { x: 520, y: 320 }
                        };
                        const pos = positions[project.id] || { x: 300 + index * 30, y: 200 + index * 20 };
                        return `
                            <g class="map-marker-group" onclick="showProjectDetails('${project.id}')" style="cursor: pointer;">
                                <circle cx="${pos.x}" cy="${pos.y}" r="12" fill="${project.color}" stroke="white" stroke-width="2"/>
                                <text x="${pos.x}" y="${pos.y - 15}" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${project.progress}%</text>
                                <title>${project.name}</title>
                            </g>
                        `;
                    }).join('')}
                </svg>
            </div>
            <div class="map-projects-list">
                <h3><i class="fa-solid fa-list"></i> Project Locations</h3>
                ${projects.map(project => `
                    <div class="map-project-item" onclick="showProjectDetails('${project.id}')">
                        <div class="map-project-marker" style="background: ${project.color};"></div>
                        <div class="map-project-info">
                            <strong>${project.name}</strong>
                            <small>${project.location.region} • ${project.progress}% Complete</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById("actionModal");
    const body = document.getElementById("actionModalBody");
    
    body.innerHTML = `
        <div class="project-detail-view">
            <button class="back-btn" onclick="showInteractiveMap()"><i class="fa-solid fa-arrow-left"></i> Back to Map</button>
            <div class="project-detail-card">
                <div class="project-detail-header" style="background: ${project.color}20;">
                    <i class="fa-solid ${project.icon}" style="color: ${project.color}; font-size: 3rem;"></i>
                    <h2>${project.name}</h2>
                    <span class="project-status ${project.status}">${project.status.toUpperCase()}</span>
                </div>
                <div class="project-detail-content">
                    <p><i class="fa-solid fa-location-dot"></i> <strong>Location:</strong> ${project.location.region}</p>
                    <p><i class="fa-solid fa-calendar"></i> <strong>Start Date:</strong> ${project.startDate}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> <strong>Budget:</strong> ${project.budget}</p>
                    <p><i class="fa-solid fa-chart-line"></i> <strong>Progress:</strong> ${project.progress}%</p>
                    <div class="progress-bar large"><div class="progress-fill" style="width: ${project.progress}%; background: ${project.color};"></div></div>
                    <p><i class="fa-solid fa-info-circle"></i> <strong>Description:</strong> ${project.description}</p>
                </div>
                <button onclick="closeActionModal(); openModal('${project.id}')" class="submit-btn"><i class="fa-solid fa-pen"></i> Submit Feedback</button>
            </div>
        </div>
    `;
}

function handleQuickAction(type) {
    if (type === 'map') {
        showInteractiveMap();
        return;
    }
    
    const modal = document.getElementById("actionModal");
    const body = document.getElementById("actionModalBody");
    modal.style.display = "block";

    if (type === 'reports') {
        const history = JSON.parse(localStorage.getItem(`rds_history_${currentUser.email}`)) || [];
        body.innerHTML = `
            <h2><i class="fa-solid fa-clock-history"></i> Your Reports</h2>
            <div class="stats-summary">
                <div class="stat-card"><div class="stat-number">${history.length}</div><div>Total Reports</div></div>
                <div class="stat-card"><div class="stat-number">${currentUser.impactPoints || 0}</div><div>Impact Points</div></div>
            </div>
            <hr>
            ${history.length === 0 ? '<p class="empty-state"><i class="fa-solid fa-inbox"></i><p>No reports yet. Start by giving feedback on a project!</p></p>' : 
                history.map(item => `
                    <div class="report-item">
                        <strong><i class="fa-solid fa-folder-open"></i> ${item.project}</strong>
                        <p>${item.text}</p>
                        ${item.rating ? `<div class="rating-display">Rating: ${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div>` : ''}
                        <small>${item.date}</small>
                    </div>
                `).join('')
            }
        `;
    } else if (type === 'support') {
        body.innerHTML = `
            <h2><i class="fa-solid fa-headset"></i> Support Hub</h2>
            <div class="support-options">
                <div class="support-card">
                    <i class="fa-solid fa-envelope"></i>
                    <h4>Email Support</h4>
                    <p>support@rds.gov.rw</p>
                    <small>24/7 Response</small>
                </div>
                <div class="support-card">
                    <i class="fa-solid fa-phone"></i>
                    <h4>Hotline</h4>
                    <p>+250 790 801 866</p>
                    <small>8am - 8pm</small>
                </div>
                <div class="support-card">
                    <i class="fa-solid fa-comments"></i>
                    <h4>Live Chat</h4>
                    <p>Available Now</p>
                    <small>Click to chat</small>
                </div>
            </div>
        `;
    } else if (type === 'enrollment') {
        body.innerHTML = `
            <h2><i class="fa-solid fa-id-card-clip"></i> Digital Citizen Hub</h2>
            <div class="enrollment-card">
                <div class="enrollment-badge"><i class="fa-solid fa-check-circle"></i> Verified Citizen</div>
                <p><strong>Name:</strong> ${currentUser.name}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Phone:</strong> ${currentUser.phone || 'Not provided'}</p>
                <p><strong>District:</strong> ${currentUser.district || 'Not specified'}</p>
                <p><strong>RDS ID:</strong> RDS-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}</p>
                <p><strong>Join Date:</strong> ${new Date(currentUser.joinDate).toLocaleDateString()}</p>
                <button class="download-btn" onclick="showToast('Digital ID download feature coming soon!', 'info')"><i class="fa-solid fa-download"></i> Download Digital ID</button>
            </div>
        `;
    } else if (type === 'stats') {
        const history = JSON.parse(localStorage.getItem(`rds_history_${currentUser.email}`)) || [];
        body.innerHTML = `
            <h2><i class="fa-solid fa-chart-simple"></i> Impact Statistics</h2>
            <div class="impact-stats">
                <div class="impact-stat"><div class="impact-number">${history.length}</div><div>Total Reports</div></div>
                <div class="impact-stat"><div class="impact-number">${currentUser.impactPoints || 0}</div><div>Impact Points</div></div>
            </div>
            <div class="progress-chart">
                <h4>Project Progress Overview</h4>
                ${projects.slice(0, 5).map(p => `
                    <div class="chart-item">
                        <span>${p.name}</span>
                        <div class="chart-bar"><div style="width: ${p.progress}%; background: ${p.color};"></div></div>
                        <span>${p.progress}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if(project) {
        document.getElementById("modalTitle").innerText = project.name;
        document.getElementById("projectModal").style.display = "block";
        document.getElementById("userComment").value = "";
        document.getElementById("progressPhoto").value = "";
        currentRating = 0;
        document.querySelectorAll('#rating-stars i').forEach(s => s.className = 'far fa-star');
    }
}

function closeModal() { document.getElementById("projectModal").style.display = "none"; }
function closeActionModal() { document.getElementById("actionModal").style.display = "none"; }
function closeProfileModal() { document.getElementById("profileModal").style.display = "none"; }
function closeAdminModal() { document.getElementById("adminModal").style.display = "none"; }

function initRatingStars() {
    document.querySelectorAll('#rating-stars i').forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            document.querySelectorAll('#rating-stars i').forEach(s => {
                s.className = parseInt(s.dataset.rating) <= currentRating ? 'fa-solid fa-star' : 'far fa-star';
            });
        });
    });
}

function saveFeedback() {
    const comment = document.getElementById("userComment").value;
    const file = document.getElementById("progressPhoto").files[0];
    const projectTitle = document.getElementById("modalTitle").innerText;
    
    if (!comment) { showToast("Please enter your feedback!", "error"); return; }

    const report = {
        project: projectTitle,
        text: comment,
        rating: currentRating,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };
    
    let history = JSON.parse(localStorage.getItem(`rds_history_${currentUser.email}`)) || [];
    history.unshift(report);
    localStorage.setItem(`rds_history_${currentUser.email}`, JSON.stringify(history));
    
    let pointsEarned = 10;
    if (currentRating > 0) pointsEarned += currentRating * 2;
    if (file) pointsEarned += 5;
    
    currentUser.impactPoints = (currentUser.impactPoints || 0) + pointsEarned;
    localStorage.setItem('rds_active_user', JSON.stringify(currentUser));
    
    // Update users database
    let users = JSON.parse(localStorage.getItem('rds_users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].impactPoints = currentUser.impactPoints;
        users[userIndex].reportsCount = (users[userIndex].reportsCount || 0) + 1;
        localStorage.setItem('rds_users', JSON.stringify(users));
    }
    
    closeModal();
    displayHistory();
    updateImpactScore();
    showToast(`Feedback submitted! You earned ${pointsEarned} impact points! 🇷🇼`, "success");
}

function displayHistory() {
    const list = document.getElementById("feedback-list");
    const history = JSON.parse(localStorage.getItem(`rds_history_${currentUser.email}`)) || [];
    
    if (history.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fa-solid fa-inbox"></i><p>No feedback yet. Be the first to contribute!</p></div>';
        return;
    }
    
    list.innerHTML = history.slice(0, 5).map(item => `
        <div class="feedback-item">
            <div class="feedback-header">
                <strong><i class="fa-solid fa-folder"></i> ${item.project}</strong>
                <small>${item.date}</small>
            </div>
            <p>${item.text.substring(0, 80)}${item.text.length > 80 ? '...' : ''}</p>
            ${item.rating ? `<div class="rating-small">${'★'.repeat(item.rating)}${'☆'.repeat(5-item.rating)}</div>` : ''}
        </div>
    `).join('');
}

function updateImpactScore() {
    const history = JSON.parse(localStorage.getItem(`rds_history_${currentUser.email}`)) || [];
    const points = currentUser.impactPoints || 0;
    
    document.getElementById("impact-score").innerText = points;
    document.getElementById("points-count").innerText = points;
    document.getElementById("report-count").innerText = history.length;
    
    const badgeList = document.getElementById("badge-list");
    const badges = [];
    
    if (history.length >= 1) badges.push('<span class="badge"><i class="fa-solid fa-seedling"></i> First Report</span>');
    if (history.length >= 5) badges.push('<span class="badge"><i class="fa-solid fa-star"></i> Active Citizen</span>');
    if (history.length >= 10) badges.push('<span class="badge"><i class="fa-solid fa-trophy"></i> Community Champion</span>');
    if (points >= 100) badges.push('<span class="badge"><i class="fa-solid fa-gem"></i> Contributor</span>');
    if (points >= 500) badges.push('<span class="badge"><i class="fa-solid fa-crown"></i> Elite Member</span>');
    
    badgeList.innerHTML = badges.length ? badges.join('') : '<span class="badge">Submit reports to earn badges!</span>';
}

function showProfile() {
    const modal = document.getElementById("profileModal");
    const body = document.getElementById("profileModalBody");
    modal.style.display = "block";
    
    body.innerHTML = `
        <div class="profile-full">
            <div class="profile-header">
                <div class="profile-avatar-large"><i class="fa-solid fa-user-circle"></i></div>
                <h2>${currentUser.name}</h2>
                <p class="profile-badge-large">${document.getElementById('profile-badge').innerHTML}</p>
            </div>
            <div class="profile-details">
                <div class="detail-item"><i class="fa-solid fa-envelope"></i><div><label>Email</label><p>${currentUser.email}</p></div></div>
                <div class="detail-item"><i class="fa-solid fa-phone"></i><div><label>Phone</label><p>${currentUser.phone || 'Not provided'}</p></div></div>
                <div class="detail-item"><i class="fa-solid fa-map-marker-alt"></i><div><label>District</label><p>${currentUser.district || 'Not specified'}</p></div></div>
                <div class="detail-item"><i class="fa-solid fa-calendar"></i><div><label>Member Since</label><p>${new Date(currentUser.joinDate).toLocaleDateString()}</p></div></div>
                <div class="detail-item"><i class="fa-solid fa-star"></i><div><label>Impact Points</label><p>${currentUser.impactPoints || 0} points</p></div></div>
            </div>
            <button class="edit-profile-btn" onclick="showToast('Profile editing coming soon!', 'info')"><i class="fa-solid fa-pen"></i> Edit Profile</button>
        </div>
    `;
}

function showAdminPanel() {
    if (!isAdmin) {
        showToast("Access denied. Admin privileges required.", "error");
        return;
    }
    
    const modal = document.getElementById("adminModal");
    const body = document.getElementById("adminModalBody");
    modal.style.display = "block";
    
    const users = JSON.parse(localStorage.getItem('rds_users')) || [];
    const allFeedback = [];
    users.forEach(user => {
        const userFeedback = JSON.parse(localStorage.getItem(`rds_history_${user.email}`)) || [];
        userFeedback.forEach(feedback => {
            allFeedback.push({ ...feedback, userName: user.name, userEmail: user.email });
        });
    });
    
    body.innerHTML = `
        <div class="admin-panel">
            <h2><i class="fa-solid fa-shield-hooded"></i> Admin Dashboard</h2>
            <div class="admin-tabs">
                <button class="admin-tab active" onclick="switchAdminTab('feedback')">Feedback (${allFeedback.filter(f => !f.adminReply).length})</button>
                <button class="admin-tab" onclick="switchAdminTab('projects')">Projects (${projects.length})</button>
                <button class="admin-tab" onclick="switchAdminTab('users')">Users (${users.length})</button>
            </div>
            <div id="admin-feedback-tab" class="admin-tab-content active">
                <h3><i class="fa-solid fa-comments"></i> Pending Feedback</h3>
                ${allFeedback.filter(f => !f.adminReply).length === 0 ? '<p class="empty-state">All feedback has been reviewed!</p>' : 
                    allFeedback.filter(f => !f.adminReply).map((feedback, idx) => `
                        <div class="admin-feedback-card">
                            <div class="feedback-header"><strong>${feedback.userName}</strong> <small>${feedback.date}</small></div>
                            <div class="feedback-project"><i class="fa-solid fa-folder"></i> ${feedback.project}</div>
                            <p>${feedback.text}</p>
                            ${feedback.rating ? `<div class="rating-display">Rating: ${'★'.repeat(feedback.rating)}</div>` : ''}
                            <div class="reply-section">
                                <textarea id="reply-${idx}" placeholder="Write your response..." rows="2"></textarea>
                                <button onclick="replyToFeedback('${feedback.userEmail}', '${feedback.project}', ${idx})" class="reply-btn"><i class="fa-solid fa-paper-plane"></i> Send Reply</button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
            <div id="admin-projects-tab" class="admin-tab-content">
                <h3><i class="fa-solid fa-diagram-project"></i> Manage Projects</h3>
                <button onclick="showAddProjectForm()" class="add-project-btn"><i class="fa-solid fa-plus"></i> Add New Project</button>
                ${projects.map(project => `
                    <div class="admin-project-card">
                        <div class="project-info">
                            <div class="project-icon" style="background: ${project.color}20;"><i class="fa-solid ${project.icon}" style="color: ${project.color};"></i></div>
                            <div class="project-details">
                                <h4>${project.name}</h4>
                                <p>${project.description}</p>
                                <div class="project-meta"><span>${project.progress}%</span><span>${project.category}</span><span>${project.location.region}</span></div>
                            </div>
                        </div>
                        <div class="project-actions">
                            <button onclick="editProject('${project.id}')" class="edit-btn"><i class="fa-solid fa-pen"></i> Edit</button>
                            <button onclick="deleteProject('${project.id}')" class="delete-btn"><i class="fa-solid fa-trash"></i> Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="admin-users-tab" class="admin-tab-content">
                <h3><i class="fa-solid fa-users"></i> User Management</h3>
                <div class="user-stats">
                    <div class="stat-card"><div class="stat-number">${users.length}</div><div>Total Users</div></div>
                    <div class="stat-card"><div class="stat-number">${allFeedback.length}</div><div>Total Feedback</div></div>
                </div>
                ${users.map(user => `
                    <div class="user-card">
                        <div class="user-avatar"><i class="fa-solid fa-user-circle"></i></div>
                        <div class="user-info"><strong>${user.name}</strong><small>${user.email}</small><p>Joined: ${new Date(user.joinDate).toLocaleDateString()}</p></div>
                        <div class="user-stats-mini">${user.impactPoints || 0} pts</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'feedback') {
        document.querySelectorAll('.admin-tab')[0].classList.add('active');
        document.getElementById('admin-feedback-tab').classList.add('active');
    } else if (tab === 'projects') {
        document.querySelectorAll('.admin-tab')[1].classList.add('active');
        document.getElementById('admin-projects-tab').classList.add('active');
    } else if (tab === 'users') {
        document.querySelectorAll('.admin-tab')[2].classList.add('active');
        document.getElementById('admin-users-tab').classList.add('active');
    }
}

function replyToFeedback(userEmail, projectTitle, idx) {
    const replyText = document.getElementById(`reply-${idx}`).value;
    if (!replyText) { showToast("Please enter a reply", "error"); return; }
    
    const userHistory = JSON.parse(localStorage.getItem(`rds_history_${userEmail}`)) || [];
    const feedbackIndex = userHistory.findIndex(f => f.project === projectTitle && !f.adminReply);
    
    if (feedbackIndex !== -1) {
        userHistory[feedbackIndex].adminReply = replyText;
        userHistory[feedbackIndex].replyDate = new Date().toLocaleDateString();
        localStorage.setItem(`rds_history_${userEmail}`, JSON.stringify(userHistory));
        showToast("Reply sent successfully!", "success");
        closeAdminModal();
        setTimeout(() => showAdminPanel(), 100);
    }
}

function showAddProjectForm() {
    const modal = document.getElementById("adminModal");
    const body = document.getElementById("adminModalBody");
    
    body.innerHTML = `
        <div class="project-form"><h3>Add New Project</h3>
            <form onsubmit="addNewProject(event)">
                <div class="form-group"><label>Project Name</label><input type="text" id="new-project-name" required></div>
                <div class="form-group"><label>Category</label><select id="new-project-category"><option value="tech">Technology</option><option value="infra">Infrastructure</option><option value="energy">Energy</option></select></div>
                <div class="form-group"><label>Progress (%)</label><input type="number" id="new-project-progress" min="0" max="100" required></div>
                <div class="form-group"><label>Description</label><textarea id="new-project-description" rows="3" required></textarea></div>
                <div class="form-group"><label>Location</label><input type="text" id="new-project-location" required></div>
                <button type="submit" class="submit-btn">Create Project</button>
                <button type="button" onclick="showAdminPanel()" class="cancel-btn">Cancel</button>
            </form>
        </div>
    `;
}

function addNewProject(event) {
    event.preventDefault();
    
    const newProject = {
        id: Date.now().toString(),
        name: document.getElementById('new-project-name').value,
        category: document.getElementById('new-project-category').value,
        progress: parseInt(document.getElementById('new-project-progress').value),
        description: document.getElementById('new-project-description').value,
        location: { region: document.getElementById('new-project-location').value },
        startDate: new Date().toISOString().split('T')[0],
        budget: 'To be determined',
        icon: 'fa-building',
        color: getCategoryColor(document.getElementById('new-project-category').value),
        status: 'active'
    };
    
    projects.push(newProject);
    localStorage.setItem('rds_projects', JSON.stringify(projects));
    showToast("Project added successfully!", "success");
    renderProjects();
    showAdminPanel();
}

function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById("adminModal");
    const body = document.getElementById("adminModalBody");
    
    body.innerHTML = `
        <div class="project-form"><h3>Edit Project: ${project.name}</h3>
            <form onsubmit="updateProject(event, '${projectId}')">
                <div class="form-group"><label>Project Name</label><input type="text" id="edit-project-name" value="${project.name}" required></div>
                <div class="form-group"><label>Category</label><select id="edit-project-category"><option value="tech" ${project.category === 'tech' ? 'selected' : ''}>Technology</option><option value="infra" ${project.category === 'infra' ? 'selected' : ''}>Infrastructure</option><option value="energy" ${project.category === 'energy' ? 'selected' : ''}>Energy</option></select></div>
                <div class="form-group"><label>Progress (%)</label><input type="number" id="edit-project-progress" value="${project.progress}" min="0" max="100" required></div>
                <div class="form-group"><label>Description</label><textarea id="edit-project-description" rows="3" required>${project.description}</textarea></div>
                <div class="form-group"><label>Location</label><input type="text" id="edit-project-location" value="${project.location.region}" required></div>
                <button type="submit" class="submit-btn">Update Project</button>
                <button type="button" onclick="showAdminPanel()" class="cancel-btn">Cancel</button>
            </form>
        </div>
    `;
}

function updateProject(event, projectId) {
    event.preventDefault();
    const index = projects.findIndex(p => p.id === projectId);
    
    if (index !== -1) {
        projects[index] = {
            ...projects[index],
            name: document.getElementById('edit-project-name').value,
            category: document.getElementById('edit-project-category').value,
            progress: parseInt(document.getElementById('edit-project-progress').value),
            description: document.getElementById('edit-project-description').value,
            location: { region: document.getElementById('edit-project-location').value },
            color: getCategoryColor(document.getElementById('edit-project-category').value)
        };
        
        localStorage.setItem('rds_projects', JSON.stringify(projects));
        showToast("Project updated successfully!", "success");
        renderProjects();
        showAdminPanel();
    }
}

function deleteProject(projectId) {
    if (confirm("Are you sure you want to delete this project?")) {
        projects = projects.filter(p => p.id !== projectId);
        localStorage.setItem('rds_projects', JSON.stringify(projects));
        showToast("Project deleted successfully!", "success");
        renderProjects();
        showAdminPanel();
    }
}

function getCategoryColor(category) {
    const colors = { tech: '#00A1DE', infra: '#007A33', energy: '#FF9800' };
    return colors[category] || '#6c757d';
}

function showSettings() { showToast("Settings coming soon!", "info"); }

function toggleDropdown() {
    document.getElementById('user-dropdown').classList.toggle('show');
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.dataset.filter);
        });
    });
}

function logout() {
    localStorage.removeItem("rds_active_user");
    showToast("Logged out successfully", "success");
    setTimeout(() => window.location.href = "index.html", 500);
}

function loadProjects() {
    const stored = localStorage.getItem('rds_projects');
    if (stored) projects = JSON.parse(stored);
    else localStorage.setItem('rds_projects', JSON.stringify(projects));
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-btn *')) {
        document.getElementById('user-dropdown').classList.remove('show');
    }
};

window.onload = function() {
    loadProjects();
    if (!initUser()) return;
    if (localStorage.getItem('rds_theme') === 'dark') toggleTheme();
    renderProjects();
    displayHistory();
    updateImpactScore();
    initFilters();
    initRatingStars();
};