// smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// header css
if($('body').scrollTop() > $('#banner').height()) {
  $('#header').addClass("header-scroll");
} else {
  $('#header').removeClass("header-scroll");
}

$(window).on("scroll", function(e) {
  if($('body').scrollTop() > $('#banner').height()) {
    $('#header').addClass("header-scroll");
  } else {
    $('#header').removeClass("header-scroll");
  }
});
