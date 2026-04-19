/* ============================================================
   js/dashboard.js
   ============================================================ */

/* ── Auth guard: must be logged in AND have a plan ── */
const currentUser = Auth.getCurrentUser();
if (!currentUser) {
  window.location.href = 'login.html';
}

/* ── Populate username ── */
const unEl = document.getElementById('dash-username');
if (unEl) unEl.textContent = currentUser ? currentUser.name.split(' ')[0] : 'Creator';

/* ── State ── */
let activeNiche   = 'All';
let searchQuery   = '';
let visibleEbooks = [];

/* ── Show locked overlay if no plan ── */
const lockedOverlay = document.getElementById('locked-overlay');
if (lockedOverlay) {
  lockedOverlay.style.display = (currentUser && currentUser.plan) ? 'none' : 'flex';
}

/* ── Stats ── */
(function updateStats() {
  const plan  = currentUser && currentUser.plan;
  const books = typeof getEbooksForPlan !== 'undefined' ? getEbooksForPlan(plan) : EBOOKS;
  const count = plan ? books.length : 0;
  const totalVal = books.reduce((acc, b) => {
    return acc + (parseInt((b.price||'$27').replace(/\D/g,'')) || 27);
  }, 0);
  const el = document.getElementById('stat-count');
  const pe = document.getElementById('stat-potential');
  if (el) el.textContent = plan ? count.toLocaleString() : '—';
  if (pe) pe.textContent = plan ? ('$' + totalVal.toLocaleString()) : '—';
})();

/* ── Build niche filter row ── */
function buildFilters() {
  const fr    = document.getElementById('filter-row');
  if (!fr) return;
  const niches = ['All', ...new Set(EBOOKS.map(e => e.niche))];
  fr.innerHTML  = niches.map(n =>
    `<button class="filter-btn ${n===activeNiche?'active':''}" onclick="setNiche('${n}')">${n}</button>`
  ).join('');
}

function setNiche(n) { activeNiche = n; buildFilters(); renderEbooks(); }

