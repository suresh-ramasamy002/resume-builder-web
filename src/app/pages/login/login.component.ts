import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {EnrollUserDetails} from '../../class/api-model/request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginFormValidation: FormGroup;
  public userName: string = null;
  public password: string = null;
  public showToken: boolean = false;
  public authError = null;
  public showLogin = false;
  @ViewChild('formRow') rows: ElementRef;
  public userDetails: EnrollUserDetails = new EnrollUserDetails(null, null, null, null, null);
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLogin = true;
    }, 3000);
    this.authError = null;
    this.loginFormValidation = this.formBuilder.group({
      userName : [{value: this.userName}, [Validators.required, Validators.pattern('[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?')]],
      password : [{value: this.password}, [Validators.required]]
    });
    this.auth.evtAuthErr$.subscribe(data => {
      this.authError = data;
    });
    this.authError = null;
    localStorage.removeItem('templateData');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('selectedTemplate');
    localStorage.removeItem('selectedTemplateTheme');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.rows.nativeElement.focus();
    }, 10);
  }
  loginAcc() {
    if (this.loginFormValidation.valid) {
      this.userDetails.email = this.userName;
      this.userDetails.password = this.password;
      this.auth.loginUser(this.userDetails);
    }
  }
  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }
}
