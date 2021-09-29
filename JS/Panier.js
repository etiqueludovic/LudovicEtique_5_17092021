// récupération du localStorage
let recupstorage = JSON.parse(localStorage.getItem("produit"));
//console.log(recupstorage);

// récupération total 
let recuptotal = JSON.parse(localStorage.getItem("total"));

if(recupstorage == null){
    const paniervide = "Le panier est vide, veuillez ajouter des articles";
    document.querySelector("thead").innerHTML = "Le panier est vide, veuillez ajouter des articles";
    //console.log(paniervide);
}else{
    for(i = 0;i < recupstorage.length; i++){
        document.querySelector("#conteneur-table").innerHTML += `<tr>
                   <td class="nom">${recupstorage[i].name_art}</td>
                   <td class="col">${recupstorage[i].col_art}</td>
                   <td class="qty"><input type="number" value="${recupstorage[i].qty_art}"></input></td>
                   <td class="price">${recupstorage[i].price_art} €</td>
                   <td class="pricetotal">${recuptotal[i].pricetotal_art} €</td>
               </tr>` 
               console.log(recuptotal[i].pricetotal_art)            
}};
  



