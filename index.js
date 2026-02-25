"use strict";
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
const showDep = document.getElementById("show-dep");
const showExp = document.getElementById("show-exp");
//validation name
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
//Deposite Amount function
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
//Expense Function
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
//display Diposites
function showDeposites() {
    const tableCon = document.getElementById("table-deposite");
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
    if (userData.length > 0) {
        userData.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.name}</td>
                <td>${transaction.comment}</td>
                <td>${transaction.balance}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        tableCon.appendChild(table);
    }
    else {
        alert("Deposite not found!!");
    }
}
showDep.addEventListener("click", showDeposites);
let reapeat = false;
//Dsiplay expenses
function showExpenses() {
    const sortingButton = document.getElementById("expense-btn");
    const tableCon = document.getElementById("table-withdrawal");
    if (!tableCon)
        return;
    if (expenseData.length > 0) {
        tableCon.innerHTML = "";
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        thead.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Expenses</th>
        </tr>
    `;
        const tbody = document.createElement("tbody");
        expenseData.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.name}</td>
                <td>${transaction.category}</td>
                <td>${transaction.amount}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        tableCon.appendChild(table);
        if (!reapeat) {
            const sortingBtn = document.createElement("button");
            sortingBtn.className = "sorting-btn";
            sortingBtn.textContent = "Filter";
            sortingButton.appendChild(sortingBtn);
            sortingBtn.addEventListener("click", filteringExpensesByCategory);
            reapeat = true;
            console.log(reapeat);
        }
    }
    else {
        alert("Expenses not found!!");
    }
}
showExp.addEventListener("click", showExpenses);
let isReapeat = false;
//filter expense by category..
const filteringExpensesByCategory = () => {
    const userChoiceCategory = prompt("Enter the category");
    const filterExpenses = expenseData.filter((fil) => fil.category === userChoiceCategory);
    if (filterExpenses.length <= 0)
        return alert("Expense Category not found!");
    const tableContainer = document.getElementById("table-container");
    if (!isReapeat) {
        const tableFilter = document.createElement("div");
        tableFilter.className = "table-filter";
        tableFilter.id = "table-filter";
        tableFilter.innerHTML = "";
        tableContainer.appendChild(tableFilter);
        const table = document.createElement('table');
        table.id = 'ex-table';
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Expenses</th>
            </tr>
        `;
        const tbody = document.createElement("tbody");
        filterExpenses.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount}</td>
                `;
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        tableFilter.appendChild(table);
        isReapeat = true;
    }
    else {
        const filterTable = document.getElementById("ex-table");
        const tbody = filterTable.querySelector("tbody");
        tbody.innerHTML = "";
        filterExpenses.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount}</td>
                `;
            tbody.appendChild(row);
        });
        console.log(filterTable);
    }
};
//# sourceMappingURL=index.js.map