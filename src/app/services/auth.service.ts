import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "http://localhost:19248"
  constructor(private fb: FormBuilder, private http : HttpClient) { }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  comparePasswords(fb: FormGroup) {
    var confirmPswrdCtrl = fb.get('ConfirmPassword');

    if (
      confirmPswrdCtrl?.errors == null ||
      'passwordMismatch' in confirmPswrdCtrl.errors
    ) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else confirmPswrdCtrl?.setErrors(null);
    }
  }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/ApplicationUser/Register`, userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/ApplicationUser/Login`, loginObj);
  }

  getUserProfile() {
    return this.http.get(this.baseUrl + '/Profile/GetUserProfile');
  }
}
