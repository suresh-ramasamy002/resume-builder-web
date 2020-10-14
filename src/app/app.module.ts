import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper';

// import firebase module
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
// environment
import {environment} from '../environments/environment';
// pages
import { LoginComponent } from './pages/login/login.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
// flex-layout
import {FlexLayoutModule} from '@angular/flex-layout';
// angular-material
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import {LoadingService} from './services/loading.service';
import {PaymentService} from './services/payment.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TemplateOneComponent } from './components/template-files/template-one/template-one.component';
import { TemplateRootComponent } from './pages/templates/template-root.component';
import { TemplateEditorComponent } from './pages/templates/template-editor/template-editor.component';
import {CoreDataService} from './services/core-data.service';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {UserService} from './services/user.service';
import { ImageUploadCropComponent } from './components/image-upload-crop/image-upload-crop.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PaymentRequestComponent } from './components/payment-request/payment-request.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnrollmentComponent,
    UserInfoComponent,
    HomeComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    TemplateOneComponent,
    TemplateRootComponent,
    TemplateEditorComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    ImageUploadCropComponent,
    FileUploadComponent,
    PaymentRequestComponent
  ],
  imports: [
    ImageCropperModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableModule, MatTooltipModule, MatBadgeModule,
    MatStepperModule, MatTabsModule, MatToolbarModule,
    FormsModule,
    MatSliderModule,
    MatRippleModule, ReactiveFormsModule
  ],
  providers: [LoadingService, CoreDataService, UserService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
