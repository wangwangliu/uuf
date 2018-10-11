$(function () {
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
})