/* js/script.js */
/* Chave do localStorage */
const STORAGE_KEY = 'doce_sabor_cart_v1';
const WHATSAPP_PHONE = '5511999999999'; // ajuste para seu número

/* Produtos (exemplo) */
const PRODUCTS = [
  { id:1, name:'Bolo de Chocolate Premium', cat:'bolos', price:89.90, img:'images/product1.jpg', desc:'Bolo de chocolate com ganache' },
  { id:2, name:'Bolo Red Velvet', cat:'bolos', price:75.00, img:'images/product2.jpg', desc:'Red velvet com cream cheese' },
  { id:3, name:'Brigadeiros Gourmet (50)', cat:'docinhos', price:65.00, img:'images/product3.jpg', desc:'Mix de sabores' },
  { id:4, name:'Cookies de Aveia (12)', cat:'cookies', price:25.00, img:'images/cookie.jpg', desc:'Cookies crocantes' },
  { id:5, name:'Bolo Cenoura', cat:'bolos', price:45.00, img:'images/product2.jpg', desc:'Bolo de cenoura com cobertura' }
];

/* Depoimentos */
const TESTIMONIALS = [
  { text:'“Os doces mais deliciosos que já provei! Minha família adorou o bolo.”', author:'Maria Silva' },
  { text:'“Atendimento excepcional e produtos de altíssima qualidade. Recomendo!”', author:'João Santos' },
  { text:'“Os brigadeiros gourmet são perfeitos! Sempre encomendo para as festas.”', author:'Ana Costa' }
];

/* formata BRL */
function formatBRL(value){
  return value.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}

/* localStorage helpers */
function loadCart(){ try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }catch(e){return [];} }
function saveCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); updateCartBadges(cart); }

/* atualiza badge do carrinho (em todas páginas que existirem) */
function updateCartBadges(cart){
  const totalItems = cart.reduce((s,i)=> s + i.qty, 0);
  const b = document.getElementById('cart-count-badge');
  const b2 = document.getElementById('cart-count-badge-2');
  if(b) b.innerText = totalItems;
  if(b2) b2.innerText = totalItems;
}

/* adicionar ao carrinho */
function addToCart(productId, qty=1){
  const prod = PRODUCTS.find(p=> p.id === Number(productId));
  if(!prod) return;
  const cart = loadCart();
  const existing = cart.find(i=> i.id === prod.id);
  if(existing) existing.qty += qty;
  else cart.push({ id:prod.id, name:prod.name, price:prod.price, img:prod.img, qty });
  saveCart(cart);
  // feedback
  alert(`${prod.name} adicionado ao carrinho.`);
  renderCartItems(); // atualiza caso esteja no carrinho
}

/* render produtos destacados (home) */
function renderFeatured(){
  const featuredRow = document.getElementById('featuredRow');
  if(!featuredRow) return;
  featuredRow.innerHTML = '';
  const featured = PRODUCTS.slice(0,3);
  featured.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'product-card';
    el.innerHTML = `
      <span class="ribbon">Destaque</span>
      <img src="${p.img}" class="card-img" alt="${p.name}">
      <div class="card-body">
        <div>
          <h4>${p.name}</h4>
          <p class="muted">${p.desc}</p>
        </div>
        <div class="price-row">
          <strong class="price">${formatBRL(p.price)}</strong>
          <button class="icon-cart" data-id="${p.id}">🛒</button>
        </div>
      </div>
    `;
    featuredRow.appendChild(el);
  });
  // eventos
  featuredRow.querySelectorAll('.icon-cart').forEach(btn => {
    btn.addEventListener('click', e => addToCart(e.currentTarget.dataset.id, 1));
  });
}

