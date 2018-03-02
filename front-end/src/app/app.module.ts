import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserXhr } from '@angular/http';
import { Cors } from './cors';

import { DataService } from './services/data.service';
import { CandidDataService } from './services/candid-data.service';
import { QuestionsComponent } from './questions/questions.component';
import { TestComponent } from './test/test.component';
import { ReviewComponent } from './review/review.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmitTestComponent } from './submit-test/submit-test.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CandidLoginComponent } from './candid-login/candid-login.component';
import { InstructionsComponent } from './instructions/instructions.component';

const appRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    data: { title: 'Create a Test' }
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    data: { title: 'Add or View Questions' }
  },
  // {
  //   path: 'submitTest',
  //   component: SubmitTestComponent,
  //   data: { title: 'Submit Test' }
  // },
  {
    path: 'thanks',
    component: ThankYouComponent,
    data: { title: 'Thanks!' }
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Review' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'welcome-candid',
    component: CandidLoginComponent,
    data: { title: 'Welcome Candidate' }
  },
  {
    path: 'welcome-candid/test/:id',
    component: SubmitTestComponent,
    data: { title: 'Submit Test' }
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    TestComponent,
    ReviewComponent,
    DashboardComponent,
    SubmitTestComponent,
    ThankYouComponent,
    CandidLoginComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
        // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: BrowserXhr, useClass:Cors}, // <--------- For Cross Origin Access
    DataService,    // <----- Data Service
    CandidDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
