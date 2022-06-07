import {User} from "./User.model";
import {Post} from "./Post.model";
import {Reaction} from "./Reaction.model";

export class Comment {
  public id:number;
  public text: string;
  public timestamp:Date;
  public isDeleted:boolean;
  public parentCommentId:number | null;
  public children:Comment[];
  public user:User;
  public post:Post;
  public reactions:Reaction[];


  constructor() {
    this.id = 0;
    this.text = "";
    this.timestamp = new Date();
    this.isDeleted = false;
    this.parentCommentId = 0;
    this.children = [];
    this.user = new User();
    this.post = new Post();
    this.reactions = [];
  }

}
