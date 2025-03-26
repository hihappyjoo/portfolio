document.addEventListener("DOMContentLoaded", function () {
    const $body = $("body");
    const $header = $("header");
    const $main = $("main");
    const $footer = $("footer");

    const $banner = $("#banner");
    const $other = $("#other");
    const $listpopup = $("#listpopup");

    const $toggle = $("#mode");

    // 페이지가 로딩되면 localStorage에 저장된 값을 가져와서 비교
    let saveModeValue = localStorage.getItem("saveMode");

    // saveMode가 없으면 기본값을 "hell"로 설정
    if (!saveModeValue) {
        localStorage.setItem("saveMode", "hell");
        saveModeValue = "hell";
    }

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
        $body
            .add($header)
            .add($main)
            .add($footer)
            .add($banner)
            .add($other)
            .add($listpopup)
            .removeClass("heaven")
            .addClass("hell");
        localStorage.setItem("saveMode", "hell");
    }

    function applyHeaven() {
        $body
            .add($header)
            .add($main)
            .add($footer)
            .add($banner)
            .add($other)
            .add($listpopup)
            .removeClass("hell")
            .addClass("heaven");
        localStorage.setItem("saveMode", "heaven");
    }
});
