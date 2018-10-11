$('.product-nav-title').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
});

$('.product-nav-content').click(function (event) {
  var event = event || e;
  $(".product-title").text($(this).text());
});

$('.product-item').click(function () {
  document.location.href = "detail.html"
})