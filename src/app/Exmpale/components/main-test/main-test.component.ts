import { Component, OnInit } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { StateFormComponent } from "../state-form/state-form.component";
import { StateData } from "src/app/Common/state";
import { StateService } from "../../services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-main-test",
  templateUrl: "./main-test.component.html",
  styleUrls: ["./main-test.component.scss"]
})
export class MainTestComponent implements OnInit {

  public displayedColumns: string[] = ["desciprtion", "name"];
  public list$: Observable<{
    name: string;
    desciprtion: string;
}[]> = null;
  public hasDataDisplay = false;
  constructor(public dialog: MatDialog, private stateService: StateService) { }

  ngOnInit() {
    this.list$ = this.stateService.GetAll().pipe(
      tap(result => {
        this.hasDataDisplay = false;
        if (result.length > 0) {
          this.hasDataDisplay = true;
        }
      })
    );
  }

  public OnNewState() {
    const dialogRef = this.dialog.open(StateFormComponent, {
      width: "250px",
      data: {name: "", desciprtion: ""}
    });

    dialogRef.afterClosed().subscribe((result: StateData) => {
      if (result.valid) {
        this.stateService.Add(result);
      }
      this.list$ = this.stateService.GetAll();
      console.log("The dialog was closed", result);
    });
  }
}
