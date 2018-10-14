var rootUrl = "http://120.55.41.76";
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
                $(".news-content").text("敬请期待");
                return;
            }
            var str = '';
            $.each(data, function(i, n) {
                str += '<div class="news-item" data-url="' + n.url + '">';
                str += '<img class="news-item-img" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="news-item-intro">' + n.title + '</div>';
                str += "</div>";
            });
            $(".news-content").html(str);
            bindDetail();
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
    $(".news-content").html(videoHtml);
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
                str += '<div class="swiper-slide"><video src="' + (rootUrl + n.url) + '" width="100%" height="100%" controls>您的浏览器不支持video标签</video></div>';

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
            $.each(data, function(i, n) {
                str += '<div class="news-item" data-url="' + n.url + '">';
                str += '<img class="news-item-img" src="' + (rootUrl + n.mainImg) + '" />';
                str += '<div class="news-item-intro">' + n.title + '</div>';
                str += "</div>";
            });
            $(".news-content").html(str);
            bindDetail();
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

function golink(url) {
    location.href = url;
}