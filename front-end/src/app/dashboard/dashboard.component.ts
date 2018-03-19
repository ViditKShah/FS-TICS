import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recruiter_id: string;
  recruiter_name: string;
  recruiterId: string;
  recruiterName: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    const url = location.host.split(':');
    const domain = url[0];
    this.route.params.subscribe( params => this.recruiter_name = params.name);
    this.route.params.subscribe( params => this.recruiter_id = params.id);
    if (!sessionStorage.getItem('RecruiterName')) {
      sessionStorage.setItem('RecruiterId', this.recruiter_id);
      sessionStorage.setItem('RecruiterName', this.recruiter_name);
    }
  }

  ngOnInit() {
    this.recruiterName = sessionStorage.getItem('RecruiterName');
  }

  logOut() {
    const url = location.host.split(':');
    const domain = url[0];
    window.location.href = 'http://' + domain + ':3000/logout';
  }
}
