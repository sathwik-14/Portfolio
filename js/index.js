const nighttheme = document.getElementsByClassName("fa-moon")[0];
const daytheme = document.getElementById("sun");
const navbar = document.getElementsByClassName("navbar")[0];
const body = document.getElementById("body");
let theme = "dark";

nighttheme.addEventListener("click", function () {
  localStorage.setItem("theme", "dark");
  daytheme.classList.toggle("d-none");
  nighttheme.classList.toggle("d-none");
  navbar.classList.replace("navbar-light", "navbar-dark");
  navbar.classList.replace("bg-light", "bg-dark");
  daytheme.classList.add("text-white");
  body.classList.toggle("body");
});
daytheme.addEventListener("click", function () {
  localStorage.setItem("theme", "light");
  daytheme.classList.toggle("d-none");
  nighttheme.classList.toggle("d-none");
  navbar.classList.replace("navbar-dark", "navbar-light");
  navbar.classList.replace("bg-dark", "bg-light");
  body.classList.toggle("body");
});

if (localStorage.getItem("theme")) {
  theme = localStorage.getItem("theme");
  if (theme == "dark") nighttheme.click();
} else {
  nighttheme.click();
}
