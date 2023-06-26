import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {RuleCreateDTO} from "../rule/RuleCreateDTO";
import {PDFResponseDTO} from "../PDFResponseDTO";

export class CommunityCreateDTO {
  public name:string;
  public description:string;
  public flairs:FlairCreateDTO[];
  public rules:RuleCreateDTO[];
  public pdf: PDFResponseDTO | undefined;

  constructor() {
    this.name = "";
    this.description = "";
    this.flairs = [];
    this.rules = [];
    this.pdf = new PDFResponseDTO();
  }

}
