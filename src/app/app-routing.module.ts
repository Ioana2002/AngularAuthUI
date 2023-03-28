import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './componets/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ExcursiiGeneralComponent } from './componets/excursii/excursii-general/excursii-general.component';
import { AdministrationGeneralComponent } from './administration/administration-general/administration-general.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
  {path:'user/profile', component: ProfileComponent},
  {path:'excursii', component: ExcursiiGeneralComponent},
  {path:'administration', component: AdministrationGeneralComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
