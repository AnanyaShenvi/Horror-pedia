// ============================================
// Horror-Pedia JavaScript
// Frontend-only functionality using localStorage
// ============================================

// Data Storage Keys
const STORAGE_KEYS = {
  USERS: 'horrorpedia_users',
  STORIES: 'horrorpedia_stories',
  CURRENT_USER: 'horrorpedia_current_user',
  DRAFTS: 'horrorpedia_drafts'
};

// Initialize Data Storage
function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STORIES)) {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DRAFTS)) {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify([]));
  }
}

// Initialize on page load
initStorage();

// ============================================
// Utility Functions
// ============================================

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

function getCurrentUser() {
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userStr ? JSON.parse(userStr) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

function saveUser(user) {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getStories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STORIES) || '[]');
}

function saveStory(story) {
  const stories = getStories();
  if (story.id) {
    const index = stories.findIndex(s => s.id === story.id);
    if (index >= 0) {
      stories[index] = story;
    }
  } else {
    story.id = Date.now().toString();
    story.createdAt = new Date().toISOString();
    story.likes = 0;
    story.comments = [];
    story.views = 0;
    stories.push(story);
  }
  localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  return story;
}

function getDrafts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '[]');
}

function saveDraft(draft) {
  const drafts = getDrafts();
  if (draft.id) {
    const index = drafts.findIndex(d => d.id === draft.id);
    if (index >= 0) {
      drafts[index] = draft;
    }
  } else {
    draft.id = Date.now().toString();
    draft.createdAt = new Date().toISOString();
    drafts.push(draft);
  }
  localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  return draft;
}

function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// ============================================
// Modal Functions
// ============================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('show');
  });
  document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeAllModals();
  }
});

// Close modal on X button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-modal')) {
    closeAllModals();
  }
});

// ============================================
// Authentication
// ============================================

function handleLogin(e) {
  if (e) e.preventDefault();
  
  const username = document.getElementById('loginUsername')?.value;
  const password = document.getElementById('loginPassword')?.value;
  
  if (!username || !password) {
    showToast('Please fill in all fields');
    return;
  }
  
  const users = getUsers();
  const user = users.find(u => 
    (u.email === username || u.displayName === username) && 
    u.password === password
  );
  
  if (user) {
    setCurrentUser(user);
    showToast('Welcome back, ' + (user.displayName || 'Anonymous') + '!');
    closeAllModals();
    setTimeout(() => {
      window.location.href = 'read.html';
    }, 1000);
  } else {
    showToast('Invalid username or password');
  }
}

function handleSignup(e) {
  if (e) e.preventDefault();
  
  const displayName = document.getElementById('signupDisplayName')?.value || 'Anonymous';
  const email = document.getElementById('signupEmail')?.value;
  const password = document.getElementById('signupPassword')?.value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm')?.value;
  const ageVerification = document.getElementById('ageVerification')?.checked;
  const termsAccept = document.getElementById('termsAccept')?.checked;
  
  if (!email || !password) {
    showToast('Please fill in all required fields');
    return;
  }
  
  if (password !== passwordConfirm) {
    showToast('Passwords do not match');
    return;
  }
  
  if (!ageVerification) {
    showToast('You must be 18 or older to join');
    return;
  }
  
  if (!termsAccept) {
    showToast('You must accept the terms and conditions');
    return;
  }
  
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showToast('Email already registered');
    return;
  }
  
  const newUser = {
    id: Date.now().toString(),
    displayName: displayName || 'Anonymous',
    email: email,
    password: password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
    storiesWritten: 0,
    likesReceived: 0
  };
  
  saveUser(newUser);
  setCurrentUser(newUser);
  showToast('Account created successfully!');
  closeAllModals();
  setTimeout(() => {
    window.location.href = 'read.html';
  }, 1000);
}

