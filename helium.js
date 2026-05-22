const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    const isOpen = menu.classList.contains("open");
    menuBtn.textContent = isOpen ? "x" : "=";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn.textContent = "=";
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Ouvrir le menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      menuBtn.textContent = "=";
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Ouvrir le menu");
      menuBtn.focus();
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("in-view"));
}

const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const contactMailSubject = document.getElementById("contactMailSubject");
const contactReplyTo = document.getElementById("contactReplyTo");

let contactFeedbackTimeoutId;

if (contactForm && contactFeedback && contactMailSubject && contactReplyTo) {
  const contactSubmitButton = contactForm.querySelector('button[type="submit"]');
  if (!contactSubmitButton) {
    console.warn("Bouton de soumission introuvable dans le formulaire de contact.");
  } else {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const fullName = contactForm.elements.fullName.value.trim();
      const organization = contactForm.elements.organization.value.trim();
      const email = contactForm.elements.email.value.trim();
      const subject = contactForm.elements.subject.value.trim();
      const message = contactForm.elements.message.value.trim();

      if (!fullName || !organization || !email || !subject || !message) {
        event.preventDefault();
        contactFeedback.textContent = "Veuillez remplir tous les champs obligatoires.";
        contactFeedback.classList.add("is-error");
        contactFeedback.classList.remove("is-success");
        return;
      }

      contactMailSubject.value = `[HELIUM] ${subject} - ${fullName}`;
      contactReplyTo.value = email;

      contactSubmitButton.disabled = true;
      contactSubmitButton.textContent = "Envoi en cours...";
      contactFeedback.textContent = "Envoi du message...";
      contactFeedback.classList.remove("is-error");
      contactFeedback.classList.remove("is-success");

      if (contactFeedbackTimeoutId) {
        clearTimeout(contactFeedbackTimeoutId);
        contactFeedbackTimeoutId = null;
      }

      try {
        const ajaxEndpoint = contactForm.action.includes("formsubmit.co/")
          ? contactForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/")
          : contactForm.action;

        const response = await fetch(ajaxEndpoint, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        contactSubmitButton.textContent = "Envoyer ma demande";
        contactFeedback.textContent = "Message envoyé.";
        contactFeedback.classList.remove("is-error");
        contactFeedback.classList.add("is-success");
        contactForm.reset();

        contactFeedbackTimeoutId = setTimeout(() => {
          contactFeedback.textContent = "";
          contactFeedback.classList.remove("is-success");
          contactFeedbackTimeoutId = null;
        }, 2000);
      } catch (error) {
        contactFeedback.textContent = "Échec de l'envoi. Vérifiez votre connexion puis réessayez.";
        contactFeedback.classList.add("is-error");
        contactFeedback.classList.remove("is-success");
        console.error("Erreur envoi formulaire:", error);
      } finally {
        contactSubmitButton.disabled = false;
        contactSubmitButton.textContent = "Envoyer ma demande";
      }
    });
  }
}
