$categorieBooksWrapper = $('#categorieBookItems');
var categorieItems = '';
var categorieBooks = localStorage.getItem('atributeBooks');



if(categorieBooks == 'social'){
    $('#categorieBooksHeading').html('DRUŠTVENE NAUKE');
}
if(categorieBooks == 'medicine'){
    $('#categorieBooksHeading').html('MEDICINA');
}
if(categorieBooks == 'economy'){
    $('#categorieBooksHeading').html('EKONOMIJA');
}
if(categorieBooks == 'computer'){
    $('#categorieBooksHeading').html('KOMPJUTERSKA LITERATURA');
}



$.getJSON("../json/books.json", function (result) {
    var categorieBook = result;
  
    for(i = 0; i < categorieBook.length; i++){
        if(categorieBook[i].categorie == categorieBooks){
            categorieItems += `<div class="bookItem col-6 col-sm-4 col-lg-3 imgbox" data-name="${categorieBook[i].name}" data-price="${categorieBook[i].price}" data-id="${categorieBook[i].id}">
                        <div class="imgWrapper"><a href="../pages/showBookPage.html" class="showItem"><img src="../img/${categorieBook[i].img}" alt="" class="img-fluid"></a></div>
                            <div class="textWrapper">
                              <ul>
                                <li class="itemName">${categorieBook[i].name}</li>
                                <li class="itemPrice">${categorieBook[i].price},00 RSD</li>
                                <li><a href="" class="addItem">Kupite</a></li>
                              </ul>
                            </div>
                        </div>` 
        }
    }

    $categorieBooksWrapper.html(categorieItems);
});

