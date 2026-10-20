document.addEventListener("DOMContentLoaded", function () {
  
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    
    
    const typedRole = document.getElementById("typedRole");

    const roles = [
        "Python Developer",
        "Web Developer",
        "Django Developer",
        "Software Developer"
    ];

    if (typedRole) {
        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        typedRole.textContent = "";

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typedRole.textContent = currentRole.substring(0, characterIndex);

            let delay = deleting ? 50 : 100;

            if (!deleting && characterIndex === currentRole.length) {
                deleting = true;
                delay = 1500;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 300;
            }

            window.setTimeout(typeRole, delay);
        }

        typeRole();
    }





   
    const yearElement = document.getElementById("currentYear");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

 
    const revealItems = document.querySelectorAll(
        ".project-card, .skill-card, .timeline-item, .certificate-card, .profile-photo-frame, .profile-info"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item, index) {
            item.classList.add("js-reveal");
            item.style.transitionDelay = (index % 3) * 80 + "ms";
            observer.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

 
    const certificateCards = document.querySelectorAll("[data-certificate-src]");
    const modal = document.getElementById("certificateModal");
    const modalTitle = document.getElementById("certificateModalTitle");
    const modalImage = document.getElementById("certificateModalImage");
    const modalMessage = document.getElementById("certificateModalMessage");
    const originalLink = document.getElementById("certificateOpenOriginal");

    function closeCertificateModal() {
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (modalImage) {
            modalImage.removeAttribute("src");
            modalImage.hidden = false;
        }
        if (modalMessage) modalMessage.hidden = true;
        if (originalLink) originalLink.hidden = true;
    }

    certificateCards.forEach(function (card) {
        card.addEventListener("click", function () {
            if (!modal || !modalImage || !modalTitle || !modalMessage || !originalLink) return;

            const src = card.getAttribute("data-certificate-src");
            modalTitle.textContent = card.getAttribute("data-certificate-title") || "Certificate";
            modalMessage.hidden = true;
            modalMessage.textContent = "";
            modalImage.hidden = false;
            originalLink.hidden = true;
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");

            modalImage.onload = function () {
                modalImage.hidden = false;
                modalMessage.hidden = true;
                originalLink.href = src;
                originalLink.hidden = false;
            };

            modalImage.onerror = function () {
                modalImage.hidden = true;
                modalMessage.textContent =
                    "The original certificate file has not been added yet. Add the matching image to wwwroot/images/certificates, then try again.";
                modalMessage.hidden = false;
                originalLink.hidden = true;
            };

            modalImage.src = src;
        });
    });

    if (modal) {
        modal.querySelectorAll("[data-close-certificate]").forEach(function (element) {
            element.addEventListener("click", closeCertificateModal);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
                closeCertificateModal();
            }
        });
    }
});
