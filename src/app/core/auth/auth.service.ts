import { Injectable, inject, signal } from '@angular/core';
import { LogService } from '../logs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logger = inject(LogService);

  private isLoggedSignal = signal<boolean>(false);
  private userNameSignal = signal<string | undefined>(undefined);

  login(form: any): boolean {
    this.userNameSignal.set(form?.name);
    this.isLoggedSignal.set(true);
    this.logger.info('AuthService', 'login', 'Logged as:' + this.userNameSignal());
    return this.isLoggedSignal();
  }

  logout(): void {
    this.isLoggedSignal.set(false);
  }

  getUserName(): string | undefined {
    return this.userNameSignal();
  }

  getStatus(): boolean {
    this.logger.info('AuthService', 'getStatus', 'is logged?:' + this.isLoggedSignal());
    return this.isLoggedSignal();
  }
}
