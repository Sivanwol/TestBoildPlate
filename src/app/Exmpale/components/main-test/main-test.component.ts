import { Component, OnInit } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { StateFormComponent } from "../state-form/state-form.component";
import { StateData } from 'src/app/Common/state';
import { StateService } from '../../services';
@Component({
  selector: "app-main-test",
  templateUrl: "./main-test.component.html",
  styleUrls: ["./main-test.component.scss"]
})
export class MainTestComponent implements OnInit {

  constructor(public dialog: MatDialog, private stateService: StateService) { }

  ngOnInit() {
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
      console.log("The dialog was closed", result);
    });
  }
}
