import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './componets/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './componets/forbidden/forbidden.component';
import { AdminPanelComponent } from './componets/admin-panel/admin-panel.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'forbidden', component: ForbiddenComponent},
  {path:'adminpanel', component: AdminPanelComponent,canActivate:[AuthGuard], data: {permittedRoles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
