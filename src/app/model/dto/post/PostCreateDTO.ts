import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {PDFResponseDTO} from "../PDFResponseDTO";

export class PostCreateDTO {
  public title:string;
  public text:string;
  public flair:FlairCreateDTO;
  public imagePath:string;
  public pdf: PDFResponseDTO | undefined;

  constructor() {
    this.title = "";
    this.text = "";
    this.flair = new FlairCreateDTO();
    this.imagePath = "";
    this.pdf = new PDFResponseDTO();
  }

}
