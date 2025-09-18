// js/admin.js
// controle simples de produtos via localStorage. Apenas cliente-side.

document.addEventListener('DOMContentLoaded', () => {
  // verificacao de "login" simples (a page admin.html só será acessada via login.html)
  // se quiser reforçar put uma chave no sessionStorage no login
  renderAdminProducts();

  document.getElementById('product-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('p-name').value.trim();
    const desc = document.getElementById('p-desc').value.trim();
    const price = parseFloat(document.getElementById('p-price').value);
    const img = document.getElementById('p-img').value.trim();
    const tags = document.getElementById('p-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
    if(!name || isNaN(price) || !img) return alert('Preencha nome, preço e imagem.');

    const product = {
      id: generateId(name),
      name, desc, price, img, tags
    };
    addProduct(product);

    // limpa form
    this.reset();
    renderAdminProducts();
    alert('Produto salvo.');
  });

  document.getElementById('clear-store')?.addEventListener('click', function(){
    if(confirm('Apagar todos os produtos e reverter aos exemplos iniciais?')){
      localStorage.removeItem('k_products');
      // re-inicializa padrões
      initDefaultProducts();
      renderAdminProducts();
      alert('Produtos restaurados.');
    }
  });
});

function generateId(name){
  return name.toLowerCase().replace(/\s+/g,'-') + '-' + Date.now().toString(36);
}

function addProduct(product){
  const arr = getProductsAdmin();
  arr.push(product);
  localStorage.setItem('k_products', JSON.stringify(arr));
}

function getProductsAdmin(){
  const raw = localStorage.getItem('k_products');
  return raw ? JSON.parse(raw) : [];
}

function renderAdminProducts(){
  const wrap = document.getElementById('admin-products');
  wrap.innerHTML = '';
  const arr = getProductsAdmin();
  if(arr.length === 0) { wrap.innerHTML = '<p>Nenhum produto cadastrado.</p>'; return; }
  arr.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'admin-prod';
    div.style = 'display:flex; gap:12px; align-items:center; padding:8px; border-bottom:1px solid #eee';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" style="width:80px;height:60px;object-fit:cover;border-radius:8px">
      <div style="flex:1">
        <strong>${p.name}</strong><br>
        <small>${p.desc || ''}</small><br>
        <small>R$ ${Number(p.price).toFixed(2).replace('.',',')}</small>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="btn btn-outline edit" data-id="${p.id}">Editar</button>
        <button class="btn btn-primary del" data-id="${p.id}">Excluir</button>
      </div>
    `;
    wrap.appendChild(div);
  });

  // listeners excluir
  wrap.querySelectorAll('.del').forEach(b=>{
    b.addEventListener('click', function(){
      const id = this.dataset.id;
      if(!confirm('Excluir este produto?')) return;
      let arr = getProductsAdmin();
      arr = arr.filter(x => x.id !== id);
      localStorage.setItem('k_products', JSON.stringify(arr));
      renderAdminProducts();
    });
  });

  // listeners editar (carrega no form)
  wrap.querySelectorAll('.edit').forEach(b=>{
    b.addEventListener('click', function(){
      const id = this.dataset.id;
      const arr = getProductsAdmin();
      const p = arr.find(x=>x.id===id);
      if(!p) return;
      // carregar no form para editar: excluir antigo e preenche form
      document.getElementById('p-name').value = p.name;
      document.getElementById('p-desc').value = p.desc || '';
      document.getElementById('p-price').value = p.price;
      document.getElementById('p-img').value = p.img;
      document.getElementById('p-tags').value = (p.tags||[]).join(', ');
      // remove o registro antigo para que quando salvar gere novo id
      const newArr = arr.filter(x=>x.id !== id);
      localStorage.setItem('k_products', JSON.stringify(newArr));
      renderAdminProducts();
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
}
