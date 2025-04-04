document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const carousel = document.querySelector('.product-carousel');
    const slideContainer = document.querySelector('.product-slide');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.product-card').length;

    // Add click events to buttons
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    });

    // Function to update slide position
    function updateSlidePosition() {
        const slideWidth = carousel.clientWidth;
        slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Auto-slide every 3 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }, 3000);

    // Initial position
    updateSlidePosition();
});
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.hero-nav.prev');
    const nextButton = document.querySelector('.hero-nav.next');
    const indicatorsContainer = document.querySelector('.hero-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Time between automatic slides (5 seconds)

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateSlides() {
        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update indicators
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Pause slideshow on hover
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slide.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();
});
document.addEventListener('DOMContentLoaded', function() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dotsContainer = document.getElementById('dotsContainer');
    const loading = document.getElementById('loading');

    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Initialize first dot as active
    updateDots();

    // Load images
    Promise.all(Array.from(document.querySelectorAll('.slide img')).map(img => {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                resolve();
            } else {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            }
        });
    }))
    .then(() => {
        loading.style.display = 'none';
        startSlideshow();
    })
    .catch(error => {
        console.error('Error loading images:', error);
        loading.style.display = 'none';
    });

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
    });

    // Pause slideshow on hover
    slidesWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slidesWrapper.addEventListener('mouseleave', () => {
        startSlideshow();
    });
});