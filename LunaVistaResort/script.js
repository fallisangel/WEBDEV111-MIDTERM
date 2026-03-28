
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        let current = 0;

        function goToSlide(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[current].classList.add('active');
        }

        prev.addEventListener('click', () => goToSlide(current - 1));
        next.addEventListener('click', () => goToSlide(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

        setInterval(() => goToSlide(current + 1), 4000);