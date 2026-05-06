function toggleTermsModal(action) {
    const modal = document.getElementById('termsModal');
    if (!modal) return;

    modal.style.display = action === true ? 'flex' : 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('termsModal');
    if (modal && event.target === modal && !document.querySelector('.login-container')) {
        modal.style.display = 'none';
    }
};

function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();


            if (username === 'user' && password === '1234') {
                window.location.href = 'user.html';
            }

            else if (username === 'admin' && password === '1234') {
                window.location.href = 'admin/admin.html';
            }

            else if (username === 'supera' && password === '1234') {
                window.location.href = 'superadmin/staff.html';
            }
            else {
                alert('Invalid username or password.');
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username && email && password) {
                alert('Registered successfully!');
                window.location.href = 'login.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }


    const superAdminForm = document.querySelector('form[action="superlog.html"]');
    if (superAdminForm) {
        superAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === 'supera' && password === '1234') {
                window.location.href = 'superlog.html';
            } else {
                alert('Invalid super admin credentials.');
            }
        });
    }
}

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

    document.getElementById('sum-name').textContent = nameValue;
    document.getElementById('sum-email').textContent = emailValue;
    document.getElementById('sum-pm').textContent = selectedPaymentMethod;
    document.getElementById('sum-period').textContent = days > 0 ? days + (days === 1 ? ' day' : ' days') : 'Not provided';
    document.getElementById('sum-total').textContent = '\u20B1' + total.toLocaleString('en-PH') + '.00';
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

function initializePage() {
    setupAuthForms();

    const pickupInput = document.getElementById('f-pickup-date');
    const returnInput = document.getElementById('f-return-date');
    if (pickupInput) pickupInput.addEventListener('change', updatePeriod);
    if (returnInput) returnInput.addEventListener('change', updatePeriod);

    if (document.querySelector('.login-container')) {
        toggleTermsModal(true);
        disableAuthForm();
    }
}

function disableAuthForm() {
    const authForm = document.querySelector('.login-container form');
    if (!authForm) return;

    const inputs = authForm.querySelectorAll('input');
    const button = authForm.querySelector('button[type="submit"]');

    inputs.forEach(input => input.disabled = true);
    button.disabled = true;
    button.style.opacity = '0.5';
    button.style.cursor = 'not-allowed';
}

function acceptTerms() {
    const agreeCheck = document.getElementById('agreeCheck');
    if (agreeCheck && agreeCheck.checked) {
        toggleTermsModal(false);
        enableAuthForm();
    } else {
        alert('Please check the box to agree to the Terms and Conditions.');
    }
}

function declineTerms() {
    toggleTermsModal(false);
}

function enableAuthForm() {
    const authForm = document.querySelector('.login-container form') || document.querySelector('.register-container form');
    if (!authForm) return;

    const inputs = authForm.querySelectorAll('input');
    const button = authForm.querySelector('button[type="submit"]');

    inputs.forEach(input => input.disabled = false);
    if (button) {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }
}

 function showSuperView(viewId, element) {
          
            document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));

            document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
        
            document.getElementById('view-' + viewId).classList.add('active');
            element.classList.add('active');
        }

document.addEventListener('DOMContentLoaded', initializePage);