/* ── Render ebook grid ── */
function renderEbooks() {
  const grid  = document.getElementById('ebook-grid');
  if (!grid)  return;
  const plan  = currentUser && currentUser.plan;
  let books   = plan ? getEbooksForPlan(plan) : EBOOKS;

  if (activeNiche !== 'All') books = books.filter(b => b.niche === activeNiche);
  if (searchQuery)            books = books.filter(b =>
    b.name.toLowerCase().includes(searchQuery) ||
    b.desc.toLowerCase().includes(searchQuery) ||
    b.niche.toLowerCase().includes(searchQuery)
  );
  visibleEbooks = books;

  if (books.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:60px 0">No templates found. Try a different search.</div>`;
    return;
  }

  grid.innerHTML = books.map(b => {
    const hasCover = b.cover && b.cover.trim() !== '';
    return `
    <div class="ebook-card" onclick="openPreview(${b.id})">
      <div class="ebook-thumb" style="background:${b.bg}">
        ${hasCover
          ? `<img class="ebook-cover" src="../${b.cover}" alt="${b.name}" loading="lazy">`
          : `<span>${b.emoji}</span>`}
        <div class="ebook-niche-tag">${b.niche}</div>
      </div>
      <div class="ebook-body">
        <div class="ebook-name">${b.name}</div>
        <div class="ebook-desc">${b.desc}</div>
        <div class="ebook-footer">
          <span class="ebook-pages">${b.pages}</span>
          <div class="ebook-actions">
            <button class="preview-btn" onclick="event.stopPropagation();openPreview(${b.id})">Preview</button>
            <button class="download-btn" id="dl-${b.id}" onclick="event.stopPropagation();downloadEbook(${b.id})">
              ⬇ Download
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── Search ── */
function filterEbooks(q) { searchQuery = q.toLowerCase(); renderEbooks(); }

/* ── PREVIEW MODAL ── */
function openPreview(id) {
  const book = EBOOKS.find(b => b.id === id);
  if (!book) return;

  const hasCover = book.cover && book.cover.trim() !== '';
  const toc = (book.tableOfContents || []).map(c => `  ${c}`).join('\n');
  const preview = book.previewText || '(Preview not available)';

  document.getElementById('modal-cover-area').innerHTML = hasCover
    ? `<img class="modal-cover" src="../${book.cover}" alt="${book.name}">`
    : `<div class="modal-cover-emoji">${book.emoji}</div>`;

  document.getElementById('modal-title').textContent = book.name;
  document.getElementById('modal-meta').innerHTML = `
    <span class="meta-tag">${book.niche}</span>
    <span class="meta-tag">${book.pages}</span>
    <span class="meta-tag">Suggested price: ${book.price}</span>
    <span class="meta-tag">Full PLR</span>`;
  document.getElementById('modal-desc').textContent = book.desc;
  document.getElementById('modal-toc').innerHTML = `
    <div class="modal-preview-title">Table of Contents</div>
    <div class="preview-content">${toc}</div>`;
  document.getElementById('modal-preview').innerHTML = `
    <div class="modal-preview-title">Preview (First Chapter)</div>
    <div class="preview-content">${preview}</div>`;
  document.getElementById('modal-dl-btn').onclick = () => downloadEbook(id);

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* Close on overlay click */
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closePreview();
});

/* ── DOWNLOAD ── */
function downloadEbook(id) {
  const book = EBOOKS.find(b => b.id === id);
  if (!book) return;

  const btn = document.getElementById('dl-' + id);
  if (btn) { btn.innerHTML = '⏳ Preparing…'; btn.disabled = true; }

  setTimeout(() => {
    /* ── Option B: if a real file path is set, download it directly ── */
    if (book.file && book.file.trim() !== '') {
      const a = document.createElement('a');
      a.href     = '../' + book.file;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      /* ── Option A: generate a text file from the ebook data ── */
      const content = generateTextEbook(book);
      const blob    = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url     = URL.createObjectURL(blob);
      const a       = document.createElement('a');
      a.href     = url;
      a.download = book.name.replace(/[^a-z0-9]/gi, '_') + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    if (btn) {
      btn.innerHTML = '✓ Done!';
      btn.style.background = '#4caf50';
      setTimeout(() => {
        btn.innerHTML = '⬇ Download';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
    showToast('Download started!', book.name);
    closePreview();
  }, 1000);
}

function generateTextEbook(book) {
  const toc     = (book.tableOfContents || []).map(c => `  ${c}`).join('\n');
  const preview = book.previewText || '';
  const line    = '━'.repeat(52);

  return `╔${'═'.repeat(54)}╗
║  ${book.emoji}  ${book.name.toUpperCase().substring(0,46).padEnd(46)}  ║
║  EbookFlip · ebookflip.com · Private Label Rights  ║
╚${'═'.repeat(54)}╝

PRIVATE LABEL RIGHTS LICENSE
${line}
✓  You may sell this product and keep 100% of profit
✓  You may brand it as your own product
✓  You may modify the content freely
✓  You may give it away as a bonus
✗  You may NOT claim original copyright ownership
✗  You may NOT resell the resell rights themselves
${line}

TITLE:    ${book.name}
NICHE:    ${book.niche}
LENGTH:   ${book.pages}
SUGGESTED RETAIL: ${book.price}

${line}
TABLE OF CONTENTS
${line}
${toc}

${line}
PREVIEW / CHAPTER EXCERPT
${line}
${preview}

${line}
[FULL CONTENT]
${line}
This template contains the complete ${book.pages} of premium content.

TO CUSTOMIZE THIS EBOOK:
  1. Import this text into Google Docs, Word, or Canva
  2. Add your name and brand to the cover
  3. Expand each chapter with your personal insights
  4. Export as PDF and sell for ${book.price} or more

TO SELL THIS EBOOK:
  → Etsy (digital downloads section)
  → Gumroad (gumroad.com)
  → TikTok Shop
  → Your own Shopify store
  → Instagram/Facebook direct sales

${line}
© 2025 EbookFlip — Private Label Rights Granted
Visit ebookflip.com for more templates
${line}`;
}

/* ── LOGOUT ── */
function doLogout() {
  Auth.logout();
}

/* ── INIT ── */
buildFilters();
renderEbooks();
