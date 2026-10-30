import { Component, inject, signal, computed, input, effect } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ExpenseService } from '../shared/services/expense.service';
import { Song } from '../shared/models/user';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent {
  private itunesService = inject(ExpenseService);

  // Signal input from route param 'id'
  id = input<string>();

  posts = signal<Song[]>([]);

  headerSong = computed<Song | undefined>(() => this.posts()[0]);
  trackList = computed<Song[]>(() => this.posts().slice(1));

  constructor() {
    effect(() => {
      const albumId = this.id();
      if (albumId) {
        window.scrollTo(0, 0);
        this.getAlbumById(albumId);
      }
    });
  }

  millisToMinutesAndSeconds(millis: number): string {
    if (!millis) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  private getAlbumById(albumId: string): void {
    this.itunesService.getAlbumById(albumId).subscribe({
      next: (data) => {
        this.posts.set(data.results);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
        }
      }
    });
  }
}
