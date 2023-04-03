import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

declare function download(url:any): any;


@Component({
  selector: 'app-eveniment',
  templateUrl: './eveniment.component.html',
  styleUrls: ['./eveniment.component.scss']
})
export class EvenimentComponent implements OnInit{

  id:any = '';
  eveniment : {
    data_Inceput: string;
    data_Sfarsit: string;
    denumire: string;
    descriere: string;
    evenimentId: string;
    id: number;
    judet: string;
    locatia: string;
    ora: string;
    poster: string;
    tipEveniment: string;
  } | any = {
    denumire : ''
  };

  allowRegister:boolean = false;
  allowValidation:boolean = false;

  constructor(private service: AuthService,
    private router: Router,
    public datePipe: DatePipe,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.service.getEvent(this.id).subscribe((response:any) =>{
        this.eveniment = response;

        this.eveniment.data_Inceput = this.datePipe.transform(this.eveniment.data_Inceput , 'dd.MM.yyyy');
        this.eveniment.data_Sfarsit = this.datePipe.transform(this.eveniment.data_Sfarsit , 'dd.MM.yyyy');

        if((localStorage.getItem("profile") != null || localStorage.getItem("profile") != undefined) && 
           (localStorage.getItem("token") != null || localStorage.getItem("token") != undefined))
        {
          this.allowRegister = true;
        }
        if(localStorage.getItem('roles')?.includes('Admin'))
        {
          this.allowValidation = true;
        }

      })
    })

  }

  GoToRegister()
  {
    this.router.navigate(['event-register', this.id])
  }

  GoToParticipants()
  {
    this.router.navigate(['event-participants', this.id])
  }

  downloadLink(URL:any)
  {
    download(URL)
  }

}
