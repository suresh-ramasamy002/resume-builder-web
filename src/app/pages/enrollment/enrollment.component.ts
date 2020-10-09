import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {EnrollUserDetails} from '../../class/api-model/request';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit, OnDestroy {
  public enrollFormValidation: FormGroup;
  public showToken: boolean = false;
  public showToken2: boolean = false;
  public passwordNotMatching = false;
  public authError: any;
  public pass2: string = null;
  public showSpinner: boolean = false;
  public userDetails: EnrollUserDetails = new EnrollUserDetails(null, null, null, null, null, null, null);
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.userDetails.role = 'Student';
    this.authError = null;
    this.enrollFormValidation = this.formBuilder.group({
      firstName: [{value: this.userDetails.firstName}, [Validators.required]],
      lastName: [{value: this.userDetails.lastName}, [Validators.required]],
      email: [{value: this.userDetails.email}, [Validators.required, Validators.pattern('[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?')]],
      city: [{value: this.userDetails.city}, [Validators.required]],
      state: [{value: this.userDetails.city}, [Validators.required]],
      password1: [{value: this.userDetails.password}, [Validators.required, Validators.minLength(8)]],
      password2: [{value: this.pass2}, [Validators.required, Validators.minLength(8)]]
    });
    this.auth.evtAuthErr$.subscribe(data => {
       this.authError = data;
    });
  }
  ngOnDestroy() {
  }
  comparePassword(newPassword: string, confirmPassword: string): boolean {
    if (newPassword !== confirmPassword) {
      this.passwordNotMatching = true;
    } else {
      this.passwordNotMatching = false;
    }
    return (newPassword !== confirmPassword);
  }
  enrollAcc() {
    if (this.enrollFormValidation.valid && !this.passwordNotMatching) {
         this.auth.createNewUser(this.userDetails);
    }
  }
}
