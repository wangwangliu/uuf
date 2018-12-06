function goLinkk(URL) {
    location.href = URL;
}

$(function(){
   // $("#videoElement").attr("src", rootUrl + "/ufc-data/media/index.mp4");
	//loadAdvertising();
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