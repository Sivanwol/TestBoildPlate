
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XsitesComponent } from "./components";
import {SiteTestsRoutingModule} from "./sitetests-routing.module";
@NgModule({
  declarations: [XsitesComponent],
  providers: [],
  imports: [CommonModule, SiteTestsRoutingModule]
})

export class SiteTestsModule { }
