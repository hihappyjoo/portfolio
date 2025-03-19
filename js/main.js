$(function () {
    const $body = $("body");
    const $hee = $(".hee");
    const $joo = $(".joo");
    const $heeChrome = $(".heejoo.chrome img:nth-child(1)");
    const $jooChrome = $(".heejoo.chrome img:nth-child(2)");
    const $portChrome = $(".portfolio.chrome");
    const $processChrome = $(".process.chrome");
    const $wandooChrome = $(".wandoo.chrome");
    const $modeChrome = $(".mode.chrome");
    const $header = $("header");
    const $infoText = $(".info-text");
    const $skillMarquee = $(".skill-marquee p");
    const $skillMarqueeWrap = $(".skill-marquee-wrap");

    console.log($modeChrome);

    const tl = gsap.timeline();
    const width = $hee.outerWidth() * 1.27;

    tl.from($body, { backgroundColor: "#fff", duration: 4, ease: "power2.in" });
    tl.from($hee, { x: width + "px", duration: 4, ease: "power2.in" }, "<");
    tl.from($joo, { x: width + "px", duration: 4, ease: "power2.in" }, "-=3.3");
    tl.from($skillMarqueeWrap, { autoAlpha: 0 });
    tl.from($heeChrome, { x: 500, duration: 2, ease: "elastic.out(1,0.1.5)" }, "-=1.5");
    tl.from($jooChrome, { x: 500, duration: 2, ease: "elastic.out(1,0.1.5)" }, "-=1.2");
    tl.from($skillMarquee, { autoAlpha: 0 }, "<");
    tl.from($infoText, { autoAlpha: 0 }, "-=0.5");
    tl.from(
        $portChrome,
        {
            autoAlpha: 0,
            scale: 1.2,
            duration: 0.7,
            ease: "bounce.out",
        },
        "<"
    );
    tl.from($processChrome, { autoAlpha: 0, scale: 1.7, duration: 0.7, ease: "bounce.out" }, "-=0.5");
    tl.from($wandooChrome, { autoAlpha: 0, scale: 1.5, duration: 0.7, ease: "bounce.out" }, "-=0.5");
    tl.from($modeChrome, { autoAlpha: 0, scale: 1.2, duration: 0.7, ease: "bounce.out" }, "-=0.5");
    tl.from(
        $header,
        {
            y: -120,
            autoAlpha: 0,
            onComplete: () => $header.css({ visibility: "visible", opacity: 1, transform: "translateY(0)" }),
        },
        "-=2"
    );
    // e: gsap

    const $chrome = $(".chrome");
    const $process = $(".popup .process");

    function toggleC(target, action) {
        let classes = $(target).attr("class").split(" ");
        let targetClass = classes.find((item) => item !== "chrome");

        if (targetClass) {
            $(".popup ." + targetClass).toggleClass("active", action === "true");
        }
    }

    $chrome.on("mouseenter", function () {
        toggleC(this, "true");
    });
    $process.on("mouseenter", function () {
        toggleC(this, "true");
    });
    $chrome.on("mouseleave", function () {
        toggleC(this, "false");
    });
    $process.on("mouseleave", function () {
        toggleC(this, "false");
    });
});
