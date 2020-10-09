import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {LoginComponent} from './pages/login/login.component';
import {EnrollmentComponent} from './pages/enrollment/enrollment.component';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {HomeComponent} from './pages/home/home.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'enroll', component: EnrollmentComponent},
  {path: 'userInfo', component: UserInfoComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard]},
  {path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
