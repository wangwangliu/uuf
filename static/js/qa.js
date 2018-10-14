var rootUrl = "http://120.55.41.76";
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
	$.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Know-Story.json",
        dataType: "json",
        success: function(data) {
            var str = '<div class="img-box">';
            $.each(arr, function(i, n) {
            	if (i == 0) {
	                str += '<div class="know-item1"  data-url="' + n.url + '">';
	                str += '<img class="know-item-img2" src="' + (rootUrl + n.mainImg) + '" />';
	                str += '<div class="know-item-intro3"  style="background:url(' + bg + ');background-repeat:repeat">' + cutstr(n.title, 120) + '<a href="' + logPath + '?qurl=' + dencodeURIComponent(n.url) + '">   >>阅读全文</a>' + '</div>';
	                str += "</div>";
                }
            });
            str += "</div>"
            $(".know-content").html(str);
        }
    });
}

function loadQa(){
	var str = '<ul class="detail-product-feature-list">';
	str+='<li>问题1</li>';
	str+='<li>答案1</li>';
	str+="</ul>"
	$(".know-content").html(str);
}