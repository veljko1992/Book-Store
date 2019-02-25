  //Navigation
  var nav = $("nav");
  var navLi = $("nav li");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();
  var $booksLink = $('#booksLink');
  var $booksList = $('#booksList');

  //Provera sirine ekrana ako je veca od 992 navigacija se vidi, a ako je manja sakrivena je
  if (winWidth >= 992) {
    nav.css("display", "block");
    menuBtn.css("display", "none");
  } else {
    nav.css("display", "none");
    menuBtn.css("display", "block");
  }
//Kada resajzujemo window ako je vece od 992 navigacija se idi, a ako je manja nav se ne vidi sklanja se i iksic
  $(window).resize(function() {
    winWidth = $(window).width();
    if (winWidth >= 992) {
      nav.css("display", "block");
      menuBtn.css("display", "none");
    } else {
      nav.css("display", "none");
      menuBtn.css("display", "block");
      $("#menu-btn span").removeClass("bOpen");
      nav.removeClass("open");
    }
  });
//Kad kliknemo na iksic pojavljuje se i nestaje navigacija
  menuBtn.on("click", function() {
    if ($(nav).attr("class") == "open") {
      $("#menu-btn span").removeClass("bOpen");
      nav.fadeOut(400, function() {
        nav.removeClass("open");
      });
      $booksList.css('display', 'none');
    } else {
      $("#menu-btn span").addClass("bOpen");
      nav.fadeIn(400);
      nav.addClass("open");
    }
  });
//Kad kliknemo na link na navigaciju ako je manja od 992 nestaje
  navLi.on("click", function(e) {
    if (winWidth < 992 || nav.attr("class") == "open") {
      if(e.target.textContent == 'KNJIGE'){
        if( $booksList.css('display') == 'none'){
          $booksList.css('display', 'block');
        }else{
          $booksList.css('display', 'none');
        }
      }else{
        $("#menu-btn span").removeClass("bOpen");
        nav.fadeOut(400, function() {
          nav.removeClass("open");
        });
        $booksList.css('display', 'none');
      }
    }
  });

  //Navigation END