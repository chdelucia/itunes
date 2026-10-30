import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  info(componentName: string, functionName: string, message: any, color?: string): void {
    const style = color ? `color: ${color}` : 'color: #00bcd4';
    console.log(`%c[${componentName}] ${functionName}:`, style, message);
  }

  error(componentName: string, functionName: string, message: any): void {
    console.error(`%c[${componentName}] ${functionName}:`, 'color: red', message);
  }
}
