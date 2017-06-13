import { Pipe, PipeTransform } from "@angular/core";
import { SearchItem } from "./searchItem.model";

@Pipe({name: 'groups'})
export class SearchGroupsPipe {
  transform(value, args:string[]) : any {
    var layers = {};
    value.forEach(function(o) {
      var layer = o.spatial.tableSchema.alias;
      if (layers[layer]) {
        layers[layer].groups.push(o);
      } else {
        layers[layer] = { "name": layer, "groups": [] };
        layers[layer].groups.push(o);
      }
    });
    return Object.keys(layers).map(function (key) {return layers[key]});
    }
}
