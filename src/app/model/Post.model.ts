import {Flair} from "./Flair.model"
import {User} from "./User.model"

export class Post {
  private _id:number;
  private _title:string;
  private _text:string;
  private _creationDate:Date;
  private _imagePath:string;
  private _user:User;
  private _flair:Flair;


  constructor(id: number, title: string, text: string, creationDate: Date, imagePath: string, user: User, flair: Flair) {
    this._id = id;
    this._title = title;
    this._text = text;
    this._creationDate = creationDate;
    this._imagePath = imagePath;
    this._user = user;
    this._flair = flair;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  set creationDate(value: Date) {
    this._creationDate = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get flair(): Flair {
    return this._flair;
  }

  set flair(value: Flair) {
    this._flair = value;
  }
}
