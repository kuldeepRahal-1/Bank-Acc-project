const input = document.getElementById('input');
const btn = document.getElementById('btn');
const result = document.getElementById('result');

const accountHolderNameInput = document.getElementById('accountHolderName');
const initialBalanceInput = document.getElementById('initialBalance');
const createAccountBtn = document.getElementById('createAccountBtn');

const selectAccount = document.getElementById('selectAccount');

let accounts = [];  // Store multiple accounts
let activeAccount = null;  // The account currently selected for operations

class BankAccount {
  constructor(accountHolderName, balance = 0) {
    this.accountHolderName = accountHolderName;
    this.balance = balance;
  }

  // Method to add money
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      return `Deposited: ${amount}. New balance: ${this.balance}`;
    } else {
      return "Deposit amount must be greater than 0.";
    }
  }

  // Method to withdraw money
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return `Withdrawn: ${amount}. Remaining balance: ${this.balance}`;
    } else if (amount > this.balance) {
      return "Insufficient balance!";
    } else {
      return "Withdrawal amount must be greater than 0.";
    }
  }

  // Method to check balance
  checkBalance() {
    return `Current balance: ${this.balance}`;
  }
}

// Event listener to create a new account
createAccountBtn.addEventListener('click', () => {
  const accountHolderName = accountHolderNameInput.value;
  const initialBalance = parseFloat(initialBalanceInput.value);

  if (accountHolderName && !isNaN(initialBalance)) {
    const newAccount = new BankAccount(accountHolderName, initialBalance); //creating BankAccount()
    accounts.push(newAccount);  // Add the new account to the list
    updateAccountDropdown();
    result.textContent = `Account created for ${accountHolderName} with balance ${initialBalance}`;
  } else {
    result.textContent = 'Please enter a valid name and initial balance!';
  }
});

// Function to update the dropdown with available accounts
function updateAccountDropdown() {
  selectAccount.innerHTML = '<option value="">-- Select Account --</option>'; // Reset dropdown
  accounts.forEach((account, index) => {
    const option = document.createElement('option');
    option.value = index;  // Use the index to identify the account
    option.textContent = account.accountHolderName;
    selectAccount.appendChild(option);
  });
}

// Event listener to handle account selection
selectAccount.addEventListener('change', () => {
  const selectedIndex = selectAccount.value;
  if (selectedIndex !== "") {
    activeAccount = accounts[selectedIndex];
    result.textContent = `Selected account: ${activeAccount.accountHolderName}`;
  } else {
    activeAccount = null;
    result.textContent = 'No account selected';
  }
});

// Event listener for deposit/withdraw/check balance operations
btn.addEventListener('click', () => {
  if (!activeAccount) {
    result.textContent = 'Please select an account first!';
    return;
  }

  const amount = parseFloat(input.value);
  const action = document.querySelector('input[name="action"]:checked').value;

  let resultMessage = '';

  if (action === 'deposit') {
    if (!isNaN(amount)) {
      resultMessage = activeAccount.deposit(amount);
    } else {
      resultMessage = 'Please enter a valid amount!';
    }
  } else if (action === 'withdraw') {
    if (!isNaN(amount)) {
      resultMessage = activeAccount.withdraw(amount);
    } else {
      resultMessage = 'Please enter a valid amount!';
    }
  } else if (action === 'checkBalance') {
    resultMessage = activeAccount.checkBalance();
  }

  result.textContent = resultMessage;
});
