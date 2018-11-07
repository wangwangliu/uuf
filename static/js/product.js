$('.product-nav-title').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
  var fileName = $(this).attr("file-name");
  var dataId = $(this).attr("data-id");
 // loadProduct(fileName, dataId);
  document.location.href = "/product/"+dataId;
});

$('.product-nav-content').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
  var fileName = $(this).attr("file-name");
  var dataId = $(this).attr("data-id");
  if (!dataId) {
    $(".product-box").html("敬请期待");
    return;
  }
  //loadProduct(fileName, dataId);
  document.location.href = "/product/"+dataId;
});


function bindDetail(){
  $('.product-item').click(function () {
    var productId = $(this).attr("data-product-id");
    var pid = $(this).attr("data-pid");
    document.location.href = "../pdetail/"+productId+"?pid="+pid;
  });
}


$(function(){
  var pathname = window.location.pathname;
  var id = pathname.substr(pathname.length-1, pathname.length);
  var initList = false;
  $('.product-nav-title').each(function(i,n){
    if(id === $(n).attr("data-id")){
      $(".product-title").text($(n).text());
      loadProduct($(n).attr("file-name"), id);
      initList = true;
    }
  });
  if (!initList) {
    $('.product-nav-content').each(function(i,n){
    if(id === $(n).attr("data-id")){
      $(".product-title").text($(n).text());
      loadProduct($(n).attr("file-name"), id);    
    }
    });
  }
});

function loadProduct(fileName, pid){
    $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/"+fileName,
      dataType: "json",
      success: function(data){
        if(data.length == 0){
            $(".product-box").html("敬请期待");
            return;
           }
          var str='';
          $.each(data,function(i,n){
              str+='<div class="product-item" data-pid="'+pid+'" data-product-id="'+n.id+'">';
              str+='<img class="product-item-img" src="'+ (rootUrl + n.mainImg) +'" />';
              str+='<div class="product-item-intro">'+ n.title +'</div>';
              str+="</div>";
          });
          $(".product-box").html(str);
          bindDetail();
      }
  });
}