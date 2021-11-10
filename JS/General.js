// création d'une nouvelle class (exporté dans index.js et Produit.js)
export class Article{
    constructor(jsondonnee){
        jsondonnee && Object.assign(this, jsondonnee)
    }   
}

// récupération des information dnas la localStorage
let produits = JSON.parse(localStorage.getItem("produits"));
// variable avec comme valeur par defaut 0
var totqty = 0;
// Fonction quantite qui sert à indiquer la quantité total du panier (exporter dans index.js et Produit.js)
export function quantite(){
    // si pas de tableau produits dans le localstorage on indique la valeur par defaut 0
    if (produits == "" || produits == undefined){
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    }
    // sinon on indique la valeur total de quantité qui ce trouve dans le tableau produits
    else{
    for(let k = 0;k < produits.length; k++){
        totqty += Number(produits[k].qty);
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    
        }   
    };
};