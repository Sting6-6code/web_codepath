// Load and display all bosses on the homepage
document.addEventListener("DOMContentLoaded", async () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    await loadBosses();
  }
});

async function loadBosses() {
  try {
    const response = await fetch("/api/bosses");
    if (!response.ok) {
      throw new Error("Failed to fetch bosses");
    }
    const bosses = await response.json();

    const container = document.getElementById("bosses-container");
    container.innerHTML = "";

    bosses.forEach((boss) => {
      const bossCard = createBossCard(boss);
      container.appendChild(bossCard);
    });
  } catch (error) {
    console.error("Error loading bosses:", error);
    document.getElementById("bosses-container").innerHTML = `
      <div class="error">
        <p>❌ Failed to load boss data. Please try again later.</p>
        <button onclick="loadBosses()" role="button" class="outline">Retry</button>
      </div>
    `;
  }
}

function createBossCard(boss) {
  const card = document.createElement("article");
  card.className = "boss-card";
  card.style.cursor = "pointer";

  const difficultyClass = boss.difficulty.toLowerCase().replace(" ", "-");

  card.innerHTML = `
    <div class="boss-image">
      <img src="${boss.image}" alt="${boss.name}" loading="lazy" />
      <span class="difficulty-badge ${difficultyClass}">${
    boss.difficulty
  }</span>
    </div>
    
    <div class="boss-content">
      <h3>${boss.name}</h3>
      <p class="location">📍 ${boss.location}</p>
      <p class="health">❤️ ${boss.health.toLocaleString()} HP</p>
      <p class="description">${boss.description}</p>
      
      <div class="boss-rewards">
        <strong>💎 Rewards:</strong>
        <span class="reward-count">${boss.rewards.length} items</span>
      </div>
      
      <footer class="card-footer">
        <a href="/bosses/${boss.id}" class="boss-link" role="button">
          View Strategy Guide →
        </a>
      </footer>
    </div>
  `;

  // Add click handler to make entire card clickable
  card.addEventListener("click", (e) => {
    if (!e.target.matches("a")) {
      const link = card.querySelector(".boss-link");
      window.location.href = link.href;
    }
  });

  return card;
}

// Add some smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
