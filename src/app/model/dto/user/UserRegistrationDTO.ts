export class UserRegistrationDTO {
  public username:string;
  public password:string;
  public email:string;

  constructor() {
    this.username = "";
    this.password = "";
    this.email = "";
  }

}
