var productJsonData;
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
      async: false,
      success: function(data){
          $.each(data,function(i,n){
              if (n.id == productId) {
                productJsonData=n;
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
  var featureStr = "";
  $.each(obj.features,  function(i, n){
    featureStr+="<li>"+n+"</li>";
  })
  $(".detail-product-feature-list").html(featureStr);
  loadImage(obj.img);

}

function loadImage(img){
  var imgUrl = rootUrl + productJsonData.mainImg.substring(0, productJsonData.mainImg.lastIndexOf("/"));
  var imgHtml = '', 
      imgThumbsUrl='';
  var colorImg = img.split(",");
  $.each(colorImg, function(j, m){
    imgHtml += '<div class="swiper-slide" style="background-image:url('+(imgUrl+'/'+m)+')"></div>';
    imgThumbsUrl += '<div class="swiper-slide" style="background-image:url('+(imgUrl+'/'+m)+'); background-size: 100% 100%"></div>'; 
  });
  $(".detail-gallery-top").html('<div class="swiper-wrapper">'+imgHtml+'</div>');
  $(".detail-gallery-thumbs").html('<div class="swiper-wrapper">'+imgThumbsUrl+'</div>');
  initImg();
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