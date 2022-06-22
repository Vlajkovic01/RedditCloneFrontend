export class ReportCreateDTO {
  public reason:string;
  public postId:number;
  public commentId:number;

  constructor() {
    this.reason = "";
    this.postId = 0;
    this.commentId = 0;
  }
}
