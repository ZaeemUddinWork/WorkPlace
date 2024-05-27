import inquirer from "inquirer";
import chalk from "chalk";
import { sys } from "typescript";


class UserData {
    userName:string;
    bankId:number|string;
    password:string;
    bankBalance:number;
    utilityBill:number=0 ;

    constructor(name:string,bankId:string|number,password:string)
    {
        this.userName = name;
        this.bankId = bankId;
        this.password = password;
        this.bankBalance = this.numbergenerator(1000000,10000)

    }
    numbergenerator(max:number,min:number):number
    {
       return Math.floor(Math.random()*(max-min+1))+min
    }
    UtilityBill(max:number,min:number)
    {
        this.utilityBill = this.numbergenerator(max,min)
    }
}
let idNumber = 1
let BankIdGenerator = ()=> {return 'PKB-00'+idNumber++};
let bankId = BankIdGenerator()
let defaultUserData = new UserData('Zaeem Uddin',bankId,'1234')

let userDatas:{
    userName:string,
    bankId:number|string,
    password:string,
    bankBalance:number,
    utilityBill:number,
}[] =  [
    {
        userName: 'zaeem',
        bankId:'',
        password:'',
        bankBalance:0,
        utilityBill:0,
    }
]
userDatas.push({userName: 'zaeem',
bankId:'',
password:'',
bankBalance:0,
utilityBill:0,})

let system:boolean = true;//for looping system
while(system){
//Bank system start
let BankSystem = await inquirer.prompt([
    {
        name:'option',
        type:'list',
        message: `Select option given blow: `,
        choices:['Login','Create a New Bank Account']
    },
    {//login system start from here
        name:'login',
        type:'input',
        message:'Enter your Bank ID: ',
        when(BankSystem)
        {
            return BankSystem.option === "Login"
        }
    },
    {
        name:'password',
        type:'password',
        message:'Enter your Bank ID: ',
        when(BankSystem)
        {
            return BankSystem.option === "Login"
        }
    },
    {//for create a new account
        name:'username',
        type:'input',
        message:'Enter Your Name: ',
        default:'',
        when(BankSystem)
        {
            return BankSystem.option === 'Create a New Bank Account'
        },
        validate:function(username)
            
         {
            if (username.trim() === '' )
                {
                    return chalk.redBright(`!! You must Enter Name !!`)
                }
            else if (username.length < 4 && username.length > 1)
                {
                    return chalk.redBright(`User-name must be greater than 4 letters`)
                }
            else {
                return true;
            }
        },
    },
    
])
let {option,loginId,loginPassword,newUserName,newPassword} = BankSystem;
if (option === 'Login')
    {

    }
else if ( option === 'Create a New Bank Account')
{

}


}