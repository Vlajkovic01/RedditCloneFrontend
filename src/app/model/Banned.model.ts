import {Moderator} from "./Moderator.model";
import {User} from "./User.model";
import {Community} from "./Community.model";

export class Banned {
  private _id:number;
  private _timestamp:Date;
  private _moderator:Moderator;
  private _user:User;
  private _community:Community;


  constructor(id: number, timestamp: Date, moderator: Moderator, user: User, community: Community) {
    this._id = id;
    this._timestamp = timestamp;
    this._moderator = moderator;
    this._user = user;
    this._community = community;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  get moderator(): Moderator {
    return this._moderator;
  }

  set moderator(value: Moderator) {
    this._moderator = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get community(): Community {
    return this._community;
  }

  set community(value: Community) {
    this._community = value;
  }
}
