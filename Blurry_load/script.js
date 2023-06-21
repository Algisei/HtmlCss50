const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0
let x;
let intervl = setInterval(blurring, 30)

function blurring(){
    load++
if(load > 99){
    clearInterval(intervl)
}
loadText.innerText = `${load}%`
loadText.style.opacity = 1-load/100;  
x = Math.round(30 * (1 - load / 100));
bg.style.filter = `blur(${x}px)`;

}