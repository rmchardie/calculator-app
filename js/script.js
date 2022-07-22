// Constants to access and store theme elements
const root = document.documentElement;
const themeContainer = document.querySelector(".theme-switcher");
const thumb1 = document.querySelector("#thumb1");
const thumb2 = document.querySelector("#thumb2");
const thumb3 = document.querySelector("#thumb3");
const themeBtn = document.querySelector(".theme-switcher-thumb");
const themeOne = document.querySelector(".theme-one");
const themeTwo = document.querySelector(".theme-two");
const themeThree = document.querySelector(".theme-three");
const storedTheme = localStorage.getItem("theme");

// Constants to access calculator elements
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("Escape");
const delBtn = document.querySelector(".delete-btn");

// Calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
let i = 1;

// Check to see if user prefers dark mode, load saved preference and move theme slider to correct position
function checkPreference() {
  const dark = matchMedia("(prefers-color-scheme: dark)").matches;

  if (dark) {
    changeTheme(3, thumb1, thumb2, thumb3);
  } else if (storedTheme) {
    i = parseInt(storedTheme);
    switch (storedTheme) {
      case "1":
        changeTheme(parseInt(storedTheme), thumb3, thumb2, thumb1);
        break;
      case "2":
        changeTheme(parseInt(storedTheme), thumb1, thumb3, thumb2);
        break;
      case "3":
        changeTheme(parseInt(storedTheme), thumb1, thumb2, thumb3);
        break;
    }
  }
}

// When user clicks on slider or theme number, transition the theme colors
function changeTheme(themeNumber, hideMe, hideMeToo, showMe) {
  showMe.style.opacity = 1;
  hideMe.style.opacity = 0;
  hideMeToo.style.opacity = 0;
  switch (themeNumber) {
    case 1:
      root.style.setProperty("--main-bg", "hsl(222, 26%, 31%)");
      root.style.setProperty("--toggle-bg", "hsl(223, 31%, 20%)");
      root.style.setProperty("--keypad-bg", " hsl(223, 31%, 20%)");
      root.style.setProperty("--screen-bg", "hsl(224, 36%, 15%)");
      root.style.setProperty("--key-bg", "hsl(30, 25%, 89%)");
      root.style.setProperty("--key-shadow", "hsl(28, 16%, 65%)");
      root.style.setProperty("--remove-key-bg", "hsl(225, 21%, 49%)");
      root.style.setProperty("--remove-key-shadow", "hsl(224, 28%, 35%)");
      root.style.setProperty("--equals-key-bg", "hsl(6, 63%, 50%)");
      root.style.setProperty("--equals-key-shadow", "hsl(6, 70%, 34%)");
      root.style.setProperty("--keypad-text", "hsl(221, 14%, 31%)");
      root.style.setProperty("--function-key-text", "hsl(0, 0%, 100%)");
      root.style.setProperty("--title-text", "hsl(0, 0%, 100%)");
      localStorage.setItem("theme", "1");
      i = 1;
      break;
    case 2:
      themeContainer.style.justifyContent = "center";
      root.style.setProperty("--main-bg", "hsl(0, 0%, 90%)");
      root.style.setProperty("--toggle-bg", "hsl(0, 5%, 81%)");
      root.style.setProperty("--keypad-bg", "hsl(0, 5%, 81%)");
      root.style.setProperty("--screen-bg", "hsl(0, 0%, 93%)");
      root.style.setProperty("--key-bg", "hsl(45, 7%, 89%)");
      root.style.setProperty("--key-shadow", "hsl(35, 11%, 61%");
      root.style.setProperty("--remove-key-bg", "hsl(185, 42%, 37%");
      root.style.setProperty("--remove-key-shadow", "hsl(185, 58%, 25%)");
      root.style.setProperty("--equals-key-bg", "hsl(25, 98%, 40%)");
      root.style.setProperty("--equals-key-shadow", "hsl(25, 99%, 27%)");
      root.style.setProperty("--keypad-text", "hsl(60, 10%, 19%)");
      root.style.setProperty("--function-key-text", "hsl(0, 0%, 100%)");
      root.style.setProperty("--title-text", "hsl(60, 10%, 19%)");
      localStorage.setItem("theme", "2");
      i = 2;
      break;
    case 3:
      themeContainer.style.justifyContent = "flex-end";
      root.style.setProperty("--main-bg", "hsl(268, 75%, 9%)");
      root.style.setProperty("--toggle-bg", "hsl(268, 71%, 12%)");
      root.style.setProperty("--keypad-bg", "hsl(268, 71%, 12%)");
      root.style.setProperty("--screen-bg", "hsl(268, 71%, 12%)");
      root.style.setProperty("--key-bg", "hsl(268, 47%, 21%)");
      root.style.setProperty("--key-shadow", "hsl(290, 70%, 36%)");
      root.style.setProperty("--remove-key-bg", "hsl(281, 89%, 26%)");
      root.style.setProperty("--remove-key-shadow", "hsl(285, 91%, 52%");
      root.style.setProperty("--equals-key-bg", "hsl(176, 100%, 44%");
      root.style.setProperty("--equals-key-shadow", "hsl(177, 92%, 70%)");
      root.style.setProperty("--keypad-text", "hsl(52, 100%, 62%");
      root.style.setProperty("--function-key-text", "hsl(0, 0%, 100%)");
      root.style.setProperty("--title-text", "hsl(52, 100%, 62%");
      localStorage.setItem("theme", "3");
      i = 3;
      break;
  }
}

