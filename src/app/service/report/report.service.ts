import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReportCreateDTO} from "../../model/dto/report/ReportCreateDTO";
import {Observable} from "rxjs";
import {Report} from "../../model/Report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly reportPath = environment.path + "reports"
  private readonly communityPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  create(report:ReportCreateDTO) {
    return this.http.post(this.reportPath, report);
  }

  getReportsByCommunityId(id:number):Observable<Report[]> {
    return this.http.get<Report[]>(this.communityPath + `/${id}/reports`)
  }

  acceptReport(id:number):Observable<Report> {
    return this.http.delete<Report>(this.reportPath + `/${id}`);
  }
}
