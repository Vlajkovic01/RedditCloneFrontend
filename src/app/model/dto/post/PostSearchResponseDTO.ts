export class PostSearchResponseDTO {
  public id:number;
  public title:string;
  public text:string;
  public flair: string;
  public highlighter: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.text = '';
    this.flair = '';
    this.highlighter = '';
  }
}
