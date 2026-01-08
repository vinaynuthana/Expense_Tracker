let salary = localStorage.getItem("salary")
  ? parseFloat(localStorage.getItem("salary"))
  : 0;
let expenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("total-salary").textContent = salary;
  renderExpenses();
  updateSummary();
});

function setSalary() {
  const salaryInput = document.getElementById("salary").value;
  if (salaryInput && salaryInput > 0) {
    salary = parseFloat(salaryInput);
    localStorage.setItem("salary", salary);
    document.getElementById("total-salary").textContent = salary;
    updateSummary();
  }
}

function addExpense() {
  const name = document.getElementById("expense-name").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense name and amount.");
    return;
  }

  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";

  renderExpenses();
  updateSummary();
}

function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  updateSummary();
}

function updateSummary() {
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = salary - totalExpenses;

  document.getElementById("total-expenses").textContent = totalExpenses;
  document.getElementById("balance").textContent = balance;
}
