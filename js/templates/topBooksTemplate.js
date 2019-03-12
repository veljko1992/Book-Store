$topBooksWrapper = $('#topBookItems');
var topItems = '';

$.getJSON("json/books.json", function (result) {
    var topBook = result;

    for(i = 0; i < topBook.length; i++){
        if(topBook[i].attribute == 'top'){
            topItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${topBook[i].name}" data-price="${topBook[i].price}" data-id="${topBook[i].id}">
                        <div class="imgWrapper"><a href="pages/showBookPage.html" class="showItem"><img src="img/${topBook[i].img}" alt="" class="img-fluid"></a></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${topBook[i].name}</li>
                                <li class="itemPrice">${topBook[i].price},00 RSD</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $topBooksWrapper.html(topItems);
});

