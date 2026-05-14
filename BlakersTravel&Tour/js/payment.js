let currentStep = 1
let selectedPaymentMethod = 'Credit Card'
const RENTAL_PRICE_PER_DAY = 2800

function goStep(stepNumber) {
    const currentPanel = document.querySelector('.step-panel.active')
    if (currentPanel) {
        currentPanel.classList.remove('active')
    }

    updateStepperUI(stepNumber)

    const newPanel = document.getElementById('panel' + stepNumber)
    if (newPanel) {
        newPanel.classList.add('active')
        window.scrollTo(0, 0)
    }

    currentStep = stepNumber

    if (stepNumber === 3) {
        populateSummary()
    }
}

function updateStepperUI(stepNumber) {
    for (let i = 1; i <= 3; i++) {
        const stepCircle = document.getElementById('s' + i)
        const connectorLine = document.getElementById('line' + i)

        if (!stepCircle) continue

        if (i < stepNumber) {
            stepCircle.className = 'step done'
            if (connectorLine) connectorLine.className = 'step-line done'
        } else if (i === stepNumber) {
            stepCircle.className = 'step active'
            if (connectorLine) connectorLine.className = 'step-line'
        } else {
            stepCircle.className = 'step'
            if (connectorLine) connectorLine.className = 'step-line'
        }
    }
}

function calcDays(startDate, endDate) {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    return diff >= 0 ? Math.round(diff) : 0
}

function updatePeriod() {
    const pickup = document.getElementById('f-pickup-date').value
    const dropoff = document.getElementById('f-return-date').value
    const display = document.getElementById('period-display')
    if (!display) return

    const days = calcDays(pickup, dropoff)
    if (days > 0) {
        display.textContent = days + (days === 1 ? ' day' : ' days')
    } else if (days === 0 && pickup && dropoff) {
        display.textContent = '1 day (Same day return)'
    } else {
        display.textContent = 'Select your dates above'
    }
}

function selectPM(element) {
    const allOptions = document.querySelectorAll('.pm-option')
    allOptions.forEach(option => option.classList.remove('selected'))
    element.classList.add('selected')
    selectedPaymentMethod = element.querySelector('.pm-label').textContent

    const ccForm = document.getElementById('card-form')
    if (ccForm) {
        ccForm.style.display = (selectedPaymentMethod === 'Credit Card') ? 'block' : 'none'
    }
}

function populateSummary() {
    const getVal = (id) => {
        const el = document.getElementById(id)
        return el ? el.value : ''
    }

    const setTxt = (id, val) => {
        const el = document.getElementById(id)
        if (el) {
            el.textContent = val
        }
    }

    const nameValue = getVal('f-name') || 'Not provided'
    const emailValue = getVal('f-email') || 'Not provided'
    const pickup = getVal('f-pickup-date')
    const returnDate = document.getElementById('f-return-date')?.value
    
    let days = calcDays(pickup, returnDate)
    if (days === 0 && pickup) days = 1 

    const total = days * RENTAL_PRICE_PER_DAY

    setTxt('sum-name', nameValue)
    setTxt('sum-email', emailValue)
    setTxt('sum-pm', selectedPaymentMethod)
    setTxt('sum-period', days > 0 ? `${days} ${days === 1 ? 'day' : 'days'}` : 'Not provided')
    setTxt('sum-total', '₱' + total.toLocaleString('en-PH') + '.00')
}

function confirmBooking() {
    const emailInput = document.getElementById('f-email')
    const email = emailInput ? emailInput.value : 'your email'
    
    const bookingRef = 'BK-' + Math.floor(100000 + Math.random() * 900000)

    const successEmailEl = document.getElementById('success-email')
    const bookingRefEl = document.getElementById('booking-ref')
    
    if (successEmailEl) successEmailEl.textContent = email
    if (bookingRefEl) bookingRefEl.textContent = bookingRef
    
    const panel3 = document.getElementById('panel3')
    const panelSuccess = document.getElementById('panel-success')
    
    if (panel3) panel3.classList.remove('active')
    if (panelSuccess) panelSuccess.classList.add('active')

    for (let i = 1; i <= 3; i++) {
        const stepCircle = document.getElementById('s' + i)
        const connectorLine = document.getElementById('line' + i)
        if (stepCircle) stepCircle.className = 'step done'
        if (connectorLine) connectorLine.className = 'step-line done'
    }
}

function backToHome() {
    localStorage.removeItem('selectedVan')
    localStorage.removeItem('selectedPrice')
    window.location.href = 'user.html'
}

function checkRentalAccess() {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
        window.location.href = 'user.html'
    } else {
        alert("Please log in to access the booking system.")
        window.location.href = 'login.html'
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    localStorage.removeItem('selectedVan')
    localStorage.removeItem('selectedPrice')
    window.location.href = 'index.html'
}

function handleRentalSelection(button) {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (isLoggedIn !== 'true') {
        alert("You must log in as a user to rent a van.")
        window.location.href = 'login.html'
        return
    }

    const card = button.closest('.car-card')
    if (card) {
        const vanName = card.querySelector('h3').textContent
        const vanPrice = card.querySelector('.price').textContent
        
        localStorage.setItem('selectedVan', vanName)
        localStorage.setItem('selectedPrice', vanPrice)
        window.location.href = 'payment.html'
    }
}


function showLoginModal() {
    const modal = document.getElementById('loginModal')
    if (modal) modal.style.display = 'flex'
}

function closeModal() {
    const modal = document.getElementById('loginModal')
    if (modal) modal.style.display = 'none'
}


document.addEventListener('DOMContentLoaded', () => {
    const allRentButtons = document.querySelectorAll('.btn-rent, .btn-rent-now')
    
    allRentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault()
            handleRentalSelection(this)
        })
    })

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('loginModal')
        if (event.target === modal) {
            closeModal()
        }
    })
})