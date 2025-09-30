/* script.js — gerencia produtos, login admin, renderizações e ações
   IMPORTANT: Atualize o número do WhatsApp abaixo:
   const PHONE_NUMBER = '5515999999999'; // formato: 55 + DDD + número
*/
const PHONE_NUMBER = '5515999999999'; // <-- troque para seu número real

document.addEventListener('DOMContentLoaded', () => {
  setupMenuToggle();
  ensureDefaultProducts();
  initPages();
  setupWhatsAppMainLink();
});

/* ---------- Dados iniciais ---------- */
function ensureDefaultProducts() {
  if (!localStorage.getItem('kelajo_products')) {
    const defaultProducts = [
      { id: 'torta-morango', name: 'Torta de Morango', price: '45.00',
        image: 'https://i.pinimg.com/736x/07/81/a3/0781a3836d7c88793da3b08f61af3d70.jpg',
        description: 'Torta fresca com morangos selecionados', tags: ['morango','fresco','creme'], featured: true},
      { id: 'cookie', name: 'Cookies Gourmet', price: '15.00',
        image: 'https://i.pinimg.com/736x/a3/26/8c/a3268c37b074b6253e2ce4371c23b971.jpg',
        description: 'Cookies artesanais para todos os gostos', tags: ['gourmet','artesanal'], featured: true},
      { id: 'croissant', name: 'Croissant de Chocolate', price: '25.00',
        image: 'https://i.pinimg.com/736x/59/fa/17/59fa175ad10fd8bdddae042b2a5c6f2f.jpg',
        description: 'Delicadamente folhados e dourados por fora', tags: ['chocolate','massa folhada'], featured: true},
      { id: 'bolo', name: 'Bolo de Aniversário', price: '80.00',
        image: 'https://i.pinimg.com/736x/80/54/ec/8054ec94d30206a86cb0cecb595bd0f6.jpg',
        description: 'Bolos personalizados para ocasiões especiais', tags: ['aniversário','personalizado'], featured: false},
      { id: 'sonho', name: 'Sonho de Morango', price: '18.00',
        image: 'https://i.pinimg.com/736x/d0/aa/3c/d0aa3c8b8f9c10f01ceb6e5bc36327bb.jpg',
        description: 'Sonho recheado com creme e morango', tags: ['morango','creme'], featured: false},
      { id: 'brownie', name: 'Brownie', price: '20.00',
        image: 'https://i.pinimg.com/736x/ac/84/e9/ac84e9bb2de1a9d2058c6248edbac5b7.jpg',
        description: 'Brownie fudgy com castanhas', tags: ['chocolate','fudge'], featured: false},
      { id: 'pudim', name: 'Pudim', price: '12.00',
        image: 'https://i.pinimg.com/736x/57/de/cc/57deccb8ad0d35907e804ccab00d41e5.jpg',
        description: 'Pudim cremoso tradicional', tags: ['tradicional','cremoso'], featured: false},
      { id: 'brigadeiro', name: 'Brigadeiro Gourmet', price: '8.00',
        image: 'https://i.pinimg.com/736x/c7/75/49/c77549b998098d6ab4b0e107d1b437e8.jpg',
        description: 'Brigadeiros artesanais com sabores especiais', tags: ['brigadeiro','gourmet'], featured: false},
      { id: 'trufa', name: 'Trufa', price: '6.00',
        image: 'https://i.pinimg.com/736x/07/81/a3/0781a3836d7c88793da3b08f61af3d70.jpg',
        description: 'Trufa rica de chocolate', tags: ['trufa','chocolate'], featured: false}
    ];
    localStorage.setItem('kelajo_products', JSON.stringify(defaultProducts));
  }
}

/* ---------- util produtos ---------- */
function getProducts() {
  try { return JSON.parse(localStorage.getItem('kelajo_products')) || []; } catch(e){ return []; }
}
function saveProducts(arr) { localStorage.setItem('kelajo_products', JSON.stringify(arr)); }
function findProductById(id) { return getProducts().find(p => p.id === id); }

