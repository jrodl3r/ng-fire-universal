import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  hasUpdates = false;

  constructor(
    public platform: PlatformService,
    private swUpdates: SwUpdate
  ) {
    if (platform.isBrowser() && this.swUpdates.isEnabled) {
      this.swUpdates.available.subscribe(event =>
        this.swUpdates.activateUpdate().then(() => this.hasUpdates = true));
    }
  }

}
