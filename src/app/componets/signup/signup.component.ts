import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    @Inject(String) private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if (!this.signUpForm.valid) {
      this.toastr.error(
        'Campurile marcate cu (*) sunt obligatorii.',
        'Inregistrare esuata',
        {
          timeOut: 4000,
          extendedTimeOut: 0,
        }
      );
    }
    else {
      var body = {
        userName: this.signUpForm.value.userName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      };
      this.service.register(body).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.toastr.success('Contul dumneavoastra a fost creat cu succes', 'Inregistrare realizata cu succes.', {
              timeOut: 4000,
              extendedTimeOut: 0,
            });
            this.router.navigate(['login']);
          }
          else {
            res.errors.forEach((element: any) => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Acest user este deja folosit!', 'Eroare la inregistrare.')
                  break;

                default:
                  this.toastr.error(element.description, 'Eroare la inregistrare.')
                  break;
              }
            });
          }
        },
        err => {
          if (err.status == 400) {
            this.toastr.error(err.error, 'Inregistrare esuata.',
              {
                timeOut: 4000,
                extendedTimeOut: 0,
              });
          }
        }
      )
    }
  }

}
