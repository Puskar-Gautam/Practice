const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Switch the icon
    if (body.classList.contains('light-mode')) {
        themeToggle.innerText = '☀️';
    } else {
        themeToggle.innerText = '🌙';
    }
});


/* --- TYPEWRITER EFFECT --- */
const textElement = document.querySelector('.typewriter-text');
const phrases = [
    "Electrical Engineer", 
    "Computer Vision Enthusiast", 
    "Full-Stack Developer", 
    "Tech Leader"
];

let phraseIndex = 0;     // Which phrase are we on?
let charIndex = 0;       // Which character are we typing?
let isDeleting = false;  // Are we typing or deleting?
let typeSpeed = 100;     // Speed of typing

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove a character
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Deleting is faster
    } else {
        // Add a character
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Typing is normal speed
    }

    // Logic to switch between typing and deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Finished typing the phrase, pause before deleting
        isDeleting = true;
        typeSpeed = 2000; // Wait 2 seconds so people can read it
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start
        typeSpeed = 500; // Small pause before typing next one
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the animation when page loads
document.addEventListener('DOMContentLoaded', typeEffect);


/* --- PROJECT MODAL LOGIC --- */
const modal = document.getElementById("project-modal");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");
const modalLink = document.getElementById("modal-link");
const closeModal = document.querySelector(".close-modal");

// Select all project cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        // 1. Get data from the clicked card
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-desc");
        const tech = card.getAttribute("data-tech");
        const link = card.getAttribute("data-link");
        const imgSrc = card.querySelector("img").src;

        // 2. Populate the modal
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modalTech.innerText = "Tech Stack: " + tech;
        modalLink.href = link;
        modalImg.src = imgSrc;

        // 3. Show the modal
        modal.style.display = "flex";
    });
});

// Close when clicking the X
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close when clicking outside the modal content
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});


/* --- CONTACT FORM HANDLING --- */
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Stop the page from reloading/redirecting

        // 1. Show loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // 2. Gather the data
        const formData = new FormData(contactForm);

        // 3. Send to Formspree via AJAX
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // SUCCESS
                formStatus.style.display = "block";
                formStatus.style.color = "#4facfe"; // Your theme blue
                formStatus.innerText = "Thanks! Your message has been sent.";
                contactForm.reset(); // Clear the form inputs
                submitBtn.innerText = "Message Sent";
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    formStatus.style.display = "none";
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                // ERROR FROM SERVER
                throw new Error('Server error');
            }
        } catch (error) {
            // NETWORK ERROR
            formStatus.style.display = "block";
            formStatus.style.color = "red";
            formStatus.innerText = "Oops! There was a problem sending your message.";
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}