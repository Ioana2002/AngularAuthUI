import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  
  authenticated: boolean = false;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.authenticated = true;
    }
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile_picture');
    localStorage.removeItem('profile');
    this.router.navigate(['/login']);
  }

}

