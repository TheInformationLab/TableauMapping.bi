export class MenuItem {
    name: string;
    id: string;
    bbox: number[];

    constructor(name: string, id:string, bbox: any) {
        this.name = name;
        this.id = id;
        this.bbox = bbox;
    }
}
