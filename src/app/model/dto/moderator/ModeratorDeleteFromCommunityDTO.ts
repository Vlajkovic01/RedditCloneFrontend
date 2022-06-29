export class ModeratorDeleteFromCommunityDTO {
  public communityId:number
  public moderatorId:number

  constructor() {
    this.communityId = 0;
    this.moderatorId = 0;
  }
}
