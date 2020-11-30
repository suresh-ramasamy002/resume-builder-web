import { Component, OnInit } from '@angular/core';
import {CoreDataService} from '../../services/core-data.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private aId = 'V5cCGAXOpHMTvgL2b2rccgDLt3x1';
  public revenueAmount = 0;
  public downloadCount = 0;
  constructor(public coreDataService: CoreDataService, private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getAdminUserDetails();
    this.userService.getFeedbacks(this.aId);
    this.userService.getResumeDetails(this.aId);
    setTimeout(() => {
      this.coreDataService.resumeDownloadedData.forEach(resumeData => {
        if (resumeData.name !== 'template-one' && resumeData.name !== 'template-two' && resumeData.name !== 'template-four' && resumeData.count > 0) {
          this.revenueAmount += (resumeData.count * 15);
        }
        this.downloadCount += resumeData.count;
      });
    }, 1000);
  }

}
