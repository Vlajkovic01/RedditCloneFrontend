import {FlairCreateDTO} from "../flair/FlairCreateDTO";

export class PostCreateDTO {
  public title:string;
  public text:string;
  public flair:FlairCreateDTO;

  constructor() {
    this.title = "";
    this.text = "";
    this.flair = new FlairCreateDTO();
  }

}
