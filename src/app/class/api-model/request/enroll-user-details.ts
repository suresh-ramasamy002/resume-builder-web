export class EnrollUserDetails {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  state: string;

  constructor(role: string, firstName: string, lastName: string, email: string, password: string, country: string, state: string) {
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.country = country;
    this.state = state;
  }
}
