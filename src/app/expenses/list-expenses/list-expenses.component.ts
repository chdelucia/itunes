import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PagerService, PagerInfo } from '../../shared/services/pager.service';
import { ExpenseService } from '../shared/services/expense.service';
import { Artist, ArtistResponse } from '../shared/models/user';

@Component({
  selector: 'app-list-expenses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.less'],
})
export class ListExpensesComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private pagerService = inject(PagerService);

  expenses = signal<Artist[]>([]);
  alertMessage = signal<string | null>(null);
  currentPage = signal<number>(1);

  totalItems = computed(() => this.expenses().length);

  pager = computed<PagerInfo>(() => {
    return this.pagerService.getPager(this.totalItems(), this.currentPage());
  });

  pagedExpenses = computed<Artist[]>(() => {
    const p = this.pager();
    if (!p || p.startIndex === undefined || p.endIndex === undefined) {
      return [];
    }
    return this.expenses().slice(p.startIndex, p.endIndex + 1);
  });

  ngOnInit(): void {
    this.getExpenses('909253');
  }

  getExpenses(artistId: string): void {
    this.expenseService.getExpenses(artistId).subscribe({
      next: (data: ArtistResponse) => {
        const collections = data.results.filter(result => result.wrapperType === 'collection');
        this.expenses.set(collections);
        this.currentPage.set(1);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.alertMessage.set('An error occurred:' + err.error.message);
        } else {
          this.alertMessage.set(`Backend returned code ${err.status}, body was: ${err.message}`);
        }
      }
    });
  }

  setPage(page: number): void {
    window.scrollTo(0, 0);
    const p = this.pager();
    if (page < 1 || (p.totalPages && page > p.totalPages)) {
      return;
    }
    this.currentPage.set(page);
  }

  onCloseAlert(): void {
    this.alertMessage.set(null);
  }
}
