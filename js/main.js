$(document).ready(function() {
  //Navigation
  var nav = $("nav");
  var navLi = $("nav li");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();
  var $booksList = $("#booksList");

  //Checking the screen width if more than 992 navigation is visible, and if smaller it is hidden
  if (winWidth >= 992) {
    nav.css("display", "block");
    menuBtn.css("display", "none");
    $booksList.removeClass("d_none");
  } else {
    nav.css("display", "none");
    menuBtn.css("display", "block");
    $booksList.addClass("d_none");
  }
  //When we resize the window if more than 992 navigation is gone, and if less is not visible, x is also removed
  $(window).resize(function() {
    winWidth = $(window).width();
    if (winWidth >= 992) {
      nav.css("display", "block");
      menuBtn.css("display", "none");
      $('.action-hide').removeClass("d_none");
    } else {
      nav.css("display", "none");
      menuBtn.css("display", "block");
      $("#menu-btn span").removeClass("bOpen");
      nav.removeClass("open");
      $('.action-hide').addClass("d_none");
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
      $booksList.addClass("d_none");
    }
  });
  //When we click on a link to navigation if it is less than 992 disappears
  navLi.on("click", function(e) {
    if (winWidth < 992 || nav.attr("class") == "open") {
      if (e.target.textContent == "KNJIGE") {
        if ($booksList.attr("class") == "d_none") {
          $booksList.removeClass("d_none");
        } else {
          $booksList.addClass("d_none");
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

  //Shrink hedera on scrool
  var fromTop;

  $(window).on("scroll", function () {
      fromTop = $(this).scrollTop();
      if (fromTop > 200) {
          $("#headerTop").css('height', '0');
          nav.css('top', '80px');
          $('#writeToUs').css('top', '80px');
          $('#shoppingList').css('top', '80px');
        } else{ 
          $("#headerTop").css('height', '60px');;
          nav.css('top', '140px');
          $('#writeToUs').css('top', '140px');
          $('#shoppingList').css('top', '140px');
      }
  });
  //Shrink hedera on scrool END

  //Navigation END

  //Prepare items for local storage
  var $numberArticle = $("#numberArticle");
  var $bookSection = $('.bookSection');

  var countItem = {};
 
  
  $bookSection.on("click", ".addItem", function(e) {
    e.preventDefault();
    var bookPrice = parseInt($(this).closest(".bookItem").data('price'));
    var bookName =  $(this).closest(".bookItem").data('name');
    var bookId =  $(this).closest(".bookItem").data('id');
    
    var numArticle = localStorage.getItem("numArticle");

    if (numArticle == null) {
      numArticle = parseInt(1);
    } else {
      numArticle = parseInt(numArticle) + 1;
    }

    var totalBill = localStorage.getItem("totalBill");

    if (totalBill == null) {
      totalBill = 0;
    } else {
      newNumb = parseInt(totalBill);
      totalBill = newNumb;
    }

    totalBill += bookPrice;

    countItem.id = bookId;
    countItem.name = bookName;
    countItem.price = bookPrice;
    countItem.quantity = 1;
    
  
    addItem(countItem);

    localStorage.setItem("totalBill", totalBill);
    localStorage.setItem("numArticle", numArticle);
    checkNumArticle();
    var info = `<div id="info" class="success">
                  <p>Uspešno ste dodali knjigu u korpu</p>
                </div>`;
    $('header').append(info);
    setTimeout(function(){ $('#info').remove();}, 2000);
  });
  //Prepare items for local storage END

  // Check number od article
  checkNumArticle();

  function checkNumArticle() {
    var chechNumArticle = localStorage.getItem("numArticle");

    if (chechNumArticle == null || chechNumArticle == 0) {
      $numberArticle.addClass("d_none");
    } else {
      $numberArticle.removeClass("d_none");
      $numberArticle.html(localStorage.getItem("numArticle"));
    }
  }
  // Check number od article END

  // Add items to local sotorage
  function addItem(countItem) {
    var countItems = [];
    var items = fetch();
    var has = false;
  
    if (items != null) { 
      items.forEach(el => {
        if(el.name == countItem.name){
          el.quantity ++
          has = true;
        }
      });
      
      if(has){
        to_push = JSON.stringify(items);
        localStorage.setItem("countItems", to_push);
      } else{
        items.push(countItem);
        to_push = JSON.stringify(items);
      }
    } else {
      countItems.push(countItem);
      to_push = JSON.stringify(countItems);
    }
  
    localStorage.setItem("countItems", to_push);
    return;
  }

  function fetch() {
    var to_fetch = localStorage.getItem("countItems");
    var items = JSON.parse(to_fetch);
    return items;
  }

  // Add items to local sotorage END

  //Push items to shoping card
  var shoppingCart = $("#shoppingCart");
  var $shoppingList = $("#shoppingList");
  var $exit = $("#exit");
  var $shoppingListItems = $("#shoppingListItems");

  shoppingCart.on("click", function(e) {
    if(!$shoppingList.hasClass('action-open')){
      $shoppingList.css("display", "block");
      $shoppingList.addClass('action-open');
      listItems();
      var winWidth = $(window).width();
      if (winWidth >= 992) {
        $('.action-hide').removeClass("d_none");
      } else {
        $('.action-hide').addClass("d_none");
      }
    }
  });

  $exit.on("click", function(e) {
    $("#empty").remove();
    $("#shoppingListItems h2").remove();
    $("#buyMistakes").remove();
    $shoppingList.css("display", "none");
    $shoppingList.removeClass('action-open');
  });

  function listItems() {
    var items = fetch();
    if (items == null) {
      $shoppingListItems.append('<p id="empty">Korpa je prazna</p>');
    } else {
      createTable(items);
    }
    return;
  }

  function createTable(items) {
    var table = `<h2>VAŠI ARTIKLI</h2>`;
    table += `<table>`;
    table += `<tr><td class="action-hide">Br.</td><td class="action-hide">ID</td><td>Naziv</td><td>Cena</td><td>Količina</td>`;
    for (i = 0; i < items.length; i++) {
      table += `<tr>`;
      table += `<td class="action-hide">${i + 1}.</td>`;
      for (prop in items[i]) {
        if(prop == 'id'){
          table += `<td class='action-id action-hide' data-id="${items[i][prop]}">${items[i][prop]}</td>`;
        }
        if(prop == 'name'){
          table += `<td class='action-name' data-name="${items[i][prop]}">${items[i][prop]}</td>`;
        }
        if(prop == 'quantity'){
          table += `<td class='action-quantity' data-quantity="${items[i][prop]}">${items[i][prop]}</td>`;
        }
        if(prop == 'price'){
          table += `<td class='action-price' data-price="${items[i][prop]}">${OSREC.CurrencyFormatter.format(items[i][prop], { currency: 'RSD' })}</td>`;
        }
      }
      table += `<td><button class="faild action-delete">Obriši</button></td>`;
      table += `</tr>`;
    }
    table += `</table>`;
    table += `<div id="tbWrapper"><button class="success action-continue">Nastavi kupovinu</button></div>`;
    table += `<div id="tbWrapper"><span id="totalBill">Ukupan račun je: </span></div>`;
    $shoppingListItems.html(table);

    $("#totalBill")
      .append(OSREC.CurrencyFormatter.format(localStorage.getItem("totalBill"), { currency: 'RSD' }));
  }
  //Push items to shoping card END
  function getSum(total, num) {
    return total + num;
  }

  //Delete items
  $shoppingListItems.on('click', '.action-delete', function(e){
    var id = $(this).closest('tr').children('.action-id').data('id');
    var price = $(this).closest('tr').children('.action-price').data('price');
    var quantity = $(this).closest('tr').children('.action-quantity').data('quantity');

    var item = fetch();
    var numArticle = 0;
    
    item = item.filter(item => item.id != id);
    item.forEach(el => {
      return numArticle += el.quantity;
    });

    var totalBill = parseInt(localStorage.getItem('totalBill'));
    totalBill = totalBill - (price * quantity);
    localStorage.setItem("totalBill", totalBill);
    to_push = JSON.stringify(item);
    localStorage.setItem("countItems", to_push);
    listItems();
    var winWidth = $(window).width();
    if (winWidth >= 992) {
      $('.action-hide').removeClass("d_none");
    } else {
      $('.action-hide').addClass("d_none");
    }
    localStorage.setItem("numArticle", numArticle);
    checkNumArticle();
    if(item.length == 0){
      localStorage.removeItem('countItems');
      localStorage.removeItem('numArticle');
      localStorage.removeItem('totalBill');
      $shoppingListItems.empty();
      listItems();
    }
  });
//Continue shopping
  $shoppingListItems.on('click', '.action-continue', function(e){
    $shoppingListItems.empty();
    var buyForm = `<h2>ADRESA I PODATCI ISPORUKE</h2>
    <p id="buyMistakes"></p>
    <form id="buyForm" action="" novalidate>
    <label for="buyName">*Ime:</label><br>
    <input type="text" id="buyName" name="name"><br>
    <label for="buyEmail">*E-mail:</label><br>
    <input type="email" id="buyEmail" name="email"><br>
    <label for="buyNumber">*Broj: (069/xxxxxx)</label><br>
    <input type="text" id="buyNumber" name="number"><br>
    <label for="buyAdress">*Adresa:</label><br>
    <input type="text" id="buyAdress" name="adress"><br>
    <input id="buyBtn" type="submit" value="Poruči">
  </form>`;
  $shoppingListItems.html(buyForm);

  var $buyInputs = $("#buyForm input");

  $buyInputs.on("focus", function(e) {
    var label = $(this).prev().prev();
    label.css('bottom', '0px');
  });

  $buyInputs.on("blur", function() {
    if($(this).val().length > 0){
      var label = $(this).prev().prev();
      label.css('bottom', '0px');
    }else{
      var label = $(this).prev().prev();
      label.css('bottom', '-35px');
  }
});

    //Validation buy form
    var $buyForm = $("#buyForm");
    var $buyMistakes = $("#buyMistakes");
  
    $buyForm.on("submit", e => {
      e.preventDefault();
      $buyMistakes.empty();
      checkForm();
    });
  
    function checkForm() {
      if (filledName() && filledEmail() && filledNumber() && filledAdress()) {
        $("#shoppingListItems h2").html('Hvala na poverenju');
        $('#buyForm').remove();
        $buyMistakes.addClass("success");
        $buyMistakes.html("Uspesno ste poručili.");
        $("#buyName, #buyEmail").val("");
        localStorage.removeItem('countItems');
        localStorage.removeItem('numArticle');
        localStorage.removeItem('totalBill');
        checkNumArticle();
        return true;
      } else {
        return false;
      }
    }
  
    function filledName() {
      var name = $("#buyName").val();
  
      if (name.trim().length == 0) {
        $buyMistakes.removeClass("success");
        $buyMistakes.addClass("faild");
        $buyMistakes.html("Nije uneto ime.");
        return false;
      }
  
      return true;
    }
  
    function filledEmail() {
      var email = $("#buyEmail")
        .val()
        .trim();

      if(email.length == 0){
        $buyMistakes.removeClass("success");
        $buyMistakes.addClass("faild");
        $buyMistakes.html("Nije uneta E-mail adresa.");
        return false;
      }
  
      var r = new RegExp("[a-z0-9]+@([a-z0-9]+\\.)+[a-z]+");
      if (r.test(email) == false) {
        $buyMistakes.removeClass("success");
        $buyMistakes.addClass("faild");
        $buyMistakes.html("Neispravna imejl adresa.");
        return false;
      }
      return true;
    }

    
    function filledNumber() {
      var number = $("#buyNumber")
        .val()
        .trim();

        if(number.length == 0){
          $buyMistakes.removeClass("success");
          $buyMistakes.addClass("faild");
          $buyMistakes.html("Nije unet broj.");
          return false;
        }
  
        var r = new RegExp("06[0-9]/[0-9]+");
      if (r.test(number) == false) {
        $buyMistakes.removeClass("success");
        $buyMistakes.addClass("faild");
        $buyMistakes.html("Neispravan broj.");
        return false;
      }
      return true;
    }

    function filledAdress() {
      var name = $("#buyAdress").val();
  
      if (name.trim().length == 0) {
        $buyMistakes.removeClass("success");
        $buyMistakes.addClass("faild");
        $buyMistakes.html("Nije uneta adresa.");
        return false;
      }
  
      return true;
    }

  });


  // Form
  var $activeForm = $("#activeForm");
  var $exit2 = $("#exit2");

  $activeForm.on("click", function() {
    $("#writeToUs").css("display", "block");
  });

  $exit2.on("click", function() {
    $("#writeToUs").css("display", "none ");
    $mistakes.removeClass("success");
    $mistakes.removeClass("faild");
    $mistakes.empty();
  });

  var textarea = document.querySelector("textarea");

  textarea.addEventListener("keydown", autosize);

  function autosize() {
    var el = this;
    setTimeout(function() {
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  }

  var $inputs = $("#form input");

  $inputs.on("focus", function(e) {
    var label = $(this).prev().prev();
    label.css('bottom', '0px');
  });
  $inputs.on("blur", function() {
    if($(this).val().length > 0){
      var label = $(this).prev().prev();
      label.css('bottom', '0px');
    }else{
      var label = $(this).prev().prev();
      label.css('bottom', '-35px');
    }
  });

  $("textarea").on("focus", function(e) {
    var label = $(this).prev().prev();
    label.css('bottom', '0px');
  });

  $("textarea").on("blur", function() {
    if($(this).val().length > 0){
      var label = $(this).prev().prev();
      label.css('bottom', '0px');
    }else{
      var label = $(this).prev().prev();
      label.css('bottom', '-35px');
    }
  });

  //Validation form
  var $form = $("#form");
  var $mistakes = $("#mistakes");

  $form.on("submit", e => {
    e.preventDefault();
    $mistakes.empty();
    checkForm();
  });

  function checkForm() {
    if (filledName() && filledEmail() && filledText()) {
      $mistakes.addClass("success");
      $mistakes.html("Uspesno ste poslali poruku.");
      $("#name, #email").val("");
      $("textarea").val("");
      return true;
    } else {
      return false;
    }
  }

  function filledName() {
    var name = $("#name").val();

    if (name.trim().length == 0) {
      $mistakes.removeClass("success");
      $mistakes.addClass("faild");
      $mistakes.html("Nije uneto ime.");
      return false;
    }

    return true;
  }

  function filledEmail() {
    var email = $("#email")
      .val()
      .trim();

    if(email.length == 0){
      $mistakes.removeClass("success");
      $mistakes.addClass("faild");
      $mistakes.html("Nije uneta E-mail adresa.");
      return false;
    }

    r = new RegExp("[a-z0-9]+@([a-z0-9]+\\.)+[a-z]+");
    if (r.test(email) == false) {
      $mistakes.removeClass("success");
      $mistakes.addClass("faild");
      $mistakes.html("Neispravna imejl adresa.");
      return false;
    }
    return true;
  }

  function filledText() {
    var text = $("textarea").val();

    if (text.trim().length == 0) {
      $mistakes.removeClass("success");
      $mistakes.addClass("faild");
      $mistakes.html("Nije uneta poruka.");
      return false;
    }

    return true;
  }
//Show book item
$bookSection.on("click", ".showItem", function(e) {
  var bookId =  $(this).closest(".bookItem").data('id');
  localStorage.setItem('showBookId', bookId);
});
//attribute books 
$('.action-page').on("click", function(e) {
  var attributeBooks =  $(this).data('attribute');
  localStorage.setItem('attributeBooks', attributeBooks);
});

// Load more items
var winWidth;
var num;

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
itemsNum();
$(window).on("resize", itemsNum);
// Load more items end

});



