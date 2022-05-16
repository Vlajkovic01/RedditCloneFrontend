import { Community } from "./Community.model"

export class Flair {
  private _id:number;
  private _name:string;
  private _communities:Community[];


  constructor() {
    this._id = 0;
    this._name = "";
    this._communities = [];
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get communities(): Community[] {
    return this._communities;
  }

  set communities(value: Community[]) {
    this._communities = value;
  }
}
