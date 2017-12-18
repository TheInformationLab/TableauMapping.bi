import { Component, OnInit } from "@angular/core";
import { MatCardModule } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent {
  myForm: FormGroup;
  redirect: String;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.redirect = params.redirect);
  }

  onSubmit() {
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password
    );
    this.authService.signin(user)
        .subscribe(
            data => {
              localStorage.setItem('token', data.token);
              localStorage.setItem('userId', data.userId);
              if (this.redirect) {
                this.router.navigateByUrl('/'+this.redirect);
              } else {
                this.router.navigateByUrl('/map');
              }
            },
            error => console.error(error)
        );
    this.myForm.reset();
  }

  ngOnInit() {
      this.myForm = new FormGroup({
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]),
        password: new FormControl(null, Validators.required)
      });
  }
}
