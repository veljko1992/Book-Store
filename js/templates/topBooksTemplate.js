$topBooksWrapper = $('#topBookItems');
var topItems = '';

$.getJSON("json/books.json", function (result) {
    var topBook = result;

    for(i = 0; i < topBook.length; i++){
        if(topBook[i].atribute == 'top'){
            topItems += `<div class="bookItem col-6 col-md 4 col-xl-3">
                        <div class="imgWrapper"><img src="img/${topBook[i].img}" alt="" class="img-fluid"></div>
                            <div class="textWrapper">
                              <ul>
                                <li>${topBook[i].name}</li>
                                <li>${topBook[i].price}</li>
                                <li id="addItem"><a href="">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $topBooksWrapper.html(topItems);
});