function handleLogout() {
  setCurrentUser(null);
  showToast('Logged out successfully');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// ============================================
// Story Display Functions
// ============================================

function renderStories(stories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (stories.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--lime-green); grid-column: 1 / -1;">No stories found. Be the first to write one!</p>';
    return;
  }
  
  const isListView = container.classList.contains('list-view');
  
  container.innerHTML = stories.map(story => {
    const excerpt = story.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    const readTime = calculateReadTime(story.content.replace(/<[^>]*>/g, ''));
    const skulls = '💀'.repeat(parseInt(story.scareRating) || 1);
    
    return `
      <div class="story-card ${isListView ? 'list-item' : ''}" data-story-id="${story.id}">
        <div class="story-card-content">
          <h4>${escapeHtml(story.title)}</h4>
          <p class="story-excerpt">${escapeHtml(excerpt)}</p>
          <div class="story-meta">
            <span class="author">${escapeHtml(story.authorName || 'Anonymous')}</span>
            <span class="read-time">${readTime} min read</span>
          </div>
          <div class="scare-rating">
            <span>${skulls}</span>
          </div>
          <div class="category-tags">
            ${story.category ? `<span class="category-tag">${escapeHtml(story.category)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Add click handlers
  container.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('click', () => {
      const storyId = card.dataset.storyId;
      showStoryDetail(storyId);
    });
  });
}

function showStoryDetail(storyId) {
  const stories = getStories();
  const story = stories.find(s => s.id === storyId);
  
  if (!story) {
    showToast('Story not found');
    return;
  }
  
  // Increment views
  story.views = (story.views || 0) + 1;
  saveStory(story);
  
  const modal = document.getElementById('storyModal');
  const detailDiv = document.getElementById('storyDetail');
  
  if (!modal || !detailDiv) return;
  
  const readTime = calculateReadTime(story.content.replace(/<[^>]*>/g, ''));
  const skulls = '💀'.repeat(parseInt(story.scareRating) || 1);
  const currentUser = getCurrentUser();
  const isLiked = currentUser && story.likedBy && story.likedBy.includes(currentUser.id);
  
  detailDiv.innerHTML = `
    <div class="story-detail-header">
      <h2 class="story-detail-title">${escapeHtml(story.title)}</h2>
      <div class="story-detail-meta">
        <span>By: ${escapeHtml(story.authorName || 'Anonymous')}</span>
        <span>${formatDate(story.createdAt)}</span>
        <span>${readTime} min read</span>
        <span>${skulls}</span>
        <span>👁️ ${story.views || 0} views</span>
      </div>
      ${story.warnings && story.warnings.length > 0 ? `
        <div style="margin-top: 1rem; padding: 1rem; background-color: var(--deep-red); border-radius: 4px;">
          <strong>Content Warnings:</strong> ${story.warnings.join(', ')}
        </div>
      ` : ''}
    </div>
    <div class="story-detail-content">
      ${story.content}
    </div>
    <div class="story-actions">
      <button class="like-btn ${isLiked ? 'liked' : ''}" data-story-id="${story.id}">
        ❤️ Like (${story.likes || 0})
      </button>
      <button class="share-btn" onclick="shareStory('${story.id}')">Share</button>
    </div>
  `;
  
  // Add like handler
  const likeBtn = detailDiv.querySelector('.like-btn');
  if (likeBtn) {
    likeBtn.addEventListener('click', () => handleLike(story.id));
  }
  
  openModal('storyModal');
}

function handleLike(storyId) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please login to like stories');
    return;
  }
  
  const stories = getStories();
  const story = stories.find(s => s.id === storyId);
  
  if (!story) return;
  
  if (!story.likedBy) story.likedBy = [];
  
  const isLiked = story.likedBy.includes(currentUser.id);
  
  if (isLiked) {
    story.likedBy = story.likedBy.filter(id => id !== currentUser.id);
    story.likes = Math.max(0, (story.likes || 0) - 1);
  } else {
    story.likedBy.push(currentUser.id);
    story.likes = (story.likes || 0) + 1;
  }
  
  saveStory(story);
  showStoryDetail(storyId); // Refresh the view
}

