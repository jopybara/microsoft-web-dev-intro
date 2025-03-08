/**
 * Filters the displayed projects based on the selected category.
 *
 * @param {string} category - The category to filter projects by. If 'all', all projects will be displayed.
 */
const  filterProjects = (category) => {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

/**
 * Toggles the "invalid-input" class on the specified element based on the status.
 *
 * @param {HTMLElement} element - The DOM element to toggle the class on.
 * @param {boolean} status - The status indicating whether to add or remove the class.
 */
const toggleInvalidClass = (element, status) => {
    if (status) {
        element.classList.add("invalid-input");
    } else {
        element.classList.remove("invalid-input");
    }
}

const toggleMenu = () => {
    const nav = document.querySelector('nav ul');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

/**
 * Handles the click event on navigation links to smoothly scroll to the target section.
 *
 * @param {Event} e - The click event object.
 */
const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Handles the click event for the filter button.
 * Retrieves the category from the clicked button's data attribute
 * and calls the filterProjects function with the category.
 *
 * @param {Event} e - The click event object.
 */
const handleFilterButtonClick = (e) => {
    const category = e.target.getAttribute('data-category');
    filterProjects(category);
}

/**
 * Handles the click event on an image to display it in a modal.
 *
 * @param {Event} e - The click event object.
 */
const handleImageClick = (e) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${e.target.src}" alt="${e.target.alt}">
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Handles the form submission event.
 * Validates the form fields and displays error messages if necessary.
 * If the form is valid, displays a success message and resets the form.
 *
 * @param {Event} e - The form submission event.
 */
const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');
    let valid = true;

    if (name.value.trim() === '') {
        toggleInvalidClass(name, true);
        name.nextElementSibling.textContent = 'Name is required';
        valid = false;
    } else {
        toggleInvalidClass(name, false);
        name.nextElementSibling.textContent = '';
    }

    if (email.value.trim() === '') {
        toggleInvalidClass(email, true);
        email.nextElementSibling.textContent = 'Email is required';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
        toggleInvalidClass(email, true);
        email.nextElementSibling.textContent = 'Email is invalid';
        valid = false;
    } else {
        toggleInvalidClass(email, false);
        email.nextElementSibling.textContent = '';
    }

    if (message.value.trim() === '') {
        toggleInvalidClass(message, true);
        message.nextElementSibling.textContent = 'Message is required';
        valid = false;
    } else {
        toggleInvalidClass(message, false);
        message.nextElementSibling.textContent = '';
    }

    if (valid) {
        alert('Form submitted successfully!');
        e.target.reset();
    }
}

/**
 * Handles the input change event for form validation.
 *
 * @param {Event} e - The input change event object.
 */
const handleInputChange = (e) => {
    if (e.target.value.trim() === '') {
        toggleInvalidClass(e.target, true);
        e.target.nextElementSibling.textContent = `${e.target.getAttribute('data-name')} is required`;
    } else {
        toggleInvalidClass(e.target, false);
        e.target.nextElementSibling.textContent = '';
    }

    if (e.target.type === 'email' && e.target.value.trim() !== '' && !/\S+@\S+\.\S+/.test(e.target.value.trim())) {
        toggleInvalidClass(e.target, true);
        e.target.nextElementSibling.textContent = 'Email is invalid';
    }
}

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', handleNavClick);
});

document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', handleFilterButtonClick);
});

document.querySelectorAll('.project img').forEach(image => {
    image.addEventListener('click', handleImageClick);
});

document.querySelector('#contact-form').addEventListener('submit', handleFormSubmit);

document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('input', handleInputChange);
});
