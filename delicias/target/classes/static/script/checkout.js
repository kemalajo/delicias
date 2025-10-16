// js/checkout.js
// controla catálogo, seleção de produtos, carrinho e checkout via WhatsApp

const PHONE_WHATSAPP = "55NUMERODACLIENTE"; 
// ATENÇÃO: substitua por exemplo 5511999999999 (55 + ddd + número), sem + ou espaços.

document.addEventListener('DOMContentLoaded', () => {
  loadProductsToPage();
  loadCartFromStorage();
  document.getElementById('clear-cart')?.addEventListener('click', clearCart);
  document.getElementById('checkout-btn')?.addEventListener('click', checkout);
});

function getProducts(){
  const raw = localStorage.getItem('k_products');
  return raw ? JSON.parse(raw) : [];
}

function loadProductsToPage(){
  const grid = document.getElementById('products-grid');
  if(!grid) return;
  grid.innerHTML = '';
  const prods = getProducts();
  prods.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="product-meta">
          <div style="font-weight:700">R$ ${formatMoney(p.price)}</div>
        </div>
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
          <input class="qty-input" type="number" min="1" value="1" data-id="${p.id}">
          <button class="add-toggle" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // adiciona listeners
  document.querySelectorAll('.add-toggle').forEach(btn=>{
    btn.addEventListener('click', function(){
      const id = this.dataset.id;
      const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(id, qty);
    });
  });
}

function formatMoney(num){
  return num.toFixed(2).replace('.',',');
}

/* CART (em localStorage) */
function getCart(){
  const raw = localStorage.getItem('k_cart');
  return raw ? JSON.parse(raw) : {};
}

function saveCart(cart){
  localStorage.setItem('k_cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(id, qty){
  const prods = getProducts();
  const p = prods.find(x=>x.id===id);
  if(!p){ alert('Produto não encontrado'); return; }
  const cart = getCart();
  if(cart[id]) cart[id].qty += qty;
  else cart[id] = { id: p.id, name: p.name, price: p.price, qty: qty };
  saveCart(cart);
  alert(`${qty} x ${p.name} adicionado ao pedido.`);
}

function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function clearCart(){
  localStorage.removeItem('k_cart');
  renderCart();
}

function renderCart(){
  const itemsWrap = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  const cart = getCart();
  if(!itemsWrap) return;
  const keys = Object.keys(cart);
  if(keys.length === 0){
    itemsWrap.innerHTML = 'Nenhum produto selecionado.';
    if(subtotalEl) subtotalEl.textContent = 'R$ 0,00';
    return;
  }
  itemsWrap.innerHTML = '';
  let subtotal = 0;
  keys.forEach(k=>{
    const it = cart[k];
    subtotal += it.price * it.qty;
    const div = document.createElement('div');
    div.style.marginBottom = '8px';
    div.innerHTML = `<strong>${it.qty}x</strong> ${it.name} — R$ ${formatMoney(it.price * it.qty)}
      <button data-id="${it.id}" class="btn btn-outline small-remove" style="margin-left:8px">Remover</button>`;
    itemsWrap.appendChild(div);
  });
  if(subtotalEl) subtotalEl.textContent = `R$ ${formatMoney(subtotal)}`;
  // attach remove listeners
  document.querySelectorAll('.small-remove').forEach(b=>{
    b.addEventListener('click', ()=> removeFromCart(b.dataset.id));
  });
}

function loadCartFromStorage(){
  renderCart();
}

/* Checkout via WhatsApp */
function checkout(){
  const cart = getCart();
  const keys = Object.keys(cart);
  if(keys.length === 0){ alert('Selecione pelo menos 1 produto.'); return; }
  if(!PHONE_WHATSAPP || PHONE_WHATSAPP.includes('NUMERODACLIENTE')){
    alert('Configure o número de WhatsApp da empreendedora em js/checkout.js (variável PHONE_WHATSAPP).');
    return;
  }
  let msg = `Olá! Gostaria de fazer um pedido:%0A`;
  let total = 0;
  keys.forEach(k=>{
    const it = cart[k];
    msg += `- ${it.qty} x ${it.name} (R$ ${formatMoney(it.price)} cada) => R$ ${formatMoney(it.price*it.qty)}%0A`;
    total += it.price * it.qty;
  });
  msg += `%0ASubtotal: R$ ${formatMoney(total)}%0A`;
  msg += `Endereço de retirada/entrega: R. Duque de Caxias, 494 - Mangal, Sorocaba - SP%0A`;
  msg += `Nome do cliente: %0ATelefone do cliente: %0AObservações: `;
  const url = `https://wa.me/${PHONE_WHATSAPP}?text=${msg}`;
  // abre em nova aba
  window.open(url, '_blank');
}
