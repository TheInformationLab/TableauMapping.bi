import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ProfileService } from "./profile.service";
import { User } from "../auth/user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './modify.component.html'
})
export class ModifyComponent implements OnInit {
    myForm: FormGroup;

    constructor(private profileService: ProfileService) {}

    onSubmit() {

    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            company: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            mapbox: new FormControl(null)
        });
    }
}
