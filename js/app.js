

let menu=document.querySelector('#menu');
let sidebar=document.querySelector('#sidebar');
let close = document.querySelector('#close');
close.addEventListener('click',function() {
 sidebar.classList.remove('menu-active');
})
menu.addEventListener('click',function() {
    sidebar.classList.toggle('menu-active');
})
