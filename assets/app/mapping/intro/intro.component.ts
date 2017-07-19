import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MapService } from "../mapping.service";
import { IntroService } from "./intro.service";
import { ErrorService } from "../../errors/error.service";

export interface ConfirmModel {

}
@Component({
    selector: 'intro',
    templateUrl: './intro.component.html',
    styles: [`
      .on-map {
          z-index: 1000;
      }
      .modal-dialog {
        cursor: default;
      }
      .modal-body{
        height: 70vh;
        overflow-y: auto;
      }
      #email {
        min-width: 350px;
      }
      `]
})
export class IntroComponent implements OnInit {
  newsletter: FormGroup;

  @ViewChild('introModal') intro:ElementRef;
  @ViewChild('signup') signup:ElementRef;
  public logoPath: string;

  constructor(private mapService: MapService, private introService: IntroService, private errorService: ErrorService) {
    this.logoPath = "./img/til.png";
  }
  closeModal() {
    localStorage.setItem('visited', "true");
    this.intro.nativeElement.style.visibility = "hidden";
  }

  newsletterSignup() {

    this.introService.subscribe(this.newsletter.value.email)
        .subscribe(
            response => {
              if(response.obj.status == "subscribed") {
                console.log("Email already registered");
                this.signup.nativeElement.innerHTML = "It looks like you're already registered for our newsletter. If you don't seem to be receiving it please let us know by contacting <a href='mailto:info@theinformationlab.co.uk'>info@theinformationlab.co.uk</a>";
              } else if(response.obj.status == "pending"){
                console.log("Check for confirmation email");
                this.signup.nativeElement.innerHTML = "Thanks! Check your inbox for a confirmation email."
              } else {
                console.log("Unknown response from MailChimp");
                this.errorService.error(JSON.stringify(response), "Unknown Response from MailChimp");
              }
            },
            error => console.error(error)
        );
  }

  ngOnInit() {
    if (localStorage.getItem('visited') === "true") {
      this.closeModal();
    }
    this.mapService.disableMouseEvent("introModal");
    this.newsletter = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ])
    });
  }

}
