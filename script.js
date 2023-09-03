"use strict";

  const popUp = document.getElementById("pop-up");
  const htoeNum = document.getElementById("htoe-num");
  const htoeRNum = document.getElementById("htoe-r-num");
  const amountInput = document.getElementById("amount-input");
  const amountInputR = document.getElementById("amount-input-r");
  const htoeRNumContainer = document.getElementById("htoe-r-num-container");

  // Create an object to store amounts for each number
  const numberAmounts = {};

  function reverseNumber(num) {
    // Convert the number to a string, split it, reverse it, and join it back as a string
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
  
    // Check if the entered amount is a valid number
    if (!isNaN(enteredAmount) && enteredAmount >= 0) {
      // Check if the number is already in the object
      if (numberAmounts.hasOwnProperty(clickedNum)) {
        // If it is, add the entered amount to the existing amount
        numberAmounts[clickedNum] += enteredAmount;
      } else {
        // If it's not, create a new entry in the object
        numberAmounts[clickedNum] = enteredAmount;
      }
    } else {
      // Handle invalid input (negative or non-numeric amount)
      console.log("Invalid amount input.");
    }
  
    // Check if the entered amount for the reversed number is a valid number
    if (!isNaN(enteredAmountR) && enteredAmountR >= 0) {
      // Check if the number is already in the object
      if (numberAmounts.hasOwnProperty(clickedRNum)) {
        // If it is, add the entered amount to the existing amount
        numberAmounts[clickedRNum] += enteredAmountR;
      } else {
        // If it's not, create a new entry in the object
        numberAmounts[clickedRNum] = enteredAmountR;
      }
    } else {
      // Handle invalid input (negative or non-numeric amount)
      console.log("Invalid amount input for reversed number.");
    }
  
    // Clear the amount input fields
    amountInput.value = "";
    amountInputR.value = "";
  
    // Sort the numbers by their amounts in descending order
    const sortedNumbers = Object.keys(numberAmounts).sort((a, b) => {
      return numberAmounts[b] - numberAmounts[a];
    });
  
    // Log the numbers and their amounts in sorted order
    sortedNumbers.forEach((num) => {
      console.log(`${num} = ${numberAmounts[num]}`);
    });

    updateTable();
  
    // Hide the pop-up and show the nums class
    popUp.classList.add("not-show");
    popUp.classList.remove("show");
    nums.classList.remove("not-show");
  }

  function updateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the existing rows
  
    const numbers = Object.keys(numberAmounts);
    const totalAmount = numbers.reduce((total, num) => total + numberAmounts[num], 0);
  
    // Sort numbers by totalAmount in descending order
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
  }
  
