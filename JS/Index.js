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

    // récupération des information dnas la localStorage
    let produits = JSON.parse(localStorage.getItem("produits"));
    // variable totqty réglé à 0
    var totqty = 0;
// fonction quantite qui sert à indiquer la quantité total du panier
function quantite(){
    // si pas de tableau produits dans le localstorage on indique la valeur par defaut 0
    if (produits == "" || produits == undefined){
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    }
    // sinon on indique la valeur total de quantité qui ce trouve dans le tableau produits
    else{
    
    for(k = 0;k < produits.length; k++){
        // boucle qui récupére chaque quantité pour les additionner
    totqty += Number(produits[k].qty);
        // remplace la valeur HTML par celle-ci
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    
}};
console.log(totqty)
};
// on lance la fonction quantite
quantite();