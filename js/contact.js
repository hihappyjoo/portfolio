$(function () {
    const $copyEl = $(".info strong");

    $copyEl.on("click", function () {
        console.log(this.textContent);
        navigator.clipboard.writeText($(this).text());

        $(this).next("i").fadeIn();

        setTimeout(() => {
            $(this).next("i").fadeOut();
        }, 1500);
    });
});
