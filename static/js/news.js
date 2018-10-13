var rootUrl = "http://120.55.41.76";
$(function(){
  var pathname = window.location.pathname;
  var id = pathname.substr(pathname.length-1, pathname.length);
  if (id == 1 ) {
    loadActivity();
  }else if(id == 2){
    loadEvent();
  }else if(id == 3){
    loadProduct();
  }
});

function bindDetail(){
  $(".news-item").click(function(){
    var url = $(this).attr("data-url");
    $(".news-content").load(rootUrl+url);
  });
}

function loadActivity(){
  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Newest-Activity.json",
      dataType: "json",
      success: function(data){
      	if (data.length == 0) {
      		$(".news-content").text("敬请期待");
      		return;
      	}
          var str='';
          $.each(data,function(i,n){
              str+='<div class="news-item" data-url="'+n.url+'">';
              str+='<img class="news-item-img" src="'+ (rootUrl + n.fileImg) +'" />';
              str+='<div class="news-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".news-content").html(str);
 			bindDetail();
      }
  });
}

/**
 * 最新赛事用视频播放的样式
 */
function loadEvent(){

  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Newest-Event.json",
      dataType: "json",
      success: function(data){
          var str='';
          $.each(data,function(i,n){
              str+='<div class="news-item">';
              str+='<img class="news-item-img" src="'+ (rootUrl + n.fileImg) +'" />';
              str+='<div class="news-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".news-content").html(str);
      }
  });
}


function loadProduct(){
  $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Newest-Product.json",
      dataType: "json",
      success: function(data){
          var str='';
          $.each(data,function(i,n){
              str+='<div class="news-item" data-url="'+n.url+'">';
              str+='<img class="news-item-img" src="'+ (rootUrl + n.fileImg) +'" />';
              str+='<div class="news-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".news-content").html(str);
          bindDetail();
      }
  });
}