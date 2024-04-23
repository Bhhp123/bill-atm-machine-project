#! /usr/bin/env node
import inquirer from 'inquirer';

let accountBalance = 1000;
const fastCashAmount = 500; // Set the fast cash amount

async function checkBalance() {
  console.log(`\x1b[32mYour current balance is: $${accountBalance}\x1b[0m`); // Green color
}

async function withdraw() {
  const amount = await inquirer.prompt({
    type: 'input',
    name: 'amount',
    message: 'Enter the amount to withdraw:',
  });
  if (accountBalance >= parseInt(amount.amount)) {
    accountBalance -= parseInt(amount.amount);
    console.log(`\x1b[31mWithdrawal successful! New balance: $${accountBalance}\x1b[0m`); // Red color
  } else {
    console.log(`\x1b[41mInsufficient funds!\x1b[0m`); // Red background
  }
}

async function fastCash() {
  if (accountBalance >= fastCashAmount) {
    accountBalance -= fastCashAmount;
    console.log(`\x1b[34mFast cash dispensed! New balance: $${accountBalance}\x1b[0m`); // Blue color
  } else {
    console.log(`\x1b[41mInsufficient funds for fast cash!\x1b[0m`); // Red background
  }
}

async function deposit() {
  const amount = await inquirer.prompt({
    type: 'input',
    name: 'amount',
    message: 'Enter the amount to deposit:',
  });
  accountBalance += parseInt(amount.amount);
  console.log(`\x1b[36mDeposit successful! New balance: $${accountBalance}\x1b[0m`); // Cyan color
}

async function main() {
  while (true) {
    const action = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: ['Check Balance', 'Withdraw', 'Fast Cash', 'Deposit', 'Exit'],
    });
    switch (action.action) {
      case 'Check Balance':
        await checkBalance();
        break;
      case 'Withdraw':
        await withdraw();
        break;
      case 'Fast Cash':
        await fastCash();
        break;
      case 'Deposit':
        await deposit();
        break;
      case 'Exit':
        console.log('Goodbye!');
        return;
    }
  }
}

main();