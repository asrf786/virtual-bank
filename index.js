"use strict";

// Accounts of User
const account1 = {
  movements: [400, 600, -100, 500, -250, 300, -280, -200, 100],
};

// Display Movements Using DOM

const movementsContainer = document.querySelector(".statement-row-main");
const displayMovements = function (movements) {
  movementsContainer.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "Withdraw";
    const html = `<div class="statement-row">
    <p>${i + 1} ${type}</p>
    <p>17/02/2024</p>
    <p>£${mov}</p>
  </div>`;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);
