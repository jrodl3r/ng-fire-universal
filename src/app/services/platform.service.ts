import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  isBrowser = () => typeof window !== 'undefined';

  isOnline = () => this.isBrowser() ? navigator.onLine : false;

}
