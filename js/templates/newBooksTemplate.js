$newBooksWrapper = $('#newBookItems');
var newItems = '';

$.getJSON("json/books.json", function (result) {
    var newBook = result;

    for(i = 0; i < newBook.length; i++){
        if(newBook[i].attribute == 'new'){
            newItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${newBook[i].name}" data-price="${newBook[i].price}" data-id="${newBook[i].id}">
                        <div class="imgWrapper"><a href="pages/showBookPage.html" class="showItem"><img src="img/${newBook[i].img}" alt="${newBook[i].name}" class="img-fluid"></a></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${newBook[i].name}</li>
                                <li class="itemPrice">${OSREC.CurrencyFormatter.format(newBook[i].price, { currency: 'RSD' })}</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $newBooksWrapper.html(newItems);
    itemsNum();
});





