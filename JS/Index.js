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
                                                                        <div class="name">${produit.name}</div>
                                                                        <div class="price">${price} €</div>
                                                                        </a>
                                                                `}         
    });

fetch(url)
    .then((response) => response.json())
    .then((data) => {
            console.log(data);
    });

   
