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

/** ✅ AQUI ESTÁ A CORREÇÃO PRINCIPAL */
window.addEventListener("load", () => {
  updateConfeiteiraUI();
  fetchProdutos(); // SEMPRE CARREGA OS PRODUTOS, LOGADA OU NÃO
});

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

// ===== CARROSSEL DE DOCES =====

// Seleciona os elementos principais
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Função que mostra o slide atual
function showSlide(index) {
  // Se passar do último, volta ao primeiro
  if (index >= slides.length) {
    currentIndex = 0;
  } 
  // Se voltar antes do primeiro, vai pro último
  else if (index < 0) {
    currentIndex = slides.length - 1;
  } 
  else {
    currentIndex = index;
  }

  // Move o carrossel
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

// Botões de navegação
nextBtn.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

// Troca automática a cada 5 segundos (opcional)
setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);


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

// ------------ AVALIAÇÕES / DEPOIMENTOS ---------------

// Depoimentos iniciais 
const initialReviews = [
  {
    stars: 5,
    text: "Os doces são maravilhosos! Entrega rápida e tudo fresco!",
    author: "Mariana S."
  },
  {
    stars: 4,
    text: "Muito saboroso, só achei o brigadeiro um pouco doce demais.",
    author: "João P."
  }
];

// Carregar avaliações do localStorage (se existirem)
let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Elementos
const testimonialsContainer = document.getElementById("testimonials");
const stars = document.querySelectorAll(".stars-input span");
const reviewText = document.getElementById("review-text");
const selectedRatingText = document.getElementById("selected-rating");
const submitBtn = document.getElementById("submit-review");
const successMessage = document.getElementById("review-success");

let selectedRating = 0;

// Função para exibir as avaliações
function renderReviews() {
  testimonialsContainer.innerHTML = "";

  const allReviews = [...initialReviews, ...savedReviews];

  allReviews.forEach(review => {
    const div = document.createElement("div");
    div.classList.add("testimonial-item");
    div.style.marginBottom = "20px";

    div.innerHTML = `
      <div class="stars">${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}</div>
      <p>${review.text}</p>
      <strong>- ${review.author || "Cliente"}</strong>
    `;

    testimonialsContainer.appendChild(div);
  });
}

renderReviews();

// Lógica de seleção das estrelas
stars.forEach(star => {
  star.addEventListener("click", function() {
    selectedRating = Number(this.dataset.value);

    // atualiza visual das estrelas
    stars.forEach(s => {
      s.textContent = Number(s.dataset.value) <= selectedRating ? "★" : "☆";
    });

    selectedRatingText.textContent = `Você selecionou: ${selectedRating} estrelas`;
  });
});

// Enviar avaliação
submitBtn.addEventListener("click", () => {
  const text = reviewText.value.trim();

  if (selectedRating === 0) {
    alert("Escolha uma quantidade de estrelas!");
    return;
  }

  if (text.length < 3) {
    alert("Escreva um comentário válido.");
    return;
  }

  const newReview = {
    stars: selectedRating,
    text: text,
    author: "Cliente"
  };

  savedReviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(savedReviews));

  renderReviews();

  // limpar form
  reviewText.value = "";
  selectedRating = 0;
  stars.forEach(s => s.textContent = "☆");
  selectedRatingText.textContent = "Você selecionou: 0 estrelas";

  successMessage.style.display = "block";
  setTimeout(() => successMessage.style.display = "none", 2000);
});


/** -------------------- Footer: ano -------------------- */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
