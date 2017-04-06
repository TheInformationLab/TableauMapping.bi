export class Spatial {
  owner: string;
  name: string;
  dateCreated: string;
  sourceUrl: string;
  sourceDate: string;
  type: string;
  bbox: string;
  country: string;
  continent: string;

  constructor(owner: string, name: string, dateCreated: string, sourceUrl: string, sourceDate: string, type: string, bbox: string, country: string, continent: string) {
    this.owner = owner;
    this.name = name;
    this.dateCreated = dateCreated;
    this.sourceUrl = sourceUrl;
    this.sourceDate = sourceDate;
    this.type = type;
    this.bbox = bbox;
    this.country = country;
    this.continent = continent;
  }
}
