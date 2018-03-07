import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-login',
  templateUrl: './recruiter-login.component.html',
  styleUrls: ['./recruiter-login.component.css']
})
export class RecruiterLoginComponent implements OnInit {

  userName: string;
  Password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
  	this.router.navigate(['./dashboard']);
  }

}
