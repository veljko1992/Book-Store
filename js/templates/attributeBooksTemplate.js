$attributeBooksWrapper = $('#attributeBookItems');
var attributeBooks = localStorage.getItem('attributeBooks');


if(attributeBooks == 'new'){
    $('#attributeBooksHeading').html('NOVE KNJIGE');
}
if(attributeBooks == 'top'){
    $('#attributeBooksHeading').html('TOP KNJIGE');
}
if(attributeBooks == 'sales'){
    $('#attributeBooksHeading').html('RASPRODAJA KNJIGA');
}

function createBooks(attributeBook){
    var attributeItems = '';

    for(i = 0; i < attributeBook.length; i++){
        if(attributeBook[i].attribute == attributeBooks){
            attributeItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${attributeBook[i].name}" data-price="${attributeBook[i].price}" data-id="${attributeBook[i].id}">
                        <div class="imgWrapper"><a href="../pages/showBookPage.html" class="showItem"><img src="../img/${attributeBook[i].img}" alt="" class="img-fluid"></a></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${attributeBook[i].name}</li>
                                <li class="itemPrice">${OSREC.CurrencyFormatter.format(attributeBook[i].price, { currency: 'RSD' })}</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }
    $attributeBooksWrapper.html(attributeItems);
}


$.getJSON("../json/books.json", function (result) {
    var attributeBook = result;
    createBooks(attributeBook);
    
});


var $attributeSortItemsInput = $('#attributeSortItems');


$attributeSortItemsInput.on('change', function(){

    if($attributeSortItemsInput.val() == 'descending'){
        
        $.getJSON("../json/books.json", function (result) {
            var attributeItems = '';
            var attributeBook = result;
        
            attributeBook = attributeBook.sort(function(a, b){return b.price - a.price});
            
            createBooks(attributeBook);
        });
    }

    if($attributeSortItemsInput.val() == 'ascending'){

        $.getJSON("../json/books.json", function (result) {
            var attributeItems = '';
            var attributeBook = result;
            
            attributeBook = attributeBook.sort(function(a, b){return a.price - b.price});
            
            createBooks(attributeBook);
        });
    }
});
