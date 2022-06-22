export class ReportCreateDTO {
  public reason:string;
  public postId:number;
  public commentId:number;
  public communityId:number;

  constructor() {
    this.reason = "";
    this.postId = 0;
    this.commentId = 0;
    this.communityId = 0;
  }
}
