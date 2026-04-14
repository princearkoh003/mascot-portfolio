document.addEventListener('DOMContentLoaded', () => {

    // 1. Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Smooth Scrolling for Nav Links (handled by CSS, but we can enhance it here if needed)
    // CSS scroll-behavior: smooth is active.

    // 3. Form Submission via Formspree
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // IMPORTANT: Replace the URL below with your actual Formspree form endpoint!
    // Example: 'https://formspree.io/f/xabcdefg'
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrergrlk';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Basic UI feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.style.color = 'var(--clr-accent)';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.style.color = 'red';
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }
        });
    }

    // 4. Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.section, .glow-card');
    
    // initially add fade-in class
    animatedElements.forEach(el => el.classList.add('fade-in'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // If it's the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        // The actual width is set via inline style in HTML, let's trigger it.
                        // We reset width to inline width by capturing it first.
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200);
                    });
                }

                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

});
