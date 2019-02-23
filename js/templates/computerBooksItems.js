$computerBooksWrapper = $('#computerBookItems');
var computerItems = '';

$.getJSON("../json/books.json", function (result) {
    var computerBook = result;

    for(i = 0; i < computerBook.length; i++){
        if(computerBook[i].categorie == 'computer'){
            computerItems += `<div class="bookItem col-6 col-md 4 col-xl-3">
                        <div class="imgWrapper"><img src="../img/${computerBook[i].img}" alt="" class="img-fluid"></div>
                            <div class="textWrapper">
                              <ul>
                                <li>${computerBook[i].name}</li>
                                <li>${computerBook[i].price}</li>
                                <li id="addItem"><a href="">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $computerBooksWrapper.html(computerItems);
});