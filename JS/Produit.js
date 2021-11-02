// Création d'une nouvelle class
class Article{
    constructor(jsondonnee){
        jsondonnee && Object.assign(this, jsondonnee)
    }   
}

// récupération de de l'id du produit 
let params = new URL(document.location).searchParams;
let _id = params.get("id");
// récupération du tableau json Produits
let produits = JSON.parse(localStorage.getItem("produits"));
//récupération du tableau json totalorder
let totalorder = JSON.parse(localStorage.getItem("totalorder"));
// contruct de l'urllocal contenant l'ID du produits sélectionné
const urllocal = `http://localhost:3000/api/teddies/${_id}`;

console.log("ici l'url local : "+urllocal)
// donne une valeur par defaut
let recordproductid = "";
let recordcolor = "";
let recordQty = 0;
let qtyvalue = 0;


function record(){
    // si produits existe dans le localstorage alors on récupére ces informations
if(produits){
    
    for(p = 0;p < produits.length; p++){
        // récupération de l'id et de la couleur pour avoir un ID unique
        let selection_id = _id+produits[p].colors;
        let colorsrecord = produits[p].colors;
        console.log("ici l'article en question : "+ selection_id);

        prod = produits.filter((el) => el._id+el.colors == selection_id);
        recordproductid = produits[p]._id;
        recordcolor = produits[p].colors;
        recordQty = produits[p].qty;

        console.log("ici le produit filtré"+recordproductid+" : "+recordcolor+" : "+recordQty);
    }
}else{
    // si produits n'existe pas alors valeur par defaut vide
    recordproductid = "";
    recordcolor = "";
    recordQty =  0;  
};
};
record();

// récupération des données du produit
function recup(){
fetch(urllocal)
    .then((response) => response.json())
    .then((jsondata) => {
       // console.table(jsondata);
                let donnee = new Article(jsondata);
                // passage de centime à euro
                const price = `${(donnee.price/100).toFixed(2)}`;
                // modification des données suivant les élément sélectionné
                document.querySelector("#container").innerHTML += `<img src="${donnee.imageUrl}"/>`;
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

// valeur par defaut de recordprice
var recordprice = 0;

// Fonction du bouton envoyer
function envoyer(){
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
       console.log("ici ma quantite quand je clique sur envoyé : " + qty)
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
            if (recordproductid == donnee._id && recordcolor == col && qty > 0 && col != "starter"){
            alert("vous avez déjà cette article dans le panier")
           alert('1')
            }
            else if(recordproductid != donnee._id && recordcolor != col && qty > 0 && col != "starter"|| recordcolor != col && qty > 0 && col != "starter"){
               alert('2')
            ajoutProduit();
            }
            else if(col == "starter"){
                document.querySelector("#couleur").style.borderColor = 'red';
            }
            else if(qty <= 0)
            {          
            alert("1 - Veuillez ajouter une quantité supérieur à 0");
            }
            }
            else{
            if (qty <= 0 || qty == ""){          
            alert("2 - Veuillez ajouter une quantité supérieur à 0");
            }
            else if (qty > 0 && col != "starter"){
                alert('3')
                recordstorage = [];
                ajoutProduit();
            }}
    
        })
};

// variable avec comme valeur par defaut 0
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
    totqty += Number(produits[k].qty);
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    
}};
console.log(totqty)
};
// on lance la fonction quantite
quantite();

// si le bouton plus est cliqué on déclenche la fonction
function plus(){
    // on ajoute la quantité à chaque clique et on commence par +1 au premier clique au lieu de 0
        var qtydefaut = qtyvalue++; 
        document.querySelector(`.qty`).textContent = (qtydefaut++)+1;      
    };
           
function moin(){ 
    // on ajoute la quantité à chaque clique et on commence par -1 au premier clique au lieu de 0
        var qtydefaut = qtyvalue--;
        document.querySelector(`.qty`).textContent = (qtydefaut--)-1;          
    };

function couleur(){
    if (produits){
    for(p = 0;p < produits.length; p++){
        let selection_id = _id;
        let idrecord = produits[p]._id;
        let colorsrecord = produits[p].colors;
   if (document.querySelector("#couleur").value != "starter" && _id == idrecord && colorsrecord == document.querySelector("#couleur").value){
    document.querySelector("#couleur").style.borderColor = "green"; 
    document.querySelector('.qty').innerHTML = `<span class="qty">Vous avez déjà cette article dans le panier</span>`;
    document.querySelector("#retourpanier").style = 'display:visible';
    document.querySelector("#envoyer").style = 'display:none';
    document.querySelector(".btn_plus").style = 'display:none';
    document.querySelector(".btn_moin").style = 'display:none';
    console.log("meme couleur, meme ID : " + selection_id + ", "+colorsrecord)
    break;
        }
   else if(document.querySelector("#couleur").value != "starter"){
    document.querySelector("#couleur").style.borderColor = "green";
    document.querySelector('.qty').innerHTML = `<span class="qty">${qtyvalue}</span>`;
    document.querySelector("#retourpanier").style = 'display:none';
    document.querySelector("#envoyer").style = 'display:visible';
    document.querySelector(".btn_plus").style = 'display:visible';
    document.querySelector(".btn_moin").style = 'display:visible';
    console.log("différent de starter : " + selection_id + ", "+colorsrecord)

        }
    }
}
    else{
           { if(document.querySelector("#couleur").value != "starter")
            {
            document.querySelector("#couleur").style.borderColor = "green"
            }
            
        else{
            document.querySelector("#couleur").style.borderColor = "red"; 
            document.querySelector('.qty').innerHTML = `<span class="qty">${0}</span>`;
        }
    }
};
}
