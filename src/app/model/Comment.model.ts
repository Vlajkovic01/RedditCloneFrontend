import {User} from "./User.model";
import {Post} from "./Post.model";

export class Comment {
  private _id:number;
  private _text: string;
  private _timestamp:string;
  private _isDeleted:boolean;
  private _parent:Comment;
  private _children:Comment[];
  private _user:User;
  private _post:Post;


  constructor(id: number, text: string, timestamp: string, isDeleted: boolean, parent: Comment, children: Comment[], user: User, post: Post) {
    this._id = id;
    this._text = text;
    this._timestamp = timestamp;
    this._isDeleted = isDeleted;
    this._parent = parent;
    this._children = children;
    this._user = user;
    this._post = post;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  get parent(): Comment {
    return this._parent;
  }

  set parent(value: Comment) {
    this._parent = value;
  }

  get children(): Comment[] {
    return this._children;
  }

  set children(value: Comment[]) {
    this._children = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get post(): Post {
    return this._post;
  }

  set post(value: Post) {
    this._post = value;
  }
}
