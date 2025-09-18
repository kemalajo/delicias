// js/main.js
// funções gerais: colocar anos no footer etc.

document.addEventListener('DOMContentLoaded', function(){
  const ano = new Date().getFullYear();
  ['ano','ano2','ano3','ano4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = ano;
  });

  // Inicializa produtos padrão se não houver
  initDefaultProducts();
});

function initDefaultProducts(){
  if(!localStorage.getItem('k_products')){
    const sample = [
      {
        id: 'cookie-1',
        name: 'Cookies Triplo',
        desc: 'Massa macia recheada com creme e geleia, sabores variados.',
        price: 18.00,
        img: 'img/cookie-stack.png',
        tags: ['chocolate','pistache','morango']
      },
      {
        id: 'sonho-1',
        name: 'Sonho de Morango',
        desc: 'Sonho recheado com geleia de morango artesanal.',
        price: 18.00,
        img: 'img/sonho.png',
        tags: ['morango','doce']
      },
      {
        id: 'croissant-1',
        name: 'Croissant Recheado',
        desc: 'Folhado amanteigado com recheio de avelã, pistache ou frutas vermelhas.',
        price: 25.00,
        img: 'img/croissant.png',
        tags: ['avelã','pistache']
      }
    ];
    localStorage.setItem('k_products', JSON.stringify(sample));
  }
}
