$(function () {
    const $title = $(".title-wrap strong");

    console.log($title);

    $title.on("click", function () {
        // transition 속성 임시 제거
        $title.css("transition", "none");
        $(this).css("transition", "none");

        $title.fadeIn(500, "linear");

        // jQuery 애니메이션 실행
        $(this).fadeOut(500, "linear", function () {
            // 애니메이션이 끝난 후 transition 복원
            $title.css("transition", "");
            $(this).css("transition", "");
        });
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".title-wrap strong").length) {
            $title.css("transition", "none");

            $title.fadeIn(500, "linear", function () {
                // 애니메이션이 끝난 후 transition 복원
                $title.css("transition", "");
            });
        }
    });
});
