import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import { LoginRequestModel, LoginResponse,  } from '../_model/loginmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
title = 'Lexis | Secure Login';
form: FormGroup;
loading: boolean;
authenticationResult: boolean;


loginResponse =  new LoginResponse();

constructor(private loginFormBuilder: FormBuilder, private _authenticationService: AuthenticationService, private toastr: ToastrService) { }

  ngOnInit() {
    this.authenticationResult = true;
    console.log('inside');
    this.form = this.loginFormBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberUserName: ['']

    });
  }

displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
}

isFieldValid(field: string) {
    return (!this.form.errors && this.form.get(field).valid && this.form.get(field).touched);
}

isFieldInvalid(field: string) { // {6}
return (
  (!this.form.get(field).valid && this.form.get(field).touched) ||
  (this.form.get(field).untouched)
);
}

  onSubmit(): void {
    this.loading = true;
    console.log('Authenticating User');
    if (this.form.valid) {
      this._authenticationService.authenticate(this.getLoginModel()).subscribe(
        (data: LoginResponse) => {
          console.log(data);
          this.loading = false;
          this.loginResponse = data;
          if (this.loginResponse.status === true && this.loginResponse.authToken.length > 0) {
            this.authenticationResult = true;
            localStorage.setItem('isLoggedin', 'true');
            this.toastr.success('Login Successful!', 'Secure Login');
            if (this.form.get('rememberUserName').value === true) {
              localStorage.setItem('userName', this.form.get('rememberUserName').value);
              console.log(this.form.get('rememberUserName'));
            }
          } else {
            // this.router.navigate(['/dashboard']);
            localStorage.setItem('isLoggedin', 'false');
            this.toastr.error('Login Failed!', 'Secure Login');
          }
        }
      );
    } else {
      this.toastr.error('Enter credentials!', 'Secure Login');
      this.loading = false;
    }
  }

  getLoginModel(): LoginRequestModel {
    const loginModel: LoginRequestModel = {
      userName: this.form.get('userName').value,
      password: this.form.get('password').value
    };
    return loginModel;
  }


}
