var loopIndex = 0;
var UFCKnowStory = [];
var loadingUrl = Url.parseQuery().qurl;
var logPath = location.pathname;

$(function() {
    var pathname = window.location.pathname;
    var id = pathname.substr(pathname.length - 1, pathname.length);
    if (id == 1) {
        loadActivity();
    } else if (id == 2) {
        loadEvent();
    } else if (id == 3) {
        loadProduct();
    }
});

function bindDetail() {
    $(".news-item").click(function() {
        var url = $(this).attr("data-url");
        $(".news-content").load(rootUrl + url);
    });
}

function loadActivity() {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Newest-Activity.json",
        dataType: "json",
        success: function(data) {
            if (data.length == 0) {
                $(".know-content").text("敬请期待");
                return;
            }
            if (loadingUrl) {
                $(".know-content").load(rootUrl + ddecodeURIComponent(loadingUrl), function() {
                    $(".know-content").prepend('<a class="fanhui" href="' + location.pathname + '"> < < 返回上一页</a>')
                });

                return;
            }
            var str = '<div class="img-box">';
            UFCKnowStory = data;
            loopIndex = 0;
            var arr = []
            arr.push(data[0]);
            $.each(arr, function(i, n) {
                str += '<div class="know-item1"  data-url="' + n.url + '">';
                str += '<img class="know-item-img2" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="know-item-intro3"  style="background:url(' + bg + ');background-repeat:repeat">' + cutstr(n.title, 120) + '<a href="' + logPath + '?qurl=' + dencodeURIComponent(n.url) + '">   >>阅读全文</a>' + '</div>';
                str += "</div>";
            });
            str += "</div>"
            var l = hdomain + "/images/left.png";
            var r = hdomain + "/images/right.png";
            var rl = '<div class="leftp"><img src="' + l + '"></div><div class="rightp"><img src="' + r + '"></div>';
            $(".know-content").html(str + rl);
            loopImg();
            // bindDetail();
        }
    });
}

/**
 * 最新赛事用视频播放的样式
 */
function loadEvent() {
    var videoHtml = '<div class="swiper-container video-gallery-top"></div>';
    videoHtml += '<div class="swiper-container video-gallery-thumbs">';
    videoHtml += '<div class="swiper-button-next">下一页 >></div>';
    videoHtml += '<div class="swiper-button-prev"><< 上一页</div>';
    videoHtml += '</div>';
    $(".know-content").html(videoHtml);
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Newest-Event.json",
        dataType: "json",
        success: function(data) {
            if (data.length == 0) {
                $(".video-gallery-top").html("暂无符合的数据");
                return;
            }
            var str = '',
                listStr = '';
            $.each(data, function(i, n) {
                str += '<div class="swiper-slide"><video src="' + (rootUrl + n.url) + '" width="100%" height="100%" preload="none" controls>您的浏览器不支持video标签</video></div>';

                listStr += '<div class="swiper-slide" style="width:180px;background-image:url(' + (rootUrl + n.mainImg) + ');background-size: 100% 100%"></div>';
            });
            $(".video-gallery-top").html('<div class="swiper-wrapper">' + str + "</div>");
            $(".video-gallery-thumbs").append('<div class="swiper-wrapper">' + listStr + "</div>");
            initVideo();
        }
    });
}


function loadProduct() {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Newest-Product.json",
        dataType: "json",
        success: function(data) {
            var str = '';
            if (loadingUrl) {
                $(".know-content").load(rootUrl + ddecodeURIComponent(loadingUrl), function() {
                    $(".know-content").prepend('<a class="fanhui" href="' + location.pathname + '"> < < 返回上一页</a>')
                });
                // $(".know-content").prepend('<a class="fanhui" href="' + location.pathname + '"> < < 返回上一页</a>')
                return;
            }
            var str = '';
            $.each(data, function(i, n) {
                str += '<div class="know-item-event" data-url="' + n.url + '">';
                str += '<img class="know-item-img-event" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="know-item-intro-event">' + cutstr(n.title, 120) + '<a href="' + logPath + '?qurl=' + dencodeURIComponent(n.url) + '">   >>阅读全文</a>' + '</div>';
                str += "</div>";
            });
            $(".know-content").html(str);
        }
    });
}

function initVideo() {
    var galleryThumbs = new Swiper('.video-gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: false,
        freeMode: true,
        loopedSlides: 4, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.video-gallery-top', {
        spaceBetween: 0,
        loop: false,
        loopedSlides: 4, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });
}

function loopImg() {
    var leftp = $('.leftp>img'),
        rightp = $('.rightp>img'),
        UFCKnowStoryLen = UFCKnowStory.length;
    leftp.click(() => {
        if (loopIndex == 0) {
            loopIndex = UFCKnowStoryLen - 1;
        } else {
            loopIndex--;
        }
        $(".img-box").html(tpl(UFCKnowStory, loopIndex));
    });
    rightp.click(() => {
        if (loopIndex == (UFCKnowStoryLen - 1)) {
            loopIndex = 0;
        } else {
            loopIndex++;
        }
        $(".img-box").html(tpl(UFCKnowStory, loopIndex));
    })
}

function tpl(data, index) {
    var str = '';
    var arr = []
    arr.push(data[0]);
    $.each(arr, function(i, n) {
        str += '<div class="know-item1"  data-url="' + n.url + '">';
        str += '<img class="know-item-img2" src="' + (rootUrl + n.mainImg) + '" />';
        str += '<div class="know-item-intro3"  style="background:url(' + bg + ');background-repeat:repeat">' + cutstr(n.title, 120) + '<a href="' + n.url + '"> >>阅读全文</a>' + '</div>';
        str += "</div>";
    });

    return str
}

function golink(url) {
    location.href = url;
}