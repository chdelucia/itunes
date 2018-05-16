
import {takeUntil} from 'rxjs/operators';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subject } from 'rxjs';

import { ExpenseService } from '../shared/services/expense.service';
import { Song } from '../shared/models/user';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit, OnDestroy {

  posts: Song[];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private itunesService: ExpenseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    const albumId = this.route.snapshot.paramMap.get('id');
    this.getAlbumById(albumId);
  }


  /**
   * Convert miliseconds to minuts seconds forma 01:30
   * @param {number} millis
   * @return {string}
   */
  millisToMinutesAndSeconds(millis: number): string {
    const minutes = Math.floor(millis / 60000);
    const seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Get album details and tracks by album ID
   * @param albumId
   */
  private getAlbumById(albumId: string): void {
    this.itunesService.getAlbumById(albumId).pipe(
    takeUntil(this.unsubscribe))
    .subscribe(
      data => {
        this.posts = data.results;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
        }
      }
    );
  }
}
