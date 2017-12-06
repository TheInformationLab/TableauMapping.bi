export class Upload {
  name: string;
  type: string;
  country: string;
  continent: string;
  sourceUrl: string;
  sourceDate: string;
  mapboxId: string;

  constructor(name: string, type: string, country: string, continent: string, sourceUrl: string, sourceDate: string, mapboxId: string) {
    this.name = name;
    this.type = type;
    this.country = country;
    this.continent = continent;
    this.sourceUrl = sourceUrl;
    this.sourceDate = sourceDate;
    this.mapboxId = mapboxId;
  }
}
