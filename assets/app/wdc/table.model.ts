export class Table {
  id: string;
  alias: string;
  columns: any;

  constructor(id: string, alias: string, columns: any) {
    this.id = id;
    this.alias = alias;
    this.columns = columns;
  }
}
