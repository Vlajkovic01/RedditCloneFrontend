import {User} from "./User.model";
import {Community} from "./Community.model";
import {Moderator} from "./Moderator.model";

export class Banned {
  public id:number;
  public timestamp:Date;
  public by:User;
  public user:User;
  public community:Community;


  constructor() {
    this.id = 0;
    this.timestamp = new Date;
    this.by = new User();
    this.user = new User();
    this.community = new Community();
  }
}
