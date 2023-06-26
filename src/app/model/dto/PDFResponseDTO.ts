import {FlairCreateDTO} from "./flair/FlairCreateDTO";
import {RuleCreateDTO} from "./rule/RuleCreateDTO";

export class PDFResponseDTO {
  public fileName:string;
  public pdfText:string;

  constructor() {
    this.fileName = "";
    this.pdfText = "";
  }

}
