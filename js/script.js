// ─── Header: muda aparência ao rolar ───────────────────────────────────────
window.addEventListener("scroll", function () {
  document.querySelector("header").classList.toggle("stick", window.scrollY > 0);
  scrollFunction();
  animeScroll();
});

// ─── Menu mobile ───────────────────────────────────────────────────────────
function toggleMenu() {
  document.querySelector(".toggle").classList.toggle("active");
  document.querySelector(".menu").classList.toggle("active");
}

// Fecha menu ao pressionar Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelector(".toggle").classList.remove("active");
    document.querySelector(".menu").classList.remove("active");
  }
});

// ─── Efeito de digitação: "Bem-vindo ao meu portfólio!" ───────────────────
(function () {
  const texto = "Bem-vindo ao meu portfólio!";
  const el = document.getElementById("result");
  let i = 0;

  function inserir() {
    if (i < texto.length) {
      el.textContent += texto[i++];
      setTimeout(inserir, 50);
    }
  }

  window.addEventListener("load", inserir);
})();

// ─── Rotação de títulos no banner ─────────────────────────────────────────
(function () {
  const div = document.getElementById("log");
  const textos = [
    "Analista de Desenvolvimento de Sistemas",
    "Desenvolvedor Back-End C# | .NET | SQL Server",
    "Freelancer Full Stack",
  ];
  let atual = 0;

  function escrever(str, done) {
    const chars = str.split("");
    let i = 0;
    const timer = setInterval(() => {
      if (i >= chars.length) {
        clearInterval(timer);
        return setTimeout(done, 1500);
      }
      div.textContent += chars[i++];
    }, 80);
  }

  function limpar(done) {
    const timer = setInterval(() => {
      if (!div.textContent.length) {
        clearInterval(timer);
        return setTimeout(done, 300);
      }
      div.textContent = div.textContent.slice(0, -1);
    }, 40);
  }

  function proximo() {
    escrever(textos[atual], () => {
      limpar(() => {
        atual = (atual + 1) % textos.length;
        proximo();
      });
    });
  }

  proximo();
})();

// ─── Animações ao rolar ───────────────────────────────────────────────────
const targets = document.querySelectorAll("[data-anime]");

function animeScroll() {
  const threshold = window.pageYOffset + window.innerHeight * 0.75;
  targets.forEach(function (el) {
    el.classList.toggle("animate", threshold > el.offsetTop);
  });
}

animeScroll(); // roda na carga para elementos já visíveis

// ─── Botão voltar ao topo ─────────────────────────────────────────────────
const backToTop = document.getElementById("back-to-top");

function scrollFunction() {
  const scrolled = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  backToTop.style.display = scrolled ? "block" : "none";
}

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Modal de imagens ─────────────────────────────────────────────────────
const modal = document.getElementById("myModal");

function openModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // impede scroll da página por baixo
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

// Fecha modal com Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ─── Slideshow do modal ───────────────────────────────────────────────────
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots   = document.getElementsByClassName("demo");
  const captionText = document.getElementById("caption");

  if (n > slides.length) slideIndex = 1;
  if (n < 1)             slideIndex = slides.length;

  Array.from(slides).forEach(s => (s.style.display = "none"));
  Array.from(dots).forEach(d => d.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
  captionText.textContent = dots[slideIndex - 1].alt;
}

// Navegação pelo teclado dentro do modal
document.addEventListener("keydown", function (e) {
  if (modal.style.display !== "block") return;
  if (e.key === "ArrowRight") plusSlides(1);
  if (e.key === "ArrowLeft")  plusSlides(-1);
});

// ─── Ano no rodapé ────────────────────────────────────────────────────────
document.getElementById("hora").textContent = new Date().getFullYear();

// ─── Dark Mode ────────────────────────────────────────────────────────────
const darkToggle = document.getElementById("dark-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Aplica preferência salva ou do sistema
if (localStorage.getItem("dark") === "true" || (!localStorage.getItem("dark") && prefersDark)) {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("dark", isDark);
});
