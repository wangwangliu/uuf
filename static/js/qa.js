
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
            $.each(data, function(i, n) {
            	if (i == 0) {
	               
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