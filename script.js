function showToast(message) {
  const toast = document.getElementById("copy-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

function initCopyButtons() {
  document.querySelectorAll("[data-address]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const address = btn.getAttribute("data-address");
      try {
        await navigator.clipboard.writeText(address);
        btn.classList.add("copied");
        const label = btn.querySelector("span");
        if (label) {
          const prev = label.textContent;
          label.textContent = "Copied!";
          setTimeout(() => {
            btn.classList.remove("copied");
            label.textContent = prev;
          }, 2000);
        }
        showToast("Contract address copied!");
      } catch {
        showToast("Copy failed — select and copy manually.");
      }
    });
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  if (!toggle || !links || !header) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCopyButtons();
  initReveals();
});
