
document.querySelectorAll('.pay-method').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.pay-method').forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    const names = {
      visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express',
      paypal: 'PayPal', gcash: 'GCash', maya: 'Maya'
    };
    const msg = document.getElementById('pay-selected-msg');
    if (msg) msg.textContent = '✓ ' + (names[el.dataset.pay] || el.dataset.pay) + ' selected as payment method.';
  });
});

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const total = document.querySelector('[data-total]').textContent;
    const selected = document.querySelector('.pay-method.selected');
    if (total === '$0') {
      alert('Please add at least one ticket before checking out.');
      return;
    }
    if (!selected) {
      alert('Please select a payment method.');
      return;
    }
    const method = selected.querySelector('span:last-child').textContent;
    alert('Checkout: ' + total + ' via ' + method + '.\n\n(Connect to your backend to process real payments.)');
  });
}
