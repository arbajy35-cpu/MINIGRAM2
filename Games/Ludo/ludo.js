document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("click",()=>{

alert(card.innerText);

});

});

document.querySelector(".tournament")
.addEventListener("click",()=>{

alert("Tournament Opened");

});