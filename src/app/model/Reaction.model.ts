import {ReactionType} from "./enum/ReactionType.enum";
import {User} from "./User.model";
import {Post} from "./Post.model";
import {Comment} from "./Comment.model"

export class Reaction{
  private _id:number;
  private _type:ReactionType;
  private _timestamp:Date;
  private _user:User;
  private _post:Post | null;
  private _comment:Comment | null;


  constructor(id: number, type: ReactionType, timestamp: Date, user: User, post: Post | null, comment: Comment | null) {
    this._id = id;
    this._type = type;
    this._timestamp = timestamp;
    this._user = user;
    this._post = post;
    this._comment = comment;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get type(): ReactionType {
    return this._type;
  }

  set type(value: ReactionType) {
    this._type = value;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get post(): Post | null {
    return this._post;
  }

  set post(value: Post | null) {
    this._post = value;
  }

  get comment(): Comment | null {
    return this._comment;
  }

  set comment(value: Comment | null) {
    this._comment = value;
  }
}
