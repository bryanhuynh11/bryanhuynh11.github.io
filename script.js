/* script.js — rendering + effects. Content lives in content.js. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
  };

  /* ---------------- loader ---------------- */
  const LINES = ["Backfilling candles…", "Warming up the agents…", "Fitting the model (not overfitting)…", "Reconciling the order book…", "Compiling LC-3 to vibes…"];
  const loader = $("#loader");
  (function runLoader() {
    const pctEl = $("#loaderPct"), msgEl = $("#loaderMsg");
    msgEl.textContent = LINES[Math.floor(Math.random() * LINES.length)];
    const seen = (() => { try { return sessionStorage.getItem("ace-loaded"); } catch { return null; } })();
    const dur = reduced || seen ? 0 : 1100;
    const t0 = performance.now();
    const step = (t) => {
      const p = dur ? Math.min(1, (t - t0) / dur) : 1;
      pctEl.textContent = Math.round(100 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
      else { loader.classList.add("done"); try { sessionStorage.setItem("ace-loaded", "1"); } catch {} }
    };
    requestAnimationFrame(step);
    setTimeout(() => loader.classList.add("done"), 3000); // safety net
  })();

  /* ---------------- low-poly background ---------------- */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, DPR, pts = [], cols, rows, cell;
  let mouse = { x: 0.3, y: 0.2 }, bull = false;
  function build() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    W = cv.width = Math.floor(innerWidth * DPR);
    H = cv.height = Math.floor(innerHeight * DPR);
    cell = (innerWidth < 600 ? 70 : 96) * DPR;
    cols = Math.ceil(W / cell) + 2; rows = Math.ceil(H / cell) + 2;
    pts = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      pts.push({
        x: (i - 0.5) * cell + (Math.random() - 0.5) * cell * 0.8,
        y: (j - 0.5) * cell + (Math.random() - 0.5) * cell * 0.8,
        ph: Math.random() * Math.PI * 2,
      });
    }
  }
  const height = (p, t) =>
    Math.sin(p.x * 0.0021 + t * 0.00023) * 46 +
    Math.cos(p.y * 0.0027 - t * 0.00017) * 40 +
    Math.sin((p.x + p.y) * 0.0013 + t * 0.00011) * 30 +
    Math.sin(p.ph + t * 0.0006) * 14;

  function draw(t) {
    ctx.fillStyle = "#050607"; ctx.fillRect(0, 0, W, H);
    const z = pts.map((p) => height(p, t) * DPR);
    // light direction follows the mouse a little
    let lx = mouse.x - 0.5, ly = mouse.y - 0.5, lz = 0.9;
    const ll = Math.hypot(lx, ly, lz); lx /= ll; ly /= ll; lz /= ll;
    for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
      const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
      const tris = (i + j) % 2 ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
      for (const [p, q, r] of tris) {
        const P = pts[p], Q = pts[q], R = pts[r];
        const ux = Q.x - P.x, uy = Q.y - P.y, uz = z[q] - z[p];
        const vx = R.x - P.x, vy = R.y - P.y, vz = z[r] - z[p];
        let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
        if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; }
        const lit = Math.max(0, nx * lx + ny * ly + nz * lz);
        // fade toward the bottom-right so text stays readable
        const cx = (P.x + Q.x + R.x) / 3 / W, cy = (P.y + Q.y + R.y) / 3 / H;
        const fade = Math.max(0.25, 1 - Math.hypot(cx - 0.35, cy - 0.25) * 0.9);
        const v = Math.pow(lit, 3.2) * 62 * fade + 6;
        ctx.fillStyle = bull
          ? `rgb(${v * 0.55 | 0},${v * 1.05 | 0},${v * 0.8 | 0})`
          : `rgb(${v | 0},${v * 1.02 | 0},${v * 1.08 | 0})`;
        ctx.beginPath(); ctx.moveTo(P.x, P.y); ctx.lineTo(Q.x, Q.y); ctx.lineTo(R.x, R.y); ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1; ctx.stroke(); // hide hairline seams
      }
    }
  }
  let raf, last = 0;
  function loop(t) {
    if (t - last > 33) { draw(t); last = t; } // ~30fps is plenty for a slow surface
    raf = requestAnimationFrame(loop);
  }
  build();
  if (reduced) draw(0); else raf = requestAnimationFrame(loop);
  let rT; addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { build(); if (reduced) draw(0); }, 150); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX / innerWidth; mouse.y = e.clientY / innerHeight; }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf); else if (!reduced) raf = requestAnimationFrame(loop);
  });

  /* ---------------- typewriter ---------------- */
  (function typer() {
    const node = $("#typer"), roles = SITE.roles;
    if (reduced) { node.textContent = roles[0]; return; }
    let i = 0, k = 0, del = false;
    const tick = () => {
      const word = roles[i];
      node.textContent = word.slice(0, k);
      if (!del && k < word.length) { k++; setTimeout(tick, 55); }
      else if (!del) { del = true; setTimeout(tick, 1700); }
      else if (k > 0) { k--; setTimeout(tick, 28); }
      else { del = false; i = (i + 1) % roles.length; setTimeout(tick, 300); }
    };
    setTimeout(tick, 900);
  })();

  /* ---------------- about + links ---------------- */
  const linkBtn = (href, label, icon) => `<a class="icon-btn" href="${esc(href)}" target="_blank" rel="noopener">${ICONS[icon] || ""}<span>${esc(label)}</span></a>`;
  const socials = [linkBtn(SITE.github, "GitHub", "github"), linkBtn(SITE.linkedin, "LinkedIn", "linkedin")];
  if (SITE.resumeUrl) socials.push(linkBtn(SITE.resumeUrl, "Resume", "doc"));
  $("#aboutLinks").innerHTML = socials.join("");
  $("#contactLinks").innerHTML = socials.join("");
  $("#eduSchool").textContent = EDUCATION.school;
  $("#eduDegree").textContent = EDUCATION.degree;
  $("#eduWhen").textContent = EDUCATION.when;
  $("#eduCourses").innerHTML = EDUCATION.courses.map((c) => `<span class="chip">${esc(c)}</span>`).join("");
  $("#loc").textContent = SITE.location;

  /* ---------------- artifacts ---------------- */
  const grid = $("#artifactGrid");
  ARTIFACTS.forEach((a, idx) => {
    const shipped = a.status === "shipped";
    const card = el("article", `artifact glass ${shipped ? "is-shipped" : "is-idea"} ${idx === 0 ? "feature" : ""}`);
    card.id = `artifact-${a.n}`;
    const top = `<div class="artifact-top"><span class="artifact-n">Artifact ${a.n} · ${esc(a.theme)}</span>
      <span class="status ${shipped ? "shipped" : "idea"}">${shipped ? "▲ Shipped" : "◇ Idea"}</span></div>`;
    const link = a.link ? `<a class="link-btn" href="${esc(a.link)}" target="_blank" rel="noopener">${esc(a.linkLabel || "Open")} ${ICONS.arrow}</a>` : "";
    const tags = a.tags ? `<div class="chips small">${a.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : "";
    if (shipped) {
      const body = `<span class="reflect-label">Reflection</span><p>${esc(a.reflection || "")}</p>`;
      card.innerHTML = idx === 0
        ? `<div class="feature-left">${top}<h3>${esc(a.title)}</h3>${tags}${link}</div><div class="feature-right">${body}</div>`
        : `${top}<h3>${esc(a.title)}</h3>${body}${tags}${link}`;
    } else {
      card.innerHTML = `${top}<h3>${esc(a.title)}</h3><span class="reflect-label">Ideas I'm considering</span>
        <ul>${(a.ideas || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    }
    grid.appendChild(card);
  });

  /* ---------------- projects + filter ---------------- */
  const pg = $("#projectGrid");
  PROJECTS.forEach((p) => {
    const card = el("article", "project glass");
    card.dataset.cats = p.cats.join(" ");
    card.innerHTML = `<h3>${esc(p.title)}</h3><span class="badge">${esc(p.badge)}</span><p>${esc(p.desc)}</p>
      ${p.links.length ? `<div class="links">${p.links.map((l) => `<a class="link-btn" href="${esc(l.href)}" target="_blank" rel="noopener">${ICONS.github.replace("<svg", '<svg width="14" height="14"')} ${esc(l.label)}</a>`).join("")}</div>` : ""}
      <div class="chips small">${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>`;
    pg.appendChild(card);
  });
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#filters button").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); });
    const f = b.dataset.f;
    pg.querySelectorAll(".project").forEach((c) => { c.hidden = f !== "all" && !c.dataset.cats.split(" ").includes(f); });
  });

  /* ---------------- experience ---------------- */
  $("#expList").innerHTML = EXPERIENCE.map((x, i) => `
    <details class="exp glass"${i === 0 ? " open" : ""}>
      <summary><div class="who"><h3>${esc(x.role)}</h3><span class="org">${esc(x.org)}</span></div>
        <span class="when">${esc(x.when)} ${ICONS.chev}</span></summary>
      <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </details>`).join("");

  /* ---------------- stack ---------------- */
  $("#stackList").innerHTML = Object.entries(STACK).map(([k, v]) =>
    `<div class="stack-row"><h3>${esc(k)}</h3><div class="chips">${v.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>`).join("");

  /* ---------------- contact ---------------- */
  const emailLink = $("#emailLink");
  emailLink.textContent = SITE.email; emailLink.href = `mailto:${SITE.email}`;
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2200); };
  $("#copyEmail").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(SITE.email); toast("Email copied"); }
    catch { const r = document.createRange(); r.selectNodeContents(emailLink); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Selected. Press Ctrl/Cmd + C"); }
  });

  /* ---------------- quote of the day ---------------- */
  const day = Math.floor(Date.now() / 86400000);
  const [q, who] = QUOTES[day % QUOTES.length];
  $("#quote").innerHTML = `“${esc(q)}”<cite>— ${esc(who)}</cite>`;
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- nav active state + reveal ---------------- */
  const links = [...document.querySelectorAll(".nav a")];
  const secs = links.map((a) => $(a.getAttribute("href")));
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach((s) => s && io.observe(s));

  if (!reduced && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".artifact, .project, .exp, .stack-row, .edu");
    const rv = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((t) => { const r = t.getBoundingClientRect(); if (r.top > innerHeight) { t.classList.add("will-reveal"); rv.observe(t); } });
  }

  /* ---------------- easter egg: Konami code → bull market mode ---------------- */
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0, taps = 0, tapT;
  const flip = () => {
    bull = !bull; document.body.classList.toggle("bull", bull);
    if (reduced) draw(0);
    toast(bull ? "▲ Bull market mode. Long curiosity, short boredom." : "Back to neutral.");
  };
  addEventListener("keydown", (e) => {
    pos = e.key === code[pos] || e.key.toLowerCase() === code[pos] ? pos + 1 : (e.key === code[0] ? 1 : 0);
    if (pos === code.length) { pos = 0; flip(); }
  });
  // phones: tap the big "Hi, I'm Bryan" five times
  $(".hero h1").addEventListener("click", () => {
    clearTimeout(tapT); tapT = setTimeout(() => (taps = 0), 1200);
    if (++taps === 5) { taps = 0; flip(); }
  });
})();
