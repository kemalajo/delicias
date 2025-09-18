/* ========== CONFIG ========== */
const EMP_PHONE = '55XXXXXXXXXXX'; // <<-- substitua por ex: 5511999998888
const ADMIN_PASSWORD = '12345';     // senha padrão (troque se quiser)

/* ========== UTILIDADES ========== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

document.getElementById('year').textContent = new Date().getFullYear();

/* ========== PRODUTOS INICIAIS (exemplos baseados nas imagens que você enviou) ========== */
const SAMPLE_PRODUCTS = [
  {
    id: generateId(),
    name: 'Cookie Tradicional',
    description: 'Cookie artesanal com gotas de chocolate.',
    price: 12.00,
    image: 'images/cookie1.jpg'
  },
  {
    id: generateId(),
    name: 'Torta de Morango (Fatia)',
    description: 'Massa crocante com recheio cremoso e cobertura de morango.',
    price: 18.00,
    image: 'images/strawberry-tart.jpg'
  },
  {
    id: generateId(),
    name: 'Cheesecake de Morango',
    description: 'Cheesecake cremoso com base de biscoito e morangos frescos.',
    price: 28.00,
    image: 'images/cheesecake.jpg'
  },
  {
    id: generateId(),
    name: 'Croissant Chocolate',
    description: 'Folhado amanteigado com recheio de chocolate.',
    price: 25.00,
    image: 'images/croissant.jpg'
  }
];

/* ========== LOCAL STORAGE HELPERS ========== */
const STORAGE_PRODUCTS_KEY = 'kelajo_products_v1';
const STORAGE_CART_KEY = 'kelajo_cart_v1';

function loadProducts(){
  const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
  if(raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(SAMPLE_PRODUCTS));
  return SAMPLE_PRODUCTS;
}
function saveProducts(list){
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(list));
}
function loadCart(){
  const raw = localStorage.getItem(STORAGE_CART_KEY);
  if(!raw) return [];
  return JSON.parse(raw);
}
function saveCart(cart){
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
}

/* ========== RENDERIZAÇÃO ========== */
let products = loadProducts();
let cart = loadCart();

const productGrid = document.getElementById('product-grid');
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');

function renderProducts(){
  productGrid.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.image}" alt="${escapeHtml(p.name)}" onerror="this.src='images/no-image.jpg'"/>
      <h4>${escapeHtml(p.name)}</h4>
      <p>${escapeHtml(p.description || '')}</p>
      <div class="product-footer">
        <div class="price-tag">R$ ${formatPrice(p.price)}</div>
        <div>
          <button class="btn" onclick="selectProduct('${p.id}')">Selecionar</button>
          <button class="btn ghost" onclick="viewDetails('${p.id}')">Ver</button>
        </div>
      </div>
    `;
    productGrid.appendChild(div);
  });
}
function renderCart(){
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${item.image}" onerror="this.src='images/no-image.jpg'"/>
      <div style="flex:1">
        <div style="font-weight:700">${escapeHtml(item.name)}</div>
        <div style="font-size:13px;color:#666">R$ ${formatPrice(item.price)} x ${item.qty}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn small" onclick="changeQty('${item.id}',1)">+</button>
        <button class="btn small ghost" onclick="changeQty('${item.id}',-1)">-</button>
      </div>
    `;
    cartList.appendChild(el);
  });
  cartTotalEl.textContent = formatPrice(total);
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
  saveCart(cart);
}

