$(function () {
  var pathname = window.location.pathname;
  var id = pathname.substr(pathname.length-1, pathname.length);
  if (id == 1 ) {
    loadVideo("UFC-Video-Product.json");
  }else if(id == 2){
    loadVideo("UFC-Video-Teach.json");
  }else if(id == 3){
    loadVideo("UFC-Video-Storys.json");
  }

});

function initVideo(){
  var galleryThumbs = new Swiper('.video-gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: false,
    freeMode: true,
    loopedSlides: 4, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.video-gallery-top', {
    spaceBetween: 0,
    loop: false,
    loopedSlides: 4, //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });
}

function loadVideo(fileName){
    $.ajax({
      type:"GET",
      url:rootUrl+"/ufc-data/data/"+fileName,
      dataType: "json",
      success: function(data){
        if(data.length == 0){
            $(".video-gallery-top").html("暂无符合的数据");
            return;
           }
          var str='', listStr='';
          $.each(data,function(i,n){
              str+='<div class="swiper-slide"><video src="'+(rootUrl + n.url)+'" poster="'+(rootUrl + n.mainImg)+'" width="100%" height="100%" preload="none" controls>您的浏览器不支持video标签</video></div>';
          
              listStr+='<div class="swiper-slide" style="width:180px;background-image:url('+(rootUrl + n.mainImg)+');background-size: 100% 100%"></div>';
          });
          $(".video-gallery-top").html('<div class="swiper-wrapper">'+str+"</div>");
          $(".video-gallery-thumbs").append('<div class="swiper-wrapper">'+listStr+"</div>");
          initVideo();
      }
  });
}