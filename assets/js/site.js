/* Navigation « Contact » : comportement existant conservé. */
document.addEventListener("click", function (event) {
  const link = event.target.closest("a[data-contact-mail]");
  if (!link) return;

  event.preventDefault();

  // Ouvre le protocole mailto depuis un nouvel onglet/contexte afin de
  // conserver le site dans l'onglet courant. Le comportement final dépend
  // ensuite du gestionnaire de messagerie choisi dans le navigateur.
  const mailWindow = window.open(link.href, "_blank");

  // Si le navigateur bloque l'ouverture, on garde le comportement mailto normal.
  if (!mailWindow) {
    window.location.href = link.href;
  }
});

/*
 * Menu « Expositions » du bandeau — novembre 2026.
 * Pour ajouter une salle plus tard : ajouter une ligne dans la liste ci-dessous.
 * Chaque entrée comporte un titre, une année et le nom du fichier HTML.
 * « Une seconde traversée » n'y figure pas : c'est une lecture complémentaire.
 */
(function () {
  "use strict";

  const series = [
    { titre: "Ainsi de suite", annee: "2026", page: "ainsi-de-suite.html" },
    { titre: "L’âme du noir et blanc", annee: "2026", page: "ame-du-noir-et-blanc.html" },
    { titre: "Entre", annee: "2026", page: "entre.html" }
  ];

  const nav = document.querySelector(".site-header > nav");
  if (!nav) return;

  const ancienLien = Array.from(nav.children).find(function (element) {
    return element.tagName === "A" && element.textContent.trim() === "Expositions";
  });
  if (!ancienLien) return;

  const css = `
    .site-header nav .rb-menu-series { position:relative; color:#555; }
    .site-header nav .rb-menu-series > summary {
      display:inline-flex; align-items:center; gap:7px;
      cursor:pointer; list-style:none; color:#555;
      font:inherit; letter-spacing:inherit; white-space:nowrap;
    }
    .site-header nav .rb-menu-series > summary::-webkit-details-marker { display:none; }
    .site-header nav .rb-menu-series > summary::after {
      content:""; width:5px; height:5px; display:block;
      border-right:1px solid currentColor; border-bottom:1px solid currentColor;
      transform:translateY(-2px) rotate(45deg);
      transition:transform .16s ease;
    }
    .site-header nav .rb-menu-series[open] > summary::after {
      transform:translateY(1px) rotate(225deg);
    }
    .site-header nav .rb-menu-series > summary:hover,
    .site-header nav .rb-menu-series[open] > summary { color:#171717; }
    .site-header nav .rb-menu-series > summary:focus-visible {
      outline:1px solid #171717; outline-offset:5px;
    }
    .site-header nav .rb-menu-series .rb-menu-series-liste {
      position:absolute; top:calc(100% + 22px); right:0;
      z-index:1100; width:320px; max-width:calc(100vw - 28px);
      max-height:min(62vh,520px); overflow-y:auto;
      padding:8px 0; background:var(--paper,#f7f6f2);
      border:1px solid var(--line,#d8d6cf);
      box-shadow:0 10px 26px rgba(0,0,0,.07);
      letter-spacing:.025em;
    }
    .site-header nav .rb-menu-series .rb-menu-series-liste a {
      display:grid !important; grid-template-columns:minmax(0,1fr) auto;
      gap:16px; align-items:baseline; padding:12px 15px;
      font-size:12px; line-height:1.45; letter-spacing:.02em;
      color:#333; text-decoration:none;
    }
    .site-header nav .rb-menu-series .rb-menu-series-liste a:hover,
    .site-header nav .rb-menu-series .rb-menu-series-liste a:focus-visible {
      background:#eceae4; color:#171717;
    }
    .site-header nav .rb-menu-series .rb-menu-series-liste a[aria-current="page"] {
      font-weight:600;
    }
    .site-header nav .rb-menu-series .rb-menu-series-annee {
      color:#777; font-size:11px; font-weight:400;
      letter-spacing:.04em; font-variant-numeric:tabular-nums;
    }
    .site-header nav .rb-menu-series .rb-menu-separator {
      display:block; height:0; margin:6px 15px 8px; border-top:1px solid var(--line,#d8d6cf);
    }
    @media (max-width:700px) {
      .site-header nav .rb-menu-series .rb-menu-series-liste {
        left:auto; right:-72px;
        width:min(320px,calc(100vw - 28px));
      }
    }
    @media (prefers-reduced-motion:reduce) {
      .site-header nav .rb-menu-series > summary::after { transition:none; }
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const menu = document.createElement("details");
  menu.className = "rb-menu-series";

  const ouverture = document.createElement("summary");
  ouverture.textContent = "Expositions";
  ouverture.setAttribute("aria-label", "Afficher les expositions");

  const liste = document.createElement("div");
  liste.className = "rb-menu-series-liste";
  liste.setAttribute("aria-label", "Choisir une exposition photographique");

  const accueilExpositions = document.createElement("a");
  accueilExpositions.href = "expositions.html";
  accueilExpositions.className = "rb-menu-accueil";
  const accueilTitre = document.createElement("span");
  accueilTitre.textContent = "Entrée de l’exposition";
  const accueilDetail = document.createElement("span");
  accueilDetail.className = "rb-menu-series-annee";
  accueilDetail.textContent = "3 salles";
  accueilExpositions.append(accueilTitre, accueilDetail);
  liste.appendChild(accueilExpositions);
  const separateur = document.createElement("div");
  separateur.className = "rb-menu-separator";
  separateur.setAttribute("aria-hidden", "true");
  liste.appendChild(separateur);
  const pageActuelle = window.location.pathname.split("/").pop() || "index.html";
  if (pageActuelle === "expositions.html") accueilExpositions.setAttribute("aria-current", "page");
  series.forEach(function (serie) {
    const lien = document.createElement("a");
    lien.href = serie.page;

    const titre = document.createElement("span");
    titre.textContent = serie.titre;

    const annee = document.createElement("span");
    annee.className = "rb-menu-series-annee";
    annee.textContent = serie.annee;

    lien.append(titre, annee);
    if (serie.page === pageActuelle) lien.setAttribute("aria-current", "page");
    liste.appendChild(lien);
  });

  menu.append(ouverture, liste);
  ancienLien.replaceWith(menu);

  // Un clic ailleurs referme la liste. La touche Échap fonctionne également.
  document.addEventListener("click", function (event) {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      ouverture.focus();
    }
  });
})();


/* V13.1 — Arrivée sur les séries : titre plus haut, images inchangées.
 * Les trois séries partagent ce réglage. Les dimensions, légendes et
 * espacements entre photographies ne sont pas modifiés.
 */
(function () {
  "use strict";
  if (!document.querySelector(".serie-title")) return;

  const style = document.createElement("style");
  style.id = "rb-debut-series";
  style.textContent = `
    .serie-main > .serie-title,
    .entre-main > .serie-title {
      min-height: clamp(120px, 14svh, 168px);
      padding: 22px 0 20px;
    }
    @media (max-width: 700px) {
      .serie-main > .serie-title,
      .entre-main > .serie-title {
        min-height: clamp(110px, 16svh, 150px);
        padding: 18px 0 16px;
      }
    }
  `;
  document.head.appendChild(style);
})();
