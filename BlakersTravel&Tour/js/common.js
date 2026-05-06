function checkRentalAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'user.html';[cite: 4, 5]
    } else {
        alert("Please log in to access the booking system.");[cite: 4, 5]
        window.location.href = 'login.html';[cite: 4, 5]
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');[cite: 4, 5]
    localStorage.removeItem('userRole');[cite: 4, 5]
    window.location.href = 'index.html';[cite: 4, 5]
}


function handleRentalSelection(button) {
    const card = button.closest('.car-card');[cite: 5, 6]
    if (card) {

        const vanName = card.querySelector('h3').textContent;[cite: 5, 6]
        const vanPrice = card.querySelector('.price').textContent;[cite: 5, 6]
     
        localStorage.setItem('selectedVan', vanName);[cite: 5, 6]
        localStorage.setItem('selectedPrice', vanPrice);[cite: 5, 6]
        

        window.location.href = 'payment.html';[cite: 5, 6]
    } else {
        console.error("Card container not found.");
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
