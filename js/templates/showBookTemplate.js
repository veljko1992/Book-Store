$showBookWrapper = $('#showBookItem');
var showItems = '';
var showBookId = localStorage.getItem('showBookId');

$.getJSON("../json/books.json", function (result) {
    var showBook = result;

    for(i = 0; i < showBook.length; i++){
        if(showBook[i].id == showBookId){
            if(showBook[i].attribute == 'sales'){
                showItems += `<div class="row bookItem" data-name="${showBook[i].name}" data-price="${showBook[i].price}" data-id="${showBook[i].id}"">
                <div class="imgWrapper col-12 col-md-6">
                    <img src="../img/${showBook[i].img}" alt="${showBook[i].name}" class="img-fluid">
                    <div class="discountWrapper">${showBook[i].discount}</div>
                </div>
                <div class="textWrapper col-12 col-md-6">
                    <h1>${showBook[i].name}</h1>
                    <p>${showBook[i].description}</p>
                    <p style="margin-bottom:0;">${OSREC.CurrencyFormatter.format(showBook[i].price, { currency: 'RSD' })}</p>
                    <p class="itemOldPrice">${OSREC.CurrencyFormatter.format(showBook[i].oldPrice, { currency: 'RSD' })}</p>
                    <p><a href="" class="addItem showBtn">Kupite</a></p>
                </div>
              </div>`
            } else{
                showItems += `<div class="row bookItem" data-name="${showBook[i].name}" data-price="${showBook[i].price}" data-id="${showBook[i].id}"">
                <div class="imgWrapper col-12 col-md-6"><img src="../img/${showBook[i].img}" alt="${showBook[i].name}" class="img-fluid"></div>
                <div class="textWrapper col-12 col-md-6">
                    <h1>${showBook[i].name}</h1>
                    <p>${showBook[i].description}</p>
                    <p>${OSREC.CurrencyFormatter.format(showBook[i].price, { currency: 'RSD' })}</p>
                    <p><a href="" class="addItem showBtn">Kupite</a></p>
                </div>
              </div>` 
            }
        }
    }

    $showBookWrapper.html(showItems);
});

