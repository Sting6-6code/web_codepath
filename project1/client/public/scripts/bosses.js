document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html") {
    await renderList();
  } else if (path.startsWith("/bosses/")) {
    await renderDetail(path.split("/").pop());
  }
});

async function renderList() {
  const container = document.getElementById("bosses-container");
  if (!container) return;
  container.innerHTML = '<div class="loading">Loading boss encounters...</div>';

  try {
    const res = await fetch("/api/bosses");
    if (!res.ok) throw new Error("Failed to fetch bosses");
    const bosses = await res.json();

    container.innerHTML = "";
    bosses.forEach((boss) => container.appendChild(createBossCard(boss)));
  } catch (err) {
    console.error(err);
    container.innerHTML = `
        <div class="error">
          <p>❌ Failed to load boss data. Please try again later.</p>
        </div>
      `;
  }
}

async function renderDetail(id) {
  const main = document.querySelector("main.container");
  if (!main) return;
  main.innerHTML = '<div class="loading">Loading boss details...</div>';

  try {
    const res = await fetch(`/api/bosses/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Boss not found");
      }
      throw new Error("Failed to fetch boss details");
    }
    const boss = await res.json();

    document.title = `${boss.name} | Boss Battle Guide`;

    const difficultyClass = boss.difficulty.toLowerCase().replace(" ", "-");

    main.innerHTML = `
        <nav><a href="/" class="back-link">← Back to Boss List</a></nav>
        <article class="boss-detail">
          <header class="boss-header">
            <h1>${boss.name}</h1>
            <span class="difficulty-badge ${difficultyClass}">${
      boss.difficulty
    }</span>
          </header>
          <div class="boss-content-detail">
            <div class="boss-detail-image">
              <img src="${boss.image}" alt="${boss.name}" />
            </div>
            <div class="boss-info">
              <div class="info-section">
                <h3>📍 Location</h3>
                <p>${boss.location}</p>
              </div>
              <div class="info-section">
                <h3>❤️ Health Points</h3>
                <p>${Number(boss.health).toLocaleString()} HP</p>
              </div>
              <div class="info-section">
                <h3>📖 Description</h3>
                <p>${boss.description}</p>
              </div>
              <div class="info-section">
                <h3>⚔️ Battle Strategy</h3>
                <p>${boss.strategy}</p>
              </div>
              <div class="info-section">
                <h3>💎 Victory Rewards</h3>
                <ul>${boss.rewards.map((r) => `<li>${r}</li>`).join("")}</ul>
              </div>
              <div class="weakness-resistance">
                <div class="weaknesses">
                  <h4>🎯 Weaknesses</h4>
                  <ul>${boss.weaknesses
                    .map((w) => `<li class="weakness">${w}</li>`)
                    .join("")}</ul>
                </div>
                <div class="resistances">
                  <h4>🛡️ Resistances</h4>
                  <ul>${boss.resistances
                    .map((r) => `<li class="resistance">${r}</li>`)
                    .join("")}</ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
  } catch (err) {
    console.error("Error loading boss details:", err);
    main.innerHTML = `
        <div class="error">
          <h2>❌ ${
            err.message === "Boss not found"
              ? "Boss Not Found"
              : "Error Loading Boss"
          }</h2>
          <p>${
            err.message === "Boss not found"
              ? "The boss you're looking for doesn't exist in our database."
              : "Something went wrong while loading the boss details. Please try again."
          }</p>
          <div style="margin-top: 1.5rem;">
            <a href="/" role="button" class="btn-primary">🏠 Return to Boss List</a>
            <button onclick="window.history.back()" role="button" class="btn-secondary" style="margin-left: 1rem;">← Go Back</button>
          </div>
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
        <p class="health">❤️ ${Number(boss.health).toLocaleString()} HP</p>
        <p class="description">${boss.description}</p>
        <div class="boss-rewards">
          <strong>💎 Rewards:</strong>
          <span class="reward-count">${boss.rewards.length} items</span>
        </div>
        <footer class="card-footer">
          <a href="/bosses/${
            boss.id
          }" class="boss-link" role="button">View Strategy Guide →</a>
        </footer>
      </div>
    `;
  card.addEventListener("click", (e) => {
    if (!e.target.matches("a")) {
      window.location.href = `/bosses/${boss.id}`;
    }
  });
  return card;
}
