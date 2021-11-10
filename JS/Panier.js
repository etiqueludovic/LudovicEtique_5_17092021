// récupération du localStorage
let produits = JSON.parse(localStorage.getItem("produits"));
let totalorder = JSON.parse(localStorage.getItem("totalorder"));

var tot = 0;
var pricetot = 0;
// Fonction qui récupére les données du local storage et les inséres par ligne d'article selon l'array Produits
function affichage(){
    //si produits n'existe pas alors message d'erreur
if(produits == null){
    const paniervide = "Le panier est vide, veuillez ajouter des articles";
    document.querySelector("thead").innerHTML = "Le panier est vide, veuillez ajouter des articles";
    //console.log(paniervide);
}else{
    // sinon on déclenche récupére les informations de Produits pour les ajouter dnas un tableau
    for(i = 0;i < produits.length; i++){
        document.querySelector("#conteneur-table").innerHTML += `<tr id="${produits[i]._id+[i]}">
                   <td class="nom">${produits[i].name}</td>
                   <td class="col">${produits[i].colors}</td>
                   <td><button class="btn_moin">-</button><span class="qty${[i]}">${produits[i].qty}</span><button class="btn_plus">+</button></td>
                   <td class="price">${produits[i].price} €</td>
                   <td class="pricetotal${[i]}">${produits[i].pricetotal} €</td>
                   <td class="delete"><button class="btn-suppr" value=""><i class="fa fa-trash" aria-hidden="true"></i>
                   </button></td>
               </tr>`;
               tot += produits[i].pricetotal;
               var totalHT = (tot-(tot*(20/100)));
               var tva = (tot-totalHT);
               document.querySelector('#total').textContent = "Total HT :  " + totalHT.toFixed(2) + " €";
               document.querySelector('#tva').textContent = "Total TVA :  " + tva.toFixed(2) + " €";
               document.querySelector('#TTC').textContent = "Total TTC :  " + tot.toFixed(2) + " €";
               const totalTTC = {totalTTC : tot};
               localStorage.setItem("totalorder", JSON.stringify(totalTTC));
        };
    };
};
// on déclenche la fonction affichage
affichage();
// Fonction qui supprime la ligne d'article quand on clique sur la poubelle
function del(){
    // récupération du bouton déclencheur
    let btn_suppr = document.querySelectorAll(".btn-suppr");

    for (let l = 0; l < btn_suppr.length; l++){
        // boucle qui récupére le bouton cliqué
        btn_suppr[l].addEventListener("click", (event) =>{
            event.preventDefault();
            
            let selection_id_suppr = produits[l]._id+produits[l].colors+[l];
            console.log(selection_id_suppr);
        // filtre les articles selon un ID unique
            produits = produits.filter((el) => el._id+el.colors+[l] !== selection_id_suppr);   
            console.log(produits);
            // supprime les données du localStorage de la ligne cliqué
            localStorage.setItem("produits", JSON.stringify(produits));
            // rafraichissement de la page pour faire disparaître la ligne en question
            window.location.href = "panier.html";

        });
        
    };
};
// on déclenche la fonction del
del();

// récupération du bouton plus
let btn_plus = document.querySelectorAll(".btn_plus");
// Fonction qui incrémente la quantité d'article tout en recalculant les champs lié à cette quantité
function plus(){
    for (let k = 0; k < btn_plus.length; k++){
        //événement su bouton plus de la ligne
        btn_plus[k].addEventListener("click", (event) =>{
            event.preventDefault();
            let selection_id_plus = produits[k]._id+produits[k].colors+[k];
            console.log(selection_id_plus);
            // filtre les articles selon un ID unique
            prod = produits.filter((el) => el._id+el.colors+[k] == selection_id_plus);
            console.log(produits);
            // nous donnons une valeur par defaut à qtyvalue et on lui ajoute +1
            var qtyvalue = (produits[k].qty++)+1;
            // à chaque clique les champs de quantité et de prix totals sont modifiés 
            document.querySelector(`.qty${[k]}`).innerHTML = `<span class="qty${[k]}">${qtyvalue}</span>`;
            document.querySelector(`.pricetotal${[k]}`).innerHTML = `<td class="pricetotal${[k]}">${qtyvalue*produits[k].price} €</td>`;
            // ici le total des prix
            tot += produits[k].price;
            var totalHT = (tot-(tot*(20/100)));
            var tva = (tot-totalHT);
            document.querySelector('#total').textContent = "Total HT :  " + totalHT.toFixed(2) + " €";
            document.querySelector('#tva').textContent = "Total TVA :  " + tva.toFixed(2) + " €"; 
            document.querySelector('#TTC').textContent = "Total TTC :  " + tot.toFixed(2) + " €";
            document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${qtyvalue}</span>`;

            produits.qty = qtyvalue; //Modifie la valeur
            produits[k].pricetotal = produits[k].price*qtyvalue;//Modifie la valeur
            localStorage["produits"] = JSON.stringify(produits);// envois la valeur au champ modifié

            totalorder.totalTTC = tot;//Modifie la valeur
            localStorage["totalorder"] = JSON.stringify(totalorder);// envois la valeur au champ modifié
        });        
    };
};
// on déclenche la fonciton plus
plus();
let btn_moin = document.querySelectorAll(".btn_moin");
// Fonction qui décrémente la quantité d'article tout en recalculant les champs lié à cette quantité
function moin(){
    for (let k = 0; k < btn_moin.length; k++){
        btn_moin[k].addEventListener("click", (event) =>{
            event.preventDefault();
            let selection_id_moin = produits[k]._id+produits[k].colors+[k];
            console.log(selection_id_moin);

            prod = produits.filter((el) => el._id+el.colors+[k] == selection_id_moin);
            console.log(produits);

            var qtyvalue = (produits[k].qty--)-1;
            if (produits[k].qty > 0){
            document.querySelector(`.qty${[k]}`).innerHTML = `<span class="qty${[k]}">${qtyvalue}</span>`;
            document.querySelector(`.pricetotal${[k]}`).innerHTML = `<td class="pricetotal${[k]}">${produits[k].qty*produits[k].price} €</td>`;
            tot -= produits[k].price;
            pricetot -= produits[k].pricetotal;
            console.log(tot)
            var totalHT = (tot-(tot*(20/100)));
            var tva = (tot-totalHT);
             
            document.querySelector('#total').textContent = "Total HT :  " + totalHT.toFixed(2) + " €";
            document.querySelector('#tva').textContent = "Total TVA :  " + tva.toFixed(2) + " €"; 
            document.querySelector('#TTC').textContent = "Total TTC :  " + tot.toFixed(2) + " €";
            document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${qtyvalue}</span>`;

            produits.qty = qtyvalue; //Modifie la valeur
            produits[k].pricetotal = produits[k].price*qtyvalue;//Modifie la valeur
            localStorage["produits"] = JSON.stringify(produits);

            totalorder.totalTTC = tot;//Modifie la valeur
            localStorage["totalorder"] = JSON.stringify(totalorder);

             console.log(localStorage["produits"], localStorage["totalorder"]);
            }else{
                produits = produits.filter((el) => el._id+el.colors+[k] !== selection_id_moin);   
                //console.log(produits);
                localStorage.setItem("produits", JSON.stringify(produits));
                window.location.href = "panier.html";
            }
        });  
    };
};
moin();

