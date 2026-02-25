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
const showDep = document.getElementById("show-dep") as HTMLButtonElement;
const showExp = document.getElementById("show-exp") as HTMLButtonElement;

//validation name
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

//Deposite Amount function
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

//Expense Function
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


//display Diposites
function showDeposites(): void {
    const tableCon = document.getElementById("table-deposite");
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

    if (userData.length > 0) {
        userData.forEach((transaction) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.name}</td>
                <td>${transaction.comment}</td>
                <td>${transaction.balance}</td>
            `;

            tbody.appendChild(row);
        })
        table.appendChild(thead);
        table.appendChild(tbody);
        tableCon.appendChild(table);
    } else { alert("Deposite not found!!") }
}
showDep.addEventListener("click", showDeposites)


let reapeat = false
//Dsiplay expenses
function showExpenses(): void {
    const sortingButton = document.getElementById("expense-btn") as HTMLDivElement;
    const tableCon = document.getElementById("table-withdrawal");
    if (!tableCon) return;



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
        })
        table.appendChild(thead);
        table.appendChild(tbody);
        tableCon.appendChild(table);

        if (!reapeat) {
            const sortingBtn = document.createElement("button");
            sortingBtn.className = "sorting-btn";
            sortingBtn.textContent = "Filter";
            sortingButton.appendChild(sortingBtn)
            sortingBtn.addEventListener("click", filteringExpensesByCategory)
            reapeat = true;
            console.log(reapeat)
        }
    } else { alert("Expenses not found!!") }
}
showExp.addEventListener("click", showExpenses)


let isReapeat = false;
//filter expense by category..
const filteringExpensesByCategory = (): void => {
    const userChoiceCategory = prompt("Enter the category");
    const filterExpenses = expenseData.filter((fil) => fil.category === userChoiceCategory)

    if (filterExpenses.length <= 0) return alert("Expense Category not found!")
    const tableContainer = document.getElementById("table-container") as HTMLDivElement;
    
    if (!isReapeat) {
        const tableFilter = document.createElement("div");
        tableFilter.className = "table-filter";
        tableFilter.id = "table-filter"

        tableFilter.innerHTML = "";

        tableContainer.appendChild(tableFilter);
        const table = document.createElement('table');
        table.id = 'ex-table';
        const thead = document.createElement('thead')
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Expenses</th>
            </tr>      
        `
        const tbody = document.createElement("tbody");
        filterExpenses.forEach((transaction) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount}</td>
                `;
            tbody.appendChild(row);
        })
        table.appendChild(thead);
        table.appendChild(tbody);
        tableFilter.appendChild(table);
        isReapeat = true;
    }
    else {
        const filterTable = document.getElementById("ex-table") as HTMLTableElement;
        const tbody = filterTable.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = ""
        filterExpenses.forEach((transaction) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${transaction.name}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount}</td>
                `;
            tbody.appendChild(row);
        })
        console.log(filterTable)
    }
}

