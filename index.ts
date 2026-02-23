const userResponse = prompt("Enter your name:");
const element = document.getElementById("username");
const btnDep = document.getElementById("btn-dep") as HTMLButtonElement 

if (!element) {
    console.error("Element with id 'username' not found.");
} else if (!userResponse || userResponse.trim() === "") {
    element.innerText = "Guest";
} else {
    element.innerText = "Hello , " + userResponse;
}

btnDep.addEventListener("click", () => {
    depositeAmount()
})

let balance: number = 0; // global balance

const depositeAmount = (): void => {
    const input = document.getElementById("dep-amt") as HTMLInputElement | null;
    const display = document.querySelector(".ex-btn") as HTMLElement | null;

    if (!input || !display) return;

    const amount: number = Number(input.value);

    if (isNaN(amount) || amount <= 0) {
        alert("Enter valid amount!");
        return;
    }

    balance += amount; 

    display.innerText = balance + "/-";

    input.value = "";
};