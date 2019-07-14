import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  isHeaderMenuExpanded = false;
  isHeaderAccountMenuExpanded = false;

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isHeaderMenuExpanded = !this.isHeaderMenuExpanded;
  }

  toggleAccountMenu(event: Event) {
    event.stopPropagation();
    this.isHeaderAccountMenuExpanded = !this.isHeaderAccountMenuExpanded;
  }

  collapseHeader() {
    this.isHeaderAccountMenuExpanded = false;
    this.isHeaderMenuExpanded = false;
  }

}
