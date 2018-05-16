import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';


@NgModule({
  imports: [
    ExpensesRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    ListExpensesComponent,
    PersonDetailComponent,
  ],
  providers: [ ]
})
export class ExpensesModule { }
