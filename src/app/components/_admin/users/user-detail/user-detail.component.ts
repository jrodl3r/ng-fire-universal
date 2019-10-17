import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  @Input() user: IUser;
  @Input() active: boolean;
  @Input() isDisabled: boolean;
  @Input() isUpdating: boolean;
  @Output() hideEvent = new EventEmitter();
  @Output() toggleActiveEvent = new EventEmitter();
  @Output() toggleAdminEvent = new EventEmitter();
  action: () => void;
  actionType: string;
  isMenuVisible = false;
  isConfirmActive = false;

  showActionMenu(event: Event) {
    event.stopPropagation();
    this.isMenuVisible = !this.isMenuVisible;
  }

  hideActionMenu() {
    this.isMenuVisible = false;
  }

  confirmAction(event: Event, type: string) {
    event.preventDefault();
    this.isConfirmActive = true;
    switch (type) {
      default:
        this.isConfirmActive = false;
        break;
      case 'active':
        this.action = this.toggleActive;
        this.actionType = 'active';
        break;
      case 'admin':
        this.action = this.toggleAdmin;
        this.actionType = 'admin';
        break;
    }
  }

  commitAction() {
    this.action();
    this.isMenuVisible = false;
    this.isConfirmActive = false;
  }

  cancelAction() {
    this.isConfirmActive = false;
  }

  close() {
    this.isMenuVisible = false;
    this.hideEvent.emit('close');
  }

  toggleAdmin() {
    this.toggleAdminEvent.emit('toggleAdmin');
  }

  toggleActive() {
    this.toggleActiveEvent.emit('toggleActive');
  }

}
