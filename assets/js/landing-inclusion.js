/**
 * Inclusión y Atención a la Diversidad — Navegación por anclas
 *
 * Reutiliza:
 * - common.js → scroll suave (#)
 * - animations.js → data-animate, data-stagger, data-timeline-item, data-animate-number
 */
(function () {
    'use strict';

    function initAlliesCarousel() {
        var carousel = document.querySelector('[data-allies-carousel]');
        if (!carousel) return;

        var viewport = carousel.querySelector('[data-carousel-viewport]');
        var track = carousel.querySelector('[data-carousel-track]');
        var prevBtn = carousel.querySelector('[data-carousel-prev]');
        var nextBtn = carousel.querySelector('[data-carousel-next]');
        if (!viewport || !track) return;

        var slides = Array.prototype.slice.call(track.children);
        var interval = parseInt(carousel.getAttribute('data-carousel-interval'), 10) || 4500;
        var gap = 16;
        var currentIndex = 0;
        var visibleCount = 1;
        var autoplayTimer = null;

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
            var viewportWidth = viewport.clientWidth;
            var slideWidth = (viewportWidth - gap * (visibleCount - 1)) / visibleCount;

            slides.forEach(function (slide) {
                slide.style.flexBasis = slideWidth + 'px';
                slide.style.minWidth = slideWidth + 'px';
            });

            if (currentIndex > getMaxIndex()) {
                currentIndex = getMaxIndex();
            }

            updatePosition();
        }

        function updatePosition() {
            if (!slides.length) return;
            var slideWidth = slides[0].getBoundingClientRect().width;
            var offset = currentIndex * (slideWidth + gap);
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

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prev();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                next();
                startAutoplay();
            });
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        window.addEventListener('resize', updateLayout);

        updateLayout();
        startAutoplay();
    }

    function init() {
        initAlliesCarousel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.inclusionLanding = {
        init: init
    };
})();
