export class BannedCreateDTO {
  public userId:number;
  public communityId:number;

  constructor() {
    this.userId = 0;
    this.communityId = 0;
  }
}
