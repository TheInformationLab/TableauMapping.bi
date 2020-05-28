export class TMMeta {
  _id: string;
  bbox: number[];
  dateCreated: string;
  mapboxid: string;
  name: string;
  owner: string;
  type: string;
  country: string;
  continent: string;
  sourceUrl: string;
  sourceDate: any;
  agreement: boolean;
  isPublic: boolean;

  constructor(id?: string, bbox?: number[], dateCreated?: string, mapboxid?: string, name?: string, owner?: string, type?: string, country?: string, continent?: string, sourceUrl?: string, sourceDate?: string, agreement?: boolean, isPublic?: boolean) {
    this._id = id;
    this.bbox = bbox;
    this.dateCreated = dateCreated;
    this.mapboxid = mapboxid;
    this.name = name;
    this.owner = owner;
    this.type = type;
    this.country = country;
    this.continent = continent;
    this.sourceUrl = sourceUrl;
    this.sourceDate = sourceDate;
    this.agreement = agreement;
    this.isPublic = isPublic;
  }
}
