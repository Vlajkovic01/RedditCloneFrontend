import {FlairCreateDTO} from "../flair/FlairCreateDTO";
import {RuleCreateDTO} from "../rule/RuleCreateDTO";

export class CommunityEditDTO {
  public description:string;
  public flairs:FlairCreateDTO[];
  public rules:RuleCreateDTO[];

  constructor() {
    this.description = "";
    this.flairs = [];
    this.rules = [];
  }

}
