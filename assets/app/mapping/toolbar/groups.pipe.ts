import { Pipe, PipeTransform } from "@angular/core";
import { MenuItem } from "./menuItem.model";

@Pipe({name: 'groups'})
export class MenuGroupsPipe {
  transform(value, args:string[]) : any {
    var countries = {};
    value.forEach(function(o) {
      var country = o.country;
      if (countries[country]) {
        countries[country].layers.push(o);
      } else {
        countries[country] = { "name": country, "layers": [] };
        countries[country].layers.push(o);
      }
    });
    return Object.keys(countries).map(function (key) {return countries[key]});
    }
}
