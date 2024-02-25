"use strict";

// Accounts of User
const account1 = {
  name: "Abed Ashraf",
  movements: [
    800, 1500, -100, -500, -250, -300, -280, 1200, 500, -200, 450, 1200, -370,
    -270,
  ],
  pin: 1234,
};

const account2 = {
  name: "John Wick",
  movements: [
    1500, -250, -200, -100, -200, -270, 1200, -350, -280, -765, -700, 1500,
    -560, -230,
  ],
  pin: 5678,
};

const accounts = [account1, account2];
let currentAccount;
// Selceting Class Elements for DOM

const mainContainer = document.querySelector(".container");
const movementsContainer = document.querySelector(".statement-row-main");
const removeBtn = document.querySelector(".remove-tran");
const lastTrans = document.querySelector(".last-tran");
const showLastTran = document.querySelector(".show-last-tran");
const homeBtn = document.querySelector(".home-btn");
const depositBtn = document.querySelector(".btn-deposit");
const withdrawBtn = document.querySelector(".btn-withdraw");
const amountToAddOrRemove = document.querySelector(".amount-enter");
const displayDepositOrWithdraw = document.querySelector(".display-row");
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

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

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
    mainContainer.classList.remove("hidden");

    document.querySelector(".error").classList.add("hidden");
    nameOfUser.textContent = `Welcome ${currentAccount.name}`;

    userName.textContent = currentAccount.username;

    displayMovements(currentAccount.movements);
    loginPin.value = loginUsername.value = "";
    loginUsername.classList.add("hidden");
    loginPin.classList.add("hidden");
    loginBtn.classList.add("hidden");
    logOutBtn.classList.remove("hidden");
    // loginPin.blur();
    // displayLastTrans();
  } else {
    userName.textContent = "Not Valid Username !";
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
    currentAccount.movements.push(amountValue);
    console.log(currentAccount.movements);
    displayMovements(currentAccount.movements);
    // displayLastTrans();
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
  depositOrWithdraw();
});

// Show All Transaction
btnAll.addEventListener("click", function (e) {
  e.preventDefault();
  msgLable.textContent = "Showing All transaction";
  msgLable.style.color = "Black";

  displayMovements(currentAccount.movements);
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
  console.log(lastNumber);
  if (lastNumber) {
    const type2 = lastNumber > 0 ? "deposit" : "withdraw";
    const html2 = `<h2>${type2}
               £${lastNumber}</h2>`;
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
  console.log(currentAccount.movements);
  console.log(currentAccount.movements.pop());
  displayMovements(currentAccount.movements);
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

//Display Deposi or Withdraw

const displayDemo = function (movements, str) {
  displayDepositOrWithdraw.innerHTML = "";
  movementsContainer.innerHTML = "";

  const d = movements.filter((mov) => mov > 0);
  const w = movements.filter((mov) => mov < 0);

  const take = str === "deposit" ? d : w;

  take.forEach(function (mov, i) {
    const html3 = `<div class="statement-row ${str}">
                    <p>${i + 1} ${str}</p>
                    <p>17/02/2024</p>
                    <p>£${mov}</p>
                  </div>`;

    movementsContainer.insertAdjacentHTML("afterbegin", html3);
  });
};

btnDepo.addEventListener("click", function (e) {
  e.preventDefault();

  msgLable.textContent = "Showing All Deposits";
  msgLable.style.color = "Blue";
  displayDemo(currentAccount.movements, "deposit");
});
btnWith.addEventListener("click", function (e) {
  e.preventDefault();

  msgLable.textContent = "Showing All Withdraw";
  msgLable.style.color = "Red";
  displayDemo(currentAccount.movements, "withdraw");
});
//////////////////////////////////////////////////////////////////////////////
// Display Movements Using DOM ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const displayMovements = function (movements) {
  movementsContainer.innerHTML = "";
  displayDepositOrWithdraw.innerHTML = "";
  msgLable.textContent = "Showing All transaction";
  msgLable.style.color = "Black";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `<div class="statement-row ${type}">
                    <p>${i + 1} ${type}</p>
                    <p>17/02/2024</p>
                    <p>£${mov}</p>
                  </div>`;
    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });

  //Display Total Balance

  const finalBalance = currentAccount.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );
  totalBalance.textContent = `£${finalBalance}`;
};

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////       Calling Function  /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
