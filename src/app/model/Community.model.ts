import {Moderator} from "./Moderator.model";
import {Post} from "./Post.model";
import {Flair} from "./Flair.model";

export class Community {
  private _id:number;
  private _name:string;
  private _description:string;
  private _creationDate:Date;
  private _isSuspended:boolean;
  private _suspendedReason:string;
  private _moderators:Moderator[];
  private _posts:Post[];
  private _flairs:Flair[];


  constructor() {
    this._id = 0;
    this._name = "";
    this._description = "";
    this._creationDate = new Date();
    this._isSuspended = false;
    this._suspendedReason = "";
    this._moderators = [];
    this._posts = [];
    this._flairs = [];
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get creationDate(): Date {
    return this._creationDate;
  }

  set creationDate(value: Date) {
    this._creationDate = value;
  }

  get isSuspended(): boolean {
    return this._isSuspended;
  }

  set isSuspended(value: boolean) {
    this._isSuspended = value;
  }

  get suspendedReason(): string {
    return this._suspendedReason;
  }

  set suspendedReason(value: string) {
    this._suspendedReason = value;
  }

  get moderators(): Moderator[] {
    return this._moderators;
  }

  set moderators(value: Moderator[]) {
    this._moderators = value;
  }

  get posts(): Post[] {
    return this._posts;
  }

  set posts(value: Post[]) {
    this._posts = value;
  }

  get flairs(): Flair[] {
    return this._flairs;
  }

  set flairs(value: Flair[]) {
    this._flairs = value;
  }
}
