$(function() {
    var pathname = window.location.pathname;
    var id = pathname.substr(pathname.length - 1, pathname.length);
    if (id == 1) {
        loadWebsite();
    } else if (id == 2) {
        loadEvent();
    }
});

function loadWebsite(){
	var str = "暂无数据";

	$(".know-content").html(str);
}

function loadChannel(){
	var str = "";
	str += '<div class="know-item-event">';
    str += '<img class="know-item-img-event" src="../images/logo-jd.png" />';
    str += "</div>";

    str += '<div class="know-item-event">';
    str += '<img class="know-item-img-event" src="../images/qrode-jd.png" />';
    str += "</div>";

    str += '<div class="know-item-event">';
    str += '<img class="know-item-img-event" src="../images/logo-tmall.png" />';
    str += "</div>";

    str += '<div class="know-item-event">';
    str += '<img class="know-item-img-event" src="../images/qrode-tmall.png" />';
    str += "</div>";

	$(".know-content").html(str);
}