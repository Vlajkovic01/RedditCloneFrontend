import {ReactionType} from "../../enum/ReactionType.enum";
import {User} from "../../User.model";
import {Post} from "../../Post.model";
import {Comment} from "../../Comment.model";

export class ReactionForPostDTO {
  public id:number;
  public type:ReactionType;
  public timestamp:Date;
  public user:User;


  constructor(id: number, type: ReactionType, timestamp: Date, user: User) {
    this.id = id;
    this.type = type;
    this.timestamp = timestamp;
    this.user = user;
  }
}
