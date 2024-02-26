// Employee Class 
class Employee {
  constructor(name, id, email) {
    this.name = name,
      this.id = id,
      this.email = email
  }
}
//Get the person name
function getName() {
  return this.name
}

//Get the ID
function getID() {
  return this.id
}


//Get Email Address
function getEmail() {
  return this.email
}


//get the roles
function getRoles() {
  return "Employee";
}


//exporting Employee
module.exports = Employee;