/* ---------- init por página ---------- */
function initPages() {
  if (document.getElementById('featured-area')) renderFeaturedSection();
  if (document.getElementById('catalog-grid')) renderCatalogGrid();
  if (document.getElementById('product-wrap')) renderProductPage();
  if (document.getElementById('login-form')) initLogin();
  if (document.getElementById('add-product-form')) initAdmin();
}

/* ---------- menu mobile ---------- */
function setupMenuToggle() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '68px';
    nav.style.background = '#fff';
    nav.style.padding = '12px';
    nav.style.borderRadius = '12px';
    nav.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
  });
}

/* ---------- WhatsApp principal ---------- */
function setupWhatsAppMainLink() {
  const btn = document.getElementById('whatsapp-main');
  if (!btn) return;
  btn.href = `https://wa.me/${PHONE_NUMBER}`;
}

/* ---------- RENDER: Featured (index) ---------- */
function renderFeaturedSection() {
  const area = document.getElementById('featured-area');
  if (!area) return;
  const products = getProducts();
  const featured = products.filter(p => p.featured);
  const main = featured[0] || products[0];

  const left = document.createElement('div');
  left.className = 'featured-img';
  left.innerHTML = `<img src="${main.image}" alt="${main.name}">`;

  const right = document.createElement('div');
  right.className = 'featured-list';

  const showList = (featured.length ? featured : products.slice(0,3));
  showList.slice(0,3).forEach(p => {
    const div = document.createElement('div');
    div.className = 'featured-item';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
      <div class="price">R$ ${Number(p.price).toFixed(2)}</div>
    `;
    div.addEventListener('click', () => location.href = `produto.html?prod=${encodeURIComponent(p.id)}`);
    right.appendChild(div);
  });

  area.innerHTML = '';
  area.appendChild(left);
  area.appendChild(right);
}

/* ---------- RENDER: Catalog (catalog.html) ---------- */
function renderCatalogGrid() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  const products = getProducts();
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div>${(p.tags||[]).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="price-row">
          <strong>R$ ${Number(p.price).toFixed(2)}</strong>
          <div>
            <a class="btn small" href="produto.html?prod=${encodeURIComponent(p.id)}">Ver Detalhes</a>
            <button class="btn btn-primary small" onclick="orderProduct('${p.id}')">Encomendar</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- RENDER: Produto (produto.html) ---------- */
function renderProductPage() {
  const wrap = document.getElementById('product-wrap');
  if (!wrap) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('prod');
  const product = findProductById(id);
  if (!product) {
    wrap.innerHTML = `<p>Produto não encontrado. <a href="catalog.html">Voltar ao cardápio</a></p>`;
    return;
  }
  wrap.innerHTML = `
    <div class="product-img"><img src="${product.image}" alt="${product.name}"></div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="muted">${product.description}</p>
      <div style="margin:12px 0">${(product.tags||[]).map(t=>`<span class="tag">${t}</span>`).join(' ')}</div>
      <h3 style="color:#8b2f00">R$ ${Number(product.price).toFixed(2)}</h3>
      <div style="margin-top:18px;display:flex;gap:12px">
        <button class="btn btn-primary" onclick="orderProduct('${product.id}')">Encomendar</button>
        <a class="btn" href="catalog.html">Voltar</a>
      </div>
    </div>
  `;
}

/* ---------- AÇÃO: Encomendar (WhatsApp) ---------- */
window.orderProduct = function (id) {
  const product = findProductById(id);
  if (!product) return alert('Produto não encontrado');
  const text = encodeURIComponent(`Olá! Gostaria de encomendar:\n- Produto: ${product.name}\n- Valor: R$ ${Number(product.price).toFixed(2)}\nQuantidade: 1\nEndereço: \nObservações:`);
  const url = `https://wa.me/${PHONE_NUMBER}?text=${text}`;
  window.open(url, '_blank');
};

/* ---------- LOGIN (login.html) ---------- */
function initLogin() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();
    // credenciais padrão
    if (user === 'confeiteira' && pass === 'kelajo123') {
      localStorage.setItem('kelajo_admin', '1');
      location.href = 'admin.html';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  });
}

