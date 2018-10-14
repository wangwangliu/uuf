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
	var str = "";

	$(".know-content").html(str);
}

function loadChannel(){
	var str = "";

	$(".know-content").html(str);
}