// récupération des informations contenu dans le localstorage
let contenu = JSON.parse(localStorage.getItem("contenu"));
let total = JSON.parse(localStorage.getItem("totalorder"));
// affichage du contenu voulu dans les champs adéquate
  document.querySelector("#totalcmd").textContent += total.totalTTC+"€";
  document.querySelector("#OrderId").textContent += contenu.orderId;
  localStorage.clear();
 // bouton servant à supprimer tout le localstorage
  document.querySelector('#Confirmer').addEventListener('click', function(){
    window.location.href = "index.html";
});