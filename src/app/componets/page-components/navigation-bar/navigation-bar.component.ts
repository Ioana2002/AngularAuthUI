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
  administrator: boolean = false;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.authenticated = true;
    }
    var roles:string | null = localStorage.getItem("roles");
    if (roles?.includes('Admin')) {
      if(this.authenticated)
      {
        this.administrator = true;
      }
    }
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile_picture');
    localStorage.removeItem('profile');
    localStorage.removeItem('account_info');
    localStorage.removeItem('roles');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}

