$(document).ready(function(){
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
var $addItemButton = $('.addItem');
var $numberArticle = $('#numberArticle');

var totalBill = 0;
var countItem = {};
var countItems = [];
var numArticle = 0;


$addItemButton.on('click', function(e){
  e.preventDefault();

  var target = e.target;
  var price = target.parentElement.previousSibling.previousSibling.textContent;
  var bookName = target.parentElement.parentElement.children[0].textContent;
  
  var bookPrice = '';

  for(i=0; i < price.length; i++){
    if(price.charAt(i) >= 0 || price.charAt(i) <= 9){
      bookPrice += price.charAt(i)
    }
  }

  bookPrice = parseInt(bookPrice);
  numArticle += 1;
  totalBill += bookPrice;

  countItem.id = numArticle;
  countItem.name = bookName;
  countItem.price = bookPrice;
  console.log(countItem);
  
  addItem(countItem);
  localStorage.setItem("totalBill", totalBill);
  
});

// var fetched = false;

function fetch(){
  var to_fetch = localStorage.getItem("countItems");
  var item = JSON.parse(to_fetch);
  console.log(item);
  return item;
}

function addItem(countItem){
  // fetched = false;
  var item = fetch();

  if(item != null){
    item.push(countItem);
    to_push = JSON.stringify(item);
  }else{
    countItems.push(countItem);
    to_push = JSON.stringify(countItems);
  }
  localStorage.setItem("countItems", to_push);
  return;
}



//Add item to List END
});