/* render catálogo / grid de categorias (home) */
function renderCatalog(){
  const catalogGrid = document.getElementById('catalogGrid');
  if(!catalogGrid) return;
  const cats = [
    {title:'Bolos', img:'images/product1.jpg'},
    {title:'Docinhos', img:'images/product3.jpg'},
    {title:'Tortas', img:'images/product2.jpg'},
    {title:'Cookies', img:'images/cookie.jpg'}
  ];
  catalogGrid.innerHTML = '';
  cats.forEach(c=>{
    const el = document.createElement('div');
    el.className = 'cat-card';
    el.innerHTML = `
      <img src="${c.img}" alt="${c.title}">
      <div class="cat-body">
        <h4>${c.title}</h4>
        <p class="muted">Confira nossas opções</p>
      </div>
    `;
    catalogGrid.appendChild(el);
  });
}

/* render testimonials (home) */
function renderTestimonials(){
  const twrap = document.getElementById('testimonials');
  if(!twrap) return;
  twrap.innerHTML = '';
  TESTIMONIALS.forEach((t,i)=>{
    const el = document.createElement('div');
    el.className = 'testi' + (i===0 ? ' active':'');
    el.innerHTML = `<p>${t.text}</p><strong style="display:block;margin-top:8px">${t.author}</strong>`;
    twrap.appendChild(el);
  });
  // simple carousel
  const items = Array.from(twrap.querySelectorAll('.testi'));
  let ix = 0;
  if(items.length > 1){
    setInterval(()=>{
      items[ix].classList.remove('active');
      ix = (ix + 1) % items.length;
      items[ix].classList.add('active');
    }, 4500);
  }
}

/* render produtos na página products */
function renderProductsGrid(filterList = PRODUCTS){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  filterList.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" class="card-img" alt="${p.name}">
      <div class="card-body">
        <div>
          <h4>${p.name}</h4>
          <p class="muted">${p.desc}</p>
        </div>
        <div class="price-row">
          <strong class="price">${formatBRL(p.price)}</strong>
          <button class="icon-cart" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  // attach add events
  document.querySelectorAll('.icon-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      addToCart(e.currentTarget.dataset.id, 1);
    });
  });
  // count
  const count = document.getElementById('count');
  if(count) count.innerText = filterList.length;
}

