import {Community} from "./Community.model";

export class Rule {
  private _id:number;
  private _description:string;
  private _community:Community;


  constructor(id: number, description: string, community: Community) {
    this._id = id;
    this._description = description;
    this._community = community;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get community(): Community {
    return this._community;
  }

  set community(value: Community) {
    this._community = value;
  }
}
