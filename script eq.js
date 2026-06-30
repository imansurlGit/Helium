const members = [
  {
    name: "ISSA KARIMOU Ismaïl",
    role: "Président du Conseil d'Administration",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.14%20(1).jpeg",
    description: "Issa est un stratège aguerri...",
    email: "ismail.issa@helium-vecteur.net",
    phone: "+227 77 10 12 12",
    socials: {
      linkedin: "https://www.linkedin.com/in/isma%C3%AFl-i-1634861b4",
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "HAMIDINE Salouhou",
    role: "Directeur Général",
    photo: "images/Calque.png",
    description: "Salouhou est un leader visionnaire...",
    email: "salouhou.hamidine@helium-vecteur.net",
    phone: "+227 99 36 78 92",
    socials: {
      linkedin: "https://www.linkedin.com/in/salouhou-hamidine-6152ab77",
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "ISSA Mahomed-Laouel",
    role: "Directeur Exécutif",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.07.jpeg",
    description: "Mahomed-Laouel est un expert en gestion...",
    email: "laouel.issa@helium-vecteur.net",
    phone: "+227 70 07 77 72 | 93 53 00 63",
    socials: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "SOUMAILA Aboubacar",
    role: "Chargé de la Communication",
    photo: "images/WhatsApp%20Image%202026-06-19%20at%2016.06.13.jpeg",
    description: "Aboubacar est un professionnel de la communication...",
    email: "aboubacar.soumaila@helium-vecteur.net",
    phone: "+227 90 41 85 50 | 96 87 65 50",
    socials: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
      instagram: "#"
    }
  }
];

// MODAL ELEMENTS
const modal = document.querySelector("#profileModal");
const closeButton = document.querySelector(".close-button");

const modalPhoto = document.querySelector("#modalPhoto");
const modalName = document.querySelector("#modalName");
const modalRole = document.querySelector("#modalRole");
const modalDescription = document.querySelector("#modalDescription");
const modalEmail = document.querySelector("#modalEmail");
const modalPhone = document.querySelector("#modalPhone");

const modalLinkedin = document.querySelector("#modalLinkedin");
const modalFacebook = document.querySelector("#modalFacebook");
const modalTwitter = document.querySelector("#modalTwitter");
const modalInstagram = document.querySelector("#modalInstagram");

function openModal(member) {
  if (!member) return;

  modalPhoto.src = member.photo;
  modalPhoto.alt = `Portrait de ${member.name}`;

  modalName.textContent = member.name;
  modalRole.textContent = member.role;
  modalDescription.textContent = member.description;

  modalEmail.textContent = member.email;
  modalEmail.href = `mailto:${member.email}`;

  modalPhone.textContent = member.phone;
  modalPhone.href = `tel:${member.phone.replace(/\s|\|/g, "")}`;

  // SOCIALS SAFE
  modalLinkedin.href = member.socials?.linkedin || "#";
  modalFacebook.href = member.socials?.facebook || "#";
  modalTwitter.href = member.socials?.twitter || "#";
  modalInstagram.href = member.socials?.instagram || "#";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// TEAM CARDS
document.querySelectorAll(".profile-card").forEach((card) => {

  const memberIndex = Number(card.dataset.member);
  const btn = card.querySelector("button");

  // CLICK CARD
  card.addEventListener("click", () => {
    openModal(members[memberIndex]);
  });

  // CLICK BUTTON
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(members[memberIndex]);
    });
  }

  // KEYBOARD ACCESSIBILITY
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(members[memberIndex]);
    }
  });

});

// CLOSE EVENTS
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