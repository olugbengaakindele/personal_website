const tamt = document.querySelector("#tamt");
const samt = document.querySelector("#samt");
const intr = document.querySelector("#intr");
const sfreq = document.querySelector("#sfreq");
const bstgt = document.querySelector("#bstgt");
const res = document.querySelector("#result");
const res_tb = document.querySelector('#table_body');
const secbd = document.querySelector('#sec_body');



//////////////////Hide the table once page laods //////////////////////////
window.onload = function() {    
    secbd.classList.add("");
}
bstgt.addEventListener("click" , savings)