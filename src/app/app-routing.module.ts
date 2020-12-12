import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, isNotAnonymous} from '@angular/fire/auth-guard';
import {LoginComponent} from './pages/login/login.component';
import {EnrollmentComponent} from './pages/enrollment/enrollment.component';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {HomeComponent} from './pages/home/home.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {TemplateOneComponent} from './components/template-files/template-one/template-one.component';
import {TemplateEditorComponent} from './pages/templates/template-editor/template-editor.component';
import {IntroductionComponent} from './pages/introduction/introduction.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import {ResumeRulesComponent} from './pages/resume-rules/resume-rules.component';
import {HowToUseComponent} from './pages/how-to-use/how-to-use.component';
import {ResumeBuilderComponent} from './pages/resume-builder/resume-builder.component';

export const redirectAnonymousTo = (redirect: any[]) =>
  pipe(isNotAnonymous, map(loggedIn => loggedIn || redirect));
const redirectUnauthorizedToLogin = () => redirectAnonymousTo(['login']);
const routes: Routes = [
  {path: '', redirectTo: '/intro', pathMatch: 'full'},
  {path: 'intro', component: IntroductionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enroll', component: EnrollmentComponent},
  {path: 'userInfo', component: UserInfoComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'howToUse', component: HowToUseComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'rulesAndTips', component: ResumeRulesComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'adminDashboard_protect*1_!2000128846628812', component: AdminDashboardComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'tempEditor', component: ResumeBuilderComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'resumeBuilder', component: ResumeBuilderComponent, canActivate: [AngularFireAuthGuard]},
  {path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
