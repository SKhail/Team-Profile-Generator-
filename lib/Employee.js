// Employee Class 
class Employee {
  constructor(name, id, email) {
    this.name = name,
      this.id = id,
      this.email = email
  }

  //Get the person name
  getName() {
    return this.name;
  }

  //Get the ID
  getId() {
    return this.id;
  }


  //Get Email Address
  getEmail() {
    return this.email;
  }


  //get the roles
  getRole() {
    return "Employee";
  }
}

//exporting Employee
module.exports = Employee;
