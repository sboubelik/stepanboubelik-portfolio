document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");
  const dalsiObsahContainer = document.querySelector(".dalsi-obsah-container");
  const heroSection = document.getElementById("hero");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Inicializace GLightbox
  const lightbox = GLightbox({
    selector: "a[data-glightbox]",
    touchNavigation: true,
    autoplayVideos: true,
  });

  // Načtení uloženého režimu
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    toggleBtn.textContent = currentTheme === "dark-mode" ? "☀️" : "🌙";
  }

  // Dark mode toggle
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark-mode");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });

  // Hamburger menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Navigační odkazy
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // zavřít menu na mobilu
      navMenu.classList.remove("open");

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Schování/zobrazení obsahu na základě pozice scrollu
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Pokud je viditelná hero sekce, schováme zbytek obsahu
          dalsiObsahContainer.classList.remove("visible");
        } else {
          // Pokud není viditelná hero sekce, zobrazíme zbytek obsahu
          dalsiObsahContainer.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  if (heroSection) {
    observer.observe(heroSection);
  }

  window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
  });
});
