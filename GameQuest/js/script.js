/* ============================================================
   GameQuest – Esports Tournament Hub
   script.js  |  All JavaScript functionality
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   SECTION 1: TOURNAMENT DATA
   All tournament information is stored here as an array of objects.
   Each object represents one tournament card.
   ────────────────────────────────────────────────────────── */
const tournaments = [
  {
    id: "t1",
    title: "BGMI Masters Cup",
    game: "bgmi",
    icon: "🔫",
    prize: "₹1,00,000",
    teamSize: "4 Players",
    mode: "Squad",
    date: "March 25, 2026",
    slots: "32 Teams",
    entryFee: "₹400 / Team",
    status: "open"      // open | live | closed
  },
  {
    id: "t2",
    title: "Valorant Open Series",
    game: "valorant",
    icon: "⚔️",
    prize: "₹2,50,000",
    teamSize: "5 Players",
    mode: "Team",
    date: "April 2, 2026",
    slots: "16 Teams",
    entryFee: "₹500 / Team",
    status: "live"
  },
  {
    id: "t3",
    title: "BGMI Solo Showdown",
    game: "bgmi",
    icon: "🔫",
    prize: "₹50,000",
    teamSize: "Solo",
    mode: "Solo",
    date: "March 30, 2026",
    slots: "64 Players",
    entryFee: "₹100 / Player",
    status: "open"
  },
  {
    id: "t4",
    title: "Free Fire Tri-Cup",
    game: "freefire",
    icon: "🔥",
    prize: "₹75,000",
    teamSize: "3 Players",
    mode: "Trio",
    date: "April 10, 2026",
    slots: "48 Teams",
    entryFee: "₹300 / Team",
    status: "open"
  },
  {
    id: "t5",
    title: "Valorant Champions Grind",
    game: "valorant",
    icon: "⚔️",
    prize: "₹5,00,000",
    teamSize: "5 Players",
    mode: "Team",
    date: "April 20, 2026",
    slots: "8 Teams",
    entryFee: "₹1000 / Team",
    status: "closed"
  },
  {
    id: "t6",
    title: "Free Fire Squad Rush",
    game: "freefire",
    icon: "🔥",
    prize: "₹80,000",
    teamSize: "4 Players",
    mode: "Squad",
    date: "April 5, 2026",
    slots: "32 Teams",
    entryFee: "Free for Pro",
    status: "live"
  }
];


/* ──────────────────────────────────────────────────────────
   SECTION 2: LIVE MATCH DATA
   Each match object holds team names and current scores.
   Scores are updated dynamically by the user clicking buttons.
   ────────────────────────────────────────────────────────── */
const liveMatches = [
  { id: "m1", title: "QF Match 1 – Valorant Open", teamA: "Team Nova",    teamB: "Shadow Rush",  scoreA: 8, scoreB: 5 },
  { id: "m2", title: "QF Match 2 – Valorant Open", teamA: "Blaze eSports", teamB: "Storm Riders", scoreA: 6, scoreB: 7 },
  { id: "m3", title: "BGMI Round 3 – Masters Cup",  teamA: "Cyber Wolves", teamB: "Iron Fist",    scoreA: 12, scoreB: 9 }
];


/* ──────────────────────────────────────────────────────────
   SECTION 3: RENDER TOURNAMENT CARDS
   This function reads the 'tournaments' array and creates
   HTML cards dynamically inside the #cardsGrid container.
   ────────────────────────────────────────────────────────── */
