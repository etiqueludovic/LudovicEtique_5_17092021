class Article{
    constructor(jsondonnee){
        jsondonnee && Object.assign(this, jsondonnee)
    }   
}

// récupération de de l'id du produit 
let params = new URL(document.location).searchParams;
let _id = params.get("id");

const urllocal = `http://localhost:3000/api/teddies/${_id}`;

// récupération des données du produit
fetch(urllocal)
    .then((response) => response.json())
    .then((jsondata) => {
       // console.table(jsondata);
                let donnee = new Article(jsondata);
                const price = `${(donnee.price/100).toFixed(2)}`;
                document.querySelector("#container").innerHTML += `<img src="${donnee.imageUrl}"/>`;
                document.querySelector("#name").textContent = `${donnee.name}`;
                document.querySelector("#price").textContent =  `${price} €`;
                for(let col of donnee.colors){
                document.querySelector("#couleur").innerHTML +=  `<option value="${col}">${col}</option>`;}
            })
    .catch(function() {
                document.querySelector("#main").innerHTML = `<div>Le serveur local (port: 3000) n'est pas lancé</div>`;
                //console.log("Le serveur local (port: 3000) n'est pas lancé");
                
            });


//----------récupération des valeurs de la commande------------//

// événement sur le bouton envoyer
document.addEventListener('click', function(){
    document.querySelector('#envoyer').onclick=envoyer;
});



function envoyer(){
    fetch(urllocal)
        .then((response) => response.json())
        .then((jsondata) => {
        let donnee = new Article(jsondata);
        const price = `${(donnee.price/100).toFixed(2)}`;
        const col = document.querySelector("#couleur").value;
        const qty = document.querySelector("#Quantite").value;
        let formulaireProduit = {
            _id: `${donnee._id}`,
            name: `${donnee.name}`,
            colors: `${col}`,
            price: Number(`${price}`),
            qty: Number(`${qty}`),
            pricetotal: Number(`${price}`*`${qty}`),
        };
        
    // Ajout dans le LocalStorage    
        let recordstorage = JSON.parse(localStorage.getItem("produits"));
        const ajoutProduit = () => {
            recordstorage.push(formulaireProduit);
            localStorage.setItem("produits", JSON.stringify(recordstorage));
            alert("L'article ce trouve maintenant dans votre panier");
            location.reload();
        };
    // s'il y a déjà des articles
        if (recordstorage && qty > 0){
            ajoutProduit();
        }
    // s'il n'y a pas d'article
        else if (qty > 0){
            recordstorage = [];
            ajoutProduit();
        }      
        else if (qty <= 0){
            
                alert("Veuillez ajouter une quantité supérieur à 0");
        }
})
};


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






