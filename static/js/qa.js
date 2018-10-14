$(function() {
    var pathname = window.location.pathname;
    var id = pathname.substr(pathname.length - 1, pathname.length);
    if (id == 1) {
        loadKnow();
    } else if (id == 2) {
        loadQa();
    }
});

function loadKnow(){
	var str = "";

	$(".know-content").html(str);
}

function loadQa(){
	var str = "";

	$(".know-content").html(str);
}