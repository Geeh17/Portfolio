// Mudança de cor ao rolar
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("stick", window.scrollY > 0);
});

function toggleMenu() {
  const menuToggle = document.querySelector(".toggle");
  const menu = document.querySelector(".menu");
  menuToggle.classList.toggle("active");
  menu.classList.toggle("active");
}

let count = 0;
const texto = "Bem-vindo ao meu portfólio!";

function digitar() {
  const result = document.getElementById("result");
  window.setTimeout(() => inserir(texto[count]), 50);
}

function inserir(letra) {
  const result = document.getElementById("result");
  result.innerHTML += letra;
  count++;
  if (count < texto.length) {
    window.setTimeout(() => inserir(texto[count]), 50);
  }
}

window.onload = digitar;

const div = document.getElementById("log");
const textos = [
  "Analista de Desenvolvimento de Sistemas",
  "Analista de sistema C# | SQL Server",
  "Freelancer FullStack",
];

function escrever(str, done) {
  const char = str.split("").reverse();
  const typer = setInterval(() => {
    if (!char.length) {
      clearInterval(typer);
      return setTimeout(done, 500);
    }
    const next = char.pop();
    div.innerHTML += next;
  }, 100);
}

function limpar(done) {
  const char = div.innerHTML;
  let nr = char.length;
  const typer = setInterval(() => {
    if (nr-- == 0) {
      clearInterval(typer);
      return done();
    }
    div.innerHTML = char.slice(0, nr);
  }, 100);
}

function rodape(conteudos) {
  let atual = -1;
  function prox(cb) {
    if (atual < conteudos.length - 1) atual++;
    else atual = 0;
    const str = conteudos[atual];
    escrever(str, function () {
      limpar(prox);
    });
  }
  prox(prox);
}
rodape(textos);

const targets = document.querySelectorAll("[data-anime]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.pageYOffset + window.innerHeight * 0.75;
  targets.forEach(function (element) {
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });
}

window.addEventListener("scroll", animeScroll);

const backToTop = document.getElementById("back-to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  backToTop.style.display =
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? "block"
      : "none";
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

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
  const dots = document.getElementsByClassName("demo");
  const captionText = document.getElementById("caption");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

document.getElementById("hora").innerHTML = new Date().getFullYear();
