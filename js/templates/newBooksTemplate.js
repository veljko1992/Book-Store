$newBooksWrapper = $('#newBookItems');
var newItems = '';

$.getJSON("json/books.json", function (result) {
    var newBook = result;

    for(i = 0; i < newBook.length; i++){
        if(newBook[i].atribute == 'new'){
            newItems += `<div class="bookItem col-6 col-md 4 col-xl-3">
                        <div class="imgWrapper"><img src="img/${newBook[i].img}" alt="" class="img-fluid"></div>
                            <div class="textWrapper">
                              <ul>
                                <li>${newBook[i].name}</li>
                                <li>${newBook[i].price}</li>
                                <li id="addItem"><a href="">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $newBooksWrapper.html(newItems);
});

