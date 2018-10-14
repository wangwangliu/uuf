var rootUrl = "http://120.55.41.76";
$(function() {
    var pathname = window.location.pathname;
    var productId = pathname.substr(pathname.length - 1, pathname.length);

    $(".detail-back").attr("href", "/product/" + getUrlParms("pid"));
    loadDetail(productId);
});

function getUrlParms(name) {
    let tstr = window.location.href;
    let index = tstr.indexOf('?')
    let str = tstr.substring(index + 1);
    let arr = str.split('&');
    let result = {};
    arr.forEach((item) => {
        let a = item.split('=');
        result[a[0]] = a[1];
    })
    return result[name];
}

function initImg() {}

function loadDetail(productId) {
    $.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Product-All.json",
        dataType: "json",
        success: function(data) {

            $.each(data, function(i, n) {
                if (n.id == productId) {
                    loadData(n);
                }
            });
        }
    });
}

function loadData(obj) {
    $(".detail-product-name").text(obj.title);
    $(".detail-note").text(obj.remarks);
    $(".detail-product-feature-list").html("<li>" + obj.features + "</li>");
    $(".detail-product-qrcode-img-jd").attr("src", rootUrl + obj.jingdongUrl);
    $(".detail-product-qrcode-img-tmall").attr("src", rootUrl + obj.tianmaoUrl);
    var colors = obj.colors.split(",");
    var colorHtml = "";
    $.each(colors, function(i, n) {
        colorHtml += '<div class="detail-product-color" data-color="' + n + '">' + color(n) + '</div>';
    });
    $(".detail-product-color-select").html(colorHtml);

    var imgUrl = rootUrl + obj.mainImg.substring(0, obj.mainImg.lastIndexOf("/"));
    var imgHtml = "",
        imgThumbsUrl = "";
    $.each(colors, function(i, n) {
        var colorImg = eval('obj.img.' + n).split(",");
        $.each(colorImg, function(j, m) {
            imgHtml += '<div class="swiper-slide ' + n + '" style="background-image:url(' + (imgUrl + '/' + n + '/' + m) + ')"></div>';
            imgThumbsUrl += '<div class="swiper-slide ' + n + '" style="width:100px;background-image:url(' + (imgUrl + '/' + n + '/' + m) + ');;background-size: 100% 100%"></div>';
        });
    });

    $(".detail-gallery-top").html('<div class="swiper-wrapper">' + imgHtml + '</div>');
    $(".detail-gallery-thumbs").html('<div class="swiper-wrapper">' + imgThumbsUrl + '</div>');
    $(".swiper-slide").hide();
    $("." + colors[0]).show();
    bindColorEvent();
}

function bindColorEvent() {
    $(".detail-product-color").click(function() {
        var color = $(this).attr("data-color");
        $(".swiper-slide").hide();
        $("." + color).show();
    });
}

function color(c) {
    var colorObj = {};
    colorObj.red = "红色";
    colorObj.black = "黑色";
    colorObj.blue = "蓝色";
    colorObj.white = "白色";
    colorObj.redblack = "红黑";
    colorObj.pink = "粉色";
    return eval('colorObj.' + c);
}