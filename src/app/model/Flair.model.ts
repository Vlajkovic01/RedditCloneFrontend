import { Community } from "./Community.model"

export class Flair {
  private _id:number;
  private _name:string;
  private _communities:Community[];


  constructor(id: number, name: string, communities: Community[]) {
    this._id = id;
    this._name = name;
    this._communities = communities;
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
