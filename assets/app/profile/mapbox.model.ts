export class Mapbox {
  bounds: number[];
  created: string;
  description: string;
  features: number;
  id: string;
  modified: string;
  name: string;
  owner: string;
  size: number;
  publicID: string;
  isPublic: boolean;

  constructor(bounds?: number[], created?: string, description?: string, features?: number, id?: string, modified?: string, name?: string, owner?: string, size?: number, publicID?: string, isPublic?: boolean) {
    this.bounds = bounds;
    this.created = created;
    this.description = description;
    this.features = features;
    this.id = id;
    this.modified = modified;
    this.name = name;
    this.owner = owner;
    this.size = size;
    this.publicID = publicID;
    this.isPublic = isPublic || false;
  }
}