function renderTournamentCards(filter = "all") {
  const grid = document.getElementById("cardsGrid");
  if (!grid) return; // Exit if not on the tournaments page

  // Filter tournaments based on the selected game tab
  const filtered = filter === "all"
    ? tournaments
    : tournaments.filter(t => t.game === filter);

  // If no results, show a message
  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--clr-text-secondary);grid-column:1/-1;text-align:center;padding:40px 0;">No tournaments found for this category.</p>`;
    return;
  }

  // Build HTML for each card and inject into the grid
  grid.innerHTML = filtered.map(t => `
    <article class="tournament-card" id="${t.id}" data-game="${t.game}">
      <!-- Coloured top strip matching the game -->
      <div class="card-glow-strip ${t.game}"></div>

      <div class="card-body">
        <!-- Game icon + tournament title -->
        <div class="card-header">
          <div class="game-icon ${t.game}">${t.icon}</div>
          <div>
            <h3 class="card-title">${t.title}</h3>
            <p class="card-game-tag">${t.game.toUpperCase()}</p>
          </div>
        </div>

        <!-- Tournament details rows -->
        <div class="card-info">
          <div class="info-row">
            <span class="info-label">💰 Prize Pool</span>
            <span class="info-value prize">${t.prize}</span>
          </div>
          <div class="info-row">
            <span class="info-label">👥 Team Size</span>
            <span class="info-value">${t.teamSize}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🎮 Mode</span>
            <span class="info-value">${t.mode}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📅 Date</span>
            <span class="info-value">${t.date}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🏟️ Slots</span>
            <span class="info-value">${t.slots}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🎟️ Entry Fee</span>
            <span class="info-value">${t.entryFee}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📌 Status</span>
            <span class="status-badge ${t.status}">
              ${t.status === "live" ? '<span class="live-dot"></span>' : ""}
              ${t.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <!-- Register CTA at the bottom of the card -->
      <div class="card-footer">
        <button
          class="btn-register"
          id="register-${t.id}"
          onclick="handleRegister('${t.id}', '${t.status}')"
          ${t.status === "closed" ? "disabled style='opacity:0.4;cursor:not-allowed;'" : ""}
        >
          ${t.status === "closed" ? "Registration Closed" : t.status === "live" ? "🔴 Watch Live" : "Register Now →"}
        </button>
      </div>
    </article>
  `).join("");
}


/* ──────────────────────────────────────────────────────────
   SECTION 4: REGISTER BUTTON HANDLER
   Called when user clicks a "Register Now" button.
   Shows a simple visual feedback toast notification.
   ────────────────────────────────────────────────────────── */
function handleRegister(tournamentId, status) {
  // Find the tournament name for the toast message
  const t = tournaments.find(t => t.id === tournamentId);
  if (!t) return;

  if (status === "live") {
    showToast(`📺 Redirecting to live stream for ${t.title}...`, "cyan");
  } else {
    showToast(`✅ Registered for ${t.title}! Check your email.`, "blue");
  }
}


/* ──────────────────────────────────────────────────────────
   SECTION 5: RENDER LIVE SCORE CARDS
   Builds the live match score cards from the liveMatches array.
   Each card has an "Update Score" button for Team A and Team B.
   ────────────────────────────────────────────────────────── */
function renderLiveScores() {
  const grid = document.getElementById("liveGrid");
  if (!grid) return; // Exit if section doesn't exist on this page

  grid.innerHTML = liveMatches.map(m => `
    <div class="live-card" id="card-${m.id}">

      <!-- Card header: match title + live badge -->
      <div class="live-card-header">
        <span class="live-match-title">${m.title}</span>
        <span class="status-badge live"><span class="live-dot"></span> LIVE</span>
      </div>

      <!-- Score display: Team A | VS | Team B -->
      <div class="score-row">
        <div class="team-block">
          <span class="t-name">${m.teamA}</span>
          <span class="t-score" id="scoreA-${m.id}">${m.scoreA}</span>
        </div>

        <div class="vs-badge">VS</div>

        <div class="team-block">
          <span class="t-name">${m.teamB}</span>
          <span class="t-score" id="scoreB-${m.id}">${m.scoreB}</span>
        </div>
      </div>

      <!-- Update score buttons -->
      <div class="score-actions">
        <button
          class="btn-score"
          id="btnA-${m.id}"
          onclick="updateScore('${m.id}', 'A')"
          title="Add point to ${m.teamA}"
        >
          +1 ${m.teamA}
        </button>
        <button
          class="btn-score"
          id="btnB-${m.id}"
          onclick="updateScore('${m.id}', 'B')"
          title="Add point to ${m.teamB}"
        >
          +1 ${m.teamB}
        </button>
      </div>

    </div>
  `).join("");
}


/* ──────────────────────────────────────────────────────────
   SECTION 6: UPDATE SCORE (Live Score System)
   Called when user clicks "+1 Team A" or "+1 Team B" button.
   - Increments the score in the liveMatches data array.
   - Updates the DOM element displaying the score.
   - Plays a short flash animation so user sees the change.
   ────────────────────────────────────────────────────────── */
function updateScore(matchId, team) {
  // Find the match object in our data array
  const match = liveMatches.find(m => m.id === matchId);
  if (!match) return;

  let scoreElement; // The DOM element we will update

  if (team === "A") {
    match.scoreA++;                                       // Increment score in data
    scoreElement = document.getElementById(`scoreA-${matchId}`);
    scoreElement.textContent = match.scoreA;             // Update displayed number
  } else {
    match.scoreB++;
    scoreElement = document.getElementById(`scoreB-${matchId}`);
    scoreElement.textContent = match.scoreB;
  }

  // Add flash animation – class is removed after animation completes
  scoreElement.classList.add("score-flash");
  setTimeout(() => scoreElement.classList.remove("score-flash"), 400);

  // Toast notification to acknowledge the update
  const teamName = team === "A" ? match.teamA : match.teamB;
  showToast(`🎯 ${teamName} scored! (${team === "A" ? match.scoreA : match.scoreB})`, "cyan");
}


