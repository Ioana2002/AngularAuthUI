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
  admin: boolean = false;
  excursii: { value: string, name: string, tip: string, locatie:string }[] = [];
  activitati: { value: string, name: string, tip: string, locatie:string }[] = [];
  cazuri: { value:string, name: string, tip:string, locatie:string }[] = [];

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

    this.service.getEvents().subscribe((response: any) => {
      for (var event of response) {
        if (event.tip == "Excursie") {
          this.excursii.push(event);
        }
        if (event.tip == "Activitate") {
          this.activitati.push(event)
        }
        if(event.tip == "Caz Social")
        {
          this.cazuri.push(event)
        }
      }
    }, (err) => {
      console.log(err);
    })
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

  openEvent(data: any) {
    this.router.navigate(['/event', data.value]);
  }

}

