export class MenuItem {
    name: string;
    id: string;
    bbox: number[];
    country: string;

    constructor(name: string, country: string, id:string, bbox: number[]) {
        this.name = name;
        this.country = country;
        this.id = id;
        this.bbox = bbox;
    }
}
