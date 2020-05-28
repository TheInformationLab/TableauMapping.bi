export class MenuItem {
    name: string;
    id: string;
    owner: any;
    bbox: number[];
    country: string;
    dateCreated: string;
    sourceUrl: string;
    sourceDate: string;
    type: string;
    continent: string;

    constructor(name: string, country: string, id:string, owner: any, bbox: number[],dateCreated:string,sourceUrl:string,sourceDate:string,type:string,continent:string) {
        this.name = name;
        this.country = country;
        this.id = id;
        this.owner = owner;
        this.bbox = bbox;
        this.dateCreated = dateCreated;
        this.sourceUrl = sourceUrl;
        this.sourceDate = sourceDate;
        this.type = type;
        this.continent = continent;
    }
}
