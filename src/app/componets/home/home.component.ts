import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userDetails: any;
  
  /**
   *
   */
  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(){
    if(localStorage.getItem('token') != null || localStorage.getItem('token') != undefined)
    {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    )
    }
  }

}
