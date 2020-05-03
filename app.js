// DOM Elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".value");

const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");

const additionEl = document.querySelector(".addition");
const subtractionEl = document.querySelector(".subtraction");
const divisionEl = document.querySelector(".division");
const multiplicationEl = document.querySelector(".multiplication");
const equalEl = document.querySelector(".equal");

const decimalEl = document.querySelector(".decimal");
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");

// For Loop
const numberElArray = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El
];
// variables
let valueStrInMemory = null; // prev result
let operatorInMemory = null;

// Functions

const getValueAsStr = () => valueEl.textContent.split(",").join(""); // get rid of the ","

const getValueAsNum = () => {
  return parseFloat(getValueAsStr()); // get
};

const setStrAsValue = valueStr => {
  if (valueStr[valueStr.length - 1] === ".") {
    valueEl.textContent += ".";
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    valueEl.textContent = parseFloat(valueStr).toLocaleString();
  }
};
const handleNumberClick = numStr => {
  const currentValueStr = getValueAsStr(); // always grab as "string" from DOM textContent
  // 2,222

  // update
  if (currentValueStr === "0") {
    // valueEl.textContent = numStr; // click(numStr), Default "0"
    setStrAsValue(numStr);
  } else {
    // valueEl.textContent = parseFloat(currentValueStr + numStr).toLocaleString();
    setStrAsValue(currentValueStr + numStr);
    // toLocaleString()  automatically puts commas(,) into thousands. and it doesn't like more than 3 digits decimal
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = operation => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue("0");
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue("0");
};

// Add Event Listeners to function
acEl.addEventListener("click", () => {
  setStrAsValue("0");
  // reset
  valueStrInMemory = null;
  operatorInMemory = null;
});

pmEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === "-0") {
    setStrAsValue("0");
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1)); // get rid of '-'
  }
});

percentEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// add event listeners to operators
additionEl.addEventListener("click", () => {
  handleOperatorClick("addition");
});
subtractionEl.addEventListener("click", () => {
  handleOperatorClick("subtraction");
});
multiplicationEl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});
divisionEl.addEventListener("click", () => {
  handleOperatorClick("division");
});
equalEl.addEventListener("click", () => {
  if (valueStrInMemory) {
    setStrAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// Add Event Listeners to numbers and decimal
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener("click", () => {
    // string (to add the number for value '0')
    handleNumberClick(i.toString());
  });
}
decimalEl.addEventListener("click", () => {
  // "." click =>  , 제거한 값을 가지고 온다.
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes(".")) {
    // valueEl.textContent = currentValueStr + ".";
    setStrAsValue(currentValueStr + ".");
  }
});

// Set up the time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour = currentHour - 12;
    hourEl.innerHTML = currentHour;
    minuteEl.innerHTML = currentMinute.toString().padStart(2, "0") + " pm";
  } else {
    // String
    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, "0"); // max 2 or 0 ("String")
  }
};
setInterval(updateTime, 1000);
updateTime(); // To remove the default value. That's why I start the function right away.

// what goes inside textContent of DOM element "String"
// Get number and then change it to "String"
// padStart works with String ("maxNumber", "0")
