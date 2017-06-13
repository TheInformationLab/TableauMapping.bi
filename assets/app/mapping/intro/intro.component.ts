import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from "../mapping.service";
export interface ConfirmModel {

}
@Component({
    selector: 'intro',
    templateUrl: './intro.component.html',
    styles: [`
      .on-map {
          z-index: 1001;
      }
      .modal-dialog {
        cursor: default;
      }
      .modal-body{
        height: 70vh;
        overflow-y: auto;
      }
      `]
})
export class IntroComponent implements OnInit {
  @ViewChild('introModal') intro:ElementRef;
  public logoPath: string;

  constructor(private mapService: MapService) {
    this.logoPath = "./img/til.png";
  }
  closeModal() {
    localStorage.setItem('visited', "true");
    this.intro.nativeElement.style.visibility = "hidden";
  }

  ngOnInit() {
    if (localStorage.getItem('visited') === "true") {
      this.closeModal();
    }
    this.mapService.disableMouseEvent("introModal");
  }
}
