/*  https://greensock.com/docs/Easing/Bounce
    easing graph
*/

window.addEventListener("DOMContentLoaded", function(event) {
    const menu = document.querySelector('#mobile-sub-menu');
    let isOpen = false;
    
    document.querySelector("#mobile-menu-button").onclick = () => {
        isOpen = !isOpen;
        if (!isOpen) {
            TweenMax.to(menu,  0.6, {left:"-50%",  ease:Power4.easeIn});
        } else {
            TweenMax.to(menu,  0.4,  {left:0, ease:Power2.easeOut});
        }
    }
 
    document.querySelector("#mobile-info-button").addEventListener('click', () => {
        document.querySelector("#mobile-info-menu").classList.toggle("hidden");
    });
 
});
 