// création d'une classe
class Produits{
        constructor(jsonProduits){
                jsonProduits && Object.assign(this, jsonProduits)
        }   
}


// récupération du Back-end
let url = 'http://localhost:3000/api/teddies';

fetch(url)
        // récupération des données en Json du Back-end
    .then((response) => response.json())
    .then((jsonListProduits) => {
                for(let jsonProduits of jsonListProduits){
                        let produit = new Produits(jsonProduits);
                        // on fixe le prix en euro et on le fixe à 2 chiffres en décimale
                        const price = `${(produit.price/100).toFixed(2)}`;
                        // Remplace le corp de page par le suivant : (Ajout de chaque vignette par ID produit)
                        document.querySelector(".produit").innerHTML += `<a href="Produit.html?id=${produit._id}" class="vignette">
                                                                        <img src="${produit.imageUrl}" />
                                                                        <div class="desc">
                                                                        <div class="name">${produit.name}</div>
                                                                        <div class="price">${price} €</div>
                                                                        </div>
                                                                        </a>

                                                                `}        
    })
    // Si le serveur 3000 n'est pas activé alors les articles ne s'affichent pas.
    .catch(function() {
        document.querySelector("#main").innerHTML = `<div>Le serveur local (port: 3000) n'est pas lancé</div>`;
        //console.log("Le serveur local (port: 3000) n'est pas lancé");
    });

    
    let produits = JSON.parse(localStorage.getItem("produits"));
    var totqty = 0;
function quantite(){
    if (produits == "" || produits == undefined){
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    }
    else{
    for(k = 0;k < produits.length; k++){
    totqty += Number(produits[k].qty);
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    
}};
console.log(totqty)
};

quantite();