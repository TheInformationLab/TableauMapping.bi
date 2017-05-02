export class MenuItem {
    name: string;
    id: string;
    bbox: number[];

    constructor(name: string, id:string, bbox: number[]) {
        this.name = name;
        this.id = id;
        this.bbox = bbox;
    }
}