function shareStory(storyId) {
  const stories = getStories();
  const story = stories.find(s => s.id === storyId);
  
  if (story && navigator.share) {
    navigator.share({
      title: story.title,
      text: story.content.replace(/<[^>]*>/g, '').substring(0, 200),
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    const url = window.location.origin + window.location.pathname + '?story=' + storyId;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Story link copied to clipboard!');
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// Story Filtering and Sorting
// ============================================

function filterAndSortStories() {
  const stories = getStories();
  let filtered = [...stories];
  
  // Search filter
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value) {
    const searchTerm = searchInput.value.toLowerCase();
    filtered = filtered.filter(story => 
      story.title.toLowerCase().includes(searchTerm) ||
      story.content.replace(/<[^>]*>/g, '').toLowerCase().includes(searchTerm) ||
      (story.authorName && story.authorName.toLowerCase().includes(searchTerm))
    );
  }
  
  // Category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter && categoryFilter.value !== 'all') {
    filtered = filtered.filter(story => story.category === categoryFilter.value);
  }
  
  // Scare filter
  const scareFilter = document.getElementById('scareFilter');
  if (scareFilter && scareFilter.value !== 'all') {
    filtered = filtered.filter(story => story.scareRating === scareFilter.value);
  }
  
  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    const sortValue = sortSelect.value;
    switch(sortValue) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'rated':
        filtered.sort((a, b) => parseInt(b.scareRating || 0) - parseInt(a.scareRating || 0));
        break;
      case 'longest':
        filtered.sort((a, b) => b.content.length - a.content.length);
        break;
      case 'shortest':
        filtered.sort((a, b) => a.content.length - b.content.length);
        break;
    }
  }
  
  return filtered;
}

// ============================================
// Write Story Functions
// ============================================

function initRichTextEditor() {
  const editor = document.getElementById('storyContent');
  if (!editor) return;
  
  // Toolbar buttons
  document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const command = btn.dataset.command;
      const value = btn.dataset.value;
      
      if (command === 'formatBlock') {
        document.execCommand(command, false, value);
      } else {
        document.execCommand(command, false, null);
      }
      
      editor.focus();
    });
  });
  
  // Word count
  editor.addEventListener('input', updateWordCount);
  updateWordCount();
}

function updateWordCount() {
  const editor = document.getElementById('storyContent');
  if (!editor) return;
  
  const text = editor.innerText || editor.textContent || '';
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCountEl = document.getElementById('wordCount');
  const charCountEl = document.getElementById('charCount');
  
  if (wordCountEl) wordCountEl.textContent = words.length;
  if (charCountEl) charCountEl.textContent = text.length;
}

function handleAuthorDisplayChange() {
  const radioButtons = document.querySelectorAll('input[name="authorDisplay"]');
  const penNameInput = document.getElementById('penName');
  
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'pen') {
        penNameInput.style.display = 'block';
        penNameInput.required = true;
      } else {
        penNameInput.style.display = 'none';
        penNameInput.required = false;
      }
    });
  });
}

function handleSaveDraft() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please login to save drafts');
    return;
  }
  
  const title = document.getElementById('storyTitle')?.value;
  const content = document.getElementById('storyContent')?.innerHTML;
  
  if (!title || !content || content.trim() === '') {
    showToast('Please add a title and content');
    return;
  }
  
  const draft = {
    id: Date.now().toString(),
    title: title,
    content: content,
    category: document.getElementById('storyCategory')?.value,
    scareRating: document.getElementById('storyScareRating')?.value,
    tags: document.getElementById('storyTags')?.value.split(',').map(t => t.trim()).filter(t => t),
    warnings: Array.from(document.querySelectorAll('input[name="warnings"]:checked')).map(cb => cb.value),
    authorDisplay: document.querySelector('input[name="authorDisplay"]:checked')?.value,
    penName: document.getElementById('penName')?.value,
    userId: currentUser.id,
    updatedAt: new Date().toISOString()
  };
  
  saveDraft(draft);
  showToast('Draft saved successfully!');
}

