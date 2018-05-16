
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExpenseService } from '../expenses/shared/services/expense.service';
import { PagerService } from './services/pager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ ],
  providers: [
    ExpenseService,
    PagerService,
  ],
  exports: [
    CommonModule,
    FormsModule,
  ],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedModule,
        providers: []
    };
 }
}
