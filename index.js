"use strict";

// Accounts of User
const account1 = {
  name: "Abed Ashraf",
  movements: [
    400, 600, -100, 500, -250, 300, -280, -200, 100, 200, 450, 1200, -370, -270,
  ],
};

const account2 = {
  name: "John Wick",
  movements: [
    500, -250, -200, 100, 200, -270, 300, -350, 280, 765, 700, 900, 560, -230,
  ],
};

const accounts = [account1, account2];

// Selceting Class Elements for DOM

const movementsContainer = document.querySelector(".statement-row-main");
const removeBtn = document.querySelector(".remove-tran");
const lastTrans = document.querySelector(".last-tran");
const depositBtn = document.querySelector(".btn-deposit");
const withdrawBtn = document.querySelector(".btn-withdraw");
const amountToAddOrRemove = document.querySelector(".amount-enter");

//Display User`s Name

document.querySelector(
  ".name-section"
).textContent = `Welcome ${account2.name}`;

// Display Movements Using DOM

const displayMovements = function (movements) {
  movementsContainer.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `<div class="statement-row ${type}">
                    <p>${i + 1} ${type}</p>
                    <p>17/02/2024</p>
                    <p>£${mov}</p>
                  </div>`;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account2.movements);

// Display Last Transaction

const displayLastTrans = function () {
  lastTrans.innerHTML = "";
  const lastNumber = account2.movements[account2.movements.length - 1];

  if (lastNumber) {
    const type2 = lastNumber > 0 ? "deposit" : "withdraw";
    const html2 = `<p>Last ${type2}</p>
                   <p>£${lastNumber}</p>`;
    lastTrans.insertAdjacentHTML("afterbegin", html2);
  } else {
    const html2 = `<p>No Transaction Found</p>
                   <p>Account Balance = £0 </p>`;
    lastTrans.insertAdjacentHTML("afterbegin", html2);
  }
};
displayLastTrans();

// Deposit or Withdraw
const depositOrWithdraw = function (btnUsed) {
  const valueEnterd = Number(amountToAddOrRemove.value);
  if (valueEnterd) {
    const amountValue = btnUsed === "deposit" ? valueEnterd : -valueEnterd;
    account2.movements.push(amountValue);
    console.log(account2.movements);
    displayMovements(account2.movements);
    displayLastTrans();
  }
};
// Deposit Amount to transaction
depositBtn.addEventListener("click", function (e) {
  e.preventDefault();
  depositOrWithdraw("deposit");
});

// Withdraw Amount to transaction
withdrawBtn.addEventListener("click", function (e) {
  e.preventDefault();
  depositOrWithdraw();
});

// Remove Last Transcation
removeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  account2.movements.pop();
  displayMovements(account2.movements);
  displayLastTrans();
});

// Create Username using forEach and Map Method

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.name
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

document.querySelector(".username-section").textContent = account2.username;
