"use strict";

// Accounts of User
const account1 = {
  name: "Jack Sparrow",
  movements: [800, 1500, -100, -500, 200, 300, 400, -500, -250, 500, 400],
  pin: 1234,
  dates: [
    "01/01/2024",
    "05/01/2024",
    "10/01/2024",
    "26/01/2024",
    "27/01/2024",
    "01/02/2024",
    "05/02/2024",
    "14/02/2024",
    "21/02/2024",
    "25/02/2024",
    "26/02/2024",
  ],
  total: 0,
  saving: 6000,
};

const account2 = {
  name: "John Wick",
  movements: [1500, -250, -200, -100, -200, 1000, 2000, -2500],
  pin: 5678,
  dates: [
    "02/02/2024",
    "04/02/2024",
    "10/02/2024",
    "11/02/2024",
    "11/02/2024",
    "26/02/2024",
    "27/02/2024",
    "29/2/2024",
  ],
  total: 0,
  saving: 3000,
};

const account3 = {
  name: "Tony Stark",
  movements: [500, 500, 1000, -750, -600],
  pin: 1111,
  dates: ["01/01/2024", "04/01/2024", "10/02/2024", "10/02/2024", "22/02/2024"],
  total: 0,
  saving: 2000,
};

const account4 = {
  name: "Harry potter",
  movements: [100, 100, -100, 500, -200],
  pin: 2222,
  dates: ["01/12/2023", "02/02/2024", "13/02/2024", "17/02/2024", "20/02/2024"],
  total: 0,
  saving: 1000,
};

const accounts = [account1, account2, account3, account4];
let currentAccount;

// Selceting Class Elements for DOM

const mainContainer = document.querySelector(".main-container");
const logInDiv = document.querySelector(".log-in-div");
const movementsContainer = document.querySelector(".statement-row-main");
const removeBtn = document.querySelector(".remove-tran");
const lastTrans = document.querySelector(".last-tran");
const showLastTran = document.querySelector(".show-last-tran");
const homeBtn = document.querySelector(".home-btn");
const depositBtn = document.querySelector(".btn-deposit");
const withdrawBtn = document.querySelector(".btn-withdraw");
const amountToAddOrRemove = document.querySelector(".amount-enter");
const displayDepositOrWithdraw = document.querySelector(".display-row");
const savingBtn = document.querySelector(".saving-btn");
const btnDepo = document.querySelector(".deposit-btn");
const btnWith = document.querySelector(".withdraw-btn");
const btnAll = document.querySelector(".all-tran-btn");
const totalBalance = document.getElementById("total-balance");
const loginBtn = document.querySelector(".login-btn");
const logOutBtn = document.querySelector(".logout-btn");
const loginUsername = document.querySelector(".login-username");
const loginPin = document.querySelector(".login-pin");
const userName = document.querySelector(".username-section");
const nameOfUser = document.querySelector(".name-section");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const msgLable = document.querySelector(".message");
const dateLabel = document.querySelector(".date-label");

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// Generate Date
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = `${now.getFullYear()}`.padStart(2, 0);
const today = `${day}/${month}/${year}`;

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

// Login Function
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.username === loginUsername.value);
  if (currentAccount && currentAccount.pin === Number(loginPin.value)) {
    //Display User`s Name
    logInDiv.classList.add("hidden");
    mainContainer.classList.remove("hidden");

    document.querySelector(".error").classList.add("hidden");

    nameOfUser.textContent = `Welcome ${currentAccount.name}`;

    displayMovements(currentAccount.movements, currentAccount.dates);
    loginPin.value = loginUsername.value = "";
    loginUsername.classList.add("hidden");
    loginPin.classList.add("hidden");
    loginBtn.classList.add("hidden");
    logOutBtn.classList.remove("hidden");
    // loginPin.blur();
    // displayLastTrans();
  } else {
    document.querySelector(".error").classList.remove("hidden");
    if (!mainContainer.classList.contains("hidden")) {
      mainContainer.classList.add("hidden");
    }
  }
});

//LogOut Button

logOutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  mainContainer.classList.add("hidden");
  logInDiv.classList.remove("hidden");
  loginUsername.classList.remove("hidden");
  loginPin.classList.remove("hidden");
  loginBtn.classList.remove("hidden");
  logOutBtn.classList.add("hidden");
});

