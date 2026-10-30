import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { LogService } from '../../../core/logs.service';
import { ArtistResponse, AlbumResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private http = inject(HttpClient);
  private logger = inject(LogService);

  baseUrl = 'https://itunes.apple.com/lookup?id=909253&entity=album';

  getExpenses(artistId: string): Observable<ArtistResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    return this.http.get<ArtistResponse>(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`, httpOptions).pipe(
      retry(2),
      tap(res => console.table(res)),
      catchError(this.handleError<ArtistResponse>('getExpenses')),
      finalize(() => this.logger.info(this.constructor.name, 'getAlbums', 'llamada exitosa'))
    );
  }

  getAlbumById(albumId: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(`https://itunes.apple.com/lookup?id=${albumId}&entity=song`).pipe(
      retry(2),
      tap(res => console.table(res)),
      catchError(this.handleError<AlbumResponse>('getAlbum')),
      finalize(() => this.logger.info(this.constructor.name, 'getAlbum', 'llamada exitosa'))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      throw error;
    };
  }
}
