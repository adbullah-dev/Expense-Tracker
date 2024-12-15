let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;

document.getElementById('add-transaction-btn').addEventListener('click', addTransaction);

function addTransaction() {
    const name = document.getElementById('transaction-name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (!name || !amount) {
        alert("Please fill in both fields!");
        return;
    }

    const transaction = { name, amount, category };
    transactions.push(transaction);

    if (amount > 0) {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    updateTransactionList();
    updateSummary();

    // Clear input fields
    document.getElementById('transaction-name').value = '';
    document.getElementById('amount').value = '';
}

function updateTransactionList() {
    const transactionsContainer = document.getElementById('transactions-container');
    transactionsContainer.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item');

        transactionItem.innerHTML = `
            <span>${transaction.name} - ${transaction.category}</span>
            <span>$${transaction.amount.toFixed(2)}</span>
            <button onclick="removeTransaction('${transaction.name}')">Remove</button>
        `;

        transactionsContainer.appendChild(transactionItem);
    });
}

function removeTransaction(name) {
    transactions = transactions.filter(transaction => transaction.name !== name);

    // Recalculate totals
    totalIncome = 0;
    totalExpenses = 0;
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    updateTransactionList();
    updateSummary();
}

function updateSummary() {
    document.getElementById('total-income').innerHTML = `<p>Total Income: $${totalIncome.toFixed(2)}</p>`;
    document.getElementById('total-expenses').innerHTML = `<p>Total Expenses: $${totalExpenses.toFixed(2)}</p>`;
    document.getElementById('balance').innerHTML = `<p>Balance: $${(totalIncome + totalExpenses).toFixed(2)}</p>`;
}
