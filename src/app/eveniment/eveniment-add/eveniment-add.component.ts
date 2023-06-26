import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StergereEvenimentComponent } from '../stergere-eveniment/stergere-eveniment.component';

@Component({
  selector: 'app-eveniment-add',
  templateUrl: './eveniment-add.component.html',
  styleUrls: ['./eveniment-add.component.scss']
})
export class EvenimentAddComponent implements OnInit{

  constructor (private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private af: AngularFireStorage) { }

    eventModel = this.fb.group({
      Denumire: ['', Validators.required],
      DataInceput: ['', Validators.required],
      DataSfarsit: ['', Validators.required],
      Locatia: ['', Validators.required],
      Judet: ['', Validators.required],
      Tip: ['', Validators.required],
      Poster: ['', Validators.required],
      Descriere: ['', Validators.required],
      Ora: ['', Validators.required],
    });

    StatusPoster: any = new FormControl('Va rugam incarcati un poster');

    tipEveniment = [
      { value: "Excursie", name: "Excursie" },
      { value: "Caz Social", name: "Caz Social" },
      { value: "Activitate", name: "Activitate" }]

      posterFile: any = null;
      fileNamePoster = '';

      id: any = null;

  ngOnInit(): void {
    if (!localStorage.getItem('roles')?.includes('Admin')) 
  {
    this.router.navigate(['/home'])
  }

  this.route.paramMap.subscribe(params => {
    this.id = params.get("id")
    if(this.id != null)
    {
      this.service.getEvent(this.id).subscribe((response: any) => {

        this.eventModel.patchValue({
          Denumire: response.denumire,
          DataInceput: response.data_Inceput,
          DataSfarsit: response.data_Sfarsit,
          Locatia: response.locatia,
          Judet: response.judet,
          Tip: response.tipEveniment,
          Poster: response.poster,
          Descriere: response.descriere,
          Ora: response.oraStart
        })

        if (this.eventModel.get('Poster')?.value != null) {
          this.StatusPoster.value = 'Actualizat';
        }

        // var dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        // var endDate = this.datePipe.transform(response.data_Sfarsit, 'yyyy-MM-dd')!;
        // if(!response.feedback_Trimis && endDate <= dateNow)
        // {
        //   this.showEmailButton = true;
        // }
      })
    }
  })

  }

  StergereEveniment()
  {
    const dialogRef = this.dialog.open(StergereEvenimentComponent, {
      width: "600px",
      height: "225px",
      panelClass: 'custom-container',
      data: { id: this.id }
    });
  }

  uploadPoster(event: any) {
    //console.log(this.eventModel.get('Denumire')?.value)
    if (this.eventModel.get('Denumire')?.value == null || this.eventModel.get('Denumire')?.value == '') {
      // this.toastr.error(
      //   'Va rugam sa completati mai intai denumirea evenimentului',
      //   'Eroare',
      //   {
      //     timeOut: 3000,
      //     extendedTimeOut: 0,
      //   }
      // );
    }
    else {
      this.posterFile = event.target.files[0];
      //console.log(this.posterFile.name.split('.').pop());
      if (this.posterFile) {
        this.fileNamePoster = `${this.eventModel.get('Denumire')?.value}` + '.' + this.posterFile.name.split('.').pop();
        const filePath =
          `${this.eventModel.get('Denumire')?.value}` + '.' + this.posterFile.name.split('.').pop();
        const storageRef = this.af.ref(filePath);
        const uploadTask = this.af.upload(filePath, this.posterFile);

        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe((downloadURL: any) => {
                this.eventModel.patchValue({ Poster: downloadURL });
                this.StatusPoster.value = 'Actualizata';
              });
            })
          )
          .subscribe();
      }
    }
  }

  AddEvent() {
    if (!this.eventModel.valid) {
      // this.toastr.error(
      //   'Va rugam sa completati toate campurile obligatorii',
      //   'Eroare',
      //   {
      //     timeOut: 4000,
      //     extendedTimeOut: 0,
      //   }
      // );
    }
    else {
      var body = {
        Denumire: this.eventModel.get('Denumire')?.value,
        Data_Inceput: this.eventModel.get('DataInceput')?.value,
        Data_Sfarsit: this.eventModel.get('DataSfarsit')?.value,
        Locatia: this.eventModel.get('Locatia')?.value,
        Judet: this.eventModel.get('Judet')?.value,
        Descriere: this.eventModel.get('Descriere')?.value,
        TipEveniment: this.eventModel.get('Tip')?.value,
        Poster: this.eventModel.get('Poster')?.value,
        Ora: this.eventModel.get('Ora')?.value,
        EvenimentId: this.id
      };

      this.service.uploadEvent(body).subscribe({
        next: (response: any) => {
        if (response.succeeded) {
          this.router.navigate(['administration']);
        }
        alert("Eveniment creat cu succes!");
      },
    error: (error: any) => console.log(error)
    });
  }
}

  GoBack() {
    this.router.navigate(['/administration'])
  }

}
