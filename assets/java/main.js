const WA_NUMBER = "8100416050";

function toggleDark() {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  document.body.setAttribute("data-theme", isDark ? "" : "dark");

  const toggle = document.querySelector(".dark-toggle");
  if (toggle) {
    toggle.textContent = isDark ? "Mode" : "Light";
  }
}

function toggleMenu() {
  const links = document.querySelector(".nav-links");
  if (!links) return;

  const isOpen = links.style.display === "flex";
  links.style.display = isOpen ? "none" : "flex";
  links.style.flexDirection = "column";
  links.style.position = "fixed";
  links.style.top = "70px";
  links.style.left = "0";
  links.style.right = "0";
  links.style.background = "rgba(80,54,42,0.96)";
  links.style.padding = "1.5rem 2rem";
  links.style.gap = "1.2rem";
  links.style.borderBottom = "1px solid rgba(255,255,255,0.16)";
  links.style.zIndex = "99";
}

function scrollToSection(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

function openWhatsApp(msg) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  showToast("Opening WhatsApp...");
}

function buyNow(paintingName, price) {
  const msg = `Hi Craft Manzil, I want to buy this painting: *${paintingName}* (Rs. ${price}). Please share details.`;
  const subject = `Buy Request: ${paintingName}`;
  const body = `Hi Craft Manzil,\n\nI am interested in buying "${paintingName}" priced at Rs. ${price}.\n\nPlease share payment and delivery details.\n\nThank you!`;

  openWhatsApp(msg);
  window.location.href = `mailto:craftmanzil39@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function sendWhatsApp() {
  const name = document.getElementById("cname")?.value || "Customer";
  const type = document.getElementById("ctype")?.value || "Commission / Custom Art";
  const msg = document.getElementById("cmessage")?.value || "";
  const fullMsg = `Hi Craft Manzil! My name is ${name}. I'm interested in: *${type}*.\n\n${msg}`;

  openWhatsApp(fullMsg);
}

function sendEmail() {
  const name = document.getElementById("cname")?.value || "Customer";
  const type = document.getElementById("ctype")?.value || "Commission / Custom Art";
  const msg = document.getElementById("cmessage")?.value || "";
  const phone = document.getElementById("cphone")?.value || "";
  const subject = `Inquiry: ${type} - from ${name}`;
  const body = `Hi Craft Manzil,\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${type}\n\nMessage:\n${msg}\n\nThank you!`;

  window.location.href = `mailto:craftmanzil39@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast("Opening email client...");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function updateNav() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const scrolled = window.scrollY > 60;
  const desktop = window.innerWidth > 768;

  nav.classList.toggle("scrolled", scrolled);
  nav.style.padding = desktop && scrolled ? "0.8rem 3rem" : desktop ? "1.2rem 3rem" : "1rem 1.5rem";
}

function initPage() {
  initReveal();
  updateNav();
  window.addEventListener("scroll", updateNav);
  window.addEventListener("resize", updateNav);
}

document.addEventListener("DOMContentLoaded", initPage);
