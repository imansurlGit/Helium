const members = [
  {
    name: "Abdoulaye Mahamadou",
    role: "D\u00e9veloppeur Full Stack",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.07.jpeg",
    description: "Abdoulaye con\u00e7oit des applications web robustes, rapides et faciles \u00e0 maintenir. Il relie les besoins m\u00e9tier aux choix techniques pour livrer des solutions fiables.",
    email: "abdoulaye.mahamadou@helium-vecteur.net",
    phone: "+227 90 12 34 56"
  },
  {
    name: "Sani Issoufou",
    role: "UI/UX Designer",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.11.jpeg",
    description: "Sani transforme les parcours complexes en interfaces claires et agr\u00e9ables. Il privil\u00e9gie la lisibilit\u00e9, l'accessibilit\u00e9 et la coh\u00e9rence visuelle.",
    email: "sani.issoufou@helium-vecteur.net",
    phone: "+227 91 23 45 67"
  },
  {
    name: "Ibrahim Garba",
    role: "Chef de projet digital",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.13.jpeg",
    description: "Ibrahim coordonne les \u00e9quipes, clarifie les priorit\u00e9s et suit les livrables avec pr\u00e9cision. Il assure une communication fluide entre strat\u00e9gie, design et d\u00e9veloppement.",
    email: "ibrahim.garba@helium-vecteur.net",
    phone: "+227 92 34 56 78"
  },
  {
    name: "Ali Oumarou",
    role: "Responsable RH",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.14%20(1).jpeg",
    description: "Ali accompagne le recrutement, l'int\u00e9gration et le d\u00e9veloppement des talents. Il veille \u00e0 construire une culture d'\u00e9quipe saine, exigeante et motivante.",
    email: "ali.oumarou@helium-vecteur.net",
    phone: "+227 93 45 67 89"
  }
];

const modal = document.querySelector("#profileModal");
const closeButton = document.querySelector(".close-button");
const modalPhoto = document.querySelector("#modalPhoto");
const modalName = document.querySelector("#modalName");
const modalRole = document.querySelector("#modalRole");
const modalDescription = document.querySelector("#modalDescription");
const modalEmail = document.querySelector("#modalEmail");
const modalPhone = document.querySelector("#modalPhone");

function openModal(member) {
  modalPhoto.src = member.photo;
  modalPhoto.alt = `Portrait de ${member.name}`;
  modalName.textContent = member.name;
  modalRole.textContent = member.role;
  modalDescription.textContent = member.description;
  modalEmail.textContent = member.email;
  modalEmail.href = `mailto:${member.email}`;
  modalPhone.textContent = member.phone;
  modalPhone.href = `tel:${member.phone.replaceAll(" ", "")}`;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".profile-card").forEach((card) => {
  card.addEventListener("click", () => {
    openModal(members[Number(card.dataset.member)]);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(members[Number(card.dataset.member)]);
    }
  });
});

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
