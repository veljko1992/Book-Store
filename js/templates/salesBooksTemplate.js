$salesBooksWrapper = $('#salesBookItems');
var salesItems = '';

$.getJSON("json/books.json", function (result) {
    var salesBook = result;

    for(i = 0; i < salesBook.length; i++){
        if(salesBook[i].attribute == 'sales'){
            salesItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${salesBook[i].name}" data-price="${salesBook[i].price}" data-id="${salesBook[i].id}">
                        <div class="imgWrapper"><a href="pages/showBookPage.html" class="showItem"><img src="img/${salesBook[i].img}" alt="${salesBook[i].name}" class="img-fluid"></a><div class="discountWrapper">${salesBook[i].discount}</div></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${salesBook[i].name}</li>
                                <li class="itemPrice">${OSREC.CurrencyFormatter.format(salesBook[i].price, { currency: 'RSD' })}</li>
                                <li class="itemOldPrice">${OSREC.CurrencyFormatter.format(salesBook[i].oldPrice, { currency: 'RSD' })}</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $salesBooksWrapper.html(salesItems);
    itemsNum();
});

