import {User} from "./User.model";
import {Community} from "./Community.model";

export class Moderator{
  private _id:number;
  private _user:User;
  private _community:Community;


  constructor(id: number, user: User, community: Community) {
    this._id = id;
    this._user = user;
    this._community = community;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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
