class Produit{
        constructor(jsonProduit){
                jsonProduit && Object.assign(this, jsonProduit)
        }   
}


let url = 'http://localhost:3000/api/teddies';

fetch(url)
    .then((response) => response.json())
    .then((jsonListProduit) => {
            for(let jsonProduit of jsonListProduit){
                let produit = new Produit(jsonProduit);
                document.querySelector(".produit").innerHTML += `<div class="vignette">
                                                                        <img src="${jsonProduit.imageUrl}" />
                                                                        <div class="name">${jsonProduit.name}</div>
                                                                        <div class="price">${Number(jsonProduit.price/100)}€</div>
                                                                </div>`
            }

    });

fetch(url)
    .then((response) => response.json())
    .then((data) => {
            console.log(data);
    })