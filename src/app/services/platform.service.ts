import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  isBrowser = () => typeof window !== 'undefined';

  isOnline = () => this.isBrowser() ? navigator.onLine : false;

  isIOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

}