/* ---------- ADMIN (admin.html) ---------- */
function initAdmin() {
  // exige login
  if (!localStorage.getItem('kelajo_admin')) {
    location.href = 'login.html';
    return;
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) btnLogout.addEventListener('click', () => { localStorage.removeItem('kelajo_admin'); location.href='login.html'; });

  renderAdminProducts();

  const form = document.getElementById('add-product-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('p-name').value.trim();
    const price = document.getElementById('p-price').value.trim();
    const image = document.getElementById('p-image').value.trim() || 'https://i.pinimg.com/736x/a3/26/8c/a3268c37b074b6253e2ce4371c23b971.jpg';
    const desc = document.getElementById('p-desc').value.trim();
    const tags = document.getElementById('p-tags').value.split(',').map(t=>t.trim()).filter(Boolean);
    const featured = document.getElementById('p-featured').checked;

    if (!name || !price) return alert('Preencha nome e preço');

    const id = slugify(name) + '-' + Date.now().toString().slice(-4);
    const products = getProducts();
    products.unshift({ id, name, price: Number(price).toFixed(2), image, description: desc, tags, featured });
    saveProducts(products);

    form.reset();
    renderAdminProducts();
    alert('Produto adicionado!');
  });
}

/* ---------- ADMIN: render list ---------- */
function renderAdminProducts() {
  const list = document.getElementById('admin-products-list');
  if (!list) return;
  const products = getProducts();
  list.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'admin-product';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div style="flex:1">
        <strong>${p.name}</strong>
        <div style="color:var(--muted);font-size:13px">${p.description || ''}</div>
        <div style="margin-top:6px"><span style="font-weight:700">R$ ${Number(p.price).toFixed(2)}</span> ${p.featured ? '<span class="tag">Destaque</span>' : ''}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <button class="btn" onclick="openEditModal('${p.id}')">Editar</button>
        <button class="btn" onclick="deleteProduct('${p.id}')">Excluir</button>
      </div>
    `;
    list.appendChild(div);
  });
}

/* ---------- excluir ---------- */
window.deleteProduct = function (id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
  renderAdminProducts();
  alert('Produto excluído.');
};

/* ---------- editar via modal ---------- */
window.openEditModal = function (id) {
  const p = findProductById(id);
  if (!p) return alert('Produto não encontrado');

  // criar overlay/modal
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <h3>Editar produto</h3>
      <form id="edit-form">
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px">
            <label>Nome</label><input id="edit-name" value="${escapeHtml(p.name)}">
          </div>
          <div style="width:140px">
            <label>Preço</label><input id="edit-price" value="${p.price}">
          </div>
          <div style="flex-basis:100%;"></div>
          <div style="flex:1">
            <label>Imagem (URL)</label><input id="edit-image" value="${escapeHtml(p.image)}">
          </div>
          <div style="flex:1">
            <label>Tags (vírgula)</label><input id="edit-tags" value="${(p.tags||[]).join(', ')}">
          </div>
          <div style="flex-basis:100%">
            <label>Descrição</label><textarea id="edit-desc" rows="3">${escapeHtml(p.description || '')}</textarea>
          </div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px">
            <label style="align-self:center"><input id="edit-featured" type="checkbox"> Destaque</label>
            <button type="button" id="close-modal" class="btn">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('edit-featured').checked = !!p.featured;

  document.getElementById('close-modal').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (ev) => { if (ev.target === overlay) overlay.remove(); });

  document.getElementById('edit-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('edit-name').value.trim();
    const price = document.getElementById('edit-price').value.trim();
    const image = document.getElementById('edit-image').value.trim();
    const desc = document.getElementById('edit-desc').value.trim();
    const tags = document.getElementById('edit-tags').value.split(',').map(t=>t.trim()).filter(Boolean);
    const featured = document.getElementById('edit-featured').checked;

    const updated = getProducts().map(prod => {
      if (prod.id === id) {
        return { ...prod, name, price: Number(price).toFixed(2), image, description: desc, tags, featured };
      }
      return prod;
    });
    saveProducts(updated);
    renderAdminProducts();
    overlay.remove();
    alert('Produto atualizado.');
  });
};

/* ---------- helpers ---------- */
function slugify(text){ return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function escapeHtml(str){ return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
