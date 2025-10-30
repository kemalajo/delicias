let produtosData = [];

/** -------------------- Normalizador --------------------
 * Converte o payload do back (camelCase) para um formato único usado no front
 * Formato interno: { id, nome, preco, descricao, img, categoria, tipo }
 */
function normalizeProduto(p) {
  return {
    id: p.idProduto,
    nome: p.nomeProduto,
    preco: Number(p.precoProduto || 0),
    descricao: p.descricaoProduto || "",
    img: p.imgUrl || "",
    categoria: p.categoriaProduto?.nomeCategoria || "",
    tipo: p.tipoProduto?.nomeTipoProduto || "",
  };
}

/** -------------------- Utils de Carrinho -------------------- */
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
  badgeElems.forEach((badge) => (badge.textContent = cart.length));
}

/** -------------------- Buscar Produtos -------------------- */
async function fetchProdutos() {
  try {
    const res = await fetch("http://localhost:8080/produtos");
    if (!res.ok) throw new Error("Erro HTTP: " + res.status);

    const raw = await res.json();
    // Se o back um dia enviar objeto único, garantimos array:
    const lista = Array.isArray(raw) ? raw : [raw];

    produtosData = lista.map(normalizeProduto);
    console.log("✅ Produtos normalizados:", produtosData);
    renderProdutos();
  } catch (err) {
    console.error("❌ Erro ao carregar produtos:", err);
    alert("Não foi possível carregar os produtos do servidor.");
  }
}

/** -------------------- PRODUTOS.HTML -------------------- */
if (document.getElementById("produtosGrid")) {
  const grid = document.getElementById("produtosGrid");
  const searchInput = document.getElementById("searchInput");
  const filterCategory = document.getElementById("filterCategory");

  function renderProdutos() {
    const q = (searchInput?.value || "").trim().toLowerCase();
    const cat = (filterCategory?.value || "").trim().toLowerCase();

    grid.innerHTML = "";

    produtosData
      .filter((p) => {
        const matchTexto =
          !q ||
          p.nome?.toLowerCase().includes(q) ||
          p.descricao?.toLowerCase().includes(q);
        const matchCat = !cat || p.categoria.toLowerCase() === cat;
        return matchTexto && matchCat;
      })
      .forEach((p) => {
        const card = document.createElement("div");
        card.className = "card-produtos";
        card.innerHTML = `
          <img src="${p.img}" alt="${p.nome}">
          <h3>${p.nome}</h3>
          <small>${p.categoria || ""}${p.tipo ? " • " + p.tipo : ""}</small>
          <p>R$ ${p.preco.toFixed(2)}</p>
          <button data-id="${p.id}" class="selecionar-btn">Selecionar</button>
        `;
        // fallback de imagem
        const img = card.querySelector("img");
        img.onerror = () => {
          img.src =
            "https://via.placeholder.com/400x300?text=Sem+imagem";
        };
        grid.appendChild(card);
      });

    // Bind de seleção
    grid.querySelectorAll(".selecionar-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const produtoId = Number(btn.getAttribute("data-id"));
        const produto = produtosData.find((p) => p.id === produtoId);
        const cart = getCart();
        cart.push(produto);
        saveCart(cart);
        alert(`${produto.nome} adicionado ao carrinho!`);
      });
    });
  }

  searchInput?.addEventListener("input", renderProdutos);
  filterCategory?.addEventListener("change", renderProdutos);

  fetchProdutos();
  updateCartBadge();
}

/** -------------------- CARRINHO.HTML -------------------- */
if (document.getElementById("cart-items")) {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout");

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function renderCart() {
    const cart = getCart();
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
      cartTotalSpan.textContent = "0.00";
      updateCartBadge();
      return;
    }

    cart.forEach((item, index) => {
      // compat: se houver itens antigos no storage com snake_case, normaliza on-the-fly
      const p = item.nome
        ? item
        : normalizeProduto({
            idProduto: item.idProduto ?? item.id,
            nomeProduto: item.nome_produto ?? item.nome,
            precoProduto: item.preco_produto ?? item.preco,
            descricaoProduto: item.descricao_produto ?? item.descricao,
            imgUrl: item.img_url ?? item.img,
            categoriaProduto: { nomeCategoria: item.categoria ?? "" },
            tipoProduto: { nomeTipoProduto: item.tipo ?? "" },
          });

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${p.img}" alt="${p.nome}">
        <div class="cart-item-info">
          <h4>${p.nome}</h4>
          <small>${p.categoria || ""}${p.tipo ? " • " + p.tipo : ""}</small>
          <p>R$ ${Number(p.preco || 0).toFixed(2)}</p>
        </div>
        <button class="remove-btn" data-index="${index}">❌</button>
      `;
      const img = itemDiv.querySelector("img");
      img.onerror = () => {
        img.src =
          "https://via.placeholder.com/120x90?text=Sem+imagem";
      };
      cartItemsDiv.appendChild(itemDiv);
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-index"));
        removeFromCart(idx);
      });
    });

    const total = getCart().reduce((acc, i) => {
      const preco =
        i.preco ??
        i.preco_produto ??
        i.precoProduto ??
        0;
      return acc + Number(preco || 0);
    }, 0);
    cartTotalSpan.textContent = total.toFixed(2);
    updateCartBadge();
  }

  checkoutBtn.addEventListener("click", async () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Envie no formato do back: camelCase
        body: JSON.stringify(
          cart.map((p) => ({
            idProduto: p.id,
            nomeProduto: p.nome,
            precoProduto: p.preco,
            descricaoProduto: p.descricao,
            imgUrl: p.img,
            categoriaProduto: { nomeCategoria: p.categoria },
            tipoProduto: { nomeTipoProduto: p.tipo },
          }))
        ),
      });

      if (res.ok) {
        alert("Compra finalizada! Obrigado por comprar com a gente.");
        localStorage.removeItem("carrinho");
        renderCart();
      } else {
        alert("Erro ao enviar pedido ao servidor.");
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
    }
  });

  renderCart();
}

/** -------------------- Footer: ano -------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
