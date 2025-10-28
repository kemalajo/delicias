// Dados dos produtos
let produtosData = [];

async function fetchProdutos() {
  try {
    const res = await fetch("http://localhost:8080/produtos");
    produtosData = await res.json();
    renderProdutos();
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

// ----- PRODUTOS.HTML -----
if (document.getElementById("produtosGrid")) {
  const grid = document.getElementById("produtosGrid");
  const searchInput = document.getElementById("searchInput");
  const filterCategory = document.getElementById("filterCategory");

  function getCart() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("carrinho", JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const cart = getCart();
    const badgeElems = document.querySelectorAll("#cart-count-badge");
    badgeElems.forEach(badge => badge.textContent = cart.length);
  }

  function renderProdutos() {
  const grid = document.getElementById("produtosGrid");
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const filterCategory = document.getElementById("filterCategory").value;

  grid.innerHTML = "";

  produtosData
    .filter(p => p.nome_produto.toLowerCase().includes(q)) // ajustar conforme os campos da entidade
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "card-produtos";
      card.innerHTML = `
        <img src="${p.img_url}" alt="${p.nome_produto}">
        <h3>${p.nome_produto}</h3>
        <p>R$ ${p.preco_produto.toFixed(2)}</p>
        <button data-id="${p.idProduto}" class="selecionar-btn">Selecionar</button>
      `;
      grid.appendChild(card);
    });

  document.querySelectorAll(".selecionar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const produtoId = parseInt(btn.getAttribute("data-id"));
      const produto = produtosData.find(p => p.idProduto === produtoId);
      const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
      cart.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(cart));
      alert(`${produto.nome_produto} adicionado ao carrinho!`);
    });
  });
}

// --- Chama fetchProdutos quando a página carregar ---
if (document.getElementById("produtosGrid")) {
  document.getElementById("searchInput").addEventListener("input", renderProdutos);
  document.getElementById("filterCategory").addEventListener("change", renderProdutos);

  fetchProdutos(); // 🔑 pega os produtos do back-end
}

  searchInput.addEventListener("input", renderProdutos);
  filterCategory.addEventListener("change", renderProdutos);
  renderProdutos();
  updateCartBadge();
}

// ----- CARRINHO.HTML -----
if (document.getElementById("cart-items")) {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout");

  function getCart() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("carrinho", JSON.stringify(cart));
    renderCart();
  }

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function renderCart() {
    const cart = getCart();
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
      cartTotalSpan.textContent = "0.00";
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.nome}">
        <div class="cart-item-info">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)}</p>
        </div>
        <button class="remove-btn" data-index="${index}">❌</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"));
        removeFromCart(idx);
      });
    });

    const total = cart.reduce((acc, item) => acc + item.preco, 0);
    cartTotalSpan.textContent = total.toFixed(2);
  }

  checkoutBtn.addEventListener("click", () => {
    if (getCart().length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }
    alert("Compra finalizada! Obrigado por comprar com a gente.");
    localStorage.removeItem("carrinho");
    renderCart();
  });

  renderCart();
}

