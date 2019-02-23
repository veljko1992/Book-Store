$salesBooksWrapper = $('#salesBookItems');
var salesItems = '';

$.getJSON("json/books.json", function (result) {
    var salesBook = result;

    for(i = 0; i < salesBook.length; i++){
        if(salesBook[i].atribute == 'sales'){
            salesItems += `<div class="bookItem col-6 col-md 4 col-xl-3">
                        <div class="imgWrapper"><img src="img/${salesBook[i].img}" alt="" class="img-fluid"></div>
                            <div class="textWrapper">
                              <ul>
                                <li>${salesBook[i].name}</li>
                                <li>${salesBook[i].price}</li>
                                <li id="addItem"><a href="">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $salesBooksWrapper.html(salesItems);
});
