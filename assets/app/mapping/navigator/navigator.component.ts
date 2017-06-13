import {Component, ElementRef, OnInit} from "@angular/core";
import {GeocodingService} from "../geocoding.service";
import {MapService} from "../mapping.service";
import {Location} from "../location.class";
import {Map} from "leaflet";
import {MenuService} from "../toolbar/menu.service";

@Component({
    selector: "navigator",
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: "./navigator.component.html",
    styles: [`.on-map {
        position: absolute;
        z-index: 1000;
    }

    .map-button {
        width: 35px;
        height: 35px;
        text-align: center;
        padding: 5px;
    }

    .leaflet-clickable {
      cursor: crosshair !important;
    }

    .leaflet-container {
      cursor: help !important;
    }
    input {
      padding: 5px;
      width: 400px;
      height: 35px;
      border: 2px solid rgba(77, 156, 237, 0.7);
      font-size: 16px;
      color: rgb(142, 142, 142);
    }

    #goto {
        margin: 0px 0 0 440px;
        .map-button
    }
    .suggestions{
    	border:solid 1px #f1f1f1;
    	position:absolute;
    	width:400px;
    	background: white;
      margin-top: 35px;
    }

    .suggestions ul{
    	padding: 0px;
    	margin: 0px;
    }

    .navContainer{
      margin: 40px 0 0 40px;
    	width:400px;
    }
    .suggestions ul li{
    	list-style: none;
    	padding: 0px;
    	margin: 0px;
    }

    .suggestions ul li a{
    	padding:5px;
    	display: block;
    	text-decoration: none;
    	color:#7E7E7E;
    }

    .suggestions ul li a:hover{
    	background-color: #f1f1f1;
    }`
  ]
})
export class NavigatorComponent {
    address: string;
    public foundList: Location[] = [];
    public elementRef;
    private map: Map;

    constructor(private geocoder: GeocodingService, private mapService: MapService, myElement: ElementRef, private menuService: MenuService) {
        this.address = "";
        this.elementRef = myElement;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent("goto");
        this.mapService.disableMouseEvent("place-input");
        this.map = this.mapService.map;
    }

    find() {
      if (this.address !== ""){
        this.geocoder.findLocation(this.address)
        .subscribe(locations => {
            this.foundList = locations;
        }, error => console.error(error));
      } else {
          this.foundList = [];
      }
    }

    select(item){
        this.address = item;
        this.foundList = [];
        this.goto();
    }

    goto() {
        if (!this.address) { return; }

        this.geocoder.geocode(this.address)
        .subscribe(location => {
          if (location.viewBounds)
          {
            this.map.fitBounds(location.viewBounds, {});
          } else {
            this.map.flyTo(location.centroid, 6);
          }
          this.address = location.address;
          let mapServ = this.menuService;
          this.map.on("zoomend", function(e) {
            setTimeout(function() {
              mapServ.openMenu();
              this.map.off("zoomend", function(e) {

              });
            }, 1000);
          });
        }, error => console.error(error));
    }


    handleClick(event){
       var clickedComponent = event.target;
       var inside = false;
       do {
           if (clickedComponent === this.elementRef.nativeElement) {
               inside = true;
           }
          clickedComponent = clickedComponent.parentNode;
       } while (clickedComponent);
        if(!inside){
            this.foundList = [];
        }
    }
}
