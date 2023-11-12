

// constructor Budget sets iinitial values for the income and expenses
//. this refers to the current instance of the Budget constructor 

class Budget {
    constructor() {
        this.income = 0; //default initial state of zero 
        this.expenses = []; //array of listed items 
    }

   
    // addIncome methos is going to add income & triggers total update 
    addIncome(description, amount) {
        this.income += amount;
        this.updateTotals();
    }

   
   // iin addExpense, adds an expense, creating an object and updates the total for the expense
    addExpense(description, amount) {
        this.expenses.push({ id: Date.now(), description, amount });
        this.updateTotals();
    }

   
   // will remove expense by ID and updates the total in UI 
    deleteExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.updateTotals();
    }
   
   // will calculate total expenses and budget, updating in display UI 
    updateTotals() {
        const totalExpenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        const totalBudget = this.income - totalExpenses;
   
   
        // here will display totals in UI by two decimal points 
document.getElementById("totalExpensesAmount").textContent = totalExpenses.toFixed(2);
document.getElementById("totalIncomeAmount").textContent = this.income.toFixed(2);
document.getElementById("totalBudgetAmount").textContent = totalBudget.toFixed(2);

   
   // display the expenses into UI 
        this.displayExpenses();
    }
   
   // updates the list of expenses in the HTML, creating list item 
    displayExpenses() {
        const expenseList = document.getElementById("expenseList");
        expenseList.innerHTML = "";
   
   
        this.expenses.forEach(expense => {
            const listItem = document.createElement("li");
            listItem.textContent = `${expense.description}: $${expense.amount}`;
   
   
            // Add a delete button to each expense item, ca remove item and update the total 
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                this.deleteExpense(expense.id);
            });
   
   // will add and remove from list 
            listItem.appendChild(deleteButton);
            expenseList.appendChild(listItem);
        });
    }
   }
   
   
   // creates a NEW instance of the budget class. initializes new object called 'budgetTracker'
   // and has access to all properties and methods defined within Budget class. 
   // helps to manage and track income and expenses defined in Budget class. 
   const budgetTracker = new Budget();
   


   // EVENT LISTENERS HERE 
   // add income
   // takes income input for income descipt and amount, triggering 'addincoome' button
   document.getElementById("addIncomeBtn").addEventListener("click", () => {
    const description = document.getElementById("incomeDescription").value;
    const amount = parseFloat(document.getElementById("incomeAmount").value);

    if (description && !isNaN(amount)) {
        budgetTracker.addIncome(description, amount);
    } else {
        alert("Please enter a valid description and amount for income.");
    }
});

// add expense
// // takes expense input for income descipt and amount, triggering 'addexpense' button
document.getElementById("addExpenseBtn").addEventListener("click", () => {
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (description && !isNaN(amount)) {
        budgetTracker.addExpense(description, amount);
    } else {
        alert("Please enter a valid description and amount for expenses.");
    }
});

   