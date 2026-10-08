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
