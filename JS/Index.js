class Produits{
        constructor(jsonProduits){
                jsonProduits && Object.assign(this, jsonProduits)
        }   
}



let url = 'http://localhost:3000/api/teddies';

fetch(url)
    .then((response) => response.json())
    .then((jsonListProduits) => {
                for(let jsonProduits of jsonListProduits){
                        let produit = new Produits(jsonProduits);
                        const price = `${(produit.price/100).toFixed(2)}`;
                        document.querySelector(".produit").innerHTML += `<a href="Produit.html?id=${produit._id}" class="vignette">
                                                                        <img src="${produit.imageUrl}" />
                                                                        <div class="desc">
                                                                        <div class="name">${produit.name}</div>
                                                                        <div class="price">${price} €</div>
                                                                        </div>
                                                                        </a>
                                                                `}        
    })
    .catch(function() {
        document.querySelector("#main").innerHTML = `<div>Le serveur local (port: 3000) n'est pas lancé</div>`;
        //console.log("Le serveur local (port: 3000) n'est pas lancé"); // "zut !"
    });