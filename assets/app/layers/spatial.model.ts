export class Spatial {
  _id: string;
  owner: string;
  name: string;
  dateCreated: any;
  sourceUrl: string;
  sourceDate: any;
  type: string;
  bbox: number[];
  country: string;
  continent: string;
  tableSchema: any;

  constructor(id: string, owner: string, name: string, dateCreated: any, sourceUrl: string, sourceDate: any, type: string, bbox: number[], country: string, continent: string, tableSchema: any) {
    this._id = id;
    this.owner = owner;
    this.name = name;
    this.dateCreated = new Date(dateCreated);
    this.sourceUrl = sourceUrl;
    this.sourceDate = new Date(sourceDate);
    this.type = type;
    this.bbox = bbox;
    this.country = country;
    this.continent = continent;
    this.tableSchema = tableSchema;
  }
}
