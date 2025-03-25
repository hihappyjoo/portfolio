$(function () {
    const $title = $(".heaven-only .grid-wrap h2");
    const $window = $(window);

    $window.on("click", function (e) {
        if ($title.is(e.target)) {
            // 클릭한 영역이 $title 중 하나일 때
            gsap.to($title, { opacity: 1, autoAlpha: 1, duration: 0.2 });
            gsap.to($(e.target), { opacity: 0, autoAlpha: 0, duration: 0.3 });
        } else {
            // 클릭한 영역이 $title 중 하나가 아닐 때
            gsap.to($title, { opacity: 1, autoAlpha: 1, duration: 0.2 });
        }
    });
});
