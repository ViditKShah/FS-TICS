import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  recruiterName: string;

  constructor() {
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