/* ──────────────────────────────────────────────────────────
   SECTION 7: FILTER TABS (Tournaments Page)
   When user clicks a filter button (All / BGMI / Valorant / Free Fire),
   the active class is toggled and cards are re-rendered.
   ────────────────────────────────────────────────────────── */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-btn");
  if (!tabs.length) return;

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove 'active' from all tabs, add to clicked tab
      tabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Re-render cards with chosen filter
      const filter = btn.getAttribute("data-filter");
      renderTournamentCards(filter);
    });
  });
}


/* ──────────────────────────────────────────────────────────
   SECTION 8: BRACKET PAGE – GAME SELECTOR TABS
   Switches the bracket display between 3 game brackets.
   (Only runs on brackets.html)
   ────────────────────────────────────────────────────────── */
function initBracketTabs() {
  const tabs = document.querySelectorAll("[data-bracket]");
  if (!tabs.length) return;

  // Bracket data for all 3 games
  const brackets = {
    valorant: {
      champion: "Team Nova",
      qf: [
        { t1: "Team Nova",    s1: 13, t2: "Shadow Rush",  s2: 7,  w: "t1" },
        { t1: "Blaze eSports",s1: 13, t2: "Storm Riders", s2: 10, w: "t1" },
        { t1: "Cyber Wolves", s1: 13, t2: "Pixel Force",  s2: 5,  w: "t1" },
        { t1: "Iron Fist",    s1: 13, t2: "Ghost Squad",  s2: 9,  w: "t1" }
      ],
      sf: [
        { t1: "Team Nova",    s1: 13, t2: "Blaze eSports", s2: 11, w: "t1" },
        { t1: "Iron Fist",    s1: 13, t2: "Cyber Wolves",  s2: 12, w: "t1" }
      ],
      final: { t1: "Team Nova", s1: 13, t2: "Iron Fist", s2: 10, w: "t1" }
    },
    bgmi: {
      champion: "Phantom Squad",
      qf: [
        { t1: "Phantom Squad",  s1: 48, t2: "Desert Foxes",   s2: 30, w: "t1" },
        { t1: "Alpha Strike",   s1: 45, t2: "Rapid Assault",  s2: 38, w: "t1" },
        { t1: "Thunder Bolts",  s1: 55, t2: "Night Stalkers", s2: 42, w: "t1" },
        { t1: "Iron Shield",    s1: 40, t2: "Shadow Ops",     s2: 36, w: "t1" }
      ],
      sf: [
        { t1: "Phantom Squad",  s1: 62, t2: "Alpha Strike",  s2: 55, w: "t1" },
        { t1: "Thunder Bolts",  s1: 58, t2: "Iron Shield",   s2: 50, w: "t1" }
      ],
      final: { t1: "Phantom Squad", s1: 70, t2: "Thunder Bolts", s2: 64, w: "t1" }
    },
    freefire: {
      champion: "Blaze Kings",
      qf: [
        { t1: "Blaze Kings",   s1: 36, t2: "Wild Hunters",  s2: 24, w: "t1" },
        { t1: "Fire Hawks",    s1: 30, t2: "Storm Breakers", s2: 28, w: "t1" },
        { t1: "Neon Raiders",  s1: 33, t2: "Dragon Slayers", s2: 20, w: "t1" },
        { t1: "Ghost Riders",  s1: 27, t2: "Ice Wolves",    s2: 22, w: "t1" }
      ],
      sf: [
        { t1: "Blaze Kings",  s1: 40, t2: "Fire Hawks",   s2: 35, w: "t1" },
        { t1: "Neon Raiders", s1: 38, t2: "Ghost Riders",  s2: 30, w: "t1" }
      ],
      final: { t1: "Blaze Kings", s1: 45, t2: "Neon Raiders", s2: 38, w: "t1" }
    }
  };

  // Helper: build a bracket-team div
  function teamRow(name, score, isWinner, isChampion = false) {
    const cls = isChampion ? "champion" : isWinner ? "winner" : "";
    return `<div class="bracket-team ${cls}">
      <span class="team-seed">${isChampion ? "👑" : isWinner ? "✦" : "·"}</span>
      <span class="team-name">${name}</span>
      <span class="team-score">${score}</span>
    </div>`;
  }

  // Injects bracket HTML for the chosen game
  function loadBracket(gameKey) {
    const data = brackets[gameKey];
    if (!data) return;

    // Quarter Finals
    const qfHtml = data.qf.map((m, i) => `
      <div class="bracket-match" id="qf${i+1}">
        ${teamRow(m.t1, m.s1, m.w === "t1")}
        ${teamRow(m.t2, m.s2, m.w === "t2")}
      </div>
    `).join("");

    // Semi Finals
    const sfHtml = data.sf.map((m, i) => `
      <div class="bracket-match sf-match" id="sf${i+1}">
        ${teamRow(m.t1, m.s1, m.w === "t1")}
        ${teamRow(m.t2, m.s2, m.w === "t2")}
      </div>
    `).join("");

    // Grand Final
    const finalHtml = `
      <div class="bracket-match final-match" id="finalMatch">
        ${teamRow(data.final.t1, data.final.s1, data.final.w === "t1", data.final.w === "t1")}
        ${teamRow(data.final.t2, data.final.s2, data.final.w === "t2", data.final.w === "t2")}
      </div>
    `;

    // Update round sections
    const roundQF    = document.getElementById("roundQF");
    const roundSF    = document.getElementById("roundSF");
    const roundFinal = document.getElementById("roundFinal");
    const champName  = document.getElementById("championName");

    if (roundQF) {
      roundQF.innerHTML = `<h3 class="round-label">Quarter Finals</h3>${qfHtml}`;
    }
    if (roundSF) {
      roundSF.innerHTML = `<h3 class="round-label">Semi Finals</h3>${sfHtml}`;
    }
    if (roundFinal) {
      roundFinal.innerHTML = `
        <h3 class="round-label final-label">🏆 Grand Final</h3>
        ${finalHtml}
        <div class="champion-banner">
          <div class="champion-trophy">🏆</div>
          <p class="champion-title">CHAMPIONS</p>
          <p class="champion-name" id="championName">${data.champion}</p>
        </div>
      `;
    }
  }

  // Click handler for bracket tabs
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const gameKey = btn.getAttribute("data-bracket");
      loadBracket(gameKey);
    });
  });

  // Load the default bracket (valorant) on page load
  loadBracket("valorant");
}


