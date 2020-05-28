import { Component, OnInit } from "@angular/core";
import { MatCardModule, MatInputModule, MatButtonModule, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Password } from "./password.model";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
}

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styles:[`
    .full-width {
      width: 100%;
    }
    mat-form-field {
      padding-bottom: 5px;
    }
    mat-card {
      margin-top: 20px;
    }
    button {
      margin-top: 20px;
    }
  `]
})

export class ResetComponent {
  resetForm: FormGroup;
  updateForm: FormGroup;
  token: string;

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) {
    this.route.params.subscribe( params => this.token = params.token);
  }

  resetPassword() {
    let snack = this.snackBar;
    const user = new User(
      this.resetForm.value.email,
      ''
    );
    this.authService.resetPassword(user)
        .subscribe(
            data =>  {
              snack.open("Password reset email sent", null, {
                duration: 5000,
              });
              this.resetForm.reset();
              this.router.navigateByUrl('/auth/signin');
            },
            error => {
              if (error.message && error.message == "Error finding user") {
                snack.open("Unknown email address", null, {
                  duration: 3000,
                });
              } else if (error.message) {
                snack.open(error.message, null, {
                  duration: 3000,
                });
              } else {
                console.error(error)
              }
            }
        );
  }

  updatePassword() {
    let snack = this.snackBar;
    const password = new Password(
      this.token,
      this.updateForm.value.password
    );
    this.authService.updatePassword(password)
        .subscribe(
            data =>  {
              snack.open("Password updated", null, {
                duration: 5000,
              });
              localStorage.setItem('token', data.token);
              this.updateForm.reset();
              this.router.navigateByUrl('/auth/signin');
            },
            error => {
              if (error.message && error.message == "Error finding user") {
                snack.open("Invalid reset token", null, {
                  duration: 3000,
                });
              } else if (error.error) {
                snack.open(error.error, null, {
                  duration: 3000,
                });
              } else {
                console.error(error)
              }
            }
        );
  }

  ngOnInit() {
      this.resetForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ])
      });
      this.updateForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }, passwordMatchValidator);
  }
}
