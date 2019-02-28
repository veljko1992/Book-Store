$(document).ready(function() {
  //Navigation
  var nav = $("nav");
  var navLi = $("nav li");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();
  var $booksLink = $("#booksLink");
  var $booksList = $("#booksList");

  //Checking the screen width if more than 992 navigation is visible, and if smaller it is hidden
  if (winWidth >= 992) {
    nav.css("display", "block");
    menuBtn.css("display", "none");
    $booksList.removeClass('d_none');
  } else {
    nav.css("display", "none");
    menuBtn.css("display", "block");
    $booksList.addClass('d_none');
  }
  //When we resize the window if more than 992 navigation is gone, and if less is not visible, x is also removed
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
  //When we click on x, navigation appears and disappears
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
      $booksList.addClass('d_none');
    }
  });
  //When we click on a link to navigation if it is less than 992 disappears
  navLi.on("click", function(e) {
    if (winWidth < 992 || nav.attr("class") == "open") {
      if (e.target.textContent == "KNJIGE") {
        if ($booksList.attr("class") == "d_none") {
          $booksList.removeClass('d_none');
        } else {
          $booksList.addClass('d_none');
        }
      } else {
        $("#menu-btn span").removeClass("bOpen");
        nav.fadeOut(400, function() {
          nav.removeClass("open");
        });
      }
    }
  });

  // Smooth scrool navigations link
  var navHeight = 140;

  $("nav .navigation-link").on("click", function(e) {
    sectionID = $(this).attr("href");
    sectionPosition = $(sectionID).offset().top - navHeight;
    $("html, body").animate(
      {
        scrollTop: sectionPosition
      },
      1000
    );
  });
  // Smooth scrool navigations link END

  //Navigation END

  //Prepare items for local storage
  var $addItemButton = $(".addItem");
  var $numberArticle = $("#numberArticle");

  var countItem = {};
  var countItems = [];
  var fetched = false;

  $addItemButton.on("click", function(e) {
    e.preventDefault();

    var target = e.target;
    var price =
      target.parentElement.previousSibling.previousSibling.textContent;
    var bookName = target.parentElement.parentElement.children[0].textContent;

    var bookPrice = "";
    for (i = 0; i < price.length - 7; i++) {
      if (price.charAt(i) >= 0 || price.charAt(i) <= 9) {
        bookPrice += price.charAt(i);
      }
    }
    bookPrice = parseInt(bookPrice);

    numArticle = localStorage.getItem("numArticle");

    if (numArticle == null) {
      numArticle = 1;
    } else {
      newNumb = parseInt(numArticle);
      newNumb += 1;
      numArticle = newNumb;
    }

    var totalBill = localStorage.getItem("totalBill");

    if (totalBill == null) {
      totalBill = 0;
    } else {
      newNumb = parseInt(totalBill);
      totalBill = newNumb;
    }

    totalBill += bookPrice;

    countItem.id = numArticle;
    countItem.name = bookName;
    countItem.price = bookPrice;

    addItem(countItem);

    localStorage.setItem("totalBill", totalBill);
    localStorage.setItem("numArticle", numArticle);
    checkNumArticle();
  });
  //Prepare items for local storage END

  // Check number od article
  checkNumArticle();

  function checkNumArticle() {
    var chechNumArticle = localStorage.getItem("numArticle");

    if (chechNumArticle == null) {
      $numberArticle.addClass("d_none");
    } else {
      $numberArticle.removeClass("d_none");
      $numberArticle.html(localStorage.getItem("numArticle"));
    }
  }
  // Check number od article END

  // Add items to local sotorage
  function addItem(countItem) {
    fetched = false;
    var item = fetch();

    if (item != null) {
      item.push(countItem);
      to_push = JSON.stringify(item);
    } else {
      countItems.push(countItem);
      to_push = JSON.stringify(countItems);
    }
    localStorage.setItem("countItems", to_push);
    return;
  }

  function fetch() {
    var to_fetch = localStorage.getItem("countItems");
    var item = JSON.parse(to_fetch);
    return item;
  }

  // Add items to local sotorage END

  //Push items to shoping card

  var $shoppingCard = $("#shoppingCard");
  var $shoppingList = $("#shoppingList");
  var $exit = $("#exit");
  var $shoppingListItems = $("#shoppingListItems");

  $shoppingCard.on("click", function(e) {
    $shoppingList.css("display", "block");
    listItems();
  });

  $exit.on("click", function(e) {
    $("#empty").remove();
    $shoppingList.css("display", "none");
  });

  function listItems() {
    var item = fetch();
    if (item == null) {
      $shoppingListItems.append('<p id="empty">Shoping lista je prazna</p>');
    } else {
      var table = `<h2>Vaši artikli</h2>`;
      table += `<table>`;
      for (i = 0; i < item.length; i++) {
        table += `<tr>`;
        for (prop in item[i]) {
          console.log(item[i][prop]);
          table += `<td>${item[i][prop]}</td>`;
        }
        table += `</tr>`;
      }
      table += `</table>`;
      table += `<div id="tbWrapper"><span id="totalBill">Ukupan račun je: </span></div>`;
      $shoppingListItems.html(table);
     
      $('#totalBill').append(localStorage.getItem("totalBill")).append('.00 RSD');
    }
    fetched = true;
    return;
  }
  //Push items to shoping card END

  // Form 

  var $activeForm = $('#activeForm');
  var $exit2 = $('#exit2');

  $activeForm.on('click', function(){
    $('#writeToUs').css('display', 'block');
  });

  $exit2.on('click', function(){
    $('#writeToUs').css('display', 'none ');
  });
});
