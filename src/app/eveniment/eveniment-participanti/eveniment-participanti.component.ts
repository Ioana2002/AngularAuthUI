import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StergeParticipareEvenimentComponent } from '../sterge-participare-eveniment/sterge-participare-eveniment.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-eveniment-participanti',
  templateUrl: './eveniment-participanti.component.html',
  styleUrls: ['./eveniment-participanti.component.scss']
})
export class EvenimentParticipantiComponent implements OnInit {

  dataSourceParticipants = new MatTableDataSource();

  showParticipanti: boolean = false;

  displayedColumns: string[] = ['nume', 'taxa', 'dataInscriere', 'status', 'telefon'];
  displayedColumnsAdmin: string[] = ['nume', 'taxa', 'dataInscriere', 'status', 'telefon', 'actions'];

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  
  isAdmin: boolean = false;
  id: any;
  eveniment: {
    denumire: string;
    evenimentId: string;
    tipEveniment: string;
    evenimentParticipanti: boolean;
  } | any = {
      denumire: ''
    };

  constructor(private service: AuthService,
    private router: Router,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (localStorage.getItem('roles')?.includes('Admin')) {
      this.isAdmin = true;
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")

      this.service.getEventParticipants(this.id).subscribe((response: any) => {
        this.dataSourceParticipants.paginator = this.paginator.toArray()[0];
        response.forEach((participant: any) => {
          this.dataSourceParticipants.data.push(participant)
          this.dataSourceParticipants._updateChangeSubscription();
        })
        this.dataSourceParticipants.data.sort((a: any, b: any) => a.dataInscriere.localeCompare(b.dataInscriere))
        this.dataSourceParticipants._updateChangeSubscription();
      }, (err: any) => {
        console.log(err);
      })
    })

    this.service.getEvent(this.id).subscribe((response: any) => {
      this.eveniment = response;
      this.showParticipanti = this.eveniment.evenimentParticipanti == true ? true : false;
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
