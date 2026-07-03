function initRequisitosCarousel() {
    const carousel = document.querySelector('[data-requisitos-carousel]');
    if (!carousel) return;

    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const interval = parseInt(carousel.dataset.carouselInterval, 10) || 5000;
    const gap = 16;

    let currentIndex = 0;
    let visibleCount = 1;
    let autoplayTimer = null;

    function getVisibleCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    function getMaxIndex() {
        return Math.max(0, slides.length - visibleCount);
    }

    function updateLayout() {
        visibleCount = getVisibleCount();
        const viewportWidth = viewport.clientWidth;
        const slideWidth = (viewportWidth - gap * (visibleCount - 1)) / visibleCount;

        slides.forEach(function(slide) {
            slide.style.flexBasis = slideWidth + 'px';
            slide.style.minWidth = slideWidth + 'px';
        });

        if (currentIndex > getMaxIndex()) {
            currentIndex = getMaxIndex();
        }

        updatePosition();
    }

    function updatePosition() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        const offset = currentIndex * (slideWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        updatePosition();
    }

    function next() {
        goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    }

    function prev() {
        goTo(currentIndex <= 0 ? getMaxIndex() : currentIndex - 1);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(next, interval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    prevBtn.addEventListener('click', function() {
        prev();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', function() {
        next();
        resetAutoplay();
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', updateLayout);

    updateLayout();
    startAutoplay();
}

document.addEventListener('DOMContentLoaded', function() {
    initRequisitosCarousel();
});
