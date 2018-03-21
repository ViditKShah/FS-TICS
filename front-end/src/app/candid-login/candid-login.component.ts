import { Component, OnInit } from '@angular/core';
import { CandidDataService } from '../services/candid-data.service';
import { Candidate } from '../model/candidate';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-candid-login',
  templateUrl: './candid-login.component.html',
  styleUrls: ['./candid-login.component.css']
})
export class CandidLoginComponent implements OnInit {
  complexForm: FormGroup;
  genders = ['Click to select', 'Male', 'Female', 'Other'];
  locations = ['Bangalore', 'Hyderabad'];
  selectedGender: string;
  selectedLocation: string;
  dob: Date;
  testID = '5a8a90f7d6c1f4189b2b78f3';
  recruiter_id = '110';
  newCandidate: Candidate;
  private toasterService: ToasterService;

  constructor(private candidData: CandidDataService, private router: Router, fb: FormBuilder, toasterService: ToasterService) {
    this.toasterService = toasterService;
    this.complexForm = fb.group({
      'usr' : [null, Validators.required],
      'contact': [null, Validators.compose([Validators.required, Validators.pattern('(7|8|9)[1-9]{9}')])],
      'exp' : [null],
      'selectGender' : [null, Validators.pattern('[A-Za-z]{3}e|[A-Za-z]{5}e')],
      'email' : [null, Validators.email],
      'alt': [null, Validators.compose([Validators.required, Validators.pattern('(7|8|9)[1-9]{9}')])],
      // tslint:disable-next-line:max-line-length
      'dob': [null, Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')],
      'selectLocation' : [null, Validators.required]
    });
  }

  ngOnInit() {
    this.selectedGender = 'Click to select';
    this.selectedLocation = 'Bangalore';
    this.newCandidate = Candidate.CreateDefault();
    // console.log((<HTMLInputElement> document.getElementById('submitButton')).disabled);
  }

  insertCandidate() {
    if (this.complexForm.valid) {
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
      this.toasterService.pop('error', 'Invalid Submission', 'Please fill all details and retry.');
    }
  }

  submitForm(value: any): void {
    console.log('Reactive Form Data: ');
    console.log(value);
    console.log(this.complexForm);
  }
}