function handlePreview() {
  const title = document.getElementById('storyTitle')?.value;
  const content = document.getElementById('storyContent')?.innerHTML;
  const category = document.getElementById('storyCategory')?.value;
  const scareRating = document.getElementById('storyScareRating')?.value;
  const currentUser = getCurrentUser();
  
  if (!title || !content || content.trim() === '') {
    showToast('Please add a title and content');
    return;
  }
  
  const authorDisplay = document.querySelector('input[name="authorDisplay"]:checked')?.value;
  let authorName = 'Anonymous';
  
  if (authorDisplay === 'name' && currentUser) {
    authorName = currentUser.displayName || 'Anonymous';
  } else if (authorDisplay === 'pen') {
    authorName = document.getElementById('penName')?.value || 'Anonymous';
  }
  
  const previewContent = document.getElementById('previewContent');
  if (previewContent) {
    const skulls = '💀'.repeat(parseInt(scareRating) || 1);
    previewContent.innerHTML = `
      <div class="story-detail-header">
        <h2 class="story-detail-title">${escapeHtml(title)}</h2>
        <div class="story-detail-meta">
          <span>By: ${escapeHtml(authorName)}</span>
          <span>${skulls}</span>
          <span>Category: ${escapeHtml(category || 'Uncategorized')}</span>
        </div>
      </div>
      <div class="story-detail-content">
        ${content}
      </div>
    `;
  }
  
  openModal('previewModal');
}

function handlePublish() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please login to publish stories');
    window.location.href = 'index.html';
    return;
  }
  
  const title = document.getElementById('storyTitle')?.value;
  const content = document.getElementById('storyContent')?.innerHTML;
  const category = document.getElementById('storyCategory')?.value;
  const scareRating = document.getElementById('storyScareRating')?.value;
  
  if (!title || !content || content.trim() === '' || !category || !scareRating) {
    showToast('Please fill in all required fields');
    return;
  }
  
  const authorDisplay = document.querySelector('input[name="authorDisplay"]:checked')?.value;
  let authorName = 'Anonymous';
  
  if (authorDisplay === 'name') {
    authorName = currentUser.displayName || 'Anonymous';
  } else if (authorDisplay === 'pen') {
    authorName = document.getElementById('penName')?.value || 'Anonymous';
  }
  
  const story = {
    title: title,
    content: content,
    category: category,
    scareRating: scareRating,
    tags: document.getElementById('storyTags')?.value.split(',').map(t => t.trim()).filter(t => t).slice(0, 10),
    warnings: Array.from(document.querySelectorAll('input[name="warnings"]:checked')).map(cb => cb.value),
    authorName: authorName,
    authorId: currentUser.id,
    createdAt: new Date().toISOString(),
    likes: 0,
    views: 0,
    likedBy: []
  };
  
  saveStory(story);
  
  // Update user stats
  currentUser.storiesWritten = (currentUser.storiesWritten || 0) + 1;
  saveUser(currentUser);
  setCurrentUser(currentUser);
  
  showToast('Story published successfully!');
  setTimeout(() => {
    window.location.href = 'read.html';
  }, 1500);
}

function handleCancel() {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    window.location.href = 'read.html';
  }
}

// ============================================
// Page Initialization
// ============================================

function initIndexPage() {
  // Login/Signup button handlers
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const heroLoginBtn = document.getElementById('heroLoginBtn');
  const heroSignupBtn = document.getElementById('heroSignupBtn');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  
  if (loginBtn) loginBtn.addEventListener('click', () => openModal('loginModal'));
  if (signupBtn) signupBtn.addEventListener('click', () => openModal('signupModal'));
  if (heroLoginBtn) heroLoginBtn.addEventListener('click', () => openModal('loginModal'));
  if (heroSignupBtn) heroSignupBtn.addEventListener('click', () => openModal('signupModal'));
  if (switchToSignup) switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllModals();
    setTimeout(() => openModal('signupModal'), 300);
  });
  if (switchToLogin) switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllModals();
    setTimeout(() => openModal('loginModal'), 300);
  });
  
  // Form handlers
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (signupForm) signupForm.addEventListener('submit', handleSignup);
  
  // Check if user is already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    setTimeout(() => {
      window.location.href = 'read.html';
    }, 1000);
  }
}

