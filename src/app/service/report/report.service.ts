import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReportCreateDTO} from "../../model/dto/report/ReportCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly reportPath = environment.path + "reports"

  constructor(private http:HttpClient) { }

  create(report:ReportCreateDTO) {
    return this.http.post(this.reportPath, report);
  }
}
