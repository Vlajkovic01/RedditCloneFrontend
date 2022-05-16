export class User {
  private _id: number;
  private _username:string;
  private _password:string;
  private _email:string;
  private _avatar:string;
  private _registrationDate:Date;
  private _description:string;
  private _displayName:string;


  constructor() {
    this._id = 0;
    this._username = "";
    this._password = "";
    this._email = "";
    this._avatar = "";
    this._registrationDate = new Date();
    this._description = "";
    this._displayName = "";
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get registrationDate(): Date {
    return this._registrationDate;
  }

  set registrationDate(value: Date) {
    this._registrationDate = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

}
