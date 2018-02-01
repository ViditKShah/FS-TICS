import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { UserService} from '../services/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  
  // Injecting Service
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}
