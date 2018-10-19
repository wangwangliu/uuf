var rootUrl = "http://120.55.41.76";
$(function () {
  var pathname = window.location.pathname;
  var productId = pathname.substr(pathname.length-1, pathname.length);

  $(".detail-back").attr("href", "/product/"+getUrlParms("pid"));
  loadDetail(productId);
});

function getUrlParms (name) {
    let tstr = window.location.href;
    let index = tstr.indexOf('?')
    let str = tstr.substring(index + 1);
    let arr = str.split('&');
    let result = {};
    for(var i=0;i<arr.length;i++){
        let a = arr[i].split('=');
        result[a[0]] = a[1];
    };
    return result[name];
}

function initImg(){
  var galleryThumbs = new Swiper('.detail-gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 6,
    loop: false,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.detail-gallery-top', {
    spaceBetween: 10,
    loop: false,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    thumbs: {
      swiper: galleryThumbs,
    },
  });

}

function loadDetail(productId){
    $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/UFC-Product-All.json",
      dataType: "json",
      success: function(data){
          
          $.each(data,function(i,n){
              if (n.id == productId) {
                loadData(n);
              }
          });
      }
  });
}

function loadData(obj){
  $(".detail-product-name").text(obj.title);
  $(".detail-note").text(obj.remarks);
  $(".detail-product-qrcode-img-jd").attr("src", rootUrl+obj.jingdongUrl);
  $(".detail-product-qrcode-img-tmall").attr("src", rootUrl+obj.tianmaoUrl);
  console.log(obj.features)
  var featureStr = "";
  $.each(obj.features,  function(i, n){
    featureStr+="<li>"+n+"</li>";
  })
  $(".detail-product-feature-list").html(featureStr);
  var colors = obj.colors.split(",");
  var colorHtml = "";
  $.each(colors,function(i,n){
    colorHtml += '<div class="detail-product-color" data-color="'+n+'" style="background-color:'+color(n)+'"></div>';
  });
  $(".detail-product-color-select").html(colorHtml);

  var imgUrl = rootUrl + obj.mainImg.substring(0, obj.mainImg.lastIndexOf("/"));
  var imgHtml = "", imgThumbsUrl="";
  $.each(colors,function(i,n){
    var colorImg = eval('obj.img.'+n).split(",");
    $.each(colorImg, function(j, m){
     /*  imgHtml += '<div class="swiper-slide '+n+'" style="background-image:url('+(imgUrl+'/'+n+'/'+m)+')"></div>';
      imgThumbsUrl += '<div class="swiper-slide '+n+'" style="background-image:url('+(imgUrl+'/'+n+'/'+m)+'); width:100px;background-size: 100% 100%"></div>'; */
      imgHtml += '<div class="swiper-slide '+n+'" style="background-image:url(../images/back/product-test.jpg)"></div>';
      imgThumbsUrl += '<div class="swiper-slide '+n+'" style="background-image:url(../images/back/product-test.jpg); width:100px;background-size: 100% 100%"></div>';
    });
  });

  $(".detail-gallery-top").html('<div class="swiper-wrapper">'+imgHtml+'</div>');
  $(".detail-gallery-thumbs").html('<div class="swiper-wrapper">'+imgThumbsUrl+'</div>');
  $(".swiper-slide").hide();
  $("."+colors[0]).show();
  bindColorEvent();
  initImg();
}
function bindColorEvent(){
  $(".detail-product-color").click(function(){
    var color = $(this).attr("data-color");
    $(".swiper-slide").hide();
    $("."+color).show();
  });
}
function color(c){
  var colorObj = {};
  colorObj.red="#D20A0A";
  colorObj.black="#19191E";
  colorObj.blue="#14416A";
  colorObj.white="#FAFBFD";
  colorObj.redblack="#9E0808";
  //colorObj.pink="pink";
  return eval('colorObj.'+c);
}