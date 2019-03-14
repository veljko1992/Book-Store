function itemsNum() {
    winWidth = $(window).width();
    
    if (winWidth < 576) {
      num = 4;
    }
    else if (winWidth < 992) {
      num = 6;
    }
    else if (winWidth > 992) {
      num = 8;
    }
    $('#newBooks .imgbox').css('display', 'none');
    $("#newBooks .imgbox").slice(0,num).show();
    $('#topBooks .imgbox').css('display', 'none');
    $("#topBooks .imgbox").slice(0,num).show();
    $('#salesBooks .imgbox').css('display', 'none');
    $("#salesBooks .imgbox").slice(0,num).show();
  }