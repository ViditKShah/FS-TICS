import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  
  candid_Id: string
  candid_Name: string;

  constructor(private route: ActivatedRoute) { 
  		this.route.params.subscribe( params => this.candid_Name = params.name);
  		console.log(this.candid_Name);
  }

  ngOnInit() {
  	
  }

}
