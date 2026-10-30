import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface BreadcrumbItem {
  label: string;
  url: string;
  translateLabel: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent {
  private router = inject(Router);

  breadcrumbInit = signal<BreadcrumbItem[]>([]);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((val) => {
      const items: BreadcrumbItem[] = [];
      const varLocation = val.urlAfterRedirects ? val.urlAfterRedirects.replace(/^\//, '') : val.url.replace(/^\//, '');
      if (varLocation !== '') {
        const locationNew = varLocation.split('/');
        let urlBreadcrumb = '';
        locationNew.forEach((element) => {
          urlBreadcrumb += '/' + element;
          items.push({
            label: this.createUrl(element),
            url: urlBreadcrumb,
            translateLabel: element.toUpperCase()
          });
        });
      }
      this.breadcrumbInit.set(items);
    });
  }

  createUrl(value: any): string {
    const str = typeof value === 'object' && value.path ? value.path : String(value);
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() +
      str.substring(1, 10) + ' ' +
      str.charAt(10).toUpperCase() + str.slice(11);
  }
}
