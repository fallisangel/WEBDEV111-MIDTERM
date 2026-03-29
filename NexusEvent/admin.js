
const form   = document.querySelector('[data-admin-form]');
const status = document.querySelector('[data-admin-status]');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.querySelector('[data-admin-user]').value.trim();
    const pass = document.querySelector('[data-admin-pass]').value.trim();
    if (user === 'admin' && pass === 'nexus2026') {
      status.style.color = 'var(--blue-1)';
      status.textContent = '✓ Access granted. Redirecting to dashboard...';
      setTimeout(() => { status.textContent = '(Demo — no dashboard connected yet.)'; }, 2200);
    } else {
      status.style.color = '#c00';
      status.textContent = '✗ Invalid credentials. Try admin / nexus2026.';
    }
  });
}
