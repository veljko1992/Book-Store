$atributeBooksWrapper = $('#atributeBookItems');
var atributeItems = '';
var atributeBooks = localStorage.getItem('atributeBooks');

if(atributeBooks == 'new'){
    $('#atributeBooksHeading').html('NOVE KNJIGE');
}
if(atributeBooks == 'top'){
    $('#atributeBooksHeading').html('TOP KNJIGE');
}
if(atributeBooks == 'sales'){
    $('#atributeBooksHeading').html('RASPRODAJA KNJIGA');
}



$.getJSON("../json/books.json", function (result) {
    var atributeBook = result;
  
    for(i = 0; i < atributeBook.length; i++){
        if(atributeBook[i].atribute == atributeBooks){
            atributeItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${atributeBook[i].name}" data-price="${atributeBook[i].price}" data-id="${atributeBook[i].id}">
                        <div class="imgWrapper"><a href="../pages/showBookPage.html" class="showItem"><img src="../img/${atributeBook[i].img}" alt="" class="img-fluid"></a></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${atributeBook[i].name}</li>
                                <li class="itemPrice">${atributeBook[i].price},00 RSD</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $atributeBooksWrapper.html(atributeItems);
});

