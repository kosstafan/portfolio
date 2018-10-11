var marks = $('#marks span');
marks.each(function(i, el){
    $(el).css('left', (i * 25) + '%');
});
$( "#slider" ).slider({
     range: "max",
     value: 3,
     min: 1,
     max: 5,
     step: 1,
});

$(".big-input").on("focus", function (e) {
    $(this).addClass("big-input_focus");
    $(this).siblings(".input-title").addClass("input-title_focus");
});

$(".big-input").on("focusout", function (e) {
    if (!$(this).val()) {
        $(this).siblings(".input-title").removeClass("input-title_focus");
        $(this).removeClass("big-input_focus");
    } else{
        $(this).removeClass("big-input_focus");
    }
});

$(".date-list__line").on("click", function (e) {
    var date = $(this).text();
    $(".date-text").text(date);
    $(".date-text").addClass("date_active");
    $(".date-text").removeClass("date-text_active");
    $(".date-list").removeClass("display");
    $(".date-text").removeClass("big-input_focus");
});

$(".date-text").on("click", function (e) {
    e.preventDefault();
    $(".date-list").toggleClass("display");
    $(".date-text").toggleClass("date-text_active");
    $(".date-text").toggleClass("big-input_focus");
});

$(".hamburger").on("click", function (e) {
    $(".header-nav").toggleClass("header-nav_open");
    $(".header-menu").toggleClass("header-menu_open");
});

$(".header-menu__link").on("click", function (e) {
    e.preventDefault();
    var current = e.currentTarget;
    var index = $(current).parents(".header-menu__line").index();
    var title = $(".seckond-title");
    $(".header-menu__link").removeClass("header-menu__link_active");
    $(this).addClass("header-menu__link_active");
    console.log(title);
    $('html, body').animate({scrollTop: $(title[index]).offset().top }, 500);
    $(".header-nav").removeClass("header-nav_open");
    $(".header-menu").removeClass("header-menu_open");
})