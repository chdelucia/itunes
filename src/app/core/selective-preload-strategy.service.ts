
import { Observable , of as observableOf } from 'rxjs';
import { LogService } from './logs.service';

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  constructor(private logger: LogService){}
  preloadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      this.logger.info(this.constructor.name, 'preload', route.path, 'orange');

      return load();
    } else {
      return observableOf(null);
    }
  }
}
