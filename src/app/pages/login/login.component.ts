import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {EnrollUserDetails} from '../../class/api-model/request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormValidation: FormGroup;
  public userName: string = null;
  public password: string = null;
  public showToken: boolean = false;
  public authError = null;
  public userDetails: EnrollUserDetails = new EnrollUserDetails(null, null, null, null, null, null, null);
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.authError = null;
    this.loginFormValidation = this.formBuilder.group({
      userName : [{value: this.userName}, [Validators.required, Validators.pattern('[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?')]],
      password : [{value: this.password}, [Validators.required]]
    });
    this.auth.evtAuthErr$.subscribe(data => {
      this.authError = data;
    });
  }

  loginAcc() {
    if (this.loginFormValidation.valid) {
      this.userDetails.email = this.userName;
      this.userDetails.password = this.password;
       this.auth.loginUser(this.userDetails)
    }
  }
}
