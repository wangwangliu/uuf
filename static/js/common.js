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

function dencodeURIComponent(url) {
    if (!url) {
        return '';
    }
    url = url.split('.')[0];
    return encodeURIComponent(url)
}

function ddecodeURIComponent(url) {
    if (!url) {
        return '';
    }
    return decodeURIComponent(url) + '.html'
}

function cutstr(str, len) {
    if (!str) {
        str = '';
    }
    if (!len) {
        len = 20;
    }
    var str_length = 0;
    var str_len = 0,
        str_cut = new String(),
        str_len = (str || '').length;
    for (var i = 0; i < str_len; i++) {
        var a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

function ggoLink(url) {
    location.href = url;
}


var rootUrl = "http://120.27.141.218:9269";