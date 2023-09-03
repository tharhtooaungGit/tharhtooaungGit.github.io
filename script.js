"use strict";

// Retrieve data from localStorage or initialize an empty object
let numberAmounts = JSON.parse(localStorage.getItem("numberAmounts")) || {};

const popUp = document.getElementById("pop-up");
const htoeNum = document.getElementById("htoe-num");
const htoeRNum = document.getElementById("htoe-r-num");
const amountInput = document.getElementById("amount-input");
const amountInputR = document.getElementById("amount-input-r");
const htoeRNumContainer = document.getElementById("htoe-r-num-container");

function reverseNumber(num) {
  return num.toString().split("").reverse().join("");
}

function buyNum(clickedNum) {
  console.log('Clicked number: ' + clickedNum);
  popUp.classList.remove("not-show");
  popUp.classList.add("show");
  nums.classList.add("not-show");
  const reversedClickedNum = reverseNumber(clickedNum);
  console.log(reversedClickedNum);
  htoeNum.innerText = clickedNum;
  const palindromeNumbers = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99"];
  if (palindromeNumbers.includes(reversedClickedNum)) {
    htoeRNumContainer.classList.remove("show");
    htoeRNumContainer.classList.add("not-show");
  } else {
    htoeRNumContainer.classList.remove("not-show");
    htoeRNumContainer.classList.add("show");
    htoeRNum.innerText = reversedClickedNum;
  }
}

function addAmount() {
  const clickedNum = htoeNum.innerText;
  const clickedRNum = htoeRNum.innerText;
  const enteredAmount = parseFloat(amountInput.value);
  const enteredAmountR = parseFloat(amountInputR.value);

  if (!isNaN(enteredAmount) && enteredAmount >= 0) {
    if (numberAmounts.hasOwnProperty(clickedNum)) {
      numberAmounts[clickedNum] += enteredAmount;
    } else {
      numberAmounts[clickedNum] = enteredAmount;
    }
  } else {
    console.log("Invalid amount input.");
  }

  if (!isNaN(enteredAmountR) && enteredAmountR >= 0) {
    if (numberAmounts.hasOwnProperty(clickedRNum)) {
      numberAmounts[clickedRNum] += enteredAmountR;
    } else {
      numberAmounts[clickedRNum] = enteredAmountR;
    }
  } else {
    console.log("Invalid amount input for reversed number.");
  }

  amountInput.value = "";
  amountInputR.value = "";

  const sortedNumbers = Object.keys(numberAmounts).sort((a, b) => {
    return numberAmounts[b] - numberAmounts[a];
  });

  sortedNumbers.forEach((num) => {
    console.log(`${num} = ${numberAmounts[num]}`);
  });

  updateTable();

  popUp.classList.add("not-show");
  popUp.classList.remove("show");
  nums.classList.remove("not-show");
}

function updateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const numbers = Object.keys(numberAmounts);
  const totalAmount = numbers.reduce((total, num) => total + numberAmounts[num], 0);

  numbers.sort((a, b) => numberAmounts[b] - numberAmounts[a]);

  numbers.forEach((num) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${num}</td>
      <td>${numberAmounts[num]}</td>
      <td>${totalAmount}</td>
    `;
    tableBody.appendChild(row);
  });

  // Save the updated data to localStorage
  saveData();
}

function saveData() {
  localStorage.setItem("numberAmounts", JSON.stringify(numberAmounts));
}

// Function to delete all data and save an empty object to localStorage
function deleteData() {
  numberAmounts = {}; // Clear all data
  updateTable(); // Update the table (to clear it)
  localStorage.removeItem('numberAmounts'); // Remove data from localStorage
}


// Initialize the table on page load
updateTable();
