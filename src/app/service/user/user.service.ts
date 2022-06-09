import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post.model";
import {User} from "../../model/User.model";
import {environment} from "../../../environments/environment";
import {UserRegistrationDTO} from "../../model/dto/user/UserRegistrationDTO";
import {UserForMyProfileDTO} from "../../model/dto/user/UserForMyProfileDTO";
import {UserForEditDTO} from "../../model/dto/user/UserForEditDTO";
import {UserEditPasswordDTO} from "../../model/dto/user/UserEditPasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersPath = environment.path + "users"
  private readonly uploadImagePath = environment.path + "upload/users/image"

  constructor(private http:HttpClient) {
  }

  getAll():Observable<User[]> {
    return this.http.get<User[]>(this.usersPath);
  }

  getUser(username: string):Observable<UserForMyProfileDTO> {
    return this.http.get<UserForMyProfileDTO>(this.usersPath + `/${username}`)
  }

  register(username: string, password: string, email: string) {
    let newUser: UserRegistrationDTO = new UserRegistrationDTO();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email
    return this.http.post(this.usersPath, newUser)
  }

  saveImage(file: any):Observable<string> {
    let formData = new FormData();
    formData.append("image", file);
    return this.http.post<string>(this.uploadImagePath, formData);
  }

  editUser(userForEdit: UserForEditDTO) {
    return this.http.put<UserForMyProfileDTO>(this.usersPath, userForEdit);
  }

  editPassword(userEditPasswordDTO: UserEditPasswordDTO) {
    return this.http.put(this.usersPath + "/password", userEditPasswordDTO);
  }
}
