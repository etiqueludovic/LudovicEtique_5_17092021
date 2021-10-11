let contenu = JSON.parse(localStorage.getItem("contenu"));
let total = JSON.parse(localStorage.getItem("totalorder"));

  document.querySelector("#totalcmd").textContent += total.totalTTC+"€";
  document.querySelector("#OrderId").textContent += contenu.orderId;
 
 
  document.addEventListener('click', function(){
  document.querySelector('#Confirmer').onclick=finish;
});

  function finish(){
      localStorage.clear();
      window.location.href = "index.html";
};