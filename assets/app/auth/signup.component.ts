import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from "./auth.service";
import { User } from "./user.model";

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
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styles: [`
      .full-width {
        width: 100%;
      }
      button {
        margin-top: 30px;
      }
      mat-form-field {
        padding: 5px 0;
      }
    `]
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    matcher = new MyErrorStateMatcher();

    constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {}

    onSubmit() {
      let snack = this.snackBar;
      const user = new User(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.company
      );
      this.authService.signup(user)
          .subscribe(
              data =>  {
                let loginSnack = snack.open("User created", null, {
                  duration: 5000,
                });
                this.signupForm.reset();
                this.router.navigateByUrl('/auth/signin');
              },
              error => {
                if (error.error && error.error == "Email already registered") {
                  let regSnack = snack.open("Email address already registered", "Fogotten Password?", {
                    duration: 30000,
                  });
                  regSnack.afterDismissed().subscribe(() => {
                    this.router.navigateByUrl('/auth/reset');
                  });
                } else {
                  console.error(error)
                }
              }
          );
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            company: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
          }, passwordMatchValidator);
    }
}
