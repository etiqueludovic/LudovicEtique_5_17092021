// récupération du localStorage
let recupstorage = JSON.parse(localStorage.getItem("produit"));
//console.log(recupstorage);

// récupération total 
let recuptotal = JSON.parse(localStorage.getItem("total"));
var tot = 0;

function affichage(){
if(recupstorage == null){
    const paniervide = "Le panier est vide, veuillez ajouter des articles";
    document.querySelector("thead").innerHTML = "Le panier est vide, veuillez ajouter des articles";
    //console.log(paniervide);
}else{
    for(i = 0;i < recupstorage.length; i++){
        document.querySelector("#conteneur-table").innerHTML += `<tr>
                   <td class="nom">${recupstorage[i].name_art}</td>
                   <td class="col">${recupstorage[i].col_art}</td>
                   <td><input type="number" class="qty" value="${recupstorage[i].qty_art}" onclick="modifqty"></td>
                   <td class="price">${recupstorage[i].price_art} €</td>
                   <td class="pricetotal">${recuptotal[i].pricetotal_art} €</td>
               </tr>`; 
               tot += recuptotal[i].pricetotal_art;
               var total = tot*(20/100);
               var TTC = total+tot;
               document.querySelector('#total').textContent = "Total HT :  " + tot + " €";
               document.querySelector('#tva').textContent = "Total TVA :  " + total + " €";
               document.querySelector('#TTC').textContent = "Total TTC :  " + TTC + " €";
    
                


}};
};
let test = 0;
let test2 = 0;
function modifqty(){
    test = document.getElementsByClassName('qty');
    console.log(test)
    for(j = 0;j < test.length; j++){
    test2 += test[j].value;
    document.querySelector('#tabTotal').innerHTML += "Total qty :  " + test2;
    var valeurcourante = test[j].value;
    if (parseInt(this.value) != valeurcourante){
        let x = new Number(this.value);
    }
    valeurcourante = parseInt(x);
    

    };
    
      
};


affichage();
modifqty();




