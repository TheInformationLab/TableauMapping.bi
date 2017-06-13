export class MenuItem {
    name: string;
    id: string;
    bbox: number[];
    country: string;
    dateCreated: string;
    sourceUrl: string;
    sourceDate: string;
    type: string;
    continent: string;

    constructor(name: string, country: string, id:string, bbox: number[],dateCreated:string,sourceUrl:string,sourceDate:string,type:string,continent:string) {
        this.name = name;
        this.country = country;
        this.id = id;
        this.bbox = bbox;
        this.dateCreated = dateCreated;
        this.sourceUrl = sourceUrl;
        this.sourceDate = sourceDate;
        this.type = type;
        this.continent = continent;
    }
}
