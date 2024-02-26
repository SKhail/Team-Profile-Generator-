//Lib Modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Node Modules 
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/page-template.js");


//An Array to store the answers whe asking the questions 
const team = [];

//CLI Prompt
// array of questions for user
const questions = async () => {
  const answers = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        // ensure a user type in the required field
        validate: function (value) {
          if (value.trim() === '') {
            return 'Please enter your name? '
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your ID Number?',
        //Validation consisting only digits 
        validate: function (value) {
          if (!/^\d+$/.test(value.trim())) {
            return 'Please enter a valid ID containing digits only'
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: ' Provide your Email Address?',
        // it meets the correct email address format
        validate: function (value) {
          const emailChar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Check if 
          if (!emailChar.test(value)) {
            return 'Enter a valid Email Address'
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'role',
        message: 'Select your Role?',
        choices: ["Manager", "Engineer", "Intern",]
      }
    ]);

  // if Engineer role is used 
  if (answers.role === "Engineer") {
    // Prompt The user for the Github
    console.log("Prompt user for Github");
    const { github } = await inquirer.prompt({
      type: 'input',
      name: 'github',
      message: 'Please provide your Github userName?',
      //Validation that the field is not empty
      validate: function (value) {
        if (value.trim() === '') {
          return 'Please Provide the correct  Github userName?'
        }
        return true;
      },
    });
    //testing if the data is passing correctly 
    console.log("Github that was entered is:", github);
    //Create new engineer instance and add it to the team arr
    const newEngineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      github
    );
    team.push(newEngineer);
  }

  //If Intern is used 
  if (answers.role === "Intern") {
    // Prompt The user for the name of University
    const { school } = await inquirer
      .prompt({
        type: 'input',
        name: 'school',
        message: 'Please provide the University you attend?',
        //Validation that the field is not empty
        validate: function (value) {
          if (value.trim() === '') {
            return 'Please Provide the correct University you attend?'
          }
          return true;
        },
      });

    //testing if the data is passing correctly
    console.log("School that was entered is:", school);
    //Create new Intern instance and add it to the team arr
    const newIntern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      school
    );
    team.push(newIntern);
  }


  // if Manager Role is used 
  if (answers.role === "Manager") {
    // Prompt The user for the their Office Number
    const { officeNumber } = await inquirer
      .prompt({
        type: 'input',
        name: 'officeNumber',
        message: 'Please Provide your Office Number?',
        //that the field contains Digits only
        validate: function (value) {
          if (!/^\d+$/.test(value.trim())) {
            return 'Please enter a valid ID containing digits only'
          }
          return true;
        }
      });

    //testing if the data is passing correctly
    console.log("officeNumber that was entered is:", officeNumber);
    //Create new Manager instance and add it to the team arr
    const newManager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      officeNumber
    );
    team.push(newManager);
  }


}

//Prompting the role , new memeber
async function promptQuestions() {
  await questions()

  const addCollegue = await inquirer.prompt([
    {
      type: 'list',
      name: 'addTeamMember',
      choices: ['new team member', 'add team'],
      message: 'Please tell me what you would like to do next?',
    },
  ]);

  if (addCollegue.addTeamMember === 'new team member') {
    return promptQuestions();
  } else {
    createHtml();
  }

}



async function createHtml() {
  //prompting the user the questions first
  await promptQuestions();
  console.log("new person", team)
  //render the function
  fs.writeFileSync("./index.html", render(team), "utf-8");

}

createHtml();


