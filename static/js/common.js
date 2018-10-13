$(function() {
    var ti = null,
        flag = true;
    $(".header-nav").hover(function(event) {
        $('.header-nav-menu').removeClass("act")
        $(this).find('.header-nav-menu').addClass("act");
        return false;
    }, function(event) {
        var _this = $(this)
        setTimeout(function() {
            if (flag) {
                _this.find('.header-nav-menu').removeClass("act")
            }
        }, 500)

    });
    $(".header-nav-menu").hover(function(event) {
        flag = false;
        var _this = $(this);
        ti = setInterval(function() {
            _this.addClass("act")
        }, 0)

        // return false;
    }, function(event) {
        flag = true;
        clearInterval(ti);
        $(this).removeClass("act")
    })
    $(".header-nav-menu-item").click(function(event) {
        console.log($(event.target).data("url"));
        // location.href = '/product/2'
        location.href = $(event.target).data("url");
        return false;
    })
})