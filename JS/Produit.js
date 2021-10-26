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
let recordproductid = "";
let recordcolor = "";
let recordQty = "";

function filtre(){
    for(p = 0;p < produits.length; p++){
        let selection_id = _id+produits[p].colors;
        console.log("ici l'article en question : "+ selection_id);

        prod = produits.filter((el) => el._id+el.colors == selection_id);
        console.table(prod)
}
}

// si produits existe dans le localstorage alors on récupére ces informations
function record(){
if(produits){
    
    for(p = 0;p < produits.length; p++){
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
    recordproductid = "";
    recordcolor = "";
    recordQty =  0;  
};
};
record();
// récupération de la valeur du champ quantité
// si le tableau produits existe alors renvois la valeur    
function qtyfield(){
    if (produits){
    for(p = 0;p < produits.length; p++){
        let selection_id = _id;
        let colorsrecord = produits[p].colors;
    if (produits && _id && colorsrecord == document.querySelector("#couleur").value){   
        console.log("youpi il y a des articles dans le panier : " + recordproductid +" : "+ _id)
        console.log(colorsrecord+" : "+document.querySelector("#couleur").value)
        return recordQty;
// sinon si pas de produits avec cette ID alors renvois 0
        }else{
            recordQty = 0;
            return recordQty;
            }
    }
    }else{
        console.log("Oups pas de produit dans la panier : "+recordQty)
        recordQty = 0;
        return recordQty;
        }
        
}

qtyfield();     

let qtyvalue = qtyfield();
console.log("ici le qtyvalue : "+qtyvalue)
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


//----------récupération des valeurs de la commande------------//


var recordprice = 0;

// Fonction du bouton envoyé
function envoyer(){
    fetch(urllocal)
        .then((response) => response.json())
        .then((jsondata) => {
        let donnee = new Article(jsondata);
        const price = `${(donnee.price/100).toFixed(2)}`;
        const col = document.querySelector("#couleur").value;
        const qty = qtyvalue;
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

function plus(){ 
    // si le bouton plus est cliqué on déclenche la fonction
    if (produits){
    for(p = 0;p < produits.length; p++){
        let colorsrecord = produits[p].colors;
        let qtyrecord = produits[p].qty;
        let price = produits[p].price;
                if (produits && _id && colorsrecord == document.querySelector("#couleur").value){
                        document.querySelector(`.qty`).textContent = (qtyrecord++)+1; 
                        produits[p].qty = qtyrecord++; //Modifie la valeur
                        produits[p].pricetotal = price*qtyrecord++;
                        localStorage["produits"] = JSON.stringify(produits)
                    }
                    
                    
                else{
                        document.querySelector(`.qty`).textContent = (qtyvalue++)+1;
                        break
                    }   }
                }
            else{
                console.log("plus appuyé : "+qtyvalue)
                document.querySelector(`.qty`).textContent = (qtyvalue++);
            
    };
};
           
function moin(){ 
    // si le bouton plus est cliqué on déclenche la fonction
    if (produits){
    for(p = 0;p < produits.length; p++){
        let colorsrecord = produits[p].colors;
        let qtyrecord = produits[p].qty;
        price = produits[p].price;
                if (produits && _id && colorsrecord == document.querySelector("#couleur").value){
                    document.querySelector(`.qty`).textContent = (qtyrecord--)-1; 
                        produits[p].qty = qtyrecord--; //Modifie la valeur
                        produits[p].pricetotal = price*qtyrecord--;
                        localStorage["produits"] = JSON.stringify(produits);
                }else{
                    document.querySelector(`.qty`).textContent = (qtyrecord--)-1;
                    break
                }
            }
        }   
            else if (qtyrecord > 0){
                document.querySelector(`.qty`).textContent = (qtyrecord--)-1;
            }else if (qtyrecord <= 0){
                document.querySelector(`.qty`).textContent = 0;
                alert("Attention quantité négative interdite")
            }
            
    };

function couleur(){
    if (produits){
    for(p = 0;p < produits.length; p++){
        let selection_id = _id;
        let idrecord = produits[p]._id;
        let colorsrecord = produits[p].colors;
        let qtyrecord = produits[p].qty;
   if (document.querySelector("#couleur").value != "starter" && _id == idrecord && colorsrecord == document.querySelector("#couleur").value){
    document.querySelector("#couleur").style.borderColor = "green"; 
    document.querySelector('.qty').innerHTML = `<span class="qty">${qtyrecord}</span>`;
    console.log("meme couleur, meme ID : " + selection_id + ", "+colorsrecord)
    break;
        }
   else if(document.querySelector("#couleur").value != "starter"){
    document.querySelector("#couleur").style.borderColor = "green";
    document.querySelector('.qty').innerHTML = `<span class="qty">${qtyvalue}</span>`;
    console.log("différent de starter : " + selection_id + ", "+colorsrecord)
        }
    }}
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
