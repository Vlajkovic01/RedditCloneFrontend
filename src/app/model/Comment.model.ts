import {User} from "./User.model";
import {Post} from "./Post.model";

export class Comment {
  public id:number;
  public text: string;
  public timestamp:Date;
  public isDeleted:boolean;
  // public parent:Comment;
  public children:Comment[];
  public user:User;
  public post:Post;


  constructor() {
    this.id = 0;
    this.text = "";
    this.timestamp = new Date();
    this.isDeleted = false;
    // this.parent = new Comment();
    this.children = [];
    this.user = new User();
    this.post = new Post();
  }

}
