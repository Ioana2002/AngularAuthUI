import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EvenimentInscriereComponent } from './eveniment-inscriere/eveniment-inscriere.component';
import { MatDialog } from '@angular/material/dialog';

declare function download(url: any): any;


@Component({
  selector: 'app-eveniment',
  templateUrl: './eveniment.component.html',
  styleUrls: ['./eveniment.component.scss']
})
export class EvenimentComponent implements OnInit {

  id: any = '';
  eveniment: {
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
      denumire: ''
    };

  allowRegister: boolean = false;
  allowValidation: boolean = false;
  authenticated: boolean = false;
  registered: boolean = false;

  constructor(private service: AuthService,
    private router: Router,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.allowRegister = false;

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      this.service.getEvent(this.id).subscribe((response: any) => {
        this.eveniment = response;

        this.eveniment.data_Inceput = this.datePipe.transform(this.eveniment.data_Inceput, 'dd.MM.yyyy');
        this.eveniment.data_Sfarsit = this.datePipe.transform(this.eveniment.data_Sfarsit, 'dd.MM.yyyy');

        if ((localStorage.getItem("profile") != null || localStorage.getItem("profile") != undefined) &&
          (localStorage.getItem("token") != null || localStorage.getItem("token") != undefined)) {
          this.registered = false;
          this.allowRegister = true;
        }
        if (localStorage.getItem('roles')?.includes('Admin')) {
          this.allowValidation = true;
        }
        this.service.getParticipants(this.id).subscribe({
          next: (participants: any) => {
            var profile: any = localStorage.getItem("profile");
            if(!profile)
              return;
            var currentUserProfile = JSON.parse(profile).profileId.toUpperCase();
            participants.forEach((element: any) => {
              if (currentUserProfile === element.value.toUpperCase()) {
                this.registered = true;
              }
            });
          },
          error: (error: any) => console.log(error)
        }
        )
      })
    })


  }

  Register() {
    const dialogRef = this.dialog.open(EvenimentInscriereComponent, {
      width: "600px",
      height: "225px",
      panelClass: 'custom-container',
      data: { id: this.id }
    });
  }

  GoToParticipants() {
    this.router.navigate(['event-participants', this.id])
  }

  // downloadParticipantiExcel() {
  //   this.service.getParticipantsEventExcel(this.eveniment.evenimentId).subscribe((response: any) => {
  //     var date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  //     var currentDate = JSON.stringify(date)
  //     const blob = new Blob([response.body], { type: response.headers.get('content-type') });
  //     var fileName = "Participanti_" + this.eveniment.denumire + '_' + currentDate + '.xlsx';
  //     const file = new File([blob], fileName, { type: response.headers.get('content-type') });
  //     saveAs(file);
  //   })
  // }

}
