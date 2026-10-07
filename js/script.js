
/* ===================================
   GVHSS MAKKARAPPARAMBA
   File: js/script.js
=================================== */

/*
  IMPORTANT:
  Replace this placeholder with the HM's
  verified WhatsApp number.

  Example format: 919876543210
  Include country code. Do not use + or spaces.
*/
const HM_WHATSAPP_NUMBER = "91XXXXXXXXXX";

document.addEventListener("DOMContentLoaded", () => {
  // Show Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Current year in footer
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    // Close menu after clicking a link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Back-to-top button visibility
  const floatingTop = document.querySelector(".floating-top");

  if (floatingTop) {
    const updateBackToTop = () => {
      floatingTop.classList.toggle("visible", window.scrollY > 350);
    };

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
  }

  // WhatsApp floating button
  const whatsappFloat = document.getElementById("whatsapp-float");

  if (whatsappFloat) {
    whatsappFloat.addEventListener("click", (event) => {
      event.preventDefault();

      if (!isValidWhatsAppNumber()) {
        alert("Please add the HM's verified WhatsApp number in js/script.js.");
        return;
      }

      const message =
        "Hello Sir, I would like to know more about GVHSS Makkaraparamba.";

      openWhatsApp(message);
    });
  }

  // Contact form sends a prepared message to WhatsApp
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!isValidWhatsAppNumber()) {
        if (formStatus) {
          formStatus.textContent =
            "The HM's WhatsApp number has not been configured yet.";
        }

        alert("Please add the HM's verified WhatsApp number in js/script.js.");
        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !subject || !message) {
        if (formStatus) {
          formStatus.textContent = "Please complete all required fields.";
        }
        return;
      }

      const whatsappMessage = [
        "Hello Sir,",
        "",
        "I have an enquiry about GVHSS Makkaraparamba.",
        "",
        "Name: " + name,
        email ? "Email: " + email : "",
        "Topic: " + subject,
        "",
        "Message:",
        message
      ]
        .filter(Boolean)
        .join("\n");

      if (formStatus) {
        formStatus.textContent =
          "Opening WhatsApp. Please review your message and press Send.";
      }

      openWhatsApp(whatsappMessage);
    });
  }

  function isValidWhatsAppNumber() {
    // International number with country code, digits only
    return /^\d{10,15}$/.test(HM_WHATSAPP_NUMBER);
  }

  function openWhatsApp(message) {
    const url =
      "https://wa.me/" +
      HM_WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }
});