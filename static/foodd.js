document.addEventListener("DOMContentLoaded", function () {
    var placeContainers = document.querySelectorAll(".place-container");

    // Add scroll event listener to highlight when scrolled into view
    window.addEventListener("scroll", function () {
        placeContainers.forEach(function (placeContainer) {
            if (isElementInViewport(placeContainer)) {
                placeContainer.classList.add("highlight-scroll");
            } else {
                placeContainer.classList.remove("highlight-scroll");
            }
        });
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

// Function to handle the animation when pointed or scrolled to the particular place
function handleAnimationOnHover() {
    placeContainers.forEach((container) => {
        container.addEventListener('mouseenter', () => {
            const buttons = container.querySelector('.buttons');
            buttons.style.animation = 'slideInUp 0.5s ease forwards';
            buttons.style.opacity = 1;
        });

        container.addEventListener('mouseleave', () => {
            const buttons = container.querySelector('.buttons');
            buttons.style.animation = '';
            buttons.style.opacity = 0;
        });
    });
}

// Function to handle the animation when scrolled to the particular place
function handleAnimationOnScroll() {
    placeContainers.forEach((container) => {
        if (isInViewport(container)) {
            const buttons = container.querySelector('.buttons');
            buttons.style.animation = 'slideInUp 0.5s ease forwards';
            buttons.style.opacity = 1;
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', () => {
    handleAnimationOnScroll();
});

// Initial check when the page loads
handleAnimationOnScroll();

// Call the function to handle animation on hover
handleAnimationOnHover();
