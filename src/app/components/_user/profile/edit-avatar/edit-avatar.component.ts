import { Component, Input, ElementRef } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { PlatformService } from 'src/app/services/platform.service';
import { NotifyService } from 'src/app/services/notify.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent {
  @Input() hasUnsavedChanges = false;

  constructor(
    public user: UserService,
    public platform: PlatformService,
    private notify: NotifyService,
    private elementRef: ElementRef
  ) { }

  triggerUpload() {
    this.hasUnsavedChanges
      ? this.notify.warn('Unsaved profile changes')
      : this.elementRef.nativeElement.querySelector('#upload').click();
  }

  upload(event: HTMLInputEvent) {
    const file: File = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const imageType = file.type.split('/')[1];
      this.user.uploadAvatar(file, fileType, imageType);
    }
  }

}
