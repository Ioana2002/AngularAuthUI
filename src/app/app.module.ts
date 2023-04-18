import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';

import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './componets/home/home.component';
import { NavigationBarComponent } from './componets/page-components/navigation-bar/navigation-bar.component';

import { FooterComponent } from './componets/page-components/footer/footer.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ExcursiiGeneralComponent } from './componets/excursii/excursii-general/excursii-general.component';
import { AdministrationGeneralComponent } from './administration/administration-general/administration-general.component';
import { EvenimentAddComponent } from './eveniment/eveniment-add/eveniment-add.component';
import { StergereEvenimentComponent } from './eveniment/stergere-eveniment/stergere-eveniment.component';
import { EvenimentComponent } from './eveniment/eveniment.component';
import { EvenimentInscriereComponent } from './eveniment/eveniment-inscriere/eveniment-inscriere.component';
import { EvenimentParticipantiComponent } from './eveniment/eveniment-participanti/eveniment-participanti.component';
import { StergeParticipareEvenimentComponent } from './eveniment/sterge-participare-eveniment/sterge-participare-eveniment.component';
import { AboutUsComponent } from './informations/about-us/about-us.component';
import { GalleryComponent } from './informations/gallery/gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavigationBarComponent,
    FooterComponent,
    ProfileComponent,
    ExcursiiGeneralComponent,
    AdministrationGeneralComponent,
    EvenimentAddComponent,
    StergereEvenimentComponent,
    EvenimentComponent,
    EvenimentInscriereComponent,
    EvenimentParticipantiComponent,
    StergeParticipareEvenimentComponent,
    AboutUsComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [AuthService, DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
