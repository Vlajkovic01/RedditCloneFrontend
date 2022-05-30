import {Flair} from "./Flair.model"
import {User} from "./User.model"
import {Community} from "./Community.model";
import {Reaction} from "./Reaction.model";

export class Post {
  private _id:number;
  private _title:string;
  private _text:string;
  private _creationDate:Date;
  private _imagePath:string;
  private _user:User;
  private _flair:Flair;
  private _community:Community;
  private _reactions:Reaction[];


  constructor() {
    this._id = 0;
    this._title = "";
    this._text = "";
    this._creationDate = new Date();
    this._imagePath = "";
    this._user = new User();
    this._flair = new Flair();
    this._community = new Community();
    this._reactions = [];
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

  get community(): Community {
    return this._community;
  }

  set community(value: Community) {
    this._community = value;
  }

  get reactions(): Reaction[] {
    return this._reactions;
  }

  set reactions(value: Reaction[]) {
    this._reactions = value;
  }
}
