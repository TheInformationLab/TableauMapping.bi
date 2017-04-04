export class User {
  firstName: string;
  lastName: string;
  company: string;
  password: string;
  email: string;

  constructor(email: string, password: string, firstName?: string, lastName?: string, company?: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
  }
}
