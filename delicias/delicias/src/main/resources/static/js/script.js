let produtosData = [];
let notaSelecionada = 0; // Variável global para armazenar a nota selecionada

/** -------------------- Normalizador -------------------- */
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

        const img = card.querySelector("img");
        img.onerror = () => {
          img.src = "https://via.placeholder.com/400x300?text=Sem+imagem";
        };
        grid.appendChild(card);
      });

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
        img.src = "https://via.placeholder.com/120x90?text=Sem+imagem";
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
        i.preco ?? i.preco_produto ?? i.precoProduto ?? 0;
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

/** -------------------- LOGIN.HTML -------------------- */
if (document.getElementById("login-form")) {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  const correctUser = "ferlopes";
  const correctPass = "doces123";

   loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === correctUser && password === correctPass) {
      loginMessage.style.color = "green";
      loginMessage.textContent =
        "Login realizado com sucesso! Redirecionando...";
      localStorage.setItem("isConfeiteiraLogada", "true");
      setTimeout(() => {
        window.location.href = "produtos.html";
      }, 1500);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Usuário ou senha incorretos!";
    }
  });
}

/** -------------------- Footer: ano -------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/** -------------------- Avaliações e Estrelas -------------------- */

document.querySelectorAll('.stars-input span').forEach(star => {
  star.addEventListener('click', (e) => {
    notaSelecionada = e.target.dataset.value;
    document.getElementById('selected-rating').innerText = `Você selecionou: ${notaSelecionada} estrelas`;
    
    // Marca as estrelas clicadas
    document.querySelectorAll('.stars-input span').forEach(star => {
      star.style.color = (star.dataset.value <= notaSelecionada) ? 'gold' : 'gray';
    });
  });
});

// Função para enviar a avaliação para o backend
const enviarAvaliacao = () => {
  const nomeUsuario = "Maria Silva"; // Pode pegar de um input se quiser
  const comentario = document.getElementById('review-text').value;

  if (notaSelecionada === 0 || comentario === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dados = { nomeUsuario, nota: notaSelecionada, comentario };

  fetch('http://localhost:8080/avaliacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Avaliação enviada:', data);

    // Limpa o input e reseta estrelas
    document.getElementById('review-text').value = '';
    notaSelecionada = 0;
    document.querySelectorAll('.stars-input span').forEach(star => star.style.color = 'gray');
    document.getElementById('selected-rating').innerText = `Você selecionou: 0 estrelas`;

    // Atualiza a lista de avaliações puxando do backend
    carregarAvaliacoes();
  })
  .catch(error => console.error('Erro ao enviar avaliação:', error));
};


const carregarAvaliacoes = () => {
  fetch('http://localhost:8080/avaliacoes')
    .then(response => response.json())
    .then(avaliacoes => {
      const container = document.getElementById('testimonials');
      
      // Limpa as avaliações atuais, mas mantém o título e a descrição
      container.innerHTML = '';

      // Ordena para mostrar o mais recente no topo
      avaliacoes.sort((a, b) => new Date(b.data) - new Date(a.data));

      avaliacoes.forEach(avaliacao => {
        const div = document.createElement('div');
        div.classList.add('testi', 'active');
        div.innerHTML = `
          <p>"${avaliacao.comentario}"</p>
          <strong>- ${avaliacao.nomeUsuario}</strong>
          <div class="rating fixed">${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacoes.nota)}</div>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao carregar avaliações:', error));
};


window.onload = carregarAvaliacoes;
document.getElementById('submit-review').addEventListener('click', enviarAvaliacao);

