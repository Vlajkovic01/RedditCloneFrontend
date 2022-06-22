import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Community} from "../../model/Community.model";
import {Report} from "../../model/Report.model";
import {ReportService} from "../../service/report/report.service";

@Component({
  selector: 'app-review-reports',
  templateUrl: './review-reports.component.html',
  styleUrls: ['./review-reports.component.css']
})
export class ReviewReportsComponent implements OnInit {

  reports:Report[] = [];

  constructor(private route:ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const communityId = params['id'];
      this.reportService.getReportsByCommunityId(communityId).subscribe((reports:Report[]) => {
        this.reports = reports;
      })
    })
  }

}