/* ========== INTERAÇÕES ========== */
function selectProduct(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += 1;
  else cart.push({...p, qty:1});
  renderCart();
  openCart();
}
function addSampleToCart(){
  // botão de lançamento
  const sample = products[0];
  selectProduct(sample.id);
}
function changeQty(id, delta){
  const idx = cart.findIndex(c=>c.id===id);
  if(idx===-1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  renderCart();
}
function clearCart(){
  cart = [];
  renderCart();
}

/* View details (simples alert) */
function viewDetails(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  alert(`${p.name}\n\n${p.description}\n\nPreço: R$ ${formatPrice(p.price)}`);
}

/* ========== CART / WHATSAPP CHECKOUT ========== */
const whatsappBtn = document.getElementById('whatsapp-checkout');
const footerWhatsapp = document.getElementById('footer-whatsapp');

whatsappBtn.addEventListener('click', checkoutWhatsApp);
footerWhatsapp.addEventListener('click', checkoutWhatsApp);

function checkoutWhatsApp(){
  if(cart.length === 0){
    alert('Seu carrinho está vazio. Selecione produtos antes de finalizar.');
    return;
  }
  // montar mensagem
  let msg = `Olá! Gostaria de fazer um pedido:%0A`;
  cart.forEach(item => {
    msg += `- ${encodeURIComponent(item.name)} x${item.qty} (R$ ${formatPrice(item.price)})%0A`;
  });
  msg += `%0ATotal: R$ ${formatPrice(cart.reduce((s,i)=>s+i.price*i.qty,0))}%0A%0A`;
  msg += `Nome: %0ATelefone: %0AEndereço (opcional):`;

  // abrir whatsapp
  if(!EMP_PHONE || EMP_PHONE.includes('X')){
    alert('Número da empreendedora não configurado. Abra script.js e defina EMP_PHONE no formato 55XXXXXXXXXXX');
    return;
  }
  const waUrl = `https://wa.me/${EMP_PHONE}?text=${msg}`;
  window.open(waUrl, '_blank');
}

/* ========== LOGIN / ADMIN ========== */
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const adminPanel = document.getElementById('admin-panel');
const openLoginBtn = document.getElementById('open-login');
const productForm = document.getElementById('product-form');
const adminProductsList = document.getElementById('admin-products');

openLoginBtn.addEventListener('click', openLogin);
loginForm.addEventListener('submit', handleLogin);
productForm.addEventListener('submit', handleProductForm);

function openLogin(){
  loginModal.classList.remove('hidden');
}
function closeLogin(){
  loginModal.classList.add('hidden');
}
function handleLogin(e){
  e.preventDefault();
  const pw = document.getElementById('password').value;
  if(pw === ADMIN_PASSWORD){
    adminPanel.classList.remove('hidden');
    showAdminProducts();
    loginForm.style.display = 'none';
  } else {
    alert('Senha incorreta');
  }
}
function showAdminProducts(){
  adminProductsList.innerHTML = '';
  products.forEach(p=>{
    const li = document.createElement('li');
    li.innerHTML = `<div><strong>${escapeHtml(p.name)}</strong><div style="font-size:13px;color:#666">R$ ${formatPrice(p.price)}</div></div>
      <div style="display:flex;gap:6px">
        <button onclick="removeProduct('${p.id}')" class="btn small ghost">Remover</button>
      </div>`;
    adminProductsList.appendChild(li);
  });
}
function handleProductForm(e){
  e.preventDefault();
  const name = document.getElementById('p-name').value.trim();
  const desc = document.getElementById('p-desc').value.trim();
  const price = parseFloat(document.getElementById('p-price').value) || 0;
  const image = document.getElementById('p-image').value.trim() || 'images/no-image.jpg';
  const newP = {id: generateId(), name, description: desc, price, image};
  products.unshift(newP);
  saveProducts(products);
  renderProducts();
  showAdminProducts();
  productForm.reset();
  alert('Produto salvo!');
}
function removeProduct(id){
  if(!confirm('Remover este produto?')) return;
  products = products.filter(p=>p.id!==id);
  saveProducts(products);
  renderProducts();
  showAdminProducts();
}
function logoutAdmin(){
  adminPanel.classList.add('hidden');
  loginForm.style.display = 'block';
  document.getElementById('password').value = '';
  closeLogin();
}

/* ========== CART SIDEBAR TOGGLE ========== */
const cartSidebar = document.getElementById('cart-sidebar');
const openCartBtn = document.getElementById('open-cart');

openCartBtn.addEventListener('click', toggleCart);
function toggleCart(){
  cartSidebar.classList.toggle('hidden');
}
function openCart(){
  cartSidebar.classList.remove('hidden');
}

/* ========== HELPERS ========== */
function generateId(){ return 'p_' + Math.random().toString(36).slice(2,9); }
function formatPrice(v){ return Number(v).toFixed(2).replace('.',','); }
function escapeHtml(str){ if(!str) return ''; return String(str).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }

/* ========== INICIALIZAÇÃO ========== */
renderProducts();
renderCart();

/* ========== EVENTS: fechar modal quando clicar fora ========== */
loginModal.addEventListener('click', (e)=>{
  if(e.target === loginModal) closeLogin();
});

// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // pega o botão ☰ e a lista de links do menu
  const btn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.main-nav ul');

  if (btn && navList) {
    // quando clicar no botão ☰
    btn.addEventListener('click', () => {
      // se já está visível, esconde
      if (getComputedStyle(navList).display === 'flex' || navList.style.display === 'flex') {
        navList.style.display = 'none';
      } else {
        // senão, mostra em coluna (um link embaixo do outro)
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.gap = '12px';
      }
    });

    // se a pessoa voltar pro desktop (tela maior), reseta
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) {
        navList.style.display = '';
        navList.style.flexDirection = '';
      }
    });
  }
});
