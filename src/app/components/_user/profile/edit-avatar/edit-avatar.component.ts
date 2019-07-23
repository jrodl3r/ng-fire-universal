import { Component, ElementRef, Inject, forwardRef } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { PlatformService } from 'src/app/services/platform.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss']
})
export class EditAvatarComponent {

  constructor(
    @Inject(forwardRef(() => UserService)) public user: UserService,
    @Inject(forwardRef(() => PlatformService)) public platform: PlatformService,
    private elementRef: ElementRef
  ) { }

  upload(event: HTMLInputEvent) {
    const file: File = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const imageType = file.type.split('/')[1];
      this.user.updateAvatar(file, fileType, imageType);
    }
  }

  trigger() { this.elementRef.nativeElement.querySelector('#upload').click(); }

}
