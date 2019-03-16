/*  https://greensock.com/docs/Easing/Bounce
    easing graph
*/

window.addEventListener("DOMContentLoaded", function(event) {
    const menu = document.querySelector('#mobile-sub-menu');
    let isOpen = false;
    
    document.querySelector("#mobile-menu-button").onclick = () => {
        isOpen = !isOpen;
        if (!isOpen) {
            TweenMax.to(menu,  0.6, {top:"-25rem",  ease:Power4.easeIn});
        } else {
            TweenMax.to(menu,  0.4,  {top:'3.5rem', ease:Power2.easeOut});
        }
    } 
});
 