// Fonction qui vérifie le formulaire et si totu est ok l'envoi au Back-end pour récupérer un numéro de confirmation
function valider(e){
        // valeur par defaut des champs suivant
        var lastName = coordonnées.elements["e-lastname"];
        var firstName = coordonnées.elements["e-firstname"];
        var adress = coordonnées.elements["e-adress"];
        var city = coordonnées.elements["e-city"];
        var email = coordonnées.elements["e-email"];
        // expression régulière doit contenir un @ et un . après le @ sinon bord rouge
        var regex = /^[a-z0-9]+([_|\.|-][a-z0-9]+)*@[a-z0-9]+([_|\.|-][a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;
        // le formulaire est-il OK?
        var form_OK = true;
        // si formulaire vide ou champ incorrectement rempli alors bord rouge
        if (lastName.value == "") {
            form_OK = false;
            lastName.style.border = 'solid 3px red';
        }else{lastName.style.border = 'solid 3px green';}
        if (firstName.value == "") {
            form_OK = false;
            firstName.style.border = 'solid 3px red';
        }else{firstName.style.border = 'solid 3px green';}
        if (adress.value == "") {
            form_OK = false;
            adress.style.border = 'solid 3px red';
        }else{adress.style.border = 'solid 3px green';}
        if (city.value == "") {
            form_OK = false;
            city.style.border = 'solid 3px red';
        }else{city.style.border = 'solid 3px green';}
        if (regex.exec(email.value) == null) {
            form_OK = false;
            email.style.border= 'solid 3px red';
        }else{email.style.border = 'solid 3px green';}
        // Au final, on empeche l'envoi du formulaire si form_OK est faux    
        if(!form_OK){
            e.preventDefault();      
        } 
        // si pas de contenu alors message d'erreur
        if(lastName.value == "" || firstName.value == "" || form_OK == false || adress.value == "" || city.value == ""){
            form_OK = false;
            document.querySelector("#erreur").textContent = "Champ saisie incorrect";
         // Sinon si tout est bien rempli alors on envoi le formulaire   
        }else{
            e.preventDefault();
            // construction du formulaire en json
            const contact = {
                firstName : firstName.value,
                lastName : lastName.value,
                address : adress.value,
                city : city.value,
                email : email.value,
            };

            products = Array();
            for (let k = 0; k < produits.length; k++){ 
                pro = produits[k]._id;
                products.push(pro).toString;
                    
            };
                const aSubmit= {
                    contact,
                    products,  
                  }
                 // console.log("aSubmit");
                 // console.log(aSubmit);
            // création de contact et products dans le localstorage
          localStorage.setItem("contact", JSON.stringify(contact));
          localStorage.setItem("products", JSON.stringify(products));

        
         const EnvoiPost = fetch('http://localhost:3000/api/teddies/order', {
                method: "POST",
                body: JSON.stringify(aSubmit),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            EnvoiPost.then(async (response) =>{
                try{
                   console.log(response)
                    const contenu = await response.json()
                   console.log(contenu)
                    localStorage.setItem("contenu", JSON.stringify(contenu));
                    document.location.href = "Confirmation.html";
                }
                catch (e){
                    console.log(e)
                }
            });              
        
}};

var coordonnées = document.getElementById("coordonnées");
coordonnées.addEventListener('submit', valider);

var totqty = 0;
// Fonction qui récupére la totalité de quantité dans le panier et ce modifie en direct quand on modifie la quantité dans le panier
function quantite(){
    if (produits == "" || produits == undefined){
        document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
    }
    else{
    for(k = 0;k < produits.length; k++){
    totqty += produits[k].qty;
    document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${totqty}</span>`;
   // console.log("ici mon total qty")
   // console.log(totqty)
   btn_plus[k].addEventListener("click", (event) =>{ 
    document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${(totqty++)+1}</span>`;
   });
   btn_moin[k].addEventListener("click", (event) =>{ 
    document.querySelector(".fa-shopping-cart").innerHTML = `<span id="qty">${(totqty--)-1}</span>`;
   });
        };
    };
};
quantite();