$(function() {
    var galleryTop = new Swiper('.index-gallery-top', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
    });

})

function goLinkk(URL) {
    location.href = URL;
}