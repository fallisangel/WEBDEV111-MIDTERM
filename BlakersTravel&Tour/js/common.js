function checkRentalAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'user.html';[cite: 4, 5]
    } else {
        alert("Please log in to access the booking system.");[cite: 4, 5]
        window.location.href = 'login.html';[cite: 4, 5]
    }
}

function backToHome() {
    localStorage.removeItem('selectedVan');
    localStorage.removeItem('selectedPrice');
    window.location.href = 'user.html';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedVan');
    localStorage.removeItem('selectedPrice');
    window.location.href = 'index.html';
}

function checkRentalAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'user.html';
    } else {
        alert("Please log in to access the booking system.");
        window.location.href = 'login.html';
    }
}

function handleRentalSelection(button) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
        alert("You must log in as a user to rent a van.");
        window.location.href = 'login.html';
        return;
    }

    const card = button.closest('.car-card');
    if (card) {
        const vanName = card.querySelector('h3').textContent;
        const vanPrice = card.querySelector('.price').textContent;
        
        localStorage.setItem('selectedVan', vanName);
        localStorage.setItem('selectedPrice', vanPrice);
        window.location.href = 'payment.html';
    } else {
        console.error("Card container not found for this button.");
        window.location.href = 'payment.html';
    }
}

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const allRentButtons = document.querySelectorAll('.btn-rent, .btn-rent-now');
    
    allRentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleRentalSelection(this);
        });
    });


    window.addEventListener('click', (event) => {
        const modal = document.getElementById('loginModal');
        if (event.target === modal) {
            closeModal();
        }
    });
});