/* ──────────────────────────────────────────────────────────
   SECTION 9: NAVBAR – Scroll effect & Mobile hamburger
   ────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  // Add 'scrolled' class when user scrolls down (adds glow effect)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile nav menu open/close
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Close the mobile menu when any nav link is clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


/* ──────────────────────────────────────────────────────────
   SECTION 10: TOAST NOTIFICATION
   A small animated message that appears at the bottom-right
   of the screen to give feedback after user actions.
   ────────────────────────────────────────────────────────── */
function showToast(message, color = "blue") {
  // Remove any existing toast first
  const existing = document.getElementById("gq-toast");
  if (existing) existing.remove();

  // Map colour name to neon variable
  const colorMap = {
    blue:   "var(--clr-neon-blue)",
    cyan:   "var(--clr-neon-cyan)",
    purple: "var(--clr-neon-purple)",
    pink:   "var(--clr-neon-pink)"
  };
  const borderColor = colorMap[color] || colorMap.blue;

  // Create toast element
  const toast = document.createElement("div");
  toast.id = "gq-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    right: 28px;
    background: #0d0f1c;
    color: #e8eaf6;
    border: 1px solid ${borderColor};
    box-shadow: 0 0 20px ${borderColor}55;
    padding: 14px 22px;
    border-radius: 10px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    z-index: 9999;
    max-width: 320px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity  = "1";
    toast.style.transform = "translateY(0)";
  });

  // Auto-remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity   = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ──────────────────────────────────────────────────────────
   SECTION 11: INITIALISE EVERYTHING ON DOM READY
   The DOMContentLoaded event fires when the HTML is fully loaded.
   We call all our initialisation functions here.
   ────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {

  // Navbar (runs on every page)
  initNavbar();

  // ── Tournaments Page ──
  // These functions only do something if their target elements exist.
  renderTournamentCards("all");    // Render all cards on initial load
  renderLiveScores();              // Render live score section
  initFilterTabs();                // Activate game-filter tabs

  // ── Brackets Page ──
  initBracketTabs();               // Load bracket switcher (only on brackets.html)

});
