$categoriesBooksWrapper = $('#categoriesBookItems');
var categoriesBooks = localStorage.getItem('categoriesBooks');



if(categoriesBooks == 'social'){
    $('#categoriesBooksHeading').html('DRUŠTVENE NAUKE');
}
if(categoriesBooks == 'medicine'){
    $('#categoriesBooksHeading').html('MEDICINA');
}
if(categoriesBooks == 'economy'){
    $('#categoriesBooksHeading').html('EKONOMIJA');
}
if(categoriesBooks == 'computer'){
    $('#categoriesBooksHeading').html('KOMPJUTERSKA LITERATURA');
}

function createBooks(categoriesBook){
    var categoriesItems = '';

    for(i = 0; i < categoriesBook.length; i++){
        if(categoriesBook[i].categories == categoriesBooks){
            if(categoriesBook[i].attribute == 'sales'){
                categoriesItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${categoriesBook[i].name}" data-price="${categoriesBook[i].price}" data-id="${categoriesBook[i].id}">
                <div class="imgWrapper"><a href="../pages/showBookPage.html" class="showItem"><img src="../img/${categoriesBook[i].img}" alt="" class="img-fluid"></a><div class="discountWrapper">${categoriesBook[i].discount}</div></div>
                    <div class="textWrapper">
                      <ul>
                        <li class="itemName">${categoriesBook[i].name}</li>
                        <li class="price">
                            <div class="itemPrice">${OSREC.CurrencyFormatter.format(categoriesBook[i].price, { currency: 'RSD' })}</div>
                            <div class="itemOldPrice">${OSREC.CurrencyFormatter.format(categoriesBook[i].oldPrice, { currency: 'RSD' })}</div>
                        </li>
                        <li><a href="" class="addItem">Kupite</a></li>
                      </ul>
                    </div>
                </div>` 
            } else{
                categoriesItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${categoriesBook[i].name}" data-price="${categoriesBook[i].price}" data-id="${categoriesBook[i].id}">
                <div class="imgWrapper"><a href="../pages/showBookPage.html" class="showItem"><img src="../img/${categoriesBook[i].img}" alt="" class="img-fluid"></a></div>
                    <div class="textWrapper">
                      <ul>
                        <li class="itemName">${categoriesBook[i].name}</li>
                        <li class="itemPrice price">${OSREC.CurrencyFormatter.format(categoriesBook[i].price, { currency: 'RSD' })}</li>
                        <li><a href="" class="addItem">Kupite</a></li>
                      </ul>
                    </div>
                </div>` 
            }
        }
    }

    $categoriesBooksWrapper.html(categoriesItems);
}



$.getJSON("../json/books.json", function (result) {
    var categoriesBook = result;
    createBooks(categoriesBook);
});

var $categoriesSortItemsInput = $('#categoriesSortItems');


$categoriesSortItemsInput.on('change', function(){

    if($categoriesSortItemsInput.val() == 'descending'){
        
        $.getJSON("../json/books.json", function (result) {
            var categoriesBook = result;
            categoriesBook = categoriesBook.sort(function(a, b){return b.price - a.price});
            createBooks(categoriesBook);
        });
    }

    if($categoriesSortItemsInput.val() == 'ascending'){

        $.getJSON("../json/books.json", function (result) {
            var categoriesBook = result;
            categoriesBook = categoriesBook.sort(function(a, b){return a.price - b.price});
            createBooks(categoriesBook);
        });
    }
});
