import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service';
import { CandidDataService } from '../services/candid-data.service';

import { Submissions } from '../model/submissions';
import { Questions } from '../model/questions';
import { Test } from '../model/test';
import { Scores } from '../model/scores';
import { Candidate } from '../model/candidate';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-submit-test',
  templateUrl: './submit-test.component.html',
  styleUrls: ['./submit-test.component.css']
})
export class SubmitTestComponent implements OnInit {

  candid: Candidate;
  myTest: Test;
  allTests: Test[];
  generalQues: Questions[];
  psychQues: Questions[];
  myQues: string[] = [];
  all_ques: Questions[];
  ques: Questions;
  answerGiven: string;
  submitCount = 0;
  getCandid = 0;
  getCandidLength = 0;
  candidID : string;
  candidName: string;
  testID = "5a8a90f7d6c1f4189b2b78f3";

  newAnswer: Submissions;
  allAnswers: Submissions[];

  scores: string[];
  newScore: number;
  correct_count : number;
  total_count : number;
  submitScore: Scores;

  constructor(private dataService: DataService, private candidData: CandidDataService, private router: Router, private route: ActivatedRoute, 
    ) { 
      this.route.params.subscribe( params => this.candidID = params.id);
  }

  ngOnInit() {
    this.candid = Candidate.CreateDefault(); 
    this.getCandidName();

  	this.ques = Questions.CreateDefault();
  	this.myQues = [];
  	this.myTest = Test.CreateDefault();
  	this.newAnswer = Submissions.CreateDefault();
  	this.getTestDetails();
  	this.getAppropriateQuestions();
    this.submitScore = Scores.CreateDefault();
    
  }

  // Getting the candidate name from the ID passed through the previous route
  getCandidName() {
    this.candidData.getCandidates(this.candidID)  // <-- ID of the Test
    .subscribe(
      data => {
        this.candidName = '';
        console.log(data);
          data.forEach(
           element => {
             var a = element.candid_name;
             this.candidName = a;
           })
      });
  }

  getTestDetails() {
  	this.dataService.getTestDetails(this.testID, "takeTest")  // <-- ID of the Test
    .subscribe(
      data => {
          data.forEach(
           element => {
             var a = new Test(element._id, 
             					element.recruiter_id,
             					element.designation,
                      element.question_IDs, 
                      element.skills);
         	  this.myTest = a;
         	  this.myQues = this.myTest.question_IDs;
         	  
         	  this.getAppropriateQuestions();
         	  // console.log(this.allAnswers);
           })
      });
   
    }	

    getAppropriateQuestions() {
    		this.all_ques = [];
         	this.generalQues = [];
         	this.psychQues = [];
         	this.allAnswers = [];
    	 	for (var j =  0; j < this.myQues.length; j++) {

  			this.dataService.getQuestions(this.myQues[j], "fromSubmitTest")
  			.subscribe(
      		  data => {
         			data.forEach(
           				element => {
             				var newQues = new Questions(element._id, 
                                element.question_name, 
                                element.answers,
                                element.correct_answer,
                                element.question_type,
                                element.question_category);
 								this.newAnswer.question_id = newQues._id;
 								this.newAnswer.candid_id = this.candidID;
 								this.newAnswer.test_id = this.myTest._id;
             		this.all_ques.push(newQues);

             		this.allAnswers.push(this.newAnswer);
             		this.newAnswer = Submissions.CreateDefault();
           		})
      		})
  		}
  	}
  

  	onSelectionChange(answer, ques_id, correct_anwer) {
        for (var i = 0; i < this.allAnswers.length; i++) {
        	if (this.allAnswers[i].question_id == ques_id ) {
        		this.allAnswers[i].answer_given = answer;
        		if (this.allAnswers[i].answer_given == correct_anwer) {
        			this.allAnswers[i].isCorrect = true;
        		}
        		else {
        			this.allAnswers[i].isCorrect = false;
        		}
        		console.log("Answer logged: ", this.allAnswers[i].answer_given);
        		break;
        	}
        }

        console.log(this.testID);
    }

    // Submit test data
    sendAnswers() {

    	for (var i = 0; i < this.allAnswers.length; i++) {
        // console.log("submit answer called: ", i);
    		this.dataService.submitAllAnswer(this.allAnswers[i])
    		.subscribe(
      			data => {
         		this.newAnswer._id = data.id;
         		this.submitCount++; 

             this.newAnswer = Submissions.CreateDefault();
             if (this.submitCount == (this.allAnswers.length)) {
               console.log("completed last one.", this.submitCount);
               this.getCandidateData(this.candidID, this.testID);            
             }
      		})         
    	}

      // Navigating to the Thanks page.
      this.router.navigate(['./thanks']);
    	
    }





    // calculate candidate score
    getCandidateData(candidID, testID) {
    this.dataService.getCandidateData(candidID).subscribe(
      data => {
        this.correct_count = 0;
        this.total_count = 0;
        this.getCandidLength = data.length;
        data.forEach(element => {
          this.getCandid++;
          var a = new Submissions(element._id,
                      element.test_id,
                      element.question_id,
                      element.candid_id,
                      element.answer_given,
                      element.isCorrect);

          this.total_count += 1;
          
          // Checking whether the answer given is true.
          if (a.isCorrect == true) {
            this.correct_count += 1;
          }
     
        })

        var score = "" + this.correct_count + " / " + this.total_count;
        this.submitScore.candid_id = candidID;
        this.submitScore.test_id = testID;
        this.submitScore.score = score;
        this.sendCandidScore();
   
      })
       
  }
  

  // Save candidate score
  sendCandidScore() {
      this.dataService.submitNewScore(this.submitScore)
        .subscribe(
            data => {
             this.submitScore._id = data.id;
             this.submitScore = Scores.CreateDefault();
             console.log("Sent score.");
      })
  }



}




  
  


