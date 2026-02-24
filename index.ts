let userResponse: string | null = prompt("Enter your name:");
getName();

function getName() {
    if (!userResponse || userResponse.trim() === "") {
        alert("Enter valid name");
        userResponse = 'Guest';
        return;
    }

}

const element = document.getElementById("username");
const btnDep = document.getElementById("btn-dep") as HTMLButtonElement;
const btnExp = document.getElementById("btn-exp") as HTMLButtonElement;
const showExp = document.getElementById("show-exp") as HTMLButtonElement;

if (!element) {
    console.error("Element with id 'username' not found.");
} else if (!userResponse || userResponse.trim() === "") {
    element.innerText = "Guest";
} else {
    element.innerText = "Hello , " + userResponse;
}

interface User {
    name: string | null
    balance: number,
    comment: string,
}

const userData: User[] = [];

interface Expense {
    amount: number,
    category: string,
    name: string | null
}
const expenseData: Expense[] = [];

let balance: number = 0;
const depositeAmount = (): void => {
    const max_amt = 1_000_000_000;
    const input = document.getElementById("dep-amt") as HTMLInputElement;
    const display = document.querySelector(".ex-btn") as HTMLElement;
    const depCom = document.getElementById("dep-comment") as HTMLInputElement;

    if (!input || !display || !depCom) {
        alert("No found");
        return;
    }

    const amount: number = Number(input.value);


    if ((isNaN(amount) || amount <= 0) || amount >= max_amt) {
        alert("Enter valid number!");
        input.value = "";
        return;
    }
    if (depCom.value === "") return alert("Enter the comments");
    else {
        balance += amount;
        display.textContent = `${balance}/-`;
        console.log(`Total: ${balance} | Note: ${depCom.value} | name : ${userResponse}`);

        userData.push({
            name: userResponse,
            balance: amount,
            comment: depCom.value
        })

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

function Expenses(): void {
    const max_amt = 1_000_000_000;
    const expAmt = document.getElementById("exp-amt") as HTMLInputElement;
    const expCat = document.getElementById("exp-cat") as HTMLInputElement;
    const display = document.querySelector(".ex-btn") as HTMLElement;

    if (!expAmt || !expCat) return;
    const amount: number = Number(expAmt.value);

    if ((isNaN(amount) || amount <= 0) || amount >= max_amt) {
        alert("Please enter a valid positive number!");
        return;
    }

    if (amount > balance) {
        alert("Insufficient Balance!!");
        expAmt.value = ""
        expCat.value = "";
    }
    if (expCat.value === "") return alert("Enter the Category");

    else {
        balance -= amount
        display.textContent = `${balance}/-`
        expenseData.push({
            amount: amount,
            category: expCat.value,
            name: userResponse
        })

        const existing = JSON.parse(localStorage.getItem("expenseData") || "[]");

        existing.push({
            amount: amount,
            category: expCat.value,
            name: userResponse
        });

        localStorage.setItem("expenseData", JSON.stringify(existing));

        expAmt.value = ""
        expCat.value = "";
    }
}

btnExp.addEventListener("click", Expenses);

function getUserData() {
    let userData = localStorage.getItem("userData")
    console.log(userData);
}

showExp.addEventListener("click", showDeposites)


function showDeposites(): void {
    const tableCon = document.getElementById("table-container");
    if (!tableCon) return;

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

    userData.length !=0 ? userData.forEach((transaction) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.name}</td>
            <td>${transaction.comment}</td>
            <td>${transaction.balance}</td>
        `;

        tbody.appendChild(row);
    }) :  alert("No deposite found!!")  

    table.appendChild(thead);
    table.appendChild(tbody);
    tableCon.appendChild(table);
}

