import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl = environment.apiUrl;
  //private baseUrl:string = "http://localhost:19248"
  constructor(private fb: FormBuilder, private http: HttpClient) { }

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

  login(loginObj: any) {
    return this.http.post(`${this.baseUrl}/ApplicationUser/Login`, loginObj);
  }

  getUserProfile() {
    return this.http.get<any>(this.baseUrl + '/Profile/GetUserProfile');
  }
  getAllProfiles() {
    return this.http.get(this.baseUrl + '/Profile/GetProfiles');
  }
  getUserProfileById(id: string) {
    return this.http.get(this.baseUrl + '/Profile/GetUserProfileById/' + id);
  }
  uploadProfile(formData: any) {
    return this.http.post(this.baseUrl + '/Profile/UploadProfile', formData);
  }
  updateProfilePicture(formData: any) {
    return this.http.post(
      this.baseUrl + '/Profile/UpdateProfilePicture',
      formData
    );
  }
  UpdateProfileField(formData: any) {
    return this.http.post<any>(
      `${this.baseUrl}/Profile/UpdateProfileField`,
      formData
    );
  }
  getProfilePicture() {
    return this.http.get(this.baseUrl + '/Profile/GetProfilePicture');
  }

  getAccountInfo() {
    return this.http.get(`${this.baseUrl}/Profile/GetAccountInfo`);
  }
  changePassword(formData: any) {
    return this.http.post(
      this.baseUrl + '/ApplicationUser/ChangePassword',
      formData
    );
  }
  resetPassword(formData: any) {
    return this.http.post(this.baseUrl + '/Password/ResetPassword', formData)
  }

  getEvents() {
    return this.http.get(this.baseUrl + '/Eveniment/GetEvents');
  }

  getEvent(id: string) {
    return this.http.get(this.baseUrl + '/Eveniment/GetEvent/' + id);
  }

  deleteEvent(id: string) {
    return this.http.delete(this.baseUrl + '/Eveniment/DeleteEvent/' + id);
  }

  uploadEvent(formData: any) {
    return this.http.post(
      this.baseUrl + '/Eveniment/UploadEvent',
      formData
    );
  }

  getProfiles() {
    return this.http.get(this.baseUrl + '/Eveniment/GetParticipants');
  }

  registerToEvent(body: any) {
    return this.http.post(this.baseUrl + '/Eveniment/AddRegister', body);
  }

  getInscriere(eventid: string) {
    return this.http.get(this.baseUrl + '/Eveniment/GetInscriere/' + eventid);
  }

  deleteParticipation(id: string) {
    return this.http.get(this.baseUrl + '/Eveniment/DeleteParticipation/' + id);
  }

  getEventParticipants(id: string) {
    return this.http.get(this.baseUrl + '/Eveniment/GetEventParticipants/' + id);
  }

  getParticipants(id: string) {
    return this.http.get(this.baseUrl + '/Eveniment/GetParticipants/' + id);
  }

  payTax(id: string) {
    return this.http.get(this.baseUrl + '/Eveniment/PayTax/' + id)
  }



  /*roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
      isMatch = true;
      return false;
      }
    });
    return isMatch;
  }*/
}
