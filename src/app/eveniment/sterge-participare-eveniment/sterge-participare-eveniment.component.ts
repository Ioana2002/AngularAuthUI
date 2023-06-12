import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvenimentParticipantiComponent } from '../eveniment-participanti/eveniment-participanti.component';
import { DialogData } from '../stergere-eveniment/stergere-eveniment.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-sterge-participare-eveniment',
  templateUrl: './sterge-participare-eveniment.component.html',
  styleUrls: ['./sterge-participare-eveniment.component.scss']
})
export class StergeParticipareEvenimentComponent implements OnInit{

  constructor(private dialog: MatDialogRef<EvenimentParticipantiComponent>,
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
    this.service.deleteParticipation(this.data.id).subscribe({
      next:() =>{
      location.reload();
      this.dialog.close();
    },
     error: (error: any) => console.log(error)
    });
  }

}
