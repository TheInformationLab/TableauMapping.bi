import {Component, ElementRef, ViewChild, Input} from "@angular/core";
import {MdProgressSpinnerModule} from '@angular/material';
import { MapService } from "../mapping/mapping.service";
import { LayerService } from "../layers/layer.service";
import { SearchService } from "./search.service";
import { SearchGroupsPipe } from './groups.pipe';
import { MdInputModule } from '@angular/material';
import { Spatial } from "../layers/spatial.model";
import { SearchItem } from "./searchItem.model";

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
    md-spinner {
      right: 40px;
      top: 7px;
      width: 25px;
      height: 25px;
      position: relative;
      z-index: 2000;
      display: inline-block;
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
    }

    .navContainer{
      margin: 0 0 0 20px;
    	width:600px;
    }

    a{
      display: block;
      text-decoration: none;
      color:#7E7E7E;
      padding-top: 5px;
      padding-bottom: 5px;
      line-height: 20px;
      height: 30px;
    }
    h5 {
      color:#7E7E7E;
      padding-left: 10px;
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
    @ViewChild('searchResults') results:ElementRef;

    constructor(private searchService: SearchService, myElement: ElementRef,private layerService: LayerService, private mapService: MapService) {
        this.search = "";
        this.elementRef = myElement;
    }

    find() {
      if (this.search !== ""){
        this.isLoading = true;
        this.searchService.searchIndex(this.search)
        .subscribe(resp => {
          console.log(resp.items);
          this.foundList = resp.items;
          this.isLoading = false;
        }, error => {
          console.error(error)
          this.isLoading = false;
        });
      } else {
          this.foundList = [];
          this.isLoading = false;
      }
    }

    showResults() {
      if (this.foundList.length > 0 && this.search !== "") {
        this.results.nativeElement.style.visibility = "visible";
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
            this.foundList = [];
        }
    }

    showPolygon(layer) {
      this.results.nativeElement.style.visibility = "hidden";
      this.mapService.showLoading(true);
      this.mapService.populateInfo(layer.spatial);
      var opt = { id: layer.spatial._id};
      let key = layer.name;
      let value = layer.value;
      let centroid = JSON.parse(layer.centroid);
      this.layerService.getGeojson(opt)
        .subscribe(
          (geojson) => {
            this.mapService.addPolygon(geojson, key, value);
            this.mapService.map.flyTo(centroid, 9);
          });
    }
}
