document.addEventListener("DOMContentLoaded", () => {
    const mainSwiper = new Swiper(".main-swiper", {
        direction: "horizontal",
        loop: true,
        spaceBetween: 20,

        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });

    const subSwiper = new Swiper(".sub-swiper", {
        direction: "horizontal",
        loop: true,
        spaceBetween: 50,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    const otherSwiper = new Swiper(".other-swiper", {
        direction: "horizontal",
        loop: true,
        autoplay: { delay: 0 },
        speed: 3000,

        slidesPerView: 4,
        spaceBetween: 10,
    });
});
