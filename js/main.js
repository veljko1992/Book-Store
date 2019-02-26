$(document).ready(function() {
  //Navigation
  var nav = $("nav");
  var navLi = $("nav li");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();
  var $booksLink = $("#booksLink");
  var $booksList = $("#booksList");

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
      $booksList.css("display", "none");
    } else {
      $("#menu-btn span").addClass("bOpen");
      nav.fadeIn(400);
      nav.addClass("open");
    }
  });
  //Kad kliknemo na link na navigaciju ako je manja od 992 nestaje
  navLi.on("click", function(e) {
    if (winWidth < 992 || nav.attr("class") == "open") {
      if (e.target.textContent == "KNJIGE") {
        if ($booksList.css("display") == "none") {
          $booksList.css("display", "block");
        } else {
          $booksList.css("display", "none");
        }
      } else {
        $("#menu-btn span").removeClass("bOpen");
        nav.fadeOut(400, function() {
          nav.removeClass("open");
        });
        $booksList.css("display", "none");
      }
    }
  });

  //Navigation END

  // Smooth scrool
  var navHeight = 140;

  $("nav .navigation-link").on("click", function(e) {
    sectionID = $(this).attr("href");
    // console.log(sectionID);
    sectionPosition = $(sectionID).offset().top - navHeight;
    // console.log(sectionPosition);
    $("html, body").animate(
      {
        scrollTop: sectionPosition
      },
      1000
    );
  });
  // Smooth scrool END



  //Add item to List
  var $addItemButton = $(".addItem");
  var $numberArticle = $("#numberArticle");

  var countItem = {};
  var countItems = [];
  var fetched = false;
  
  
  $addItemButton.on("click", function(e) {
    e.preventDefault();

    var target = e.target;
    var price = target.parentElement.previousSibling.previousSibling.textContent;
    var bookName = target.parentElement.parentElement.children[0].textContent;

    var bookPrice = "";
    for (i = 0; i < price.length; i++) {
      if (price.charAt(i) >= 0 || price.charAt(i) <= 9) {
        bookPrice += price.charAt(i);
      }
    }
    bookPrice = parseInt(bookPrice);

    numArticle = localStorage.getItem("numArticle");

    if(numArticle == null){
      numArticle = 1;
    }else{
      newNumb = parseInt(numArticle);
      newNumb +=1;
      numArticle = newNumb;
    }

    var totalBill = localStorage.getItem("totalBill");

    if(totalBill == null){
      totalBill = 0;
    }else{
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

  checkNumArticle();

  function checkNumArticle(){
    var chechNumArticle = localStorage.getItem("numArticle");
  
    if(chechNumArticle == null){
      $numberArticle.addClass('d_none');
    }
    else{
      $numberArticle.removeClass('d_none');
      $numberArticle.html(localStorage.getItem("numArticle"));
    }
  }
  
  function fetch() {
    var to_fetch = localStorage.getItem("countItems");
    var item = JSON.parse(to_fetch);
    return item;
  }

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
  //Add item to List END

  //Shoping card
  var $shoppingCard = $("#shoppingCard");
  var $shoppingList = $("#shoppingList");
  var $exit = $("#exit");
  var $shoppingListItems = $("#shoppingListItems");

  $shoppingCard.on("click", function(e) {
    $shoppingList.css("display", "block");
    //List items in shopping card
    if (!fetched) {
      var item = fetch();
      if (item == null) {
        $shoppingListItems.append('<p id="empty">Shoping lista je prazna</p>');
      } else {
        for (i = 0; i < item.length; i++) {
          create_table(item[i], "table");
        }
      }
      fetched = true;
      return;
    }
    //List items in shopping card END
  });

  function create_table(item, table) {
    var table = document.getElementById("table");
    var row = document.createElement("tr");
    table.appendChild(row);
    for (prop in item) {
      var col = document.createElement("td");
      col.innerHTML = item[prop];
      row.appendChild(col);
    }
    return;
  }

  $exit.on("click", function(e) {
    $('#empty').remove();
    // $('#table').remove();
    $shoppingList.css("display", "none");
  });
  //Shoping card END
});
