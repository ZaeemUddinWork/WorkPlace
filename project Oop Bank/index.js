import inquirer from "inquirer";
import chalk from "chalk";
class UserData {
    userName;
    bankId;
    password;
    bankBalance;
    utilityBill = 0;
    constructor(name, bankId, password) {
        this.userName = name;
        this.bankId = bankId;
        this.password = password;
        this.bankBalance = this.numbergenerator(1000000, 10000);
    }
    numbergenerator(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    UtilityBill(max, min) {
        this.utilityBill = this.numbergenerator(max, min);
    }
}
let idNumber = 1;
let BankIdGenerator = () => { return 'PKB-00' + idNumber++; };
let bankId = BankIdGenerator();
let defaultUserData = new UserData('Zaeem Uddin', bankId, '1234');
//Bank system start
let BankSystem = await inquirer.prompt([
    {
        name: 'option',
        type: 'list',
        message: `Select option given blow: `,
        choices: ['Login', 'Create a New Bank Account']
    },
    {
        name: 'login',
        type: 'input',
        message: 'Enter your Bank ID: ',
        when(BankSystem) {
            return BankSystem.option === "Login";
        }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your Bank ID: ',
        when(BankSystem) {
            return BankSystem.option === "Login";
        }
    },
    {
        name: 'username',
        type: 'input',
        message: 'Enter Your Name: ',
        default: 'NaN',
        when(BankSystem) {
            return BankSystem.option === 'Create a New Bank Account';
        },
        validate: function (username) {
            if (username === 'NaN' || username.trim() === '') {
                return chalk.redBright(`!! You must Enter Name !!`);
            }
            else if (username.length < 4 && username.length > 1) {
                return chalk.redBright(`User-name must be greater than 4 letters`);
            }
            else {
                return true;
            }
        },
    },
    {
        name: 'password', //pasword for new user
        type: 'input',
        message: 'Enter Password Charector must be grater than 4: ',
        default: 'NaN',
        when(BankSystem) {
            return BankSystem.option === 'Create a New Bank Account';
        },
        validate: function (password) {
            if (password === 'NaN' || password.trim() === '') {
                return `!! You must Enter Name !!`;
            }
            else if (password.length < 4 && password.length >= 0) {
                return `User-name must be greater than 4 letters`;
            }
            else {
                return true;
            }
        },
    }
]);
