document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       CAROUSEL
    ========================= */
    const track = document.getElementById('carouselTrack');

    if (track) {

        const prevBtn = document.querySelector('.carousel-arrow.prev');
        const nextBtn = document.querySelector('.carousel-arrow.next');
        const dots = document.querySelectorAll('.dot');
        const arrows = document.querySelectorAll('.carousel-arrow');
        const dotsContainer = document.getElementById('carouselDots');

        let index = 0;
        let autoScroll;

        const firstCard = track.children[0];

        if (!firstCard) return;

        const getCardWidth = () => firstCard.offsetWidth + 20;
        const getContainerWidth = () => track.parentElement.offsetWidth;
        const getMaxTranslate = () => track.scrollWidth - getContainerWidth();

        function updateCarousel(newIndex = index) {
            index = newIndex;

            let moveX = index * getCardWidth();
            const maxTranslate = getMaxTranslate();

            if (moveX > maxTranslate) moveX = maxTranslate;
            if (moveX < 0) moveX = 0;

            track.style.transform = `translateX(-${moveX}px)`;

            dots.forEach(dot => dot.classList.remove('active'));

            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }

        /* =========================
           BOTÕES
        ========================= */
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (index < track.children.length - 1) index++;
                updateCarousel();
                restartCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (index > 0) index--;
                updateCarousel();
                restartCarousel();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                index = i;
                updateCarousel();
                restartCarousel();
            });
        });

        /* =========================
           AUTO SCROLL
        ========================= */
        function startAutoScroll() {
            autoScroll = setInterval(() => {
                if (index < track.children.length - 1) {
                    index++;
                } else {
                    index = 0;
                }
                updateCarousel();
            }, 3000);
        }

        function restartCarousel() {
            clearInterval(autoScroll);
            startAutoScroll();
        }

        startAutoScroll();

        /* =========================
           MOBILE: ESCONDER SETAS E DOTS
        ========================= */
        function handleMobileCarousel() {
            const isMobile = window.innerWidth <= 600;

            arrows.forEach(arrow => {
                arrow.style.display = isMobile ? 'none' : 'block';
            });

            if (dotsContainer) {
                dotsContainer.style.display = isMobile ? 'none' : 'flex';
            }
        }

        handleMobileCarousel();
        window.addEventListener('resize', handleMobileCarousel);

        /* =========================
           SWIPE MOBILE
        ========================= */
        let startX = 0;

        track.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 600) return;
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            if (window.innerWidth > 600) return;

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const cards = track.children;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    if (index < cards.length - 1) index++;
                } else {
                    if (index > 0) index--;
                }
                updateCarousel();
                restartCarousel();
            }
        });
    }

    /* =========================
       FORMULÁRIO
    ========================= */
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });
    }

    /* =========================
       MENU MOBILE
    ========================= */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            document.body.style.overflow =
                mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

});


document.addEventListener("DOMContentLoaded", function () {

    const accepted = localStorage.getItem("cookieConsent");
    const rejectedSession = sessionStorage.getItem("cookieRejected");

    // Mostrar modal SOMENTE se:
    // - não aceitou permanentemente
    // - não rejeitou nesta sessão
    if (accepted !== "accepted" && !rejectedSession) {
        document.getElementById("cookieOverlay").style.display = "flex";
    }
});

// ACEITAR COOKIES (persistente)
document.getElementById("acceptCookies").addEventListener("click", function () {

    localStorage.setItem("cookieConsent", "accepted");

    const userData = {
        firstVisit: new Date().toISOString(),
        fastLoad: true
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    document.getElementById("cookieOverlay").style.display = "none";
});

// REJEITAR COOKIES (somente nesta sessão)
document.getElementById("rejectCookies").addEventListener("click", function () {

    // Marca rejeição apenas enquanto o navegador estiver aberto
    sessionStorage.setItem("cookieRejected", "true");

    // Garante que nada persistente fique salvo
    localStorage.removeItem("userData");

    document.getElementById("cookieOverlay").style.display = "none";
});

