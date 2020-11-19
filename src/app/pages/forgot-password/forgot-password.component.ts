import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public fpFormValidation: FormGroup;
  public email: string = null;
  public authError = null;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.authError = null;
    this.fpFormValidation = this.formBuilder.group({
      email : [{value: this.email}, [Validators.required, Validators.pattern('[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?')]]
    });
    this.auth.evtAuthErr$.subscribe(data => {
      this.authError = data;
    });
    this.authError = null;
  }
  sendLink() {
    if (this.fpFormValidation.valid) {
      this.auth.forgotPassword(this.email);
    }
  }
}
