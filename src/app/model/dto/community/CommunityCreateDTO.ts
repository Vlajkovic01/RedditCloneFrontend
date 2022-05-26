import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {RuleCreateDTO} from "../rule/RuleCreateDTO";

export class CommunityCreateDTO {
  public name:string;
  public description:string;
  public flairs:FlairCreateDTO[];
  public rules:RuleCreateDTO[];

  constructor() {
    this.name = "";
    this.description = "";
    this.flairs = [];
    this.rules = [];
  }

}
