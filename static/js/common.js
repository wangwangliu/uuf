$(function() {
    $(".header-nav").hover(function(event) {
        $('.header-nav-menu').removeClass("act")
        $(this).find('.header-nav-menu').addClass("act");
        return false;
    }, function(event) {
        $(this).removeClass("act")
    });
    $(".header-nav-menu").hover(function(event) {
        // $(event.target).addClass("act")
        // return false;
    }, function(event) {
        $(this).removeClass("act")
    })
    $(".header-nav-menu-item").click(function(event) {
        console.log($(event.target).data("url"));
        // location.href = '/product/2'
        location.href = $(event.target).data("url");
        return false;
    })
})