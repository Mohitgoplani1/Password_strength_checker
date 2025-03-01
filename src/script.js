// Get the necessary DOM elements
var pass = document.getElementById("password"); // Password input field
var msg = document.getElementById("message"); // Element to display the password strength message
var strengthMeter = document.getElementById("strength-meter"); // Element for the visual strength meter
const togglePassword = document.getElementById("togglePassword"); // Eye icon to toggle password visibility

// Event listener for password input changes
pass.addEventListener("input", () => {
    let val = pass.value; // Current value of the password field
    let length = val.length; // Length of the entered password
    let strengthScore = 0; // Initialize password strength score

    // Check for various password conditions and increment strength score
    if (val.match(/[a-z]/g)) strengthScore++; // Contains lowercase letters
    if (val.match(/[A-Z]/g)) strengthScore++; // Contains uppercase letters
    if (val.match(/[0-9]/g)) strengthScore++; // Contains numbers
    if (val.match(/[^a-zA-Z\d]/g)) strengthScore++; // Contains special characters

    // Calculate the number of unique characters in the password
    let uniqueChars = new Set(val).size;

    // Update password requirements indicators
    const reqLowercase = document.getElementById("req-lowercase"); // Requirement for lowercase letters
    const reqUppercase = document.getElementById("req-uppercase"); // Requirement for uppercase letters
    const reqNumber = document.getElementById("req-number"); // Requirement for numbers
    const reqSpecial = document.getElementById("req-special"); // Requirement for special characters
    const reqLength = document.getElementById("req-length"); // Requirement for minimum length

    // Toggle 'met' class for each requirement based on the password's content
    val.match(/[a-z]/g) ? reqLowercase.classList.add("met") : reqLowercase.classList.remove("met");
    val.match(/[A-Z]/g) ? reqUppercase.classList.add("met") : reqUppercase.classList.remove("met");
    val.match(/[0-9]/g) ? reqNumber.classList.add("met") : reqNumber.classList.remove("met");
    val.match(/[^a-zA-Z\d]/g) ? reqSpecial.classList.add("met") : reqSpecial.classList.remove("met");
    length >= 8 ? reqLength.classList.add("met") : reqLength.classList.remove("met");

    // Update the strength meter and message based on password strength
    if (length < 8) {
        msg.innerHTML = "Very Weak"; // Message for short passwords
        strengthMeter.style.width = `${(length / 8) * 20}%`; // Meter width proportional to password length
        strengthMeter.style.backgroundColor = "#ff5925"; // Weak strength color
    } else {
        switch (strengthScore) {
            case 1:
                msg.innerHTML = "Weak"; // Message for weak passwords
                strengthMeter.style.width = "40%"; // Meter width for weak passwords
                strengthMeter.style.backgroundColor = "#FFD700"; // Yellow color for weak
                break;
            case 2:
                msg.innerHTML = "Moderate"; // Message for moderate strength
                strengthMeter.style.width = "60%"; // Meter width for moderate strength
                strengthMeter.style.backgroundColor = "#4dbd74"; // Light green for moderate
                break;
            case 3:
                msg.innerHTML = "Good"; // Message for good passwords
                strengthMeter.style.width = "80%"; // Meter width for good strength
                strengthMeter.style.backgroundColor = "#2d89ef"; // Blue for good
                break;
            case 4:
                msg.innerHTML = "Strong"; // Message for strong passwords
                strengthMeter.style.width = "100%"; // Full width for strong passwords
                strengthMeter.style.backgroundColor = "#26d730"; // Dark green for strong
                break;
        }
    }
});

// Event listener for toggling password visibility
togglePassword.addEventListener("click", function () {
    // Toggle password field type between "password" and "text"
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // Toggle the eye icon class to indicate visibility change
    this.classList.toggle("fa-eye-slash");
});
