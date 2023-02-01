import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private service:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

     // if(localStorage.getItem('token') != null)
    // this.router.navigateByUrl('/home')
    
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){

      var body =
      {
        Username : this.loginForm.get("username")?.value,
        Password : this.loginForm.get("password")?.value
       // Email : "Test"
      }

      console.log(this.loginForm.value)
      //Send the object to database
      this.service.login(this.loginForm.value)
      .subscribe(
        (res:any)=>{
         localStorage.setItem('token', res.token);
         this.router.navigateByUrl('/home');
        },
        err=>{
          if(err.status == 400)
          console.log(err);
            }
        
      );


    }else{

     
      //throw the error using toaster and with required field
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")

    }
  }



}
