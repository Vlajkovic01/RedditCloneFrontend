export class UserRegistrationDTO {
  public username:string;
  public password:string;
  public email:string;

  constructor() {
    this.username = "";
    this.password = "";
    this.email = "";
  }

  // get username(): string {
  //   return this.username;
  // }
  //
  // set username(value: string) {
  //   this.username = value;
  // }
  //
  // get password(): string {
  //   return this.password;
  // }
  //
  // set password(value: string) {
  //   this.password = value;
  // }
  //
  // get email(): string {
  //   return this.email;
  // }
  //
  // set email(value: string) {
  //   this.email = value;
  // }

}
