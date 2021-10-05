// récupération du localStorage
let produits = JSON.parse(localStorage.getItem("products"));
let id = JSON.parse(localStorage.getItem("id"));
console.log(id);



var tot = 0;

function affichage(){
if(produits == null){
    const paniervide = "Le panier est vide, veuillez ajouter des articles";
    document.querySelector("thead").innerHTML = "Le panier est vide, veuillez ajouter des articles";
    //console.log(paniervide);
}else{
    for(i = 0;i < produits.length; i++){
        document.querySelector("#conteneur-table").innerHTML += `<tr id="${produits[i]._id+[i]}">
                   <td class="nom">${produits[i].name}</td>
                   <td class="col">${produits[i].colors}</td>
                   <td class="qty${[i]}">${produits[i].qty}</td>
                   <td class="price">${produits[i].price} €</td>
                   <td class="pricetotal">${produits[i].pricetotal} €</td>
                   <td class="delete"><button class="btn-suppr">Supprimer</button></td>
               </tr>`;
               tot += produits[i].pricetotal;
               var totalHT = (tot-(tot*(20/100)));
               var tva = (tot-totalHT);
               document.querySelector('#total').textContent = "Total HT :  " + totalHT.toFixed(2) + " €";
               document.querySelector('#tva').textContent = "Total TVA :  " + tva.toFixed(2) + " €";
               document.querySelector('#TTC').textContent = "Total TTC :  " + tot.toFixed(2) + " €";
};

};
};

affichage();
var coordonnées = document.getElementById("coordonnées");
var lastName = coordonnées.elements["lastname"];
var firstName = coordonnées.elements["firstname"];
var adress = coordonnées.elements["adress"];
var city = coordonnées.elements["city"];
var email = coordonnées.elements["email"];

const contact = {
    firstName : firstName.value,
    lastName : lastName.value,
    address : adress.value,
    city : city.value,
    email : email.value,
};
            
            let products = id;

            const aSubmit= {
            contact,
            products,  
          };
        console.log("aSubmit");
        console.table(aSubmit)

function del(){
    let btn_suppr = document.querySelectorAll(".btn-suppr");

    for (let l = 0; l < btn_suppr.length; l++){
        btn_suppr[l].addEventListener("click", (event) =>{
            event.preventDefault();

            let selection_id_suppr = produits[l]._id+produits[l].colors+[l];
            console.log(selection_id_suppr);

            produits = produits.filter((el) => el._id+el.colors+[l] !== selection_id_suppr);   
            console.log(produits);

            localStorage.setItem("products", JSON.stringify(produits));
            alert("supression ok");
            window.location.href = "panier.html";
        });
        
    };
};

del();



var coordonnées = document.getElementById("coordonnées");

function valider(e){
    for ( l = 0; l < produits.length; l++){
        coordonnées.addEventListener('submit', valider);

        var lastName = coordonnées.elements["lastname"];
        var firstName = coordonnées.elements["firstname"];
        var adress = coordonnées.elements["adress"];
        var city = coordonnées.elements["city"];
        var email = coordonnées.elements["email"];
        var e = true;
        // le formulaire est-il OK?
        var form_OK = true;

        var regex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;
        if (regex.exec(email.value) == null) {
            form_OK = false;  
        }
        // Au final, on empeche l'envoi du formulaire si form_OK est faux    
        if(!form_OK){
           // e.preventDefault();
            document.querySelector("#e-email").textContent = 'Ce champ doit contenir un @ et un .'; 
        } 

        if(lastName.value == "" || firstName.value == "" || form_OK == false || adress.value == "" || city.value == ""){
            form_OK = false;
         // Sinon en si tout est bien rempli alors on envoi le formulaire   
        }else{
            
            const contact = {
                firstName : firstName.value,
                lastName : lastName.value,
                address : adress.value,
                city : city.value,
                email : email.value,
            };

            
            
            let products = id;

            const aSubmit= {
            products,
            contact,
          };
        console.log("aSubmit");
        console.log(aSubmit)
            
          localStorage.setItem("contact", JSON.stringify(contact));

         const EnvoiPost = fetch('http://localhost:3000/api/teddies/order', {
                method: "POST",
                body: JSON.stringify(aSubmit),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
           
                
        };
}};
valider();





