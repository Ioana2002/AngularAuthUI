import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EvenimentAddComponent } from '../eveniment-add/eveniment-add.component';


export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-stergere-eveniment',
  templateUrl: './stergere-eveniment.component.html',
  styleUrls: ['./stergere-eveniment.component.scss']
})
export class StergereEvenimentComponent implements OnInit{

  constructor(private dialog: MatDialogRef<EvenimentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private af: AngularFireStorage) { }

  ngOnInit(): void {
  }

  Renunta() {
    this.dialog.close();
  }

  Sterge() {
    this.service.deleteEvent(this.data.id).subscribe((response: any) => {
      this.router.navigate(['administration']);
      this.dialog.close();
    }, (err: any) => {
      console.log(err);
    })
  }

}
