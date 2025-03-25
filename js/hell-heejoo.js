$(function () {
    const $h2 = $(".hell-only h2");

    const $infoList = $(".hell-only .info-list li");
    const $infoAbout = $(".hell-only .info-list .about");
    const $infoEducation = $(".hell-only .info-list .education");
    const $infoExperince = $(".hell-only .info-list .experince");
    const $infoLicense = $(".hell-only .info-list .license");
    const $infoSkills = $(".hell-only .info-list .skills");

    const $popup = $(".hell-only .popup");
    const $popupAbout = $(".hell-only .popup-list .about");
    const $popupEducationEl = $(".hell-only .popup-list .education ul li");
    const $popupLicenseEl = $(".hell-only .popup-list .license ul li");
    const $popupSkillsEl = $(".hell-only .popup-list .skills img");

    setTimeout(() => {
        const tl = gsap.timeline();

        $h2.removeClass("active");
        tl.from($infoList, { y: 200, autoAlpha: 0, stagger: 0.2 });
    }, 2500);

    function removeActive() {
        $infoList.removeClass("active");
        $popup.css("visibility", "hidden"); // 모든 팝업 숨기기
    }

    function addActive(target) {
        let classes = $(target).attr("class").split(" ");
        let targetClass = classes.find((item) => item !== "info");

        $(target).toggleClass("active");
        $(".popup." + targetClass).css("visibility", "visible");
    }

    function clickAgain(target) {
        $(target).hasClass("active");
    }

    $infoList.on("click", function () {
        if (clickAgain(this)) {
            removeActive();
        }
    });

    $h2.on("mouseenter", () => {
        $h2.addClass("thumb");
        removeActive();
    });

    $h2.on("mouseleave", () => {
        $h2.removeClass("thumb");
    });

    $infoAbout.on("click", function () {
        removeActive();
        addActive(this);
        gsap.from($popupAbout, { x: 500, autoAlpha: 0, duration: 0.5, ease: "elastic.out(1,0.7)" });
    });

    $infoEducation.on("click", function () {
        removeActive();
        addActive(this);
        gsap.from($popupEducationEl, { x: 500, autoAlpha: 0, stagger: 0.2, ease: "power4.out" });
    });

    $infoExperince.on("click", function () {
        removeActive();
        addActive(this);

        const tl = gsap.timeline({
            defaults: {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.out",
            },
        });

        tl.from($(".popup-list .experince .line1"), { width: 0, duration: 0.5 });
        tl.from($(".popup-list .experince .dot1"), { scale: 0 }, "-=0.1");
        tl.from($(".popup-list .experince .dot2"), { scale: 0 }, "<");
        tl.from($(".popup-list .experince .line2"), { x: 500 });
        tl.from($(".popup-list .experince .line3"), { x: 500 }, "-=0.2");
        tl.from($(".popup-list .experince ul li"), { x: 500, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.1");
    });

    $infoLicense.on("click", function () {
        removeActive();
        addActive(this);
        gsap.from($popupLicenseEl, { x: 500, autoAlpha: 0, stagger: 0.1, ease: "power4.out" });
    });

    $infoSkills.on("click", function () {
        removeActive();
        addActive(this);
        gsap.from($popupSkillsEl, { x: 500, autoAlpha: 0, stagger: 0.07, ease: "back.out(1.0)" });
    });
});
