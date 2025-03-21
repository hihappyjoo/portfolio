$(function () {
    const $title = $(".grid-wrap h2");
    const $window = $(window);

    console.log($title);
    $title.on("click", function () {
        gsap.to($title, { opacity: 1, userSelect: "initial", pointerEvents: "initial", duration: 0.2 });
        gsap.to($(this), { opacity: 0, userSelect: "none", pointerEvents: "none", duration: 0.3 });
    });
});