function initReadPage() {
  // Check authentication
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please login to browse stories');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    return;
  }
  
  // Display user info
  const userInfo = document.getElementById('userInfo');
  if (userInfo) {
    userInfo.textContent = `Welcome, ${currentUser.displayName || 'Anonymous'}`;
  }
  
  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  // View toggle
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const storiesContainer = document.getElementById('storiesContainer');
  
  if (gridViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('active');
      listViewBtn?.classList.remove('active');
      storiesContainer?.classList.remove('list-view');
      loadStories();
    });
  }
  
  if (listViewBtn) {
    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      gridViewBtn?.classList.remove('active');
      storiesContainer?.classList.add('list-view');
      loadStories();
    });
  }
  
  // Filter handlers
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const categoryFilter = document.getElementById('categoryFilter');
  const scareFilter = document.getElementById('scareFilter');
  
  [searchInput, sortSelect, categoryFilter, scareFilter].forEach(el => {
    if (el) {
      el.addEventListener('change', loadStories);
      el.addEventListener('input', loadStories);
    }
  });
  
  // Load stories
  loadStories();
}

function loadStories() {
  const filtered = filterAndSortStories();
  renderStories(filtered, 'storiesContainer');
}

function initWritePage() {
  // Check authentication
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showToast('Please login to write stories');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    return;
  }
  
  // Display user info
  const userInfo = document.getElementById('userInfo');
  if (userInfo) {
    userInfo.textContent = `Welcome, ${currentUser.displayName || 'Anonymous'}`;
  }
  
  // Logout handler
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
  
  // Initialize editor
  initRichTextEditor();
  handleAuthorDisplayChange();
  
  // Button handlers
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const previewBtn = document.getElementById('previewBtn');
  const publishBtn = document.getElementById('publishBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  
  if (saveDraftBtn) saveDraftBtn.addEventListener('click', handleSaveDraft);
  if (previewBtn) previewBtn.addEventListener('click', handlePreview);
  if (publishBtn) publishBtn.addEventListener('click', handlePublish);
  if (cancelBtn) cancelBtn.addEventListener('click', handleCancel);
}

// ============================================
// Initialize based on current page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
    initIndexPage();
  } else if (path.includes('read.html')) {
    initReadPage();
  } else if (path.includes('write.html')) {
    initWritePage();
  }
  
  // Add some sample stories if none exist (for demo purposes)
  const stories = getStories();
  if (stories.length === 0) {
    const sampleStories = [
      {
        id: '1',
        title: 'The Old Mansion',
        content: '<p>They say the mansion has been empty for decades, but the lights still flicker at midnight. I never believed the stories until I moved in next door.</p><p>Every night, I watch from my window as shadows dance behind the curtains. The neighbors warned me, but I thought they were just superstitious. Now I\'m not so sure.</p><p>Last night, I saw a figure standing in the window, staring directly at me. When I blinked, it was gone. But I know what I saw.</p>',
        category: 'ghost',
        scareRating: '3',
        authorName: 'Anonymous',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        likes: 15,
        views: 120,
        tags: ['haunted', 'mansion', 'ghost'],
        warnings: [],
        likedBy: []
      },
      {
        id: '2',
        title: 'Whispers in the Dark',
        content: '<p>Every night at 3 AM, the whispers begin. No one knows where they come from, but everyone in the building has heard them.</p><p>At first, I thought it was just the wind or my neighbors. But the whispers are too clear, too distinct. They\'re calling my name.</p><p>I\'ve tried recording them, but the audio always comes out as static. The building manager says there\'s nothing wrong, but I can see the fear in his eyes.</p>',
        category: 'paranormal',
        scareRating: '4',
        authorName: 'Anonymous',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        likes: 28,
        views: 250,
        tags: ['whispers', 'apartment', 'paranormal'],
        warnings: ['psychological'],
        likedBy: []
      },
      {
        id: '3',
        title: 'The Last Train',
        content: '<p>The 11:59 train doesn\'t appear on any schedule, but it always arrives on time. I\'ve seen it three times now, and each time, fewer people get off.</p><p>The conductor never looks at me, but I can feel his eyes on me. The passengers sit perfectly still, their faces blank.</p><p>Last week, I saw someone I knew get on. They haven\'t been seen since. I think I\'m next.</p>',
        category: 'supernatural',
        scareRating: '5',
        authorName: 'Anonymous',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        likes: 42,
        views: 380,
        tags: ['train', 'supernatural', 'mystery'],
        warnings: ['death'],
        likedBy: []
      }
    ];
    
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(sampleStories));
  }
});
