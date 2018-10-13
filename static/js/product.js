var rootUrl = "http://120.55.41.76";

$('.product-nav-title').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
  var fileName = $(this).attr("file-name");
  loadProduct(fileName);
});

$('.product-nav-content').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
  var fileName = $(this).attr("file-name");
  var dataId = $(this).attr("data-id");
  if (!dataId) {
    $(".product-box").html("暂无符合的产品");
    return;
  }
  loadProduct(fileName);
});


function bindDetail(){
  $('.product-item').click(function () {
    console.log($(this).attr("data-detail"))
    document.location.href = "detail.html"
  });
}


$(function(){
  var pathname = window.location.pathname;
  var id = pathname.substr(pathname.length-1, pathname.length);
  $('.product-nav-title').each(function(i,n){
    if(id === $(n).attr("data-id")){
      $(".product-title").text($(n).text());
      loadProduct($(n).attr("file-name"))
    }
  })
});

function loadProduct(fileName){
    $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/"+fileName,
      dataType: "json",
      success: function(data){
        if(data.length == 0){
            $(".product-box").html("暂无符合的产品");
            return;
           }
          var str='';
          $.each(data,function(i,n){
              str+='<div class="product-item" data-detail="+n+">';
              str+='<img class="product-item-img" src="'+ (rootUrl + n.mainImg) +'" />';
              str+='<div class="product-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".product-box").html(str);
          bindDetail();
      }
  });
}