import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  recruiter: string;
  recruiterName: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.recruiter = params.name);
    if (!sessionStorage.getItem('RecruiterName')) {
      sessionStorage.setItem('RecruiterName', this.recruiter);
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
