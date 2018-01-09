import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatExpansionModule, MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProfileService } from "./profile.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { JwtHelper } from 'angular2-jwt';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function passwordMatchValidator(g: FormGroup) {
   return g.get('newPassword').value === g.get('confirmPassword').value
      ? null : {'mismatch': true};
}

@Component({
    selector: 'app-profile',
    templateUrl: './modify.component.html',
    styles: [`
    .mat-toolbar {
      box-shadow: inset 0 3px 5px -1px rgba(0,0,0,.2), inset 0 6px 10px 0 rgba(0,0,0,.14);
    }
    .container {
      min-height: calc(100vh - 300px);
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .headers-align .mat-expansion-panel-header-title,
    .headers-align .mat-expansion-panel-header-description {
      flex-basis: 0;
    }

    .headers-align .mat-expansion-panel-header-description {
      justify-content: space-between;
      align-items: center;
    }

    .profile-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }
    mat-form-field {
      padding-bottom: 5px;
    }
    .mat-raised-button.mat-primary {
      background-color: #3f51b5;
    }
    .mat-raised-button[disabled] {
      color: rgba(0,0,0,.38);
      background-color: rgba(0,0,0,.12);
    }
    `]
})
export class ModifyComponent implements OnInit {
  profileForm : FormGroup;
  passwordForm: FormGroup;
  mapboxForm: FormGroup;
  user : User;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private profileService: ProfileService, private authService: AuthService, public snackBar: MatSnackBar) {
    this.user = new User('','','','','');
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/signin/profile');
    } else {
      this.user = this.profileService.getProfile();
    }
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
        firstName: new FormControl(this.user.firstName, Validators.required),
        lastName: new FormControl(this.user.lastName, Validators.required),
        company: new FormControl(this.user.company, Validators.required),
        email: new FormControl(this.user.email, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ])
    });

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, passwordMatchValidator)

    this.mapboxForm = new FormGroup({
      accessToken: new FormControl(this.user.mapboxAccessToken, [Validators.required]),
      username: new FormControl(this.user.mapboxUsername, [Validators.required])
    })
  }

  updateProfile() {
    const user = new User(
      this.profileForm.value.email,
      '',
      this.profileForm.value.firstName,
      this.profileForm.value.lastName,
      this.profileForm.value.company
    );
    let snack = this.snackBar;
    this.profileService.updateProfile(user)
        .subscribe(function(data) {
              if (data.message == "User updated") {
                localStorage.setItem('token', data.token);
                snack.open("Personal Info Updated", null, {
                  duration: 3000,
                });
              }
            },
            error => console.error(error)
        );
  }

  updatePassword() {
    console.log(this.passwordForm);
  }

  updateMapbox() {
    const user = new User(
      '','','','','',
      this.mapboxForm.value.accessToken,
      this.mapboxForm.value.username
    );
    let snack = this.snackBar;
    this.profileService.updateProfile(user)
        .subscribe(function(data) {
              if (data.message == "User updated") {
                localStorage.setItem('token', data.token);
                snack.open("Mapbox Account Updated", null, {
                  duration: 3000,
                });
              }
            },
            error => console.error(error)
        );
  }

  testMapbox() {
    let snack = this.snackBar;
    this.profileService.getDatasets()
        .subscribe(function(datasets) {
            if (datasets.message = "Datasets found") {
              snack.open("Mapbox Account Valid", null, {
                duration: 3000,
              });
            }
            },
            error => console.error(error)
        );
  }


}
