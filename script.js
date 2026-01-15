document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile nav when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetHeader = document.querySelector(targetId);
            
            if (targetHeader) {
                const headerOffset = 80;
                const elementPosition = targetHeader.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card, .edu-card, .skill-category, .timeline-item');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        card.classList.add('fade-up');
        observer.observe(card);
    });
});

// Add CSS classes for animations dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .fade-in {
        opacity: 0;
        transition: opacity 1s ease-out;
    }
    .fade-in.visible {
        opacity: 1;
    }
    
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .fade-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);
