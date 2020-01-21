import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { XsitesComponent } from "./components";


const routes: Routes = [
  { path: "test/showcase", component: XsitesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteTestsRoutingModule { }
