import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  candid_Id: string;
  candid_Name: string;
  test_Id: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.candid_Id = params.id);
    this.route.params.subscribe( params => this.candid_Name = params.name);
    this.route.params.subscribe( params => this.test_Id = params.testID);
  }

  ngOnInit() {
    history.replaceState({}, '', '/instructions');
  }

  startTest() {
    this.router.navigate(['welcome-candid/test/' + this.candid_Id + '/' + this.candid_Name + '/' + this.test_Id]);
  }
}
