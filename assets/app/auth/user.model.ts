export class User {
  firstName: string;
  lastName: string;
  company: string;
  password: string;
  email: string;
  mapboxAccessToken: string;
  mapboxUsername: string;

  constructor(email: string, password: string, firstName?: string, lastName?: string, company?: string, at?: string, un?: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.mapboxAccessToken = at;
    this.mapboxUsername = un;
  }
}
