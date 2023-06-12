import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administration-general',
  templateUrl: './administration-general.component.html',
  styleUrls: ['./administration-general.component.scss']
})
export class AdministrationGeneralComponent {

  dataSourceEvents = new MatTableDataSource();
  dataSourceEventsRankings = new MatTableDataSource();
  dataSourceProfiles = new MatTableDataSource();
  displayedColumnsEvents: string[] = ['name', 'type', 'location'];
  displayedColumnsProfiles: string[] = ['nume', 'prenume', 'cnp','actions'];

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private service: AuthService,
    private router: Router,
    public datePipe: DatePipe,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getEvents().subscribe({
      next:(response: any) => {
      this.dataSourceEvents.paginator = this.paginator.toArray()[0];
      this.dataSourceEventsRankings.paginator = this.paginator.toArray()[2];
      response.forEach((event: any) => {
        this.dataSourceEvents.data.push(event);
        this.dataSourceEvents._updateChangeSubscription();
        this.dataSourceEventsRankings.data.push(event);
        this.dataSourceEventsRankings._updateChangeSubscription();
      })
    },
    error: (error: any) => console.log(error)
  });

    this.service.getAllProfiles().subscribe({
      next:(response: any) => {
      this.dataSourceProfiles.paginator = this.paginator.toArray()[1];
      response.forEach((profile: any) => {
        this.dataSourceProfiles.data.push(profile);
        this.dataSourceProfiles._updateChangeSubscription();
      })
    },
    error: (error: any) => console.log(error)
  });
  }

  applyFilter(filterValue: string, datasourceName: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    switch (datasourceName) {
      case 'profiles':
        this.dataSourceProfiles.filter = filterValue;
        break;
      case 'events':
        this.dataSourceEvents.filter = filterValue;
        break;
      default:
        break;
    }
  }

 

  goToEvent(data: any) {
    this.router.navigate(['/event-add', data.value]);
  }

  AddEvent() {
    this.router.navigate(['/event-add'])
  }
}
