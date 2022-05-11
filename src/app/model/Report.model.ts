import {ReportReason} from "./enum/ReportReason.enum";
import {User} from "./User.model";
import {Comment} from "./Comment.model";
import {Post} from "./Post.model";


export class Report {
  private _id:number;
  private _reason:ReportReason;
  private _timestamp:Date;
  private _accepted:boolean;
  private _byUser:User;
  private _comment:Comment;
  private _post:Post;


  constructor(id: number, reason: ReportReason, timestamp: Date, accepted: boolean, byUser: User, comment: Comment, post: Post) {
    this._id = id;
    this._reason = reason;
    this._timestamp = timestamp;
    this._accepted = accepted;
    this._byUser = byUser;
    this._comment = comment;
    this._post = post;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get reason(): ReportReason {
    return this._reason;
  }

  set reason(value: ReportReason) {
    this._reason = value;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  get accepted(): boolean {
    return this._accepted;
  }

  set accepted(value: boolean) {
    this._accepted = value;
  }

  get byUser(): User {
    return this._byUser;
  }

  set byUser(value: User) {
    this._byUser = value;
  }

  get comment(): Comment {
    return this._comment;
  }

  set comment(value: Comment) {
    this._comment = value;
  }

  get post(): Post {
    return this._post;
  }

  set post(value: Post) {
    this._post = value;
  }
}
