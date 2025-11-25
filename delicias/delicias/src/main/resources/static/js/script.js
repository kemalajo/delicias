let produtos = JSON.parse(localStorage.getItem("produtos")) || [];  // 👈 ESSA É A PRIMEIRA LINHA

// resto do seu código normal aqui embaixo
const salvarProduto = document.getElementById("salvarProduto");
const addProdutoForm = document.getElementById("addProdutoForm");

      // ------ ADIÇÃO LOCAL (admin) ------
      salvarProduto.addEventListener("click", () => {
        const nome = document.getElementById("nomeProduto").value.trim();
        const preco = document.getElementById("precoProduto").value.trim();
        const categoria = document.getElementById("categoriaProduto").value.trim();
        const imagem = document.getElementById("imagemProduto").value.trim();

        if (!nome || !preco || !imagem) {
          alert("Preencha todos os campos!");
          return;
        }

        const novo = {
          idProduto: Date.now(),
          nomeProduto: nome,
          precoProduto:
            Number(
              preco.replace("R$", "").replace(".", "").replace(",", ".").trim()
            ) || preco,
          descricaoProduto: "",
          imgUrl: imagem,
          categoria: categoria || "",
        };

        produtos.push(novo);
        aplicarFiltros();

        document.getElementById("nomeProduto").value = "";
        document.getElementById("precoProduto").value = "";
        document.getElementById("categoriaProduto").value = "";
        document.getElementById("imagemProduto").value = "";
        addProdutoForm.style.display = "none";
      });

/** -------------------- NORMALIZADOR -------------------- */
function normalizeProduto(p) {
  return {
    id: p.idProduto,
    nome: p.nomeProduto,
    preco: Number(p.precoProduto || 0),
    descricao: p.descricaoProduto || "",
    img: p.imgUrl || "",
    categoria: p.categoriaProduto?.nomeCategoria || "",
    tipo: p.tipoProduto?.nomeTipoProduto || ""
  };
}

/** -------------------- CARRINHO -------------------- */
function getCart() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function saveCart(cart) {
  localStorage.setItem("carrinho", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  document.querySelectorAll("#cart-count-badge").forEach(b => {
    b.textContent = cart.length;
  });
}

/** -------------------- LOGIN CONFEITEIRA -------------------- */
const logoutBtn = document.getElementById("logout-btn");

function updateConfeiteiraUI() {
  const logada = localStorage.getItem("isConfeiteiraLogada") === "true";

  if (logoutBtn) {
    logoutBtn.style.display = logada ? "inline-block" : "none";
  }

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

/** -------------------- BUSCAR PRODUTOS -------------------- */
async function fetchProdutos() {
  try {
    const res = await fetch("http://localhost:8080/produtos");
    if (!res.ok) throw new Error("Erro HTTP: " + res.status);

    const raw = await res.json();
    const lista = Array.isArray(raw) ? raw : [raw];

    produtosData = lista.map(normalizeProduto);
    renderProdutos();

  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

/** -------------------- RENDER PRODUTOS -------------------- */
function renderProdutos() {
  const container = document.getElementById("produtos-list");
  if (!container) return;

  container.innerHTML = "";

  produtosData.forEach(produto => {
    const div = document.createElement("div");
    div.classList.add("produto-card");

    div.innerHTML = `
      <img src="${produto.img || 'img/placeholder.jpg'}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <p>${produto.descricao}</p>
    `;

    container.appendChild(div);
  });
}

/** -------------------- INICIALIZAÇÃO -------------------- */
window.addEventListener("DOMContentLoaded", () => {
  updateConfeiteiraUI();
  fetchProdutos(); // ✅ sempre busca do banco
});


/* ================= CARROSSEL ================= */

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function showSlide(index) {
  if (!carousel || slides.length === 0) return;

  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

if (nextBtn) nextBtn.onclick = () => showSlide(currentIndex + 1);
if (prevBtn) prevBtn.onclick = () => showSlide(currentIndex - 1);

setInterval(() => showSlide(currentIndex + 1), 5000);


/* ================= LOGIN FORM ================= */

if (document.getElementById("login-form")) {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  const correctUser = "ferlopes";
  const correctPass = "doces123";

  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === correctUser && password === correctPass) {
      localStorage.setItem("isConfeiteiraLogada", "true");
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login realizado com sucesso!";
      setTimeout(() => window.location.href = "produtos.html", 1200);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Usuário ou senha incorretos!";
    }
  });
}


/* ================= AVALIAÇÕES ================= */

const initialReviews = [
  { stars: 5, text: "Os doces são maravilhosos!", author: "Mariana S." },
  { stars: 4, text: "Muito bom, recomendo!", author: "João P." }
];

let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

const testimonialsContainer = document.getElementById("testimonials");
const stars = document.querySelectorAll(".stars-input span");
const reviewText = document.getElementById("review-text");
const selectedRatingText = document.getElementById("selected-rating");
const submitBtn = document.getElementById("submit-review");
const successMessage = document.getElementById("review-success");

let selectedRating = 0;

function renderReviews() {
  if (!testimonialsContainer) return;
  testimonialsContainer.innerHTML = "";

  [...initialReviews, ...savedReviews].forEach(review => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div>${"★".repeat(review.stars)}</div>
      <p>${review.text}</p>
      <strong>${review.author}</strong>
    `;
    testimonialsContainer.appendChild(div);
  });
}

renderReviews();

stars.forEach(star => {
  star.onclick = () => {
    selectedRating = Number(star.dataset.value);
    selectedRatingText.textContent = `Você selecionou: ${selectedRating} estrelas`;
  };
});

if (submitBtn) {
  submitBtn.onclick = () => {
    if (!selectedRating || reviewText.value.length < 3) return;

    savedReviews.push({
      stars: selectedRating,
      text: reviewText.value,
      author: "Cliente"
    });

    localStorage.setItem("reviews", JSON.stringify(savedReviews));
    renderReviews();
  };
}


/* ================= ANO FOOTER ================= */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
