import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isLoading = new BehaviorSubject<boolean>(false);
  hasUpdates = false;

  constructor(private swUpdates: SwUpdate) {
    if (this.isBrowser() && this.swUpdates.isEnabled) {
      this.swUpdates.available.subscribe(event =>
        this.swUpdates.activateUpdate().then(() => this.hasUpdates = true));
    }
  }

  setLoadingState = (state: boolean) => this.isLoading.next(state);

  isBrowser = () => typeof window !== 'undefined';

  isOnline = () => this.isBrowser() ? navigator.onLine : false;

  isIOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

}
