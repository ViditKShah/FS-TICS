import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CandidDataService } from '../services/candid-data.service';
import { Candidate } from '../model/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-candid-login',
  templateUrl: './candid-login.component.html',
  styleUrls: ['./candid-login.component.css']
})
export class CandidLoginComponent implements OnInit {
  complexForm: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  locations = ['Bangalore', 'Hyderabad'];
  selectedGender: string;
  selectedLocation: string;
  dob: Date;
  datee = new Date();
  testID: string;
  recruiter_id = '110';
  newCandidate: Candidate;
  ageMaxLimitValue = (new Date().getFullYear() - 18).toString();

  constructor(private candidData: CandidDataService, private router: Router, fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.testID = params.id);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.selectedGender = 'Click to select';
    this.selectedLocation = 'Bangalore';
    this.newCandidate = Candidate.CreateDefault();
    (<HTMLInputElement> document.getElementById('dob')).max = this.ageMaxLimitValue + '-12-31';
  }

  insertCandidate(welcomeForm) {
    if (welcomeForm.form.valid) {
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
           const candidID = this.newCandidate._id;
           this.newCandidate = Candidate.CreateDefault();
           this.router.navigate(['welcome-candid/test/', candidID]);
        });
    } else {
      this.toastr.error('Please fill all details and retry.', 'Invalid Submission');
    }
  }
}
