export class UserForEditDTO {
  public avatar:string;
  public description:string;
  public displayName:string;


  constructor() {
    this.avatar = "";
    this.description = "";
    this.displayName = "";
  }
}
