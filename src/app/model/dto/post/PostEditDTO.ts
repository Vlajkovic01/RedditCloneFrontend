import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {PDFResponseDTO} from "../PDFResponseDTO";

export class PostEditDTO {
  public text:string;
  public imagePath:string;
  public flair:FlairCreateDTO;
  public pdf: PDFResponseDTO | undefined;

  constructor() {
    this.text = "";
    this.imagePath = "";
    this.flair = new FlairCreateDTO();
    this.pdf = new PDFResponseDTO();
  }

}
