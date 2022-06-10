import {FlairCreateDTO} from "../flair/FlairCreateDTO";

export class PostEditDTO {
  public text:string;
  public imagePath:string;
  public flair:FlairCreateDTO;


  constructor() {
    this.text = "";
    this.imagePath = "";
    this.flair = new FlairCreateDTO();
  }

}
