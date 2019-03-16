/*  https://greensock.com/docs/Easing/Bounce
    easing graph
*/

// window.addEventListener("DOMContentLoaded", function(event) {
//     const menu = document.querySelector('#mobile-sub-menu');
//     let isOpen = false;
    
//     document.querySelector("#mobile-menu-button").onclick = () => {
//         isOpen = !isOpen;
//         if (!isOpen) {
//             TweenMax.to(menu,  0.6, {top:"-25rem",  ease:Power4.easeIn});
//         } else {
//             TweenMax.to(menu,  0.4,  {top:'3.5rem', ease:Power2.easeOut});
//         }
//     } 
// });
 
'use strict';
 
 
window.addEventListener("load", function(event) {
   let menuOpen=false;
   const mobileMenuButton = document.querySelector('#mobile-menu-button');
   const menuLinks = document.querySelectorAll('.mobile-link');
   const menuPanel = document.querySelector('#menu-panel');
 
 Array.from(menuLinks).forEach((item)=>{
   item.addEventListener('click', function( ){
    menuPanel.removeEventListener("mouseleave", onLeavePanel)
    closeMobileMenu();
   })
 })
 
 
 mobileMenuButton.onclick = (e)=>{
  menuOpen?closeMobileMenu():openMobileMenu();
  
}
function onLeavePanel(){
  closeMobileMenu()
}
const openMobileMenu=(e)=>{
  menuPanel.addEventListener("mouseleave", onLeavePanel)
   TweenLite.to(menuPanel, 0.4, {top:40, ease: Power1.easeOut});
   menuOpen = true;
}
 
const closeMobileMenu=(e)=>{
  menuPanel.removeEventListener("mouseleave", onLeavePanel)
  TweenLite.to(menuPanel, 0.4, 
    {
      top:-menuPanel.clientHeight,
      ease: Power1.easeOut,
    }
)
  menuOpen =false;
}
});
 