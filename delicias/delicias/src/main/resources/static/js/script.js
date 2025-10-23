// Dados dos produtos
const produtosData = [
  { id:1, nome: "Bolo de Chocolate", preco: 45.00, categoria: "bolos", img: "img/bolo-chocolate.jpg" },
  { id:2, nome: "Brigadeiro Gourmet", preco: 4.00, categoria: "doces", img: "img/brigadeiro.jpg" },
  { id:3, nome: "Torta de Limão", preco: 32.00, categoria: "tortas", img: "img/torta-limao.jpg" },
  { id:4, nome: "Cupcake Red Velvet", preco: 7.00, categoria: "doces", img: "img/cupcake.jpg" }
];

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
    grid.innerHTML = "";
    const q = searchInput.value.trim().toLowerCase();
    produtosData
      .filter(p => (p.nome.toLowerCase().includes(q)) && (filterCategory.value === "" || p.categoria === filterCategory.value))
      .forEach(p => {
        const card = document.createElement("div");
        card.className = "card-produtos";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <p>R$ ${p.preco.toFixed(2)}</p>
          <button data-id="${p.id}" class="selecionar-btn">Selecionar</button>
        `;
        grid.appendChild(card);
      });

    document.querySelectorAll(".selecionar-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const produtoId = parseInt(btn.getAttribute("data-id"));
        const produto = produtosData.find(p => p.id === produtoId);
        const cart = getCart();
        cart.push(produto);
        saveCart(cart);
        alert(`${produto.nome} adicionado ao carrinho!`);
      });
    });
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

