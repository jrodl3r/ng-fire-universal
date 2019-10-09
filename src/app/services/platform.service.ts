import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isLoading = new BehaviorSubject<boolean>(false);

  isBrowser = () => typeof window !== 'undefined';

  isOnline = () => this.isBrowser() ? navigator.onLine : false;

  isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

  isIOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  loading = (state: boolean) => this.isLoading.next(state);

}
