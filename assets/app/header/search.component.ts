import {Component, ElementRef, ViewChild, Input} from "@angular/core";
import {MatProgressSpinnerModule} from '@angular/material';
import { MapService } from "../mapping/mapping.service";
import { LayerService } from "../layers/layer.service";
import { SearchService } from "./search.service";
import { SearchGroupsPipe } from './groups.pipe';
import { SearchSortPipe } from './sort.pipe';
import { MatInputModule } from '@angular/material';
import { Spatial } from "../layers/spatial.model";
import { SearchItem } from "./searchItem.model";
import { ErrorService } from "../errors/error.service";
import { Router } from '@angular/router';
import { RouterEvent, NavigationEnd } from '@angular/router';

@Component({
    selector: "search",
    host: {
        '(document:click)': 'handleClick($event)',
    },
    templateUrl: "./search.component.html",
    styles: [`.on-map {
        z-index: 5000;
    }
    #iconSearch {
      left: 35px;
      position: relative;
      top: 7px;
      z-index: 5000;
    }
    mat-spinner {
      right: 40px;
      top: 7px;
      position: relative;
      z-index: 2000;
      display: inline-block;
    }
    .mat-progress-spinner circle, .mat-spinner circle {
      stroke: rgba(255,255,255,.87);
    }
    input {
      color: rgba(255, 255, 255, 0.3);
      padding: 20px 20px 20px 45px;
      width: 600px;
      height: 35px;
      font-size: 16px;
      background-color: rgba(255, 255, 255, 0.1);
      border: 0;
      -moz-transition: all .35s ease-in-out;
      -o-transition: all .35s ease-in-out;
      -webkit-transition: all .35s ease-in-out;
      transition: all .35s ease-in-out;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
    input:focus {
      color: rgba(0, 0, 0, 1);
      background-color: rgba(255, 255, 255, 1);
      z-index: 5005;
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, 0.3);
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
       color: #fff;
       opacity:  0.5;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #fff;
      opacity:  0.5;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
       color:  rgba(255, 255, 255, 0.5);
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
       color: rgba(255, 255, 255, 0.5);
    }
    .suggestions{
    	border:solid 1px #f1f1f1;
    	position:absolute;
      margin-left: 24px;
    	width:600px;
    	background: white;
      border-radius: 0;
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      -moz-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      background: #fff;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,0.2);
      cursor: default;
      font-size: 13px;
      outline: none;
      max-height: 75%;
      overflow-x: auto;
    }

    .navContainer{
      margin: 0 0 0 20px;
    	width:600px;
    }

    a{
      display: block;
      text-decoration: none;
      color:#7E7E7E;
      padding: 5px 10px;
      line-height: 20px;
      height: 30px;
    }
    h5 {
      color:#7E7E7E;
      padding-left: 10px;
      font-size: 14px;
    }
    #col {
      font-weight: 300;
    }
    #name{

    }
    #source{
      font-weight: 400;
    }
    `
  ]
})
export class SearchComponent {
    public searchItem: SearchItem;
    search: string;
    public foundList: SearchItem[] = [];
    public elementRef;
    public isLoading: Boolean = false;

    hideSearch: Boolean = true;

    @ViewChild('searchResults') results:ElementRef;

    constructor(private searchService: SearchService, myElement: ElementRef,private layerService: LayerService, private mapService: MapService, private errorService: ErrorService, private router: Router) {
        this.search = "";
        this.elementRef = myElement;
        this.router.events.filter((evt: RouterEvent) => evt instanceof NavigationEnd).map((ev: any) => ev.url).subscribe(url =>
          {
            if (url  && url.indexOf('/map') == -1) {
              this.hideSearch = true;
            } else {
              this.hideSearch = false;
            }
          });
    }

    find() {
      if (this.search !== "" && this.search.length > 2){
        this.isLoading = true;
        this.searchService.searchIndex(this.search)
        .subscribe(resp => {
          console.log(resp);
          if (resp.items.length === 0) {
            this.errorService.info("We don't have any spatial data for '"+ this.search +"'. Know where we can find some? Send a quick email to tableaumapping@theinformationlab.co.uk and we'll try to include it","Unable to find '" + this.search + "'");
           }
          this.foundList = resp.items;
          this.isLoading = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
        });
      } else {
        this.foundList = [];
        this.isLoading = false;
      }
    }

    showResults() {
      if (this.foundList.length > 0 && this.search !== "") {
       if (this.results) {
          this.results.nativeElement.style.visibility = "visible";
       }
      }
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
         if (this.results) {
            this.results.nativeElement.style.visibility = "hidden";
          }
        }
    }

    showPolygon(layer) {
      this.results.nativeElement.style.visibility = "hidden";
      this.mapService.showLoading(true);
      this.mapService.populateInfo(layer.spatial);
      this.mapService.recordStats('showPolygon',layer.spatial._id,JSON.parse(localStorage.getItem('userData')))
        .subscribe(
          data => console.log(data),
          //error => this.errorService.error(error)
          error => console.error(error)
        );
      var opt = { id: layer.spatial._id};
      let key = layer.name;
      let value = layer.value;
      let centroid = JSON.parse(layer.centroid);
      let zoom = 9;
      switch (key) {
        case "Country":
          zoom = 5;
          break;
        default:
          zoom = 9;
      }
      this.layerService.getData(opt)
        .subscribe(
          geojson => {
            this.mapService.addPolygon(geojson, key, value);
            this.mapService.map.flyTo(centroid, zoom);
          },
          //error => this.errorService.error(error)
          error => console.error(error)
        );
    }
}
