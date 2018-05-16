
import {takeUntil} from 'rxjs/operators';
import { PagerService } from './../../shared/services/pager.service';
// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Rxjs
import { Subject } from 'rxjs';



// Models and Services
import { ExpenseService } from '../shared/services/expense.service';
import { Artist, ArtistResponse } from '../shared/models/user';


@Component({
  selector: 'app-list-expenses',
  templateUrl: 'list-expenses.component.html',
  styleUrls: ['list-expenses.component.less'],
})

export class ListExpensesComponent implements OnInit, OnDestroy {
  expenses: Artist[];
  pagedExpenses: Artist[];
  openCreateModal: boolean;
  alertMessage: string;

  pager: any = {};
  totalItems = 0;

  private unsubscribe: Subject<void> = new Subject();


  /**
   *
   * @param {ExpenseService} expenseService
   */
  constructor(
    private expenseService: ExpenseService,
    private pagerService: PagerService,
  ) { }


  ngOnInit() {
    this.getExpenses('909253');
  }


  /**
   * get the list of expenses
   */
  getExpenses(artistId: string): void {
    this.expenseService.getExpenses(artistId).pipe(
      takeUntil(this.unsubscribe))
      .subscribe(
        (data: ArtistResponse) => {
          this.expenses = data.results.filter ( result => {
            return result.wrapperType === 'collection';
          });
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.alertMessage = 'An error occurred:' + err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            this.alertMessage = `Backend returned code ${err.status}, body was: ${err.message}`;
          }
        },
        () => {
        this.totalItems = this.expenses.length;
        this.setPage(1);
      });
  }


  setPage(page: number) {
    window.scrollTo(0, 0);
    if (page < 1 || page > this.pager.totalItems) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItems, page);

    // get current page of items
    this.pagedExpenses = this.expenses.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  /**
   * Cancel subscriptions
  */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
