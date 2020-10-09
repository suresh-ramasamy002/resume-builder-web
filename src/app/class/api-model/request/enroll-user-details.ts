export class EnrollUserDetails {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  state: string;

  constructor(role: string, firstName: string, lastName: string, email: string, password: string, city: string, state: string) {
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
  }
}
