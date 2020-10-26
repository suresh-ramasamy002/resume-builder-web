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
import { HttpClientModule } from '@angular/common/http';
import {StripePipe} from './shared/utils/stripe.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {AngularFireFunctionsModule, REGION} from '@angular/fire/functions';
import { DownloadWarningDialogComponent } from './components/download-warning-dialog/download-warning-dialog.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { TemplateTwoComponent } from './components/template-files/template-two/template-two.component';
import { TemplateThreeComponent } from './components/template-files/template-three/template-three.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { TemplateFourComponent } from './components/template-files/template-four/template-four.component';
import { TemplateFiveComponent } from './components/template-files/template-five/template-five.component';
import { TemplateSixComponent } from './components/template-files/template-six/template-six.component';
import { TemplateSevenComponent } from './components/template-files/template-seven/template-seven.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
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
    PaymentRequestComponent,
    StripePipe,
    DownloadWarningDialogComponent,
    FeedbackFormComponent,
    TemplateTwoComponent,
    TemplateThreeComponent,
    PdfViewerComponent,
    IntroductionComponent,
    TemplateFourComponent,
    TemplateFiveComponent,
    TemplateSixComponent,
    TemplateSevenComponent,
    AdminDashboardComponent
  ],
  imports: [
    HttpClientModule,
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
    MatRippleModule, ReactiveFormsModule,
    AngularFireFunctionsModule,
    PdfViewerModule,
    // NgxExtendedPdfViewerModule,
    // PdfJsViewerModule
  ],
  exports: [StripePipe],
  providers: [{provide: REGION, useValue: 'us-central1'}, LoadingService, CoreDataService, UserService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
