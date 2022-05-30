import {ReactionType} from "../../enum/ReactionType.enum";

export class ReactionCreateDTO {
  public type:string;
  public postId:number;
  public commentId:number;

  constructor() {
    this.type = "";
    this.postId = 0;
    this.commentId = 0;
  }
}
