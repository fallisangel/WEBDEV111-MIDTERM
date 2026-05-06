let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

function goToSlide(n) {
    showSlide(n);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    
    setInterval(() => {
        changeSlide(1);
    }, 5000);
});