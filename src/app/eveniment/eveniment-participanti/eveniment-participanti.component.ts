import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StergeParticipareEvenimentComponent } from '../sterge-participare-eveniment/sterge-participare-eveniment.component';

@Component({
  selector: 'app-eveniment-participanti',
  templateUrl: './eveniment-participanti.component.html',
  styleUrls: ['./eveniment-participanti.component.scss']
})
export class EvenimentParticipantiComponent implements OnInit{

  dataSourceStdA = new MatTableDataSource();

  showStdA:boolean = false;

  displayedColumns: string[] = ['participant'];
  displayedColumnsAdmin: string[] = ['participant','actions'];
  isAdmin: boolean = false;
  id: any;
  eveniment: {
    denumire: string;
    evenimentId: string;
    tipEveniment: string;
    standard_A:boolean;
  } | any = {
      denumire: ''
    };
  dataSourceOpen: any;

    constructor(private service: AuthService,
      private router: Router,
      public datePipe: DatePipe,
      private dialog: MatDialog,
      private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (localStorage.getItem('roles')?.includes('Admin')) 
    {
      this.isAdmin = true;
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")

      this.service.getEventParticipants(this.id).subscribe((response: any) => {
        response.forEach((participant:any) =>
        {
          switch(participant.clasa) { 
            case "Standard A": 
            { 
              this.dataSourceStdA.data.push(participant)
              this.dataSourceStdA._updateChangeSubscription();
              break; 
            } 
             
            default: { 
               break; 
            } 
         } 

        })
        this.dataSourceStdA.data.sort((a: any, b: any) => a.dataInscriere.localeCompare(b.dataInscriere))
        this.dataSourceStdA._updateChangeSubscription();
       // this.dataSourceStdA.data = response; /*Trebuie sa vad aici*/ 
      }, (err: any) => {
        console.log(err);
      })
    })

    this.service.getEvent(this.id).subscribe((response:any) =>{
      this.eveniment = response;
      this.showStdA = this.eveniment.standard_A == true ? true : false;
    })
      
  }

  deleteRow(id: string) {
    const dialogRef = this.dialog.open(StergeParticipareEvenimentComponent, {
      width: "600px",
      height: "200px",
      panelClass: 'custom-container',
      data: { id: id }
    });
  }

}
