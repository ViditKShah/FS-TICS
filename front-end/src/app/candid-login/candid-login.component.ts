import { Component, OnInit } from '@angular/core';
import { CandidDataService } from '../services/candid-data.service';
import { Candidate } from '../model/candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candid-login',
  templateUrl: './candid-login.component.html',
  styleUrls: ['./candid-login.component.css']
})
export class CandidLoginComponent implements OnInit {
  
  genders = ['Click to select','Male', 'Female', 'Other'];
  locations = ['Bangalore','Hyderabad'];
  selectedGender: string;
  selectedLocation: string;
  dob: Date;
  testID = "5a8a90f7d6c1f4189b2b78f3";
  recruiter_id = "110";

  newCandidate: Candidate;

  constructor(private candidData: CandidDataService, private router: Router) { }

  ngOnInit() {
  	this.selectedGender = 'Click to select';
  	this.selectedLocation = 'Bangalore';
    this.newCandidate = Candidate.CreateDefault();
  }

  insertCandidate(){
    // this.newCandidate.dob = this.dob;
    this.newCandidate.pref_loc = this.selectedLocation;
    this.newCandidate.gender = this.selectedGender;
    this.newCandidate.test_id = this.testID;
    this.newCandidate.recruiter_id = this.recruiter_id;
    this.candidData
        .insertNewCandidate(this.newCandidate)
        .subscribe(
         data => {
           this.newCandidate._id = data.id;
           var candidID = this.newCandidate._id;
           this.newCandidate = Candidate.CreateDefault();
           this.router.navigate(['welcome-candid/test/', candidID]); 
        })  
     
  }

}
