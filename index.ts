#! /usr/bin/env node
import inquirer from 'inquirer';

let accountBalance = 1000;

async function startATM() {
  const pin = await inquirer.prompt({
    type: 'input',
    name: 'pin',
    message: '\x1b[34mEnter your PIN:\x1b[0m',
  });

  if (pin.pin === '1234') {
    while (true) {
      const choice = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: '\x1b[36mSelect an option:\x1b[0m',
        choices: [
         'Withdraw',
          'Deposit',
          'Fast Cash',
          'Check Balance',
          'Exit',
        ],
      });

      switch (choice.choice) {
        case 'Withdraw':
          await withdraw();
          break;
        case 'Deposit':
          await deposit();
          break;
        case 'Fast Cash':
          await fastCash();
          break;
        case 'Check Balance':
          await checkBalance();
          break;
        case 'Exit':
          console.log('\x1b[36mExiting...\x1b[0m');
          return;
      }
    }
  } else {
    console.log('\x1b[31mInvalid PIN. Exiting...\x1b[0m');
    return;
  }
}

async function withdraw() {
  const amount = await inquirer.prompt({
    type: 'input',
    name: 'amount',
    message: '\x1b[36mEnter amount to withdraw:\x1b[0m',
  });

  const withdrawAmount = parseInt(amount.amount);
  if (withdrawAmount <= accountBalance) {
    accountBalance -= withdrawAmount;
    console.log(`\x1b[32mWithdrawal successful. New balance: ${accountBalance}\x1b[0m`);
  } else {
    console.log('\x1b[31mInsufficient funds\x1b[0m');
  }
}

async function deposit() {
  const amount = await inquirer.prompt({
    type: 'input',
    name: 'amount',
    message: '\x1b[36mEnter amount to deposit:\x1b[0m',
  });

  const depositAmount = parseInt(amount.amount);
  accountBalance += depositAmount;
  console.log(`\x1b[32mDeposit successful. New balance: ${accountBalance}\x1b[0m`);
}

async function fastCash() {
  const fastCashOptions = await inquirer.prompt({
    type: 'list',
    name: 'fastCash',
    message: '\x1b[36mSelect a Fast Cash option:\x1b[0m',
    choices: [
      '500',
      '1000',
      '1500',
    ],
  });

  const fastCashAmount = parseInt(fastCashOptions.fastCash);
  if (fastCashAmount <= accountBalance) {
    accountBalance -= fastCashAmount;
    console.log(`\x1b[32mFast Cash successful. New balance: ${accountBalance}\x1b[0m`);
  } else {
    console.log('\x1b[31mInsufficient funds\x1b[0m');
  }
}

async function checkBalance() {
  console.log(`\x1b[36mYour current balance is: ${accountBalance}\x1b[0m`);
}

startATM();