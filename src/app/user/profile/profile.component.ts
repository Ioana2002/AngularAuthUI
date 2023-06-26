import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { MustMatch } from 'src/app/helpers/must-match.validator';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private af: AngularFireStorage
  ) { }


  fileNameCI = '';
  hidePassword = true;
  hideConfirmPassword = true;
  userLongName = 'Unknown';
  username = '';
  identityCardFile: any = null;
  profilePictureFile: any = null;
  basePathCI = '/Identity_Cards_Photos';
  basePathProfilePictures = '/Profile_Pictures';
  profilePictureFileUpload: any;



  profileModel = this.fb.group({
    Nume: ['', Validators.required],
    Prenume: ['', Validators.required],
    Gen: ['', Validators.required],
    Telefon: ['', Validators.required],
    Oras: ['', Validators.required],
    Adresa: ['', Validators.required],
    Judet: ['', Validators.required],
    Varsta: ['', Validators.required],
    SerieCI: ['', Validators.required],
    NrCI: ['', Validators.required],
    CNP: ['', Validators.required],
    Tara: ['', Validators.required],
    PozaCI: ['', Validators.required]
  });

  accountModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.email, Validators.required]],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z]).{4,}')]],
        ConfirmPassword: ['']
      },
      { validator: MustMatch('Password', 'ConfirmPassword') }
    ),
  });

  StatusCI: any = new FormControl('');
  ProfilePicture: any = new FormControl(['assets/img/empty-profile.jpg']);

  ngOnInit(): void {
    var profilePicture: any = localStorage.getItem('profile_picture');
    var accountinfo: any = localStorage.getItem('account_info');

    accountinfo = JSON.parse(accountinfo);

    if (accountinfo != undefined || accountinfo) {
      this.accountModel.patchValue({
        UserName: accountinfo.username,
        Email: accountinfo.email
      })
      this.username = accountinfo.username;
    }
    if (profilePicture != undefined || profilePicture != null) {
      this.ProfilePicture.value = profilePicture;
      
      
    }
    this.service.getUserProfile().subscribe(
      (response: any) => {
        if (response != null) {
          localStorage.setItem('profile', JSON.stringify(response.profile));

          var userProfile: any = localStorage.getItem('profile');

          userProfile = JSON.parse(userProfile);

          if (userProfile != undefined || userProfile) {

            this.profileModel.patchValue({
              Nume: userProfile.nume,
              Prenume: userProfile.prenume,
              Gen: userProfile.gen,
              Telefon: userProfile.telefon,
              Oras: userProfile.oras,
              Adresa: userProfile.adresa,
              Judet: userProfile.judet,
              Varsta: userProfile.varsta,
              SerieCI: userProfile.serie_CI,
              NrCI: userProfile.numar_CI,
              CNP: userProfile.cnp,
              Tara: userProfile.tara,
              PozaCI: userProfile.poza_CI
            });

            //console.log(userProfile, this.profileModel)
            if (this.profileModel.get('PozaCI')?.value != null) {
              this.StatusCI.value = 'Actualizata';
            }


            this.userLongName =
              this.profileModel.get('Nume')?.value +
              ' ' +
              this.profileModel.get('Prenume')?.value;
          }
        }
      })
  }
  updateIdentityCard(event: any) {
    this.identityCardFile = event.target.files[0];

    if (this.identityCardFile) {
      this.fileNameCI = this.identityCardFile.name;
      const filePath =
        `${this.basePathCI}/${this.username}` +
        '_CI.' +
        this.identityCardFile.name.split('.').pop();
      const storageRef = this.af.ref(filePath);
      const uploadTask = this.af.upload(filePath, this.identityCardFile);

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL: any) => {
              this.profileModel.patchValue({ PozaCI: downloadURL });
              this.StatusCI.value = 'Actualizata';
            });
          })
        )
        .subscribe();
    }
  }
  updateProfilePicture(event: any) {
    // var body ={
    //   UserId: '',
    //   ProfilePictureId: ''
    // };
    this.profilePictureFile = event.target.files[0];

    const filePath =
      `${this.basePathProfilePictures}/${this.username}` +
      '_ProfilePicture.' +
      this.profilePictureFile.name.split('.').pop();
    const storageRef = this.af.ref(filePath);
    const uploadTask = this.af.upload(filePath, this.profilePictureFile);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL: any) => {
            this.service
              .updateProfilePicture({ Picture_URL: downloadURL })
              .subscribe(
                (response: any) => {
                  localStorage.setItem('profile_picture', response.picture_url);
                  this.ngOnInit();
                },
                (err) => {
                  console.log(err);
                }
              );
          });
        })
      )
      .subscribe();
  }

  onSaveChangesFirstPanel() {
    for (var controlName in this.profileModel.controls) {
      var control = this.profileModel.get(controlName);

      if (control?.hasError('required')) {
        // this.toastr.error(
        //   'Va rugam sa completati toate campurile obligatorii',
        //   'Eroare',
        //   {
        //     timeOut: 4000,
        //     extendedTimeOut: 0,
        //   }
        // );
        window.alert("Va rugam sa completati toate campurile obligatorii")
        return;
      }
    }

    var body = {
      Nume: this.profileModel.value.Nume,
      Prenume: this.profileModel.value.Prenume,
      Telefon: this.profileModel.value.Telefon,
      Gen: this.profileModel.value.Gen,
      Adresa: this.profileModel.value.Adresa,
      Oras: this.profileModel.value.Oras,
      Judet: this.profileModel.value.Judet,
      Tara: this.profileModel.value.Tara,
      Varsta: this.profileModel.value.Varsta,
      Poza_CI: this.profileModel.value.PozaCI,
      CNP: this.profileModel.value.CNP,
      Serie_CI: this.profileModel.value.SerieCI,
      Numar_CI: this.profileModel.value.NrCI,
      UserId: '',
      ProfileId: ''
    };

    //console.log(body)

    this.service.uploadProfile(body).subscribe(
      (response: any) => {
        var userRoles = localStorage.getItem('roles');
        if (!userRoles?.includes('User'))
          userRoles = userRoles + ',User';
        localStorage.setItem('roles', userRoles);
        this.service.getUserProfile().subscribe({
          next:(response: any) => {
            localStorage.setItem('profile', JSON.stringify(response.profile));
            this.ngOnInit();
          },
          error: (error: any) => console.log(error)
        });
      })
      alert("Profil salvat cu succes!");
  };
  // },
  // (err) => {
  //   console.log(err);
  //   // this.toastr.error(err.error, 'Eroare',
  //   //   {
  //   //     timeOut: 4000,
  //   //     extendedTimeOut: 0,
  //   //   }
  //   // );
  // }
  // );

  changePassword() {
    if (!this.accountModel.valid) {
    }
    else {
      var body = {
        UserName: this.accountModel.value.UserName,
        Email: this.accountModel.value.Email,
        Password: this.accountModel.value.Passwords.Password,
        role: '',
        token: ''
      };
      this.service.changePassword(body).subscribe({
        next:(response: any) => {
        if (response.email != undefined && response.username != undefined) {
          var account = {
            username: response.username,
            email: response.email
          }
          localStorage.setItem('account_info', JSON.stringify(account));
        }
        this.ngOnInit();
      }, 
      error:(err) => {
        if (err.status == 400)
          console.log(err);
      }
    });
  }
  }
}
