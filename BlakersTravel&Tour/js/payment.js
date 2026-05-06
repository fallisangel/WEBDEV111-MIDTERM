let currentStep = 1;
let selectedPaymentMethod = 'Credit Card';
const RENTAL_PRICE_PER_DAY = 2800;

function goStep(stepNumber) {
    const currentPanel = document.querySelector('.step-panel.active');
    if (currentPanel) {
        currentPanel.classList.remove('active');
    }

    updateStepperUI(stepNumber);

    const newPanel = document.getElementById('panel' + stepNumber);
    if (newPanel) {
        newPanel.classList.add('active');
    }

    currentStep = stepNumber;

    if (stepNumber === 3) {
        populateSummary();
    }
}

function updateStepperUI(stepNumber) {
    for (let i = 1; i <= 3; i++) {
        const stepCircle = document.getElementById('s' + i);
        const connectorLine = document.getElementById('line' + i);

        if (!stepCircle) continue;

        if (i < stepNumber) {
            stepCircle.className = 'step done';
            if (connectorLine) connectorLine.className = 'step-line done';
        } else if (i === stepNumber) {
            stepCircle.className = 'step active';
            if (connectorLine) connectorLine.className = 'step-line';
        } else {
            stepCircle.className = 'step';
            if (connectorLine) connectorLine.className = 'step-line';
        }
    }
}

function calcDays(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    return diff > 0 ? Math.round(diff) : 0;
}

function updatePeriod() {
    const pickup = document.getElementById('f-pickup-date').value;
    const dropoff = document.getElementById('f-return-date').value;
    const display = document.getElementById('period-display');
    if (!display) return;

    const days = calcDays(pickup, dropoff);
    if (days > 0) {
        display.textContent = days + (days === 1 ? ' day' : ' days');
    } else {
        display.textContent = 'Select your dates above';
    }
    return days;
}

function selectPM(element) {
    const allOptions = document.querySelectorAll('.pm-option');
    allOptions.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
    selectedPaymentMethod = element.querySelector('.pm-label').textContent;
}

function populateSummary() {
    const nameValue = document.getElementById('f-name').value || 'Not provided';
    const emailValue = document.getElementById('f-email').value || 'Not provided';
    const pickup = document.getElementById('f-pickup-date').value;
    const returnDate = document.getElementById('f-return-date').value;
    const days = calcDays(pickup, returnDate);
    const total = days * RENTAL_PRICE_PER_DAY;

    const selectedVan = localStorage.getItem('selectedVan') || 'Selected Van';
    const selectedPrice = localStorage.getItem('selectedPrice') || '₱0.00';

    document.getElementById('sum-name').textContent = nameValue;
    document.getElementById('sum-email').textContent = emailValue;
    document.getElementById('sum-pm').textContent = selectedPaymentMethod;
    document.getElementById('sum-period').textContent = days > 0 ? days + (days === 1 ? ' day' : ' days') : 'Not provided';
    document.getElementById('sum-total').textContent = '₱' + total.toLocaleString('en-PH') + '.00';
}

function confirmBooking() {
    const email = document.getElementById('f-email').value || 'your email';
    const bookingRef = 'BK-' + Math.floor(100000 + Math.random() * 900000);

    document.getElementById('success-email').textContent = email;
    document.getElementById('booking-ref').textContent = bookingRef;
    document.getElementById('panel3').classList.remove('active');
    document.getElementById('panel-success').classList.add('active');

    [1, 2, 3].forEach(i => {
        const stepCircle = document.getElementById('s' + i);
        const connectorLine = document.getElementById('line' + i);
        if (stepCircle) stepCircle.className = 'step done';
        if (connectorLine) connectorLine.className = 'step-line done';
    });
}

function formatCC(input) {
    let value = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = value.replace(/(.{4})/g, '$1  ').trim();
}

function initializePaymentPage() {
    const loginStatus = checkLoginStatus();
    if (!loginStatus.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const pickupInput = document.getElementById('f-pickup-date');
    const returnInput = document.getElementById('f-return-date');
    if (pickupInput) pickupInput.addEventListener('change', updatePeriod);
    if (returnInput) returnInput.addEventListener('change', updatePeriod);
}

document.addEventListener('DOMContentLoaded', () => {

    const allRentButtons = document.querySelectorAll('.btn-rent, .btn-rent-now');

    allRentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 

            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn !== 'true') {
                alert("You must log in as a user to rent a van.");
                window.location.href = 'login.html';
            } else {
      
                const card = this.closest('.car-card');
                
   
                if (card) {
                    const vanName = card.querySelector('h3').textContent;
                    const vanPrice = card.querySelector('.price').textContent;

                    localStorage.setItem('selectedVan', vanName);
                    localStorage.setItem('selectedPrice', vanPrice);
                    window.location.href = 'payment.html';
                } else {
                
                    window.location.href = '#car-collection';
                }
            }
        });
    });
});