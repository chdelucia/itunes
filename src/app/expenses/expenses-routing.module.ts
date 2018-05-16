import { PersonDetailComponent } from './person-detail/person-detail.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: ListExpensesComponent
  },
  {
    path: ':id',
    component: PersonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
