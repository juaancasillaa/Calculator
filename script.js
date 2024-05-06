// Select the input field directly
const input = document.querySelector(".input");

// Select all buttons
const buttons = document.querySelectorAll("button");

// Define special characters
const specialChars = ["%", "*", "/", "-", "+", "="];

// Initialize output variable
let output = "";

const calculate = (btnValue) => {
    try {
        // If the clicked button is "=", perform calculation
        if (btnValue === "=" && output !== "") {
            // Evaluate the expression, replace "%" with "/100" if present
            output = eval(output.replace("%", "/100"));
            
            // Check for division by zero or other errors
            if (!Number.isFinite(output) || isNaN(output)) {
                throw new Error("Error: Invalid operation");
            }
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
    } catch (error) {
        // Handle errors gracefully
        console.error(error.message);
        output = "Error";
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


// Add event listener for keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Map keyboard keys to their corresponding button values
    const keyMappings = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '.': '.',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '%': '%',
        'Enter': '=',
        'Escape': 'AC',
        'Backspace': 'DEL'
    };

    // If the pressed key is mapped to a button value, call the calculate function with that value
    if (keyMappings.hasOwnProperty(key)) {
        calculate(keyMappings[key]);
    }
});