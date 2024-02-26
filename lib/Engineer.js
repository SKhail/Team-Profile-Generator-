//exported files
const Employee = require('./Employee');

class Engineer extends Employee {
 constructor(name, id, email) {
  super(name, id, email)
  this.github = github
 }

 getRoles() {
  return "Engineer"
 }
 getGithub() {
  return this.github
 }
}

module.exports = Engineer;