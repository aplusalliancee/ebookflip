/* ============================================================
   js/auth.js
   Shared authentication helpers used by all pages
   ============================================================ */

const Auth = {

  /* ── Storage helpers ── */
  getUsers() {
    try { return JSON.parse(localStorage.getItem('ef_users') || '{}'); }
    catch { return {}; }
  },
  saveUsers(u) { localStorage.setItem('ef_users', JSON.stringify(u)); },

  getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('ef_session')); }
    catch { return null; }
  },
  saveSession(user) { localStorage.setItem('ef_session', JSON.stringify(user)); },
  clearSession()    { localStorage.removeItem('ef_session'); },

  /* ── Auth actions ── */
  signup(name, email, password) {
    const users = this.getUsers();
    if (!name || !email || !password) return { ok: false, error: 'Please fill in all fields.' };
    if (users[email]) return { ok: false, error: 'An account with this email already exists.' };
    users[email] = { name, password, plan: null, createdAt: Date.now() };
    this.saveUsers(users);
    const user = { email, name, plan: null };
    this.saveSession(user);
    return { ok: true, user };
  },

  login(email, password) {
    const users = this.getUsers();
    if (!users[email] || users[email].password !== password) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    const user = { email, name: users[email].name, plan: users[email].plan || null };
    this.saveSession(user);
    return { ok: true, user };
  },

  logout() {
    this.clearSession();
    window.location.href = '../index.html';
  },

  setPlan(plan) {
    const user = this.getCurrentUser();
    if (!user) return;
    const users = this.getUsers();
    if (users[user.email]) {
      users[user.email].plan = plan;
      this.saveUsers(users);
    }
    user.plan = plan;
    this.saveSession(user);
  },

  /* ── Guards ── */
  requireLogin(redirectTo = '../pages/login.html') {
    if (!this.getCurrentUser()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  requirePlan(redirectTo = '../pages/checkout.html') {
    const user = this.getCurrentUser();
    if (!user || !user.plan) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  }
};

/* ── Toast helper (works on any page) ── */
function showToast(title, sub = '') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.innerHTML = '<div class="toast-title" id="toast-title"></div><div class="toast-sub" id="toast-sub"></div>';
    document.body.appendChild(t);
  }
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-sub').textContent   = sub;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
