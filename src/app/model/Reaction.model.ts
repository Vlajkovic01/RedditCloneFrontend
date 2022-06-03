import {ReactionType} from "./enum/ReactionType.enum";
import {User} from "./User.model";
import {Post} from "./Post.model";
import {Comment} from "./Comment.model"

export class Reaction{
  public id:number;
  public type:ReactionType;
  public timestamp:Date;
  public user:User;
  public post:Post;
  public comment:Comment;


  constructor() {
    this.id = 0;
    this.type = ReactionType.UPVOTE;
    this.timestamp = new Date();
    this.user = new User();
    this.post = new Post();
    this.comment = new Comment();
  }

}
