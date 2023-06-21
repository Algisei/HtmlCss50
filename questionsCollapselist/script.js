// Get references to HTML elements with the class "faq-toggle"
const toggles = document.querySelectorAll('.faq-toggle')

// Add click event listeners to each toggle
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.parentNode.classList.toggle('active') // Toggle the "active" class on the parent element of the clicked toggle
    })
})