/* CART: render ites, controlar qty, remover, limpar, resumo */
function renderCartItems(){
  const container = document.getElementById('itemsList');
  if(!container) return;
  const cart = loadCart();
  container.innerHTML = '';
  document.getElementById('items-count').innerText = cart.reduce((s,i)=> s + i.qty, 0) || 0;
  updateCartBadges(cart);

  if(cart.length === 0){
    container.innerHTML = '<p class="muted">Seu carrinho está vazio.</p>';
    updateSummary([]);
    return;
  }

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-info">
        <h4>${item.name}</h4>
        <div class="muted">${item.qty} x ${formatBRL(item.price)}</div>
      </div>
      <div class="item-controls">
        <div class="qty">
          <button class="dec" data-id="${item.id}">−</button>
          <div class="qty-num">${item.qty}</div>
          <button class="inc" data-id="${item.id}">+</button>
        </div>
        <div style="min-width:90px;text-align:right">${formatBRL(item.price * item.qty)}</div>
        <button class="remove-btn" data-id="${item.id}">🗑️</button>
      </div>
    `;
    container.appendChild(el);
  });

  // events
  container.querySelectorAll('.inc').forEach(b => b.addEventListener('click', e => changeQty(Number(e.currentTarget.dataset.id), +1)));
  container.querySelectorAll('.dec').forEach(b => b.addEventListener('click', e => changeQty(Number(e.currentTarget.dataset.id), -1)));
  container.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', e => removeItem(Number(e.currentTarget.dataset.id))));
}

/* change qty */
function changeQty(productId, delta){
  const cart = loadCart();
  const idx = cart.findIndex(i => i.id === productId);
  if(idx === -1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  saveCart(cart);
  renderCartItems();
}

/* remove item */
function removeItem(productId){
  let cart = loadCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCartItems();
}

/* clear cart */
function clearCart(){
  if(!confirm('Deseja limpar todo o carrinho?')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderCartItems();
}

/* totals (com cálculo seguro em centavos) */
function calculateTotals(cart){
  let subtotalCents = 0;
  cart.forEach(it => {
    const pCents = Math.round(it.price * 100);
    subtotalCents += pCents * it.qty;
  });
  const subtotal = subtotalCents / 100;
  const delivery = 0; // grátis por padrão
  const total = subtotal + delivery;
  return { subtotal, delivery, total };
}

function updateSummary(cart){
  const { subtotal, delivery, total } = calculateTotals(cart);
  const s = document.getElementById('subtotal');
  const d = document.getElementById('delivery');
  const t = document.getElementById('total');
  if(s) s.innerText = formatBRL(subtotal);
  if(d) d.innerText = delivery === 0 ? 'Grátis' : formatBRL(delivery);
  if(t) t.innerText = formatBRL(total);
}

/* checkout -> WhatsApp */
function checkoutViaWhatsApp(){
  const cart = loadCart();
  if(cart.length === 0){ alert('Seu carrinho está vazio.'); return; }
  const { subtotal, total } = calculateTotals(cart);

  // montar mensagem com itens
  let message = 'Olá! Gostaria de finalizar meu pedido:%0A%0A';
  cart.forEach(it => {
    message += `- ${encodeURIComponent(it.name)} (x${it.qty}) — ${encodeURIComponent(formatBRL(it.price * it.qty))}%0A`;
  });
  message += `%0ASubtotal: ${encodeURIComponent(formatBRL(subtotal))}%0A`;
  message += `Entrega: ${encodeURIComponent('Grátis')}%0A`;
  message += `*Total: ${encodeURIComponent(formatBRL(total))}%0A%0A`;
  message += encodeURIComponent('Nome:') + '%0A';
  message += encodeURIComponent('Endereço:') + '%0A';
  message += encodeURIComponent('Telefone:') + '%0A';
  message += '%0A' + encodeURIComponent('Obrigado!');

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  window.open(url, '_blank');
}

/* init on DOM load */
document.addEventListener('DOMContentLoaded', () => {
  // set years
  document.getElementById('year')?.innerText = new Date().getFullYear();
  document.getElementById('year2')?.innerText = new Date().getFullYear();
  document.getElementById('year3')?.innerText = new Date().getFullYear();

  // render home parts
  renderFeatured();
  renderCatalog();
  renderTestimonials();

  // render products page if present
  renderProductsGrid();

  // render cart page if present
  renderCartItems();

  // attach clear cart
  const clearBtn = document.getElementById('clearCart');
  if(clearBtn) clearBtn.addEventListener('click', clearCart);

  // attach checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if(checkoutBtn) checkoutBtn.addEventListener('click', checkoutViaWhatsApp);

  // simple filters on products page
  const searchInput = document.getElementById('search');
  const category = document.getElementById('category');
  const sortSel = document.getElementById('sort');
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');

  function applyFilters(){
    if(!document.getElementById('productsGrid')) return;
    let res = PRODUCTS.slice();
    const q = searchInput?.value?.toLowerCase() || '';
    if(q) res = res.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    if(category && category.value !== 'all') res = res.filter(p => p.cat === category.value);
    if(sortSel){
      if(sortSel.value === 'price-asc') res.sort((a,b)=>a.price-b.price);
      if(sortSel.value === 'price-desc') res.sort((a,b)=>b.price-a.price);
      if(sortSel.value === 'name') res.sort((a,b)=> a.name.localeCompare(b.name,'pt-BR'));
    }
    renderProductsGrid(res);
  }

  if(searchInput) searchInput.addEventListener('input', applyFilters);
  if(category) category.addEventListener('change', applyFilters);
  if(sortSel) sortSel.addEventListener('change', applyFilters);
  if(gridBtn && listBtn){
    gridBtn.addEventListener('click', ()=> { gridBtn.classList.add('active'); listBtn.classList.remove('active');});
    listBtn.addEventListener('click', ()=> { listBtn.classList.add('active'); gridBtn.classList.remove('active');});
  }

  // show cart badge initially
  updateCartBadges(loadCart());
});
