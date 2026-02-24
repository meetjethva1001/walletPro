let userResponse = prompt("Enter your name:");
getName();
function getName() {
    if (!userResponse || userResponse.trim() === "") {
        alert("Enter valid name");
        userResponse = 'Guest';
        return;
    }
}
const element = document.getElementById("username");
const btnDep = document.getElementById("btn-dep");
const btnExp = document.getElementById("btn-exp");
const showExp = document.getElementById("show-exp");
if (!element) {
    console.error("Element with id 'username' not found.");
}
else if (!userResponse || userResponse.trim() === "") {
    element.innerText = "Guest";
}
else {
    element.innerText = "Hello , " + userResponse;
}
const userData = [];
const expenseData = [];
let balance = 0;
const depositeAmount = () => {
    const max_amt = 1000000000;
    const input = document.getElementById("dep-amt");
    const display = document.querySelector(".ex-btn");
    const depCom = document.getElementById("dep-comment");
    if (!input || !display || !depCom) {
        alert("No found");
        return;
    }
    const amount = Number(input.value);
    if ((isNaN(amount) || amount <= 0) || amount >= max_amt) {
        alert("Enter valid number!");
        input.value = "";
        return;
    }
    if (depCom.value === "")
        return alert("Enter the comments");
    else {
        balance += amount;
        display.textContent = `${balance}/-`;
        console.log(`Total: ${balance} | Note: ${depCom.value} | name : ${userResponse}`);
        userData.push({
            name: userResponse,
            balance: amount,
            comment: depCom.value
        });
        const existing = JSON.parse(localStorage.getItem("userData") || "[]");
        existing.push({
            name: userResponse,
            balance: amount,
            comment: depCom.value
        });
        localStorage.setItem("userData", JSON.stringify(existing));
        input.value = "";
        depCom.value = "";
    }
};
btnDep.addEventListener("click", depositeAmount);
function Expenses() {
    const max_amt = 1000000000;
    const expAmt = document.getElementById("exp-amt");
    const expCat = document.getElementById("exp-cat");
    const display = document.querySelector(".ex-btn");
    if (!expAmt || !expCat)
        return;
    const amount = Number(expAmt.value);
    if ((isNaN(amount) || amount <= 0) || amount >= max_amt) {
        alert("Please enter a valid positive number!");
        return;
    }
    if (amount > balance) {
        alert("Insufficient Balance!!");
        expAmt.value = "";
        expCat.value = "";
    }
    if (expCat.value === "")
        return alert("Enter the Category");
    else {
        balance -= amount;
        display.textContent = `${balance}/-`;
        expenseData.push({
            amount: amount,
            category: expCat.value,
            name: userResponse
        });
        const existing = JSON.parse(localStorage.getItem("expenseData") || "[]");
        existing.push({
            amount: amount,
            category: expCat.value,
            name: userResponse
        });
        localStorage.setItem("expenseData", JSON.stringify(existing));
        expAmt.value = "";
        expCat.value = "";
    }
}
btnExp.addEventListener("click", Expenses);
function getUserData() {
    let userData = localStorage.getItem("userData");
    console.log(userData);
}
showExp.addEventListener("click", showDeposites);
function showDeposites() {
    const tableCon = document.getElementById("table-container");
    if (!tableCon)
        return;
    tableCon.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Comments</th>
            <th>Amount</th>
        </tr>
    `;
    const tbody = document.createElement("tbody");
    userData.length != 0 ? userData.forEach((transaction) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.comment}</td>
            <td>${transaction.balance}</td>
        `;
        tbody.appendChild(row);
    }) : alert("No deposite found!!");
    table.appendChild(thead);
    table.appendChild(tbody);
    tableCon.appendChild(table);
}
export {};
//# sourceMappingURL=index.js.map