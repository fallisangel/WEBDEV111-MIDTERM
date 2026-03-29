
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const page = document.body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(link => {
  if (link.dataset.nav === page) link.classList.add('active');
});

const partyBtn = document.querySelector('[data-party-toggle]');
if (partyBtn) {
  partyBtn.addEventListener('click', () => {
    const on = document.body.dataset.party === 'on';
    document.body.dataset.party = on ? 'off' : 'on';
    partyBtn.textContent = 'Party Mode: ' + (on ? 'OFF' : 'ON');
  });
}

document.querySelectorAll('[data-ticket-row]').forEach(row => {
  const minus = row.querySelector('[data-qty-minus]');
  const plus  = row.querySelector('[data-qty-plus]');
  const input = row.querySelector('[data-qty]');
  minus.addEventListener('click', () => { input.value = Math.max(0, +input.value - 1); updateTotal(); });
  plus.addEventListener('click',  () => { input.value = +input.value + 1; updateTotal(); });
  input.addEventListener('change', () => { input.value = Math.max(0, +input.value || 0); updateTotal(); });
});

function updateTotal() {
  let t = 0;
  document.querySelectorAll('[data-ticket-row]').forEach(row => {
    t += (+row.querySelector('[data-qty]').value || 0) * (+row.dataset.price || 0);
  });
  const el = document.querySelector('[data-total]');
  if (el) el.textContent = '$' + t;
}

document.querySelectorAll('[data-accordion]').forEach(acc => {
  acc.querySelectorAll('.accordion-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      acc.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
});

const searchInput = document.querySelector('[data-search]');
const filterBtns  = document.querySelectorAll('[data-filter]');
const eventCards  = document.querySelectorAll('[data-event-card]');

if (searchInput) searchInput.addEventListener('input', filterEvents);
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterEvents();
  });
});

function filterEvents() {
  const q = (searchInput?.value || '').toLowerCase();
  const activeFilter = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
  eventCards.forEach(card => {
    const tags = (card.dataset.tags || '').toLowerCase();
    const text = card.textContent.toLowerCase();
    const matchFilter = activeFilter === 'all' || tags.includes(activeFilter.toLowerCase());
    const matchSearch = !q || text.includes(q) || tags.includes(q);
    card.style.display = matchFilter && matchSearch ? '' : 'none';
  });
}
