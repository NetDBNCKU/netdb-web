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

// header scroll init
if($('body').scrollTop() > $('#banner').height()) {
  $('#header').addClass("header-scroll");
} else {
  $('#header').removeClass("header-scroll");
}

// header scroll event
$(window).on("scroll", function(e) {
  if($('body').scrollTop() > $('#banner').height()) {
    $('#header').addClass("header-scroll");
  } else {
    $('#header').removeClass("header-scroll");
  }
});

// header menu init
if($('body').width() <= 700) {
  $('#ul-desktop').hide();
  $('#ul-tablet').show();
} else {
  $('#ul-desktop').show();
  $('#ul-tablet').hide();
}

// header menu resize event
$(window).resize(function() {
  if($(this).width() <= 700) {
    $('#ul-desktop').hide();
    $('#ul-tablet').show();
  } else {
    $('#ul-desktop').show();
    $('#ul-tablet').hide();
    $('#menu').hide();
  }
});

// header menu click event
$("#ul-tablet").click(function() {
  $("#menu").show();
});

$("#menu-other").click(function() {
  $("#menu-bar").animate({right: "-20em"}, 300, function(){
    $(this).css("right", "0");
    $("#menu").hide();
  });
});

$("#menu-bar a").click(function() {
  $("#menu-bar").animate({right: "-20em"}, 300, function(){
    $(this).css("right", "0");
    $("#menu").hide();
  });
});

$(".menu-close").click(function() {
  $("#menu-bar").animate({right: "-20em"}, 300, function(){
    $(this).css("right", "0");
    $("#menu").hide();
  });
});
