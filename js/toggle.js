document.addEventListener("DOMContentLoaded", function () {
    const $body = $("body");
    const $header = $("header");
    const $main = $("main");
    const $footer = $("footer");

    const $banner = $("#banner");
    const $other = $("#other");
    const $listpopup = $("#listpopup");

    const $toggle = $("#mode");
    // const toggleText = document.querySelector(".mode-wrap label");

    // 페이지가 로딩되면 localStorage에 저장된 값을 가져와서 비교
    const saveModeValue = localStorage.getItem("saveMode");
    console.log(saveModeValue);

    if (saveModeValue === "hell") {
        applyHell();
    } else {
        applyHeaven();
    }

    // toggle을 클릭했을 때 동작
    $toggle.on("click", () => {
        const currentMode = localStorage.getItem("saveMode"); // 현재 저장된 값을 가져옴
        console.log(currentMode);

        if (currentMode === "hell") {
            applyHeaven();
        } else {
            applyHell();
        }
    });

    function applyHell() {
        $body.removeClass("heaven");
        $header.removeClass("heaven");
        $main.removeClass("heaven");
        $banner.removeClass("heaven");
        $other.removeClass("heaven");
        $listpopup.removeClass("heaven");
        $footer.removeClass("heaven");

        $body.addClass("hell");
        $header.addClass("hell");
        $main.addClass("hell");
        $banner.addClass("hell");
        $other.addClass("hell");
        $listpopup.addClass("hell");
        $footer.addClass("hell");

        localStorage.setItem("saveMode", "hell");
    }

    function applyHeaven() {
        $body.removeClass("hell");
        $header.removeClass("hell");
        $main.removeClass("hell");
        $banner.removeClass("hell");
        $other.removeClass("hell");
        $listpopup.removeClass("hell");
        $footer.removeClass("hell");

        $body.addClass("heaven");
        $header.addClass("heaven");
        $main.addClass("heaven");
        $banner.addClass("heaven");
        $other.addClass("heaven");
        $listpopup.addClass("heaven");
        $footer.addClass("heaven");

        localStorage.setItem("saveMode", "heaven");
    }
});
