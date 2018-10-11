$(function() {
    $(".header-nav-menu-item").click(function(event) {
        console.log($(event.target).data("url"));
        // location.href = '/product/2'
        location.href = $(event.target).data("url");
        return false;
    })
})