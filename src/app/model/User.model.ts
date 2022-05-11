export class User {
  private _id: number;
  private _username:string;
  private _password:string;
  private _email:string;
  private _avatar:string;
  private _registrationDate:Date;
  private _description:string;
  private _displayName:string;


  constructor(id: number, username: string, password: string, email: string, avatar: string, registrationDate: Date, description: string, displayName: string) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._email = email;
    this._avatar = avatar;
    this._registrationDate = registrationDate;
    this._description = description;
    this._displayName = displayName;
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
