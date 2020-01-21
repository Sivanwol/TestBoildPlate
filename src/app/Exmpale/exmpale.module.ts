
import { NgModule } from '@angular/core';
import { StateService } from './services';
import { StateStore } from './store';
import { StateQuery } from './queries';
import { MainTestComponent , SecandTestComponent} from './components';
import { ExmpaleRoutingModule } from './exmpale-routing.module';

@NgModule({
  declarations: [MainTestComponent, SecandTestComponent],
  providers: [StateService, StateStore, StateQuery],
  imports: [ExmpaleRoutingModule]
})

export class ExmpaleModule { }
