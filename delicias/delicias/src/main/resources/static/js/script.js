let produtosData = [];
let notaSelecionada = 0;

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
function getCart() { return JSON.parse(localStorage.getItem("carrinho")) || []; }
function saveCart(cart) { localStorage.setItem("carrinho", JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge() {
  const cart = getCart();
  document.querySelectorAll("#cart-count-badge").forEach((b) => (b.textContent = cart.length));
}

/** -------------------- Confeiteira Login/Logout -------------------- */
const logoutBtn = document.getElementById("logout-btn");

function updateConfeiteiraUI() {
  const logada = localStorage.getItem("isConfeiteiraLogada") === "true";
  logoutBtn.style.display = logada ? "inline-block" : "none";

  // Exibe ou oculta botões de adicionar produtos (classe 'add-produto-btn')
  document.querySelectorAll(".add-produto-btn").forEach(btn => {
    btn.style.display = logada ? "inline-block" : "none";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isConfeiteiraLogada");
    updateConfeiteiraUI();
    alert("Você saiu do login da confeiteira.");
  });
}

window.addEventListener("load", updateConfeiteiraUI);

/** -------------------- Buscar Produtos -------------------- */
async function fetchProdutos() {
  try {
    const res = await fetch("http://localhost:8080/produtos");
    if (!res.ok) throw new Error("Erro HTTP: " + res.status);
    const raw = await res.json();
    const lista = Array.isArray(raw) ? raw : [raw];
    produtosData = lista.map(normalizeProduto);
    renderProdutos();
  } catch (err) {
    console.error("❌ Erro ao carregar produtos:", err);
    alert("Não foi possível carregar os produtos do servidor.");
  }
}



/** -------------------- Login HTML -------------------- */
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
      loginMessage.textContent = "Login realizado com sucesso! Redirecionando...";
      localStorage.setItem("isConfeiteiraLogada", "true");
      setTimeout(() => { window.location.href = "produtos.html"; }, 1500);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Usuário ou senha incorretos!";
    }
  });
}

/** -------------------- Footer: ano -------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
