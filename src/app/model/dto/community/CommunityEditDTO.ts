import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {RuleCreateDTO} from "../rule/RuleCreateDTO";
import {PDFResponseDTO} from "../PDFResponseDTO";

export class CommunityEditDTO {
  public description:string;
  public flairs:FlairCreateDTO[];
  public rules:RuleCreateDTO[];
  public pdf: PDFResponseDTO | undefined;

  constructor() {
    this.description = "";
    this.flairs = [];
    this.rules = [];
    this.pdf = new PDFResponseDTO();
  }

}
