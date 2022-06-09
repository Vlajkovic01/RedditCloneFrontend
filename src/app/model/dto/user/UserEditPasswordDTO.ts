export class UserEditPasswordDTO {
  public currentPassword:string;
  public newPassword:string;

  constructor() {
    this.currentPassword = "";
    this.newPassword = "";
  }
}
