let contenu = JSON.parse(localStorage.getItem("contenu"));
let total = JSON.parse(localStorage.getItem("totalorder"));

  document.querySelector("#totalcmd").textContent += total.totalTTC+"€";
  document.querySelector("#OrderId").textContent += contenu.orderId;