// Deposit or Withdraw
const depositOrWithdraw = function (btnUsed) {
  const valueEnterd = Number(amountToAddOrRemove.value);
  if (valueEnterd) {
    const amountValue = btnUsed === "deposit" ? valueEnterd : -valueEnterd;
    if (btnUsed === "deposit" && valueEnterd <= currentAccount.saving) {
      currentAccount.movements.push(amountValue);
      currentAccount.dates.push(today);
      currentAccount.saving = currentAccount.saving - valueEnterd;
      displayMovements(currentAccount.movements, currentAccount.dates);
    } else if (btnUsed === "withdraw" && valueEnterd <= currentAccount.total) {
      currentAccount.movements.push(amountValue);
      currentAccount.dates.push(today);

      currentAccount.saving = currentAccount.saving + valueEnterd;
      displayMovements(currentAccount.movements, currentAccount.dates);
    } else {
      msgLable.textContent = "Not Valid";
      msgLable.style.color = "red";
    }
  }
  amountToAddOrRemove.value = "";
};

// Deposit Amount to transaction
depositBtn.addEventListener("click", function (e) {
  e.preventDefault();
  depositOrWithdraw("deposit");
});

// Withdraw Amount to transaction
withdrawBtn.addEventListener("click", function (e) {
  e.preventDefault();
  depositOrWithdraw("withdraw");
});

// Show All Transaction
btnAll.addEventListener("click", function (e) {
  e.preventDefault();
  msgLable.textContent = "Showing All transaction";
  msgLable.style.color = "Black";

  displayMovements(currentAccount.movements, currentAccount.dates);
});

// Display Last Transaction
showLastTran.addEventListener("click", function (e) {
  e.preventDefault();
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
  displayLastTrans();
});

const displayLastTrans = function () {
  lastTrans.innerHTML = "";
  const lastNumber =
    currentAccount.movements[currentAccount.movements.length - 1];
  const lastDate = currentAccount.dates[currentAccount.dates.length - 1];
  if (lastNumber) {
    const type2 = lastNumber > 0 ? "deposit" : "withdraw";
    const html2 = `<h2>${type2}
               £${lastNumber}</h2>
               <h3>${lastDate}
               `;
    lastTrans.insertAdjacentHTML("afterbegin", html2);
  } else {
    const html2 = `<p>No Transaction Found</p>
               <p>Account Balance = £0 </p>`;
    lastTrans.insertAdjacentHTML("afterbegin", html2);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !model.classList.contains(".hidden")) {
      homeFunction();
    }
  });

  // Remove Last Transcation
};
removeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // console.log(currentAccount.movements.pop());
  currentAccount.movements.pop();
  currentAccount.dates.pop();
  displayMovements(currentAccount.movements, currentAccount.dates);
  model.classList.add("hidden");
  overlay.classList.add("hidden");

  // displayLastTrans();
});
// Go Home Function
const homeFunction = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Go Home and do nothing on removing
homeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  homeFunction();
});
overlay.addEventListener("click", homeFunction);

//Display Deposit or Withdraw

const displayDemo = function (movements, str) {
  displayDepositOrWithdraw.innerHTML = "";
  movementsContainer.innerHTML = "";

  const d = movements.filter((mov) => mov > 0);
  const w = movements.filter((mov) => mov < 0);

  const take = str === "deposit" ? d : w;

  take.forEach(function (mov, i) {
    const html3 = `<div class="statement-row ${str}">
                    <p>${i + 1} ${str}</p>
                    <p>£${Math.abs(mov)}</p>
                  </div>`;

    movementsContainer.insertAdjacentHTML("afterbegin", html3);
  });
};

btnDepo.addEventListener("click", function (e) {
  e.preventDefault();

  msgLable.textContent = "Showing All Deposits";
  msgLable.style.color = "Blue";
  displayDemo(currentAccount.movements, "deposit", currentAccount.dates);
});
btnWith.addEventListener("click", function (e) {
  e.preventDefault();

  msgLable.textContent = "Showing All Withdraw";
  msgLable.style.color = "Red";
  displayDemo(currentAccount.movements, "withdraw", currentAccount.dates);
});
//////////////////////////////////////////////////////////////////////////////
// Display Movements Using DOM ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const displayMovements = function (movements, dates) {
  movementsContainer.innerHTML = "";
  displayDepositOrWithdraw.innerHTML = "";
  msgLable.textContent = "Showing All transaction";
  msgLable.style.color = "Black";
  savingBtn.textContent = `Saving : £${currentAccount.saving}`;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `<div class="statement-row ${type}">
                    <p>${i + 1} ${type}</p>
                    <p>${dates[i]}</p>
                    <p>£${Math.abs(mov).toFixed(2)}</p>
                  </div>`;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });

  //Display Total Balance

  const finalBalance = currentAccount.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );
  totalBalance.textContent = `£${finalBalance}`;
  currentAccount.total = finalBalance;
  dateLabel.textContent = `${today}`;
};
