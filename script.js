document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");
  const showContentBtn = document.getElementById("showContentBtn");
  const dalsiObsahContainer = document.querySelector(".dalsi-obsah-container");
  const heroSection = document.getElementById("hero");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

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

  // Tlačítko "Zjistit víc"
  showContentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dalsiObsahContainer.classList.add("visible");
    dalsiObsahContainer.scrollIntoView({ behavior: "smooth" });
  });

  // Navigační odkazy
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetId === "hero" || targetId === "kontakt") {
        // schovat obsah při kliknutí na Domů nebo Kontakt
        dalsiObsahContainer.classList.remove("visible");
      } else {
        // jinak zobrazit
        dalsiObsahContainer.classList.add("visible");
      }

      // zavřít menu na mobilu
      navMenu.classList.remove("open");

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Schování obsahu, když se vrátím na hero
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dalsiObsahContainer.classList.remove("visible");
        }
      });
    },
    { threshold: 0.6 }
  );

  if (heroSection) {
    observer.observe(heroSection);
  }
});

// Tento kód zajistí, že se stránka po načtení vrátí na začátek,
// a to i při refreshi.
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});
