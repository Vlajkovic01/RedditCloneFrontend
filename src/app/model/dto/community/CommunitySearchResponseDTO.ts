
export class CommunitySearchResponseDTO {
  public id:number;
  public name:string;
  public numOfPosts:number;
  public averageKarma: number;
  public highlighter: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.numOfPosts = 0;
    this.averageKarma = 0;
    this.highlighter = '';
  }
}
