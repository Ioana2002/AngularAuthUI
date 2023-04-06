import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EvenimentComponent } from '../eveniment.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: any;
}

@Component({
  selector: 'app-eveniment-inscriere',
  templateUrl: './eveniment-inscriere.component.html',
  styleUrls: ['./eveniment-inscriere.component.scss']
})
export class EvenimentInscriereComponent implements OnInit{

  constructor(private dialog: MatDialogRef<EvenimentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      
  }

  Renunta() {
    this.dialog.close();
  }

  adaugaInscriere(){
    this.service.registerToEvent(this.data.id).subscribe((response: any) => {
      this.dialog.close();
    }, (err: any) => {
      console.log(err);
    })
  }
}
