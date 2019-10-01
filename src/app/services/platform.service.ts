import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isLoading = new BehaviorSubject<boolean>(false);

  setLoadingState = (state: boolean) => this.isLoading.next(state);

  isBrowser = () => typeof window !== 'undefined';

  isOnline = () => this.isBrowser() ? navigator.onLine : false;

  isIOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

}
