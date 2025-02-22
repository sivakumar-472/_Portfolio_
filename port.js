let exp = document.getElementById("experience")
let exp1 = document.getElementById("exp")
let skill = document.getElementById("Skills")
let skill2 = document.getElementById("skill1")
let eadu = document.getElementById("education")
let eadu1 = document.getElementById("eadu")


exp1.classList.remove("active-link")
eadu1.classList.remove("active-link")

exp1.addEventListener("click", () => {
    exp.style.display = "block"
    skill.style.display = "none"
    eadu.style.display = "none"
    exp1.classList.add("active-link")
    skill2.classList.remove("active-link")
    eadu1.classList.remove("active-link")


})


skill2.addEventListener("click", () => {
    skill.style.display = "block"
    exp.style.display = "none"
    eadu.style.display = "none"
    skill2.classList.add("active-link")
    eadu1.classList.remove("active-link")
    exp1.classList.remove("active-link")

})

eadu1.addEventListener("click", () => {
    eadu.style.display = "block"
    exp.style.display = "none"
    exp1.classList.remove("active-link")
    eadu1.classList.add("active-link")
    skill.style.display = "none"
    skill2.classList.remove("active-link")

})






document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(this);
    
    // Validate email format
    const email = formData.get('email');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Proceed with form submission after logging
    fetch(this.action, {
        method: this.method,
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert('Form submitted successfully!');

            // Clear form fields after 2 seconds
            setTimeout(() => {
                event.target.reset();
            }, 1000);
        } else {
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form. Please check your internet connection.');
    });
});



const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav1');
const nav = document.getElementById("btn1")
console.log(navMenu)

// Add click event listener to the toggle button
navToggle.addEventListener('click', () => {
    if (navMenu.style.display === "block") {
        navMenu.style.display = 'none'
    }
    else {
        navMenu.style.display = 'block'
        
    }
})
