export class CommentCreateDTO {
  public text:string;
  public parentCommentId:number;
  public postId:number;

  constructor() {
    this.text = "";
    this.parentCommentId = 0;
    this.postId = 0;
  }
}
