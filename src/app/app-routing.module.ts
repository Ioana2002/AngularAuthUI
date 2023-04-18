import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './componets/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ExcursiiGeneralComponent } from './componets/excursii/excursii-general/excursii-general.component';
import { AdministrationGeneralComponent } from './administration/administration-general/administration-general.component';
import { EvenimentAddComponent } from './eveniment/eveniment-add/eveniment-add.component';
import { EvenimentComponent } from './eveniment/eveniment.component';
import { EvenimentInscriereComponent } from './eveniment/eveniment-inscriere/eveniment-inscriere.component';
import { EvenimentParticipantiComponent } from './eveniment/eveniment-participanti/eveniment-participanti.component';
import { AboutUsComponent } from './informations/about-us/about-us.component';
import { GalleryComponent } from './informations/gallery/gallery.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent},
  {path:'user/profile', component: ProfileComponent},
  {path:'excursii', component: ExcursiiGeneralComponent},
  {path:'administration', component: AdministrationGeneralComponent},
  {path:'event-add/:id', component:EvenimentAddComponent},
  {path:'event-add', component:EvenimentAddComponent},
  {path:'event/:id', component: EvenimentComponent},
  {path:'event-register/:id', component: EvenimentInscriereComponent},
  {path:'event-participants/:id', component: EvenimentParticipantiComponent},
  {path:'info/about-us', component: AboutUsComponent},
  {path:'info/gallery', component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
