export class Spatial {
  _id: string;
  owner: string;
  name: string;
  dateCreated: string;
  sourceUrl: string;
  sourceDate: string;
  type: string;
  bbox: number[];
  country: string;
  continent: string;
  tableSchema: any;
  tabData: string;

  constructor(id: string, owner: string, name: string, dateCreated: string, sourceUrl: string, sourceDate: string, type: string, bbox: number[], country: string, continent: string, tableSchema: any, tabData?: string) {
    this._id = id;
    this.owner = owner;
    this.name = name;
    this.dateCreated = dateCreated;
    this.sourceUrl = sourceUrl;
    this.sourceDate = sourceDate;
    this.type = type;
    this.bbox = bbox;
    this.country = country;
    this.continent = continent;
    this.tableSchema = tableSchema;
    this.tabData = tabData;
  }
}

export class Data {
  _id: string;
  tabData: any;

  constructor(id: string, tabData: any) {
    this._id = id;
    this.tabData = tabData;
  }
}

export class GeoJson {
  type: string;
  features: any[];

  constructor(type: string, features: any[]) {
    this.type = type;
    this.features = features;
  }
}
