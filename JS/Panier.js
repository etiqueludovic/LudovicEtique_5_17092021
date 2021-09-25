// récupération du localStorage
let recupstorage = JSON.parse(localStorage.getItem("produit"));
console.log(recupstorage);


if(recupstorage == null){
    const paniervide = "Le panier est vide, veuillez ajouter des articles";
    console.log(paniervide);
}else{
    for(i = 0;i < recupstorage.length; i++){
        let pricetotal = `${recupstorage[i].price_art}`*`${recupstorage[i].qty_art}`;
        document.querySelector("#conteneur-table").innerHTML += `<tr>
                   <td class="nom">${recupstorage[i].name_art}</td>
                   <td class="col">${recupstorage[i].col_art}</td>
                   <td class="qty">${recupstorage[i].qty_art}</td>
                   <td class="price">${recupstorage[i].price_art} €</td>
                   <td class="pricetotal">${pricetotal} €</td>
                   <td class="delete"><input type="button" value="Supprimer la sélection" onClick="${deleted}"></td>
               </tr>`
            }
             
};
