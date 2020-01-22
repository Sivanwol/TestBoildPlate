
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SiteTestsRoutingModule} from "./sitetests-routing.module";
import { HpTestModule } from './components/hp-test/hp-test.module';
@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, HpTestModule, SiteTestsRoutingModule]
})

export class SiteTestsModule { }
