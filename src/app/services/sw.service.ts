import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class SwService {
  hasUpdates = false;

  constructor(
    private platform: PlatformService,
    private swUpdates: SwUpdate
  ) {
    if (this.platform.isBrowser() && this.swUpdates.isEnabled) {
      this.swUpdates.available.subscribe(event =>
        this.swUpdates.activateUpdate().then(() => this.hasUpdates = true));
    }
  }

}
