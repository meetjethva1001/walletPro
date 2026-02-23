const userResponse = prompt("Enter your name:");
const element = document.getElementById("username");
const btnDep = document.getElementById("btn-dep");
if (!element) {
    console.error("Element with id 'username' not found.");
}
else if (!userResponse || userResponse.trim() === "") {
    element.innerText = "Guest";
}
else {
    element.innerText = "Hello , " + userResponse;
}
btnDep.addEventListener("click", () => {
    depositeAmount();
});
let balance = 0; // global balance
const depositeAmount = () => {
    const input = document.getElementById("dep-amt");
    const display = document.querySelector(".ex-btn");
    if (!input || !display)
        return;
    const amount = Number(input.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter valid amount!");
        return;
    }
    balance += amount;
    display.innerText = balance + "/-";
    input.value = "";
};
export {};
//# sourceMappingURL=index.js.map