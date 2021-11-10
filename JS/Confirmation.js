// récupération des informations contenu dans le localstorage
let contenu = JSON.parse(localStorage.getItem("contenu"));
let total = JSON.parse(localStorage.getItem("totalorder"));
// affichage du contenu voulu dans les champs total et numéro de commande
  document.querySelector("#totalcmd").textContent += total.totalTTC+"€";
  document.querySelector("#OrderId").textContent += contenu.orderId;
  // en arrivant sur la page supprime tout le localstorage
  localStorage.clear();
 // bouton servant à revenir à la page d'accueil
  document.querySelector('#Confirmer').addEventListener('click', function(){
    window.location.href = "index.html";
});