// When user presses a key, change the style of the key
function changeKeyStyle(key) {
  document.getElementById(key).classList.add("button-down");
  setTimeout(() => {
    document.getElementById(key).classList.remove("button-down");
  }, 100);
}

// When user presses a key, call the appropriate function
function handleKeyPress(e) {
  switch (e.key) {
    case "Backspace":
      changeKeyStyle(e.key);
      removeCharacter();
      break;
    case "Escape":
      changeKeyStyle(e.key);
      resetAll();
      break;
    case "Delete":
      changeKeyStyle("Backspace");
      resetAll();
      break;
    case ".":
      changeKeyStyle(e.key);
      addDecimal();
      break;
    case "/":
      changeKeyStyle(e.key);
      useOperator(e.key);
      break;
    case "*":
      changeKeyStyle(e.key);
      useOperator(e.key);
      break;
    case "+":
      changeKeyStyle(e.key);
      useOperator(e.key);
      break;
    case "-":
      changeKeyStyle(e.key);
      useOperator(e.key);
      break;
    case "Enter":
      changeKeyStyle("=");
      useOperator("=");
      break;
    default:
      // Check to see if the key pressed was a number key, if it was, call the functions
      if (!isNaN(e.key)) {
        changeKeyStyle(e.key);
        sendNumberValue(e.key);
      } else {
        console.error(e.key + " is not a valid key!");
      }

      break;
  }
}

// Format calculator display to indicate thousands etc
function formatNumber(numToFormat) {
  let decimals = "";
  // remove any pre-existing commas as it will upset the parseFloat later on
  numToFormat = numToFormat.toString().replaceAll(/,/g, "");

  //if the number contains a period, then preserve the decimal digits as toLocaleString() removes trailing zeros
  if (numToFormat.indexOf(".") >= 0) {
    decimals = "." + numToFormat.split(".")[1];
    numToFormat = numToFormat.split(".")[0];
  }

  // return the formatted number
  return (
    parseFloat(numToFormat).toLocaleString("en-US", {
      maximumFractionDigits: 8,
    }) + decimals
  );
}

// Update calculator display
function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : formatNumber(displayValue + number);
  }
}

// Remove last entered / clicked digit
function removeCharacter() {
  let displayText = calculatorDisplay.textContent;
  if (displayText.length === 1) {
    calculatorDisplay.textContent = "0";
  } else {
    calculatorDisplay.textContent = displayText.slice(0, -1);
  }
}

// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Use operator
function useOperator(operator) {
  const displayText = calculatorDisplay.textContent.replaceAll(/,/g, "");
  const currentValue = Number(displayText);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = formatNumber(calculation);
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// When user clicks the decimal button, call this function
function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Add Event Listeners for numbers, operators, decimal buttons
themeOne.addEventListener("click", () => {
  changeTheme(1, thumb3, thumb2, thumb1);
});
themeTwo.addEventListener("click", () => {
  changeTheme(2, thumb1, thumb3, thumb2);
});
themeThree.addEventListener("click", () => {
  changeTheme(3, thumb1, thumb2, thumb3);
});

thumb1.addEventListener("click", () => {
  if (i === 1) {
    changeTheme(2, thumb3, thumb1, thumb2);
  } else {
    changeTheme(1, thumb3, thumb2, thumb1);
  }
});

thumb2.addEventListener("click", () => {
  if (i === 2) {
    changeTheme(3, thumb1, thumb2, thumb3);
  } else {
    changeTheme(2, thumb1, thumb3, thumb2);
  }
});

thumb3.addEventListener("click", () => {
  if (i === 3) {
    changeTheme(1, thumb3, thumb2, thumb1);
  } else {
    changeTheme(3, thumb1, thumb2, thumb3);
  }
});

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Remove last added character
delBtn.addEventListener("click", () => {
  removeCharacter();
});

// Reset display to 0, reset values
clearBtn.addEventListener("click", () => {
  resetAll();
});

// On load
checkPreference();
document.addEventListener("keydown", handleKeyPress);
