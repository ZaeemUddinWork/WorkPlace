#! /usr/env/bin node
import inquirer from "inquirer";
import chalk from "chalk";
import { table } from 'table';


interface student {
    student_id:string
    name:string,
    class:string,
    field:string,
    course:string[],
    remaning_fee:number,
    Paid_fee:number
    Total_fee:number,
}
 let student:student[]=[] 
    student.push(
        {
        student_id:'IX-CS-1',
        name:'Zaeem Uddin',
        class:'IX',
        field:'Computer Science',
        course: ['English','Urdu','Mathematics','Physics','Islamic studies','Chemistry','Pak Studies','Computer Science'],
         remaning_fee:5000,
         Paid_fee:7000,
         Total_fee:12000,})
    
    

//--------------------student id related---------------
          let student_id:string =''
         //for unique id no 
         let IX_student_no:number=2;
         let X_student_no:number=1;
         let XI_student_no:number=1;
         let XII_student_no:number=1;




let loop:boolean = true

while(loop)
   {
       
       console.log( chalk.bold.cyanBright(`\tStudent Management Data`))
       let system = await inquirer.prompt([
        {
            name:'options',
            type:'list',
            message:chalk.bold.cyan(`Select option`),
            choices:["Add Student Data","Edit Student Data",'View Details of Students',"Exit"]
        }
       ])
       let {options} = system

       //if user select add student data than this all program will run
    if (options === 'Add Student Data')
        {
                // let course_array:String[] = []
        let student_data = await inquirer.prompt([
            {
                name: 'name',
                type:'input',
                message:chalk.bold.cyan(`Enter Student name: `)
            },
            {
                name:'S_class',
                type:'list',
                message:chalk.bold.blueBright(`Select Class: `),
                choices:['IX','X','XI','XII']
            },
            {
                name:'fieldsforIX_X',
                type:'list',
                message:chalk.bold.blueBright(`Select Student field: `),
                choices:['Biology','Computer Science'],
                when(student_data)
                {
                    return student_data.S_class == 'IX' || student_data.S_class == 'X'
                }
            },
            {
                name:'fieldsforXI_XII',
                type:'list',
                message:chalk.bold.blueBright(`Select Student field: `),
                choices:['Pre-Medical','Computer Science','Pre-Engineering','Commerce'],
                when(student_data)
                {
                    return student_data.S_class === 'XI' || student_data.S_class === 'XII'
                }
            }

        ]);
        let {name,S_class,fieldsforIX_X,fieldsforXI_XII} = student_data;
        let subjects_list:string[]=[]; 
        let fee:number= 0;
        

        if (S_class == 'IX' || S_class == 'X')
            {
                //subject list for IX and X
                subjects_list = ['English','Urdu','Mathematics','Physics','Islamic studies','Chemistry','Pak Studies']

                if (fieldsforIX_X === "Biology")
                    {
                        subjects_list.push('Biology')
                        
                        S_class === 'IX' ?(student_id = 'IX-BIO-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                        S_class === 'X' ?(student_id = 'X-BIO-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                        
                    }
                else if (fieldsforIX_X === "Computer Science")
                    {
                        subjects_list.push('Computer Science')
                        S_class === 'IX' ?(student_id = 'IX-CS-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                        S_class === 'X' ?(student_id = 'X-CS-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 

                    }
                let {subjects} = await inquirer.prompt([
                    {
                        name:'subjects',
                        type:'checkbox',
                        message:chalk.bold.cyan(`Select Subjects that Student taking from here: `),
                        choices: subjects_list
                    },
                    
                    
                ]);

                //for fee each subjectt have constant fee of 1500 so it will multiply number of selected subject to 1500

                for(let i=0; i <= subjects.length; i++)
                    { 
                if (subjects.length === i)
                    {
                        fee =  i * 1500
                    }
                }
                let paying_system = await inquirer.prompt([
                    {
                        name:'want_to_pay_fee',
                        type:'list',
                        message:chalk.magenta(`Does Student Paid any fee ?`),
                        choices:['Yes','No']
                     },
                     {
                        name:'paidfee',
                        type:'number',
                        message:
                        `
                        Student Total Fee ${chalk.yellow(fee)}
                        Enter Amount Paid by Student: `,
                        default:0,
                        when(paying_system)
                        {
                            return paying_system.want_to_pay_fee === "Yes"
                        },
                        validate:function(paidfee)
                        {
                            if (paidfee > fee)
                                {
                                    return 'Enter amount under Total fee amount'
                                }
                            else if (paidfee <0)
                                {
                                    paidfee = 0
                                }
                                else {return true}

                        }
                       
                     }
                ]) 
                let {yes_no,paidfee} = paying_system;
                //when fee paid is NAN than it will convert it into 0
                isNaN(paidfee)?(paidfee=0):(paidfee) ;//if true than paidfee = 0
                //calculating remaning fee
                let remaining_fee = fee - paidfee
               
                
                
                
                //pushing all data into student object array
                student.push(
                    {
                    student_id:student_id,
                    name:name,//name of student will come here
                    class:S_class,//class for student will come here
                    field:fieldsforIX_X,//Student feild will come here
                    course:subjects,///all subjects which is selected by student will come here
                     remaning_fee:remaining_fee,//remaing fee is here
                     Paid_fee:paidfee,//pain fee will come here
                     Total_fee:fee,//total amount of subject is here
                    })
        
              
            }
        else if (S_class == 'XI' || S_class == 'XII')
            {
                //for Class Xi and Class XII
               
            [//for computer science
                'Physics','Mathematics','Computer Science'
            ];
            [//PRE-MEDICAL GROUP
                'Physics','Chemistry','Zoology','Botany'
            ];
            [//PRE-ENGINEERING
                'Physics','Chemistry','Mathematics'
            ];
            [//COMMERCE
                'Principle of Accounting','Principle of Commerce','Principle of Economics','Business Maths'
            ]

                if (S_class =='XI')
                    {
                        //for class XI
                        subjects_list = ['English','Islamiyat','Urdu'];//general subjects
                        if(fieldsforXI_XII === 'Pre-Medical')
                            {
                                subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                S_class === 'XI' ?(student_id = 'XI-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                            }
                        else if(fieldsforXI_XII === 'Computer Science')
                            {
                                subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                S_class === 'XI' ?(student_id = 'XI-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                            }
                        else if(fieldsforXI_XII === 'Pre-Engineering')
                            {
                                subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                S_class === 'XI' ?(student_id = 'XI-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                            }
                        else if(fieldsforXI_XII === 'Commerce')
                            {
                                subjects_list.push('Principle of Accounting','Principle of Commerce','Principle of Economics','Business Maths')//if field is Commerce so this subjects will add in list
                                S_class === 'XI' ?(student_id = 'XI-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                            }
                    }
                else if (S_class ==='XII')
                    {
                        //for class XII
                        subjects_list = ['English','Pakistan Studies','Urdu']
                        if(fieldsforXI_XII === 'Pre-Medical')
                            {
                                subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                S_class === 'XII' ?(student_id = 'XII-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                            }
                        else if(fieldsforXI_XII === 'Computer Science')
                            {
                                subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                S_class === 'XII' ?(student_id = 'XII-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                            }
                        else if(fieldsforXI_XII === 'Pre-Engineering')
                            {
                                subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                S_class === 'XII' ?(student_id = 'XII-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                            }
                        else if(fieldsforXI_XII === 'Commerce')
                            {
                                subjects_list.push('Principle of Accounting','Commercial Geography','Statistics','Banking')//if field is Commerce so this subjects will add in list
                                S_class === 'XII' ?(student_id = 'XII-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                            }
                    }
           
                    let subject = await inquirer.prompt([
                        {
                            name:'subjects',
                            type:'checkbox',
                            message:chalk.bold.cyan(`Select Subject that student want to Take: `),
                            choices:subjects_list,
                        }
                    ])
                    let {subjects} =subject
                    for(let i =0;i<=subjects.length;i++)//for pricing of each subject which selected by student
                    {
                        if (subjects.length === i)
                            {
                                fee = i * 2000//this will X number by 2000 to give total fee  
                            }
                    }

                let paying_system = await inquirer.prompt([
                    {
                        name:'want_to_pay_fee',
                        type:'list',
                        message:chalk.magenta(`Does Student Paid any fee ?`),
                        choices:['Yes','No']
                     },
                     {
                        name:'paidfee',
                        type:'number',
                        message:
                        `
                        Student Total Fee ${chalk.yellow(fee)}
                        Enter Amount Paid by Student: `,
                        default:0,
                        when(paying_system)
                        {
                            return paying_system.want_to_pay_fee === "Yes"
                        },
                        validate:function(paidfee)
                        {
                            if (paidfee > fee)
                                {
                                    return 'Enter amount under Total fee amount'
                                }
                            else if (paidfee <0)
                                {
                                    paidfee = 0
                                }
                                else {return true}

                        }
                       
                     }
                ]) 
                let {yes_no,paidfee} = paying_system;
                isNaN(paidfee) ? (paidfee = 0): (paidfee)
                //femaing amount will be calculated here by minu total amount to paid amount
                let remaining_fee = fee - paidfee;

                 //pushing all data into student object array
                 student.push(
                    {
                    student_id:student_id,
                    name:name,//name of student will come here
                    class:S_class,//class for student will come here
                    field:fieldsforXI_XII,//Student feild will come here
                    course:subjects,///all subjects which is selected by student will come here
                     remaning_fee:remaining_fee,//remaing fee is here
                     Paid_fee:paidfee,//pain fee will come here
                     Total_fee:fee,//total amount of subject is here
                    })
                    console.log(chalk.greenBright(`\n!! successfully New Student Data Added !!`))//message after data editted
            }

        }
        //-------------------------------------------------------------------
    else if (options === 'Edit Student Data')
    {
        let name_array:string[]=[]
        for (let i of student)
            {
                name_array.push(i.name)
            }
           
        let edit_data = await inquirer .prompt([
            
                {
                    name:'option',
                    type:'list',
                    message:chalk.bold.cyan(`Select Student in which you can to Edit: `),
                    choices:name_array,
                },
        ])
        let index=0 ;//index of that student that is selected 

        for (let i of student)
            {
                if (i.name === edit_data.option)
                    {
                        break;
                    }
                    index++
            }
        
        
        let data = await inquirer .prompt([
            {
                name:'edit_opt',//edit option list
                type:'list',
                message:chalk.bold.cyan(`Select data which you want to update`),
                choices:['Update Student Payment','Edit Other Data','Delete Student Data'],
            },
            {
                name:'payment',//for update payment
                type:'number',
                message:`\n${table([['Student','Fee Status'],['Total Amount',chalk.yellow(student[index].Total_fee)],['Paid Fee',chalk.yellow(student[index].Paid_fee)],['Balance',chalk.yellow(student[index].remaning_fee)]])}
                \nEnter Amount: `,
                when(data)
                {
                    return data.edit_opt === 'Update Student Payment'
                },
                validate:function(payment){
                    if(payment > student[index].remaning_fee)
                    {
                     return chalk.redBright(`!! Payment must be under Remaning Balance Amount !!`)   
                    }
                    else {
                        return true
                    }
                }
            },
            {
                name:'otherEditlist',//other data edit and deleting option is here
                type:'list',
                message:'Select option: ',
                choices:['Name','Class','Field','Subjects'],
                when(data)
                {
                    return data.edit_opt === 'Edit Other Data'
                }
            },
        ])
        let {edit_opt,payment,otherEditlist} = data;
        if (edit_opt === 'Update Student Payment')
            {
                student[index].Paid_fee += payment
                student[index].remaning_fee -= payment
                console.log(chalk.greenBright(`\n!! updated successfully !!`))//message after data editted
            }
        else if(edit_opt === 'Edit Other Data')
            {
                if (otherEditlist === 'Name')
                    {
                        let NewName = await inquirer.prompt(
                            {
                                name:'newName',
                                type:'input',
                                message:'Enter name: '
                            }
                        )
                        student[index].name = NewName.newName
                        console.log(chalk.greenBright(`\n!! updated successfully !!`))//message after data editted 
                    }
                else if (otherEditlist === 'Class')
                    {
                        let NewClass = await inquirer.prompt([
                            {
                                name:'newClass',
                                type:'list',
                                message:`Student Current class is ${student[index].class} \n Select Class: `,
                                choices:['IX','X','XI','XII']
                            },
                            {
                                name:'fieldsforIX_X',
                                type:'list',
                                message:chalk.bold.blueBright(`Select Student field: `),
                                choices:['Biology','Computer Science'],
                                when(NewClass)
                                {
                                    return NewClass.newClass === 'IX' || NewClass.newClass === 'X'
                                }
                            },
                            {
                                name:'fieldsforXI_XII',
                                type:'list',
                                message:chalk.bold.blueBright(`Select Student field: `),
                                choices:['Pre-Medical','Computer Science','Pre-Engineering','Commerce'],
                                when(NewClass)
                                {
                                    return NewClass.newClass === 'XI' || NewClass.newClass === 'XII'
                                }
                            }
                        ])
                        let {newClass,fieldsforIX_X,fieldsforXI_XII} = NewClass;
                        let subjects_list:string[]=[]; 
                        let fee:number= 0;
                        let field;
                        if (newClass == 'IX' || newClass == 'X')
                            {
                                field = fieldsforIX_X
                                //subject list for IX and X
                                subjects_list = ['English','Urdu','Mathematics','Physics','Islamic studies','Chemistry','Pak Studies']
                
                                if (fieldsforIX_X === "Biology")
                                    {
                                        subjects_list.push('Biology')
                                        
                                        newClass === 'IX' ?(student_id = 'IX-BIO-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        newClass === 'X' ?(student_id = 'X-BIO-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        
                                    }
                                else if (fieldsforIX_X === "Computer Science")
                                    {
                                        subjects_list.push('Computer Science')
                                        newClass === 'IX' ?(student_id = 'IX-CS-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                        newClass === 'X' ?(student_id = 'X-CS-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                
                                    }
                                let {subjects} = await inquirer.prompt([
                                    {
                                        name:'subjects',
                                        type:'checkbox',
                                        message:chalk.bold.cyan(`Select Subjects that Student taking from here: `),
                                        choices: subjects_list
                                    },
                                    
                                    
                                ]);
                
                                //for fee each subjectt have constant fee of 1500 so it will multiply number of selected subject to 1500
                                subjects_list = subjects
                                for(let i=0; i <= subjects.length; i++)
                                    { 
                                if (subjects.length === i)
                                    {
                                        fee =  i * 1500
                                    }
                                }

                        
                            }
                            else if (newClass == 'XI' || newClass == 'XII')
                                {
                                    field = fieldsforXI_XII;

                                    if (newClass =='XI')
                                        {
                                            //for class XI
                                            subjects_list = ['English','Islamiyat','Urdu'];//general subjects
                                            if(fieldsforXI_XII === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    newClass === 'XI' ?(student_id = 'XI-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    newClass === 'XI' ?(student_id = 'XI-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    newClass === 'XI' ?(student_id = 'XI-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Principle of Commerce','Principle of Economics','Business Maths')//if field is Commerce so this subjects will add in list
                                                    newClass === 'XI' ?(student_id = 'XI-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                        }
                                    else if (newClass ==='XII')
                                        {
                                            //for class XII
                                            subjects_list = ['English','Pakistan Studies','Urdu']
                                            if(fieldsforXI_XII === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    newClass === 'XII' ?(student_id = 'XII-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    newClass === 'XII' ?(student_id = 'XII-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(fieldsforXI_XII === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    newClass === 'XII' ?(student_id = 'XII-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(fieldsforXI_XII === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Commercial Geography','Statistics','Banking')//if field is Commerce so this subjects will add in list
                                                    newClass === 'XII' ?(student_id = 'XII-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                        }
                               
                                        let subject = await inquirer.prompt([
                                            {
                                                name:'subjects',
                                                type:'checkbox',
                                                message:chalk.bold.cyan(`Select Subject that student want to Take: `),
                                                choices:subjects_list,
                                            }
                                        ])
                                        let {subjects} =subject
                                        subjects_list = subjects
                                        for(let i =0;i<=subjects.length;i++)//for pricing of each subject which selected by student
                                        {
                                            if (subjects.length === i)
                                                {
                                                    fee = i * 2000//this will X number by 2000 to give total fee  
                                                }
                                        }
                                        
                                    }
                            student[index].class = newClass;
                            student[index].student_id = student_id;
                            student[index].field = field;
                            student[index].course = subjects_list;
                            student[index].Total_fee = fee;
                            //formula for fee
                            if (student[index].Total_fee < student[index].Paid_fee)
                                {
                                  let balanceNegetive =(student[index].Paid_fee - fee)*-1
                                  student[index].remaning_fee = balanceNegetive
                                }
                            else if (student[index].Total_fee > student[index].Paid_fee)
                                {
                                    let balancePositive = (student[index].Total_fee - student[index].Paid_fee)
                                    student[index].remaning_fee = balancePositive
                                }
                                console.log(chalk.greenBright(`\n!! updated successfully !!`))//message after data editted
                    }
                    //---------------------------------------------------------------------------
                else if (otherEditlist === 'Field')
                    {
                        
                        
                        let subjects_list:string[]=[]; 
                        let fee:number= 0;
                        let field;
                        if (student[index].class == 'IX' || student[index].class == 'X')
                            {
                                let NewField = await inquirer.prompt([
                            
                                    {
                                        name:'fieldsforIX_X',
                                        type:'list',
                                        message:chalk.bold.blueBright(`Select Student field: `),
                                        choices:['Biology','Computer Science'],
                                    },])
                                    let {fieldsforIX_X} = NewField;
                                field = fieldsforIX_X
                                //subject list for IX and X
                                subjects_list = ['English','Urdu','Mathematics','Physics','Islamic studies','Chemistry','Pak Studies']
                
                                if (fieldsforIX_X === "Biology")
                                    {
                                        subjects_list.push('Biology')
                                        
                                        student[index].class === 'IX' ?(student_id = 'IX-BIO-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        student[index].class === 'X' ?(student_id = 'X-BIO-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        
                                    }
                                else if (fieldsforIX_X === "Computer Science")
                                    {
                                        subjects_list.push('Computer Science')
                                        student[index].class === 'IX' ?(student_id = 'IX-CS-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                        student[index].class === 'X' ?(student_id = 'X-CS-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                
                                    }
                                let {subjects} = await inquirer.prompt([
                                    {
                                        name:'subjects',
                                        type:'checkbox',
                                        message:chalk.bold.cyan(`Select Subjects that Student taking from here: `),
                                        choices: subjects_list
                                    },
                                    
                                    
                                ]);
                
                                //for fee each subjectt have constant fee of 1500 so it will multiply number of selected subject to 1500
                                subjects_list = subjects
                                for(let i=0; i <= subjects.length; i++)
                                    { 
                                if (subjects.length === i)
                                    {
                                        fee =  i * 1500
                                    }
                                }

                        
                            }
                            else if (student[index].class == 'XI' || student[index].class == 'XII')
                                {
                                    
                                    let NewField = await inquirer.prompt([
                                        {
                                            name:'fieldsforXI_XII',
                                            type:'list',
                                            message:chalk.bold.blueBright(`Select Student field: `),
                                            choices:['Pre-Medical','Computer Science','Pre-Engineering','Commerce'],
                                        }
                                    ])
                                    let {fieldsforXI_XII} = NewField;
                                    field = fieldsforXI_XII;
                                    if (student[index].class =='XI')
                                        {
                                            //for class XI
                                            subjects_list = ['English','Islamiyat','Urdu'];//general subjects
                                            if(fieldsforXI_XII === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Principle of Commerce','Principle of Economics','Business Maths')//if field is Commerce so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                        }
                                    else if (student[index].class ==='XII')
                                        {
                                            //for class XII
                                            subjects_list = ['English','Pakistan Studies','Urdu']
                                            if(fieldsforXI_XII === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(fieldsforXI_XII === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(fieldsforXI_XII === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(fieldsforXI_XII === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Commercial Geography','Statistics','Banking')//if field is Commerce so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                        }
                               
                                        let subject = await inquirer.prompt([
                                            {
                                                name:'subjects',
                                                type:'checkbox',
                                                message:chalk.bold.cyan(`Select Subject that student want to Take: `),
                                                choices:subjects_list,
                                            }
                                        ])
                                        let {subjects} =subject
                                        subjects_list = subjects
                                        for(let i =0;i<=subjects.length;i++)//for pricing of each subject which selected by student
                                        {
                                            if (subjects.length === i)
                                                {
                                                    fee = i * 2000//this will X number by 2000 to give total fee  
                                                }
                                        }
                                        
                                    }
                            student[index].student_id = student_id;
                            student[index].field = field;
                            student[index].course = subjects_list;
                            student[index].Total_fee = fee;
                            //formula for fee
                            if (student[index].Total_fee < student[index].Paid_fee)
                                {
                                  let balanceNegetive =(student[index].Paid_fee - fee)*-1
                                  student[index].remaning_fee = balanceNegetive
                                }
                            else if (student[index].Total_fee > student[index].Paid_fee)
                                {
                                    let balancePositive = (student[index].Total_fee - student[index].Paid_fee)
                                    student[index].remaning_fee = balancePositive
                                }
                                console.log(chalk.greenBright(`\n!! updated successfully !!`))//message after data editted
                    }
                else if (otherEditlist === 'Subjects')
                    {
                        let subjects_list:string[]=[]; 
                        let fee:number= 0;
                        let field = student[index].field
                        if (student[index].class == 'IX' || student[index].class == 'X')
                            {
                                
                                
                                //subject list for IX and X
                                subjects_list = ['English','Urdu','Mathematics','Physics','Islamic studies','Chemistry','Pak Studies']
                
                                if (field === "Biology")
                                    {
                                        subjects_list.push('Biology')
                                        
                                        student[index].class === 'IX' ?(student_id = 'IX-BIO-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        student[index].class === 'X' ?(student_id = 'X-BIO-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                        
                                    }
                                else if (field === "Computer Science")
                                    {
                                        subjects_list.push('Computer Science')
                                        student[index].class === 'IX' ?(student_id = 'IX-CS-'+ IX_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                        student[index].class === 'X' ?(student_id = 'X-CS-'+ X_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                
                                    }
                                let {subjects} = await inquirer.prompt([
                                    {
                                        name:'subjects',
                                        type:'checkbox',
                                        message:chalk.bold.cyan(`Select Subjects that Student taking from here: `),
                                        choices: subjects_list
                                    },
                                    
                                    
                                ]);
                
                                //for fee each subjectt have constant fee of 1500 so it will multiply number of selected subject to 1500
                                subjects_list = subjects
                                for(let i=0; i <= subjects.length; i++)
                                    { 
                                if (subjects.length === i)
                                    {
                                        fee =  i * 1500
                                    }
                                }

                        
                            }
                            else if (student[index].class == 'XI' || student[index].class == 'XII')
                                {
                                  
                                    if (student[index].class =='XI')
                                        {
                                            //for class XI
                                            subjects_list = ['English','Islamiyat','Urdu'];//general subjects
                                            if(field === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(field === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(field === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(field === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Principle of Commerce','Principle of Economics','Business Maths')//if field is Commerce so this subjects will add in list
                                                    student[index].class === 'XI' ?(student_id = 'XI-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                        }
                                    else if (student[index].class ==='XII')
                                        {
                                            //for class XII
                                            subjects_list = ['English','Pakistan Studies','Urdu']
                                            if(field === 'Pre-Medical')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Zoology','Botany')//if field is pre-medical so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-PM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class 
                                                }
                                            else if(field === 'Computer Science')
                                                {
                                                    subjects_list.push('Physics','Mathematics','Computer Science')//if field is Computer Science so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-CS-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(field === 'Pre-Engineering')
                                                {
                                                    subjects_list.push('Physics','Chemistry','Mathematics')//if field is pre-Engineering so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-PE-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                            else if(field === 'Commerce')
                                                {
                                                    subjects_list.push('Principle of Accounting','Commercial Geography','Statistics','Banking')//if field is Commerce so this subjects will add in list
                                                    student[index].class === 'XII' ?(student_id = 'XII-COM-'+ XI_student_no++):(0)//here first code will show class no and seconde will show field and last one will show number of student in that class
                                                }
                                        }
                               
                                        let subject = await inquirer.prompt([
                                            {
                                                name:'subjects',
                                                type:'checkbox',
                                                message:chalk.bold.cyan(`Select Subject that student want to Take: `),
                                                choices:subjects_list,
                                            }
                                        ])
                                        let {subjects} =subject
                                        subjects_list = subjects
                                        for(let i =0;i<=subjects.length;i++)//for pricing of each subject which selected by student
                                        {
                                            if (subjects.length === i)
                                                {
                                                    fee = i * 2000//this will X number by 2000 to give total fee  
                                                }
                                        }
                                        
                                    }
                        
                            student[index].course = subjects_list;
                            student[index].Total_fee = fee;
                            //formula for fee
                            if (student[index].Total_fee < student[index].Paid_fee)
                                {
                                  let balanceNegetive =(student[index].Paid_fee - fee)*-1
                                  student[index].remaning_fee = balanceNegetive
                                }
                            else if (student[index].Total_fee > student[index].Paid_fee)
                                {
                                    let balancePositive = (student[index].Total_fee - student[index].Paid_fee)
                                    student[index].remaning_fee = balancePositive
                                }
                                console.log(chalk.greenBright(`\n!! updated successfully !!`))//message after data editted
                    }
               
            }
        else if (edit_opt === 'Delete Student Data')
            {
            //----function to delete selected student data
                let NewStudentList = (array:any[],index:number):any[] => 
                {
                    return array.splice(0,index)//now this will return data after deleted student data
                }
                let newStudentList = NewStudentList(student,index)
                student = newStudentList
                console.log(chalk.greenBright(`\n!! successfully Deleted !!`))//message after data editted
            }



    }


    else if (options === 'View Details of Students')
        {
            let array:any[] = [['','','','','Student Data','','','',''],['No.','Roll No.','Name','Class','Field','Subjects','Total Fee','Paid Fee','Balance']]
            
            for (let i of student)
                {
                    let number=1
                    array.push([number,i.student_id,i.name,i.class,i.field,i.course,i.Total_fee,i.Paid_fee,i.remaning_fee])
                     number++
                }
                
                console.log(table(array))
        }
        //if user select exit than it will show credit and details of my profiles
    else if (options === 'Exit')
        {
            loop = false
             //after end of program it will print this credit
    console.log(
        chalk.bold.cyan(`
  \n\n
    ╔════════════════════════ ❀•°❀°•❀ ════════════════════════════╗
  
                    Thanks For Checking my program !!
                          -:Follow me on:-
            Github: https://github.com/ZaeemUddinWork
            Linkedin: https://www.linkedin.com/in/zaeem-uddin/
    
    ╚════════════════════════ ❀•°❀°•❀ ════════════════════════════╝
  `)
      );
        }
    }