// Select the input field directly
const input = document.querySelector(".input");

// Select all buttons
const buttons = document.querySelectorAll("button");

// Define special characters
const specialChars = ["%", "*", "/", "-", "+", "="];

// Initialize output variable
let output = "";

// Define a function to perform calculations
const calculate = (btnValue) => {
    // If the clicked button is "=", perform calculation
    if (btnValue === "=" && output !== "") {
        // Evaluate the expression, replace "%" with "/100" if present
        output = eval(output.replace("%", "/100"));
    } else if (btnValue === "AC"){  // If the clicked button is "AC", clear the output
        output = "";
    } else if (btnValue === "DEL"){ // If the clicked button is "DEL", delete the last character from output
        output = output.toString().slice(0, -1);
    } else {  // For other buttons
        // If output is empty and the clicked button is a special character, do nothing
        if (output === "" && specialChars.includes(btnValue)) return;
        // Append the clicked button value to the output
        output += btnValue;
    }

    // Update the value of the input field
    input.value = output;
}

// Add click event listeners to all buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        // Call the calculate function with the value of the clicked button
        calculate(e.target.dataset.value);
    });
}
