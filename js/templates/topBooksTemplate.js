$topBooksWrapper = $('#topBookItems');
var topItems = '';

$.getJSON("json/books.json", function (result) {
    var topBook = result;

    for(i = 0; i < topBook.length; i++){
        if(topBook[i].atribute == 'top'){
            topItems += `<div class="bookItem col-6 col-sm-4 col-lg-3" data-name="${topBook[i].name}" data-price="${topBook[i].price}" data-id="${topBook[i].id}">
                        <div class="imgWrapper"><img src="img/${topBook[i].img}" alt="" class="img-fluid"></div>
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

