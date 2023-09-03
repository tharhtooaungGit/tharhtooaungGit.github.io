"use strict";

// Retrieve data from localStorage or initialize an empty object
let numberAmounts = JSON.parse(localStorage.getItem("numberAmounts")) || {};
let numberEntries = JSON.parse(localStorage.getItem("numberEntries")) || {};

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

    // Check if entries exist for this number
    if (!numberEntries.hasOwnProperty(clickedNum)) {
      numberEntries[clickedNum] = [];
    }
    numberEntries[clickedNum].push(enteredAmount);
  } else {
    console.log("Invalid amount input.");
  }

  if (!isNaN(enteredAmountR) && enteredAmountR >= 0) {
    if (numberAmounts.hasOwnProperty(clickedRNum)) {
      numberAmounts[clickedRNum] += enteredAmountR;
    } else {
      numberAmounts[clickedRNum] = enteredAmountR;
    }

    // Check if entries exist for this number
    if (!numberEntries.hasOwnProperty(clickedRNum)) {
      numberEntries[clickedRNum] = [];
    }
    numberEntries[clickedRNum].push(enteredAmountR);
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
  const entriesTableBody = document.getElementById("entries-body");
  tableBody.innerHTML = "";
  entriesTableBody.innerHTML = "";

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
    // Apply the amount-highlight class if the total amount is >= 10000
    if (numberAmounts[num] >= 10000) {
      row.querySelector("td:nth-child(2)").classList.add("amount-highlight");
    }
    tableBody.appendChild(row);

    // Check if entries exist for this number
    if (numberEntries.hasOwnProperty(num)) {
      const entryRow = document.createElement("tr");
      entryRow.innerHTML = `
        <td>${num}</td>
        <td>${numberEntries[num].join(", ")}</td>
      `;
      entriesTableBody.appendChild(entryRow);
    }
  });

  // Save the updated data to localStorage
  saveData();
  saveEntries(); // Save entries data
}

function saveData() {
  localStorage.setItem("numberAmounts", JSON.stringify(numberAmounts));
}

function saveEntries() {
  localStorage.setItem("numberEntries", JSON.stringify(numberEntries));
}

function confirmDelete() {
  const confirmed = confirm("ဖျက်မှာသေချာပြီလား?");
  if (confirmed) {
    // If the user confirms, proceed with the deletion
    deleteData();
  }
}

// Function to delete all data and save an empty object to localStorage
function deleteData() {
  numberAmounts = {}; // Clear all data
  numberEntries = {}; // Clear all entries
  updateTable(); // Update the table (to clear it)
  localStorage.removeItem('numberAmounts'); // Remove data from localStorage
  localStorage.removeItem('numberEntries'); // Remove entries from localStorage
}

// Initialize the table on page load
updateTable();
