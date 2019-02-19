  //Navigation
  var nav = $("nav");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();

  if (winWidth >= 992) {
    nav.css("display", "block");
    menuBtn.css("display", "none");
  } else {
    nav.css("display", "none");
    menuBtn.css("display", "block");
  }

  $(window).resize(function() {
    winWidth = $(window).width();
    if (winWidth >= 992) {
      nav.css("display", "block");
      menuBtn.css("display", "none");
    } else {
      nav.css("display", "none");
      menuBtn.css("display", "block");
    }
  });

  menuBtn.on("click", function() {
    if ($(nav).attr("class") == "open") {
      $("#menu-btn span").removeClass("bOpen");
      nav.fadeOut(400, function() {
        nav.removeClass("open");
      });
    } else {
      $("#menu-btn span").addClass("bOpen");
      nav.fadeIn(400);
      nav.addClass("open");
    }
  });
  nav.on("click", function() {
    if (winWidth < 992 || $(this).attr("class") == "open") {
      $("#menu-btn span").removeClass("bOpen");
      $(this).fadeOut(400, function() {
        $(this).removeClass("open");
      });
    }
  });
  //Navigation END