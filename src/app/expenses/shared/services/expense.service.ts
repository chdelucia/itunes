
import {finalize, retry,  catchError, map, tap, shareReplay } from 'rxjs/operators';

import { LogService } from './../../../core/logs.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';


import { ArtistResponse, AlbumResponse } from './../models/user';

@Injectable()
export class ExpenseService {
  baseUrl = 'https://itunes.apple.com/lookup?id=909253&entity=album';
  constructor(private http: HttpClient, private logger: LogService) {
  }

  getExpenses(artistId): Observable<ArtistResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    return this.http.get<ArtistResponse>(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`, httpOptions).pipe(
      retry(2))
      .pipe(
        tap(res => console.table(res)),
        catchError(this.handleError<ArtistResponse>('getExpenses'))
      ).pipe(
      finalize(() => this.logger.info(this.constructor.name, 'getAlbums', 'llamada exitosa')));
  }



  getAlbumById(albumId: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`https://itunes.apple.com/lookup?id=${albumId}&entity=song`).pipe(
      retry(2))
      .pipe(
        tap(res => console.table(res)),
        catchError(this.handleError<AlbumResponse>('getUsers'))
      ).pipe(
      finalize(() => this.logger.info(this.constructor.name, 'getAlbum', 'llamada exitosa')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      throw(error as T);
    };
  }
}
