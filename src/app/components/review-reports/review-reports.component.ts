import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Community} from "../../model/Community.model";
import {Report} from "../../model/Report.model";
import {ReportService} from "../../service/report/report.service";
import {Post} from "../../model/Post.model";

@Component({
  selector: 'app-review-reports',
  templateUrl: './review-reports.component.html',
  styleUrls: ['./review-reports.component.css']
})
export class ReviewReportsComponent implements OnInit {

  @Output()
  removePostEvent = new EventEmitter<Post>();
  communityId:number = 0;

  reports:Report[] = [];

  constructor(private route:ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = params['id'];
      this.reportService.getReportsByCommunityId(this.communityId).subscribe((reports:Report[]) => {
        this.reports = reports;
      })
    })
  }

  acceptPostReport(id:number) {
    this.reportService.acceptReport(id).subscribe((acceptedReport:Report) => {
      this.removePostEvent.emit(acceptedReport.post);
      // this.reports.splice(this.reports.indexOf(acceptedReport,0),1);
      this.reportService.getReportsByCommunityId(this.communityId).subscribe((reports:Report[]) => {
        this.reports = reports;
      })
    }, () => {
      console.log("error")
    })
  }

  acceptCommentReport(id:number) {
    this.reportService.acceptReport(id).subscribe((acceptedReport:Report) => {
      // this.reports.splice(this.reports.indexOf(acceptedReport,0),1);
      this.reportService.getReportsByCommunityId(acceptedReport.community.id).subscribe((reports:Report[]) => {
        this.reports = reports;
      })
    }, () => {
      console.log("error")
    })
  }

}
