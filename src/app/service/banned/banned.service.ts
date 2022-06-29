import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReportCreateDTO} from "../../model/dto/report/ReportCreateDTO";
import {BannedCreateDTO} from "../../model/dto/banned/BannedCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class BannedService {

  private readonly bannedPath = environment.path + "banned"

  constructor(private http:HttpClient) { }

  create(banned:BannedCreateDTO) {
    return this.http.post(this.bannedPath, banned);
  }
}
