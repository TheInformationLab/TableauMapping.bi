import { Component, OnInit } from "@angular/core";
import { MatCardModule, MatInputModule, MatButtonModule, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
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

export class SigninComponent {
  signinForm: FormGroup;
  redirect: String;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) {
    this.route.params.subscribe( params => this.redirect = params.redirect);
  }

  onSubmit() {
    let snack = this.snackBar;
    const user = new User(
      this.signinForm.value.email,
      this.signinForm.value.password
    );
    this.authService.signin(user)
        .subscribe(
            data => {
              localStorage.setItem('token', data.token);
              localStorage.setItem('userId', data.userId);
              if (this.redirect) {
                this.router.navigateByUrl('/'+this.redirect);
              } else {
                this.router.navigateByUrl('/profile');
              }
            },
            error => {
              if (error.message && error.message == "Login failed") {
                let loginSnack = snack.open(error.error, "Fogotten Password?", {
                  duration: 8000,
                });
                loginSnack.afterDismissed().subscribe(() => {
                  this.router.navigateByUrl('/auth/reset');
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
    this.signinForm.reset();
  }

  ngOnInit() {
      this.signinForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]),
        password: new FormControl('', Validators.required)
      });
  }
}
