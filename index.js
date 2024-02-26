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

const newStaff = [];

//CLI Prompt
// array of questions for user
const questions = async () => {
 const answers = await inquirer
  .prompt([
   {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: function (value) {
     if (value.trim() === '') {
      return 'Please enter your name? ' // ensure a user type in the required field
     }
     return true;
    }
   },
   {
    type: 'input',
    name: 'id',
    message: 'What is your Id Number?',
    validate: function (value) {
     if (value.trim() === '') {
      return 'Please enter your ID number?'
     }
     return true;
    }
   },
   {
    type: 'input',
    name: 'email',
    message: ' Provide your Email Address?',
    validate: function (value) {
     if (value.trim() === '') {
      return 'Please add your Email Address?'
     }
     return true;
    }
   },
   {
    type: 'input',
    name: 'role',
    message: 'Provide your Role?',
    validate: function (value) {
     if (value.trim() === '') {
      return 'Please Provide your Role? '
     }
     return true;
    },

   }]);

 // if Engineer role is used 
 if (answers.role === "Engineer") {
  // Prompt The user for the Github
  const { github } = await inquirer.prompt({
   type: 'input',
   name: 'Github',
   message: 'Please provide your Github userName?',
   //Validation that the field is not empty
   validate: function (value) {
    if (value.trim() === '') {
     return 'Please Provide the correct  Github userName?'
    }
    return true;
   },
  });
  //Create new engineer instance and add it to the newstaff arr
  const newEngineer = new Engineer(
   answers.name,
   answers.id,
   answers.email,
   github
  );
  newStaff.push(newEngineer);
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
  //Create new Intern instance and add it to the newstaff arr
  const newIntern = new Intern(
   answers.name,
   answers.id,
   answers.email,
   school
  );
  newStaff.push(newIntern);
 }


 // if Manager Role is used 
 if (answers.role === "Manager") {
  // Prompt The user for the their Office Number
  const { officeNumber } = await inquirer
   .prompt({
    type: 'input',
    name: 'officeNumber',
    message: 'Please Provide your Office Number?',
    //Validation that the field is not empty
    validate: function (value) {
     if (value.trim() === '') {
      return 'Please Provide the correct Office Number?'
     }
     return true;
    },
   });
  //Create new Manager instance and add it to the newstaff arr
  const newManager = new Manager(
   answers.name,
   answers.id,
   answers.email,
   officeNumber
  );
  newStaff.push(newManager);
 }

 questions();



 function buildTeam() {
  console.log("new person", newStaff);
 }
}




