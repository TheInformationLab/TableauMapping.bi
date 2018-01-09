import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatInputModule, MatSnackBarModule, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProfileService } from "./profile.service";
import { AuthService } from "../auth/auth.service";
import { Mapbox } from "./mapbox.model";
import { TMMeta } from "./meta.model";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MetaDialogueComponent } from "./meta.component";

@Component({
    selector: 'profile-datasets',
    templateUrl: './datasets.component.html',
    styles: [`
    .mat-toolbar {
      box-shadow: inset 0 3px 5px -1px rgba(0,0,0,.2), inset 0 6px 10px 0 rgba(0,0,0,.14);
    }

    .table-container {
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 148px);
      min-width: 300px;
      position: relative;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    .table-header {
      min-height: 64px;
      padding: 8px 24px 0;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }

    .table {
      overflow: auto;
      margin-bottom: 0;
    }

    .mat-header-cell.mat-sort-header-sorted {
      color: black;
    }

    .element-row {
      position: relative;
      cursor: pointer;
    }

    .element-row:hover {
      background: #f5f5f5;
    }

    /* Column Widths */
    .mat-column-features {
      max-width: 94px;
      padding-left: 10px;
    }
    .mat-column-isPublic {
      max-width: 40px;
    }
    `]
})
export class DatasetComponent implements AfterViewInit {
  datasets: Mapbox[] = [];
  userMeta: TMMeta[] = [];
  metaIDs: any[] = [];
  displayedColumns = ['name', 'features', 'created', 'publicID', 'isPublic'];
  dataSource = new MatTableDataSource();

  isLoadingResults = false;

  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private router: Router, private profileService: ProfileService, private authService: AuthService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth/signin/profile');
      return;
    }
    this.getMeta();
  }

  ngAfterViewInit() {
    var ds = this.dataSource;
    var meta = this.metaIDs;
    var ret: Mapbox[] = [];
    this.dataSource.sort = this.sort;
    this.profileService.getDatasets()
        .subscribe(function(datasets: Mapbox[]) {
          for (let dataset of datasets) {
            if (meta.hasOwnProperty(dataset.id)) {
              dataset.publicID = meta[dataset.id]._id;
              dataset.isPublic = meta[dataset.id].isPublic || false;
            }
            ret.push(dataset);
          }
          ds.data = ret;
          },
          error => console.error(error)
        );
  }

  getMeta() {
    var meta = this.metaIDs;
    this.profileService.getMeta()
      .subscribe(function(spatials) {
          this.userMeta = spatials;
          for (let spatial of spatials) {
            meta[spatial.mapboxid] = spatial;
          }
        //  this.refreshData();
        },
        error => console.error(error)
      );
  }
/*
  refreshData() {
    var ret: Mapbox[] = [];
    var datasets: Mapbox[] = this.dataSource.data;
    for (let dataset of datasets) {
      if (this.metaIDs.hasOwnProperty(dataset.id)) {
        dataset.publicID = this.metaIDs[dataset.id]._id;
        dataset.isPublic = this.metaIDs[dataset.id].isPublic || false;
      }
      ret.push(dataset);
    }
    this.dataSource.data = ret;
  }
*/
  editMeta(row) {
    let dialogRef = this.dialog.open(MetaDialogueComponent, {
      width: '75%',
      data: { id: row.id, bbox: row.bounds, name: row.name }
    });
    let snack = this.snackBar;
    dialogRef.afterClosed().subscribe(result => {
      this.getMeta();
      if (result == "Spatial Object updated") {
        snack.open("Record updated", null, {
          duration: 3000,
        });
      }
    });

  }

  makePublic(mapboxId) {
    let meta : TMMeta = this.metaIDs[mapboxId];
    if (meta) {
      if (meta.isPublic) {
        meta.isPublic = false;
      } else {
        meta.isPublic = true;
      }
      let snack = this.snackBar;
      this.profileService.updateMeta(meta)
        .subscribe(function(resp) {
          if (resp == "Spatial Object updated" && meta.isPublic) {
            snack.open(meta.country + " " + meta.name + " is now available to the TableauMapping.bi community! Thanks for your contribution.", null, {
              duration: 3000,
            });
          } else if (resp == "Spatial Object updated" && !meta.isPublic) {
            snack.open(meta.country + " " + meta.name + " is no longer available to the TableauMapping.bi community", null, {
              duration: 3000,
            });
          }  else {
            snack.open(resp, null, {
              duration: 3000,
            });
          }
          },
          error => console.error(error)
        );
      if (meta.isPublic) {
        this.profileService.updateIndex(meta._id)
          .subscribe(function(resp) {
            if (resp == "Object Indexed") {
              console.log(meta.country + " " + meta.name + " added to the global search index");
            }  else {
              snack.open(resp, null, {
                duration: 3000,
              });
            }
            },
            error => console.error(error)
          );
      } else if (!meta.isPublic) {
        this.profileService.removeIndex(meta._id)
          .subscribe(function(resp) {
            if (resp == "Index removed") {
              console.log(meta.country + " " + meta.name + " removed from the global search index");
            } else {
              snack.open(resp, null, {
                duration: 3000,
              });
            }
            },
            error => console.error(error)
          );
      }
    }
  }

}
