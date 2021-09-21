class Article{
    constructor(jsondonnee){
        jsondonnee && Object.assign(this, jsondonnee)
    }   
}

let params = new URL(document.location).searchParams;
let id = params.get("id");

let url2 = `http://localhost:3000/api/teddies/${id}`;

fetch(url2)
    .then((response) => response.json())
    .then((jsondata) => {
            console.log(jsondata);
            for(let jsondonnee of jsondata){
                let donnee = new Article(jsondonnee);
                const price = `${(produit.price/100).toFixed(2)}`;
                document.querySelector("#image").innerHTML += `<img src="${donnee.imageUrl}"/>`;
                document.querySelector("#name").textContent += `${donnee.name}`;
                document.querySelector("#price").textContent +=  `${price}`;}
    });