/* ============================================================
   js/landing.js
   ============================================================ */

/* ── Phone clock ── */
function updateClock() {
  const n = new Date(), h = n.getHours() % 12 || 12, m = String(n.getMinutes()).padStart(2,'0');
  const el = document.getElementById('phone-time');
  if (el) el.textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 30000);

/* ── Scrolling book columns ── */
(function buildBookColumns() {
  const section = document.getElementById('bookSection');
  if (!section || typeof EBOOKS === 'undefined') return;

  function makeCard(book) {
    const hasCover = book.cover && book.cover.trim() !== '';
    return `
      <div class="book-card" style="background:${book.bg}">
        ${hasCover
          ? `<img class="cover" src="/ebookflip/${book.cover}" alt="${book.name}" loading="lazy">`
          : `<span class="book-emoji">${book.emoji}</span>`
        }
        <div class="book-title">${book.name}</div>
      </div>`;
  }

  function buildCol(items, cls) {
    const doubled = [...items, ...items];
    return `<div class="book-col ${cls}">${doubled.map(makeCard).join('')}</div>`;
  }

  const cols = [
    EBOOKS.slice(0, 5),
    EBOOKS.slice(3, 9),
    EBOOKS.slice(6, 12),
    EBOOKS.slice(9, 14),
    EBOOKS.slice(2, 7),
  ];
  const clss = ['up','down','up','down','up2'];
  section.innerHTML = cols.map((c, i) => buildCol(c, clss[i])).join('');
})();

/* ── Marquee ── */
(function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track || typeof EBOOKS === 'undefined') return;
  const doubled = [...EBOOKS, ...EBOOKS];
  track.innerHTML = doubled.map(b => {
    const hasCover = b.cover && b.cover.trim() !== '';
    return `
      <div class="prod-card">
        <div class="prod-thumb" style="background:${b.bg}">
          ${hasCover ? `<img src="/ebookflip/${b.cover}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover">` : b.emoji}
        </div>
        <div class="prod-body">
          <div class="prod-name">${b.name}</div>
          <div class="prod-niche">${b.niche}</div>
          <div class="prod-badge">${b.regularPrice ? `<span style="text-decoration:line-through;opacity:0.6;margin-right:8px">${b.regularPrice}</span>` : ''}${b.price}</div>
        </div>
      </div>`;
  }).join('');
})();

/* ── Live sales phone animation ── */
(function phoneAnimation() {
  const feed    = document.getElementById('sales-feed');
  const revDisp = document.getElementById('rev-display');
  if (!feed || !revDisp) return;

  const locs = ["Austin TX","NYC NY","LA CA","Miami FL","Chicago IL","Denver CO","Seattle WA","Phoenix AZ","Atlanta GA","London UK","Toronto CA","Sydney AU"];
  let total = 0;

  function addSale() {
    if (typeof EBOOKS === 'undefined' || EBOOKS.length === 0) return;
    const b   = EBOOKS[Math.floor(Math.random() * EBOOKS.length)];
    const loc = locs[Math.floor(Math.random() * locs.length)];
    // Parse price like "$47" → 47
    const price = parseInt((b.price || '$27').replace(/\D/g,'')) || 27;
    total += price;
    revDisp.textContent = '$' + total.toLocaleString();

    const row = document.createElement('div');
    row.className = 'sale-row';
    row.innerHTML = `
      <div class="sr-left">
        <div class="sr-ico">${b.emoji}</div>
        <div>
          <div class="sr-name">${b.name}</div>
          <div class="sr-when">Just now · ${loc}</div>
        </div>
      </div>
      <div class="sr-price">+$${price}</div>`;
    feed.insertBefore(row, feed.firstChild);
    if (feed.children.length > 5) feed.removeChild(feed.lastChild);
  }

  setTimeout(() => { addSale(); addSale(); addSale(); addSale(); }, 600);
  setInterval(addSale, 3200);
})();

/* ── Preserve plan param through signup link ── */
(function preservePlanParam() {
  const plan = new URLSearchParams(window.location.search).get('plan');
  if (!plan) return;
  document.querySelectorAll('a[href*="signup"]').forEach(a => {
    const u = new URL(a.href, window.location.href);
    u.searchParams.set('plan', plan);
    a.href = u.toString();
  });
})();
