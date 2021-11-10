import {Article} from './General.js';
import {quantite} from './General.js';

// récupération de de l'id du produit 
let params = new URL(document.location).searchParams;
let _id = params.get("id");
// récupération du tableau json Produits
let produits = JSON.parse(localStorage.getItem("produits"));
// contruct de l'urllocal contenant l'ID du produits sélectionné
const urllocal = `http://localhost:3000/api/teddies/${_id}`;

console.log("ici l'url local : "+urllocal)
// donne une valeur par defaut
let recordproductid = "";
let recordcolor = "";
let qtyvalue = 0;

 // Fonction qui récupére les produits s'il existe dans le localstorage sinon vide.
function record(){
if(produits){ 
    for(let p = 0;p < produits.length; p++){
        // récupération de l'id et de la couleur pour avoir un ID unique
        recordproductid = produits[p]._id;
        recordcolor = produits[p].colors;
    }
    }else{
    // si produits n'existe pas alors valeur par defaut vide
    recordproductid = "";
    recordcolor = ""; 
    };
};
record();

// Fonction qui récupére les données du produit suivant l'ID de l'url et les injecte dans l'HTML
function recup(){
fetch(urllocal)
    .then((response) => response.json())
    .then((jsondata) => {
       // console.table(jsondata);
                let donnee = new Article(jsondata);
                // passage de centime à euro
                const price = `${(donnee.price/100).toFixed(2)}`;
                // modification des données suivant les élément sélectionné
                document.querySelector("#container").innerHTML += `<img alt="Image ${donnee.name}" src="${donnee.imageUrl}"/>`;
                document.querySelector("#name").textContent = `${donnee.name}`;
                document.querySelector("#price").textContent =  `${price} €`;
                document.querySelector('.qty').innerHTML = `<span class="qty">${0}</span>`;
                document.querySelector("#retourpanier").style = 'display:none';
                // boucle pour récupérer les couleurs de l'élément
                for(let col of donnee.colors){
                document.querySelector("#couleur").innerHTML +=  `<option value="${col}">${col}</option>`;
                }        
    })
    .catch(function(){
        // si le port 3000 n'est pas lancé alors message d'erreur
                document.querySelector("#main").innerHTML = `<div>Le serveur local (port: 3000) n'est pas lancé</div>`;
                //console.log("Le serveur local (port: 3000) n'est pas lancé");
                
    });
};
recup();

// Fonction qui enregistre le produit et ces informations ainsi que la quantité en cliquant sur le bouton envoyer
window.envoyer = function envoyer(){
    fetch(urllocal)
        .then((response) => response.json())
        .then((jsondata) => {
        let donnee = new Article(jsondata);
        const price = `${(donnee.price/100).toFixed(2)}`;
        const col = document.querySelector("#couleur").value;
        const qty = qtyvalue;
        // construction json du formulaire produits
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
        // constante incluant plusieurs propriétés
        const ajoutProduit = () => {
            recordstorage.push(formulaireProduit);
            localStorage.setItem("produits", JSON.stringify(recordstorage));
            alert("L'article ce trouve maintenant dans votre panier");
            location.reload();
        };
        if(recordstorage){
            // si l'ID et la couleur existe déjà alors un message l'indique à l'utilisateur
            if (recordproductid == donnee._id && recordcolor == col && qty > 0 && col != "starter"){
                alert("vous avez déjà cette article dans le panier")
            }
            // sinon si l'ID et la couleur ainsi que la quantité est supérieur à 0 alors on ajoute l'article au tabeau Produits
            else if(recordproductid != donnee._id && recordcolor != col && qty > 0 && col != "starter"|| qty > 0 && col != "starter"){
                ajoutProduit();
            }
            //sinon si couleur egale au seclect par defaut, rien ne ce passe et border color est en rouge
            else if(col == "starter"){
                document.querySelector("#couleur").style.borderColor = 'red';
            }
             //si quantité inférieur ou égale à 0 alors on envoi un message d'erreur
            else if(qty <= 0)
            {          
                alert("Veuillez ajouter une quantité supérieur à 0");
            }
            }
            else{
                //si quantité inférieur ou égale à 0 alors on envoi un message d'erreur
            if (qty <= 0){          
                alert("Veuillez ajouter une quantité supérieur à 0");
            }
            // sinon si quantité OK et couleur sélectionné on crée un nouveau tableau Produits
            else if (qty > 0 && col != "starter"){
                recordstorage = [];
                ajoutProduit();
            }}
    
        })
};

// Fonction qui incrémente la quantité d'article
window.plus = function plus(){ 
    // on ajoute la quantité à chaque clique et on commence par +1 au premier clique au lieu de 0
        var qtydefaut = qtyvalue++; 
        document.querySelector(`.qty`).textContent = (qtydefaut++)+1;      
    
};
// Fonction qui décrémente la quantité d'article
window.moin = function moin(){ 
    // on ajoute la quantité à chaque clique et on commence par -1 au premier clique au lieu de 0
        var qtydefaut = qtyvalue--;
        document.querySelector(`.qty`).textContent = (qtydefaut--)-1;          
    };

// Quand la couleur est sélectionné, la fonction ce déclenche et modifie les informations HTML (quantité, bouton)
window.couleur = function couleur(){
    if (produits){
        // Grâce à cette boucle nous prenons le bon produit sélectionné (id + couleur)
    for(let a = 0;a < produits.length; a++){
        let idrecord = produits[a]._id;
        let colorsrecord = produits[a].colors;
    if (document.querySelector("#couleur").value != "starter" && _id == idrecord && colorsrecord == document.querySelector("#couleur").value){
       // nous modifions les champs (bordure dela case en vert si l'article et ça couleur existe et son sélectionné)
    document.querySelector("#couleur").style.borderColor = "green"; 
        // nous indiquons au client que l'article existe déjà dnas son panier pour éviter les doublons
    document.querySelector('.qty').innerHTML = `<span class="qty">Vous avez déjà cette article dans le panier</span>`;
        // si artciel existe déjà nous faisons apparaître un bouton retour panier et les autres boutons disparaîssent
    document.querySelector("#retourpanier").style = 'display:visible';
    document.querySelector("#envoyer").style = 'display:none';
    document.querySelector(".btn_plus").style = 'display:none';
    document.querySelector(".btn_moin").style = 'display:none';
    break;
        }
        // nous vérifions si la sélection n'est pas sur Starter
   else if(document.querySelector("#couleur").value != "starter"){
       // si cela est une couleur alors case entourer de vert et boutons hors retour panier reste visible.
    document.querySelector("#couleur").style.borderColor = "green";
    document.querySelector('.qty').innerHTML = `<span class="qty">${0}</span>`;
    document.querySelector("#retourpanier").style = 'display:none';
    document.querySelector("#envoyer").style = 'display:visible';
    document.querySelector(".btn_plus").style = 'display:visible';
    document.querySelector(".btn_moin").style = 'display:visible';
        }
    else{
            document.querySelector("#couleur").style.borderColor = "red"; 
            document.querySelector('.qty').innerHTML = `<span class="qty">${0}</span>`;
        }
    }
}
    // sinon si article aucun article
    else{   
        // si couleur sélectionner bord du selecteur vert
        if(document.querySelector("#couleur").value != "starter")
            {
            document.querySelector("#couleur").style.borderColor = "green"
        }
        //sinon couleur bordure rouge
        else{
            document.querySelector("#couleur").style.borderColor = "red"; 
            document.querySelector('.qty').innerHTML = `<span class="qty">${0}</span>`;
        }
        
    };
}

//On lance la fonction quantite qui indique la quantité de produit dans le panier
quantite();