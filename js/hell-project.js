document.addEventListener("DOMContentLoaded", () => {
    const $window = $(window);
    const $header = $("header.hell");

    let lastScrollTop = 0;

    function toggleHeaderVisibility(isVisible) {
        if (isVisible) {
            $header.removeClass("hide");
        } else {
            $header.addClass("hide");
        }
    }

    // lastscroll 변수활용방식으로 변경
    function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function () {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function () {
                    if (Date.now() - lastRan >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }

    // 스크롤 이벤트가 일어나면
    $window.on(
        "scroll",
        throttle(() => {
            const scTop = $window.scrollTop(); // window의 스크롤 위치 가져오기

            // 스크롤 방향에 따라 헤더 표시/숨김
            if (scTop > lastScrollTop) {
                toggleHeaderVisibility(false); // 스크롤 아래로 -> 헤더 숨김
            } else {
                toggleHeaderVisibility(true); // 스크롤 위로 -> 헤더 표시
            }

            // 마지막 스크롤 위치 갱신
            lastScrollTop = scTop;
        }, 200)
    );

    // 메인스와이퍼
    const mainSwiper = new Swiper("#banner.hell .main-swiper", {
        direction: "horizontal",
        loop: true,
        spaceBetween: 20,

        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });

    // 서브스와이퍼
    const subSwiper = new Swiper("#banner.hell .sub-swiper", {
        direction: "horizontal",
        loop: true,
        spaceBetween: 50,

        navigation: {
            nextEl: ".sub-swiper-wrapper .btn-next",
            prevEl: ".sub-swiper-wrapper .btn-prev",
        },
    });

    // 아더스와이퍼
    const otherSwiper = new Swiper(".hell .other-swiper", {
        direction: "horizontal",
        loop: true,
        autoplay: { delay: 0 },
        speed: 3000,

        slidesPerView: 3.5,
        spaceBetween: 10,
    });

    // 스티키
    const $worklistEl = $(".hell-only  .works-wrap li");
    const $stickyImg = $(".hell-only .sticky figure");
    const $btnProcess = $(".hell-only .btn-process");
    const $btnLink = $(".hell-only .link-website");
    const $listpopup = $("#listpopup.hell");
    const $listpopupImg = $("#listpopup.hell .inner figure");
    const $listpopupClose = $("#listpopup.hell .btn-close");

    // 기본작동정지
    $btnLink.on("click", function (event) {
        event.preventDefault();
    });

    // 리스트에 엑티브클래스부여
    function giveClass(item) {
        $worklistEl.removeClass("active");
        $(item).addClass("active");
    }

    //포트폴리오액티브
    window.onload = function () {
        const hash = location.hash;
        if (hash) {
            giveClass(hash);
            worklistClick(hash);
        }
    };

    // 스티키정보값 펑션
    function worklistClick(item) {
        giveClass(item);

        const $imgSrc = $(item).data("img");
        const $titleSrc = $(item).find(".project-con strong").text();
        const $processSrc = $(item).data("process");
        const $linkSrc = $(item).data("link");

        $stickyImg.html(`<img src="${$imgSrc}" alt="${$titleSrc}">`);
        $stickyImg.find("img").show();

        $btnLink.off("click");
        $btnLink.attr("href", $linkSrc).attr("target", "_blank");

        if ($(item).hasClass("nonpro")) {
            $btnProcess.hide();
        } else {
            $btnProcess.show();
        }

        if ($(item).hasClass("nonweb")) {
            $btnLink.hide();
        } else {
            $btnLink.show();
        }

        if ($(item).hasClass("figma")) {
            $btnLink.text("FIGMA");
        } else {
            $btnLink.text("WEBSITE");
        }

        $btnProcess.on("click", () => {
            $listpopup.fadeIn();
            $listpopup.css("display", "flex");
            $listpopupImg.html(`<img src="${$processSrc}" alt="${$titleSrc}" />`);
            $listpopupImg.find("img").show();
        });
        $listpopupClose.on("click", () => {
            $listpopup.fadeOut();
        });
    }

    // 실행
    $worklistEl.on("click", function () {
        worklistClick(this);
    });

    // 메인-서브스와이퍼 연동
    const $mainImg = $("#banner.hell .main-swiper .swiper-wrapper .swiper-slide figure img");
    const $btnClose = $("#banner.hell .sub-swiper-wrapper .btn-close");

    $btnClose.on("click", () => {
        $subSwiper.fadeOut();
    });

    $mainImg.on("click", function () {
        const mainImgIdx = $mainImg.index(this);

        goToSlide(mainImgIdx);
    });

    function goToSlide(index) {
        openPopup();
        subSwiper.slideToLoop(index, 500);
    }

    const $subSwiper = $("#banner.hell .sub-swiper-wrapper");
    function openPopup() {
        $subSwiper.fadeIn();
        console.log($mainImg);
    }
});
