function goLinkk(URL) {
    location.href = URL;
}

var rootUrl = "http://120.55.41.76";

$(function(){
	loadAdvertising();
})

function loadAdvertising(){
	$.ajax({
        type: "GET",
        url: rootUrl + "/ufc-data/data/UFC-Advertising.json",
        dataType: "json",
        success: function(data) {
            var str = '';
            $.each(data, function(i, n) {
                if (i == 0) {
                	$(".content-top").click(function(){
                		window.open(n.url);
                	});
                }
            });

            $(".content-top").html(str);

        }
    });
}