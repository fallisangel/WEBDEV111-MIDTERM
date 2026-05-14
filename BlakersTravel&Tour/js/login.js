function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; 

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();

        if (user === 'user' && pass === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'user');
            window.location.href = 'user.html';
        } 
        else if (user === 'admin' && pass === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin');
            window.location.href = 'admin/admin.html'; 
        } 
        else if (user === 'supera' && pass === '1234') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'superadmin');
            window.location.href = 'superadmin/staff.html';
        } 
        else {
            alert('Invalid username or password.');
        }
    });
}


function toggleTermsModal(action) {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = action === true ? 'flex' : 'none';
    }
}

function acceptTerms() {
    const agreeCheck = document.getElementById('agreeCheck');
    if (agreeCheck && agreeCheck.checked) {
        toggleTermsModal(false);
    } else {
        alert('Please check the box to agree to the Terms and Conditions.');
    }
}

function declineTerms() {
    toggleTermsModal(false);
}

document.addEventListener('DOMContentLoaded', () => {
    setupAuthForms();
 
    if (document.querySelector('.login-container')) {
        toggleTermsModal(true);
    }
});