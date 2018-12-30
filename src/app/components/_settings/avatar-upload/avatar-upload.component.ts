import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference  } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import { NotifyService } from '../../../services/notify.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit, OnDestroy {
  isUploading: Boolean = false;
  profileSub: Subscription;
  uploadTask: AngularFireUploadTask;
  storageRef: AngularFireStorageReference;
  url: Observable<string>;
  avatar: String;
  path: string;
  metadata: any;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private profile: ProfileService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.profileSub = this.auth.user.subscribe(user => {
      if (user) {
        this.avatar = user.avatar || '/assets/img/user.png';
        this.path = user.uid ? `images/avatars/${user.uid}` : '';
        this.metadata = { user: user.uid };
      }
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const imageType = file.type.split('/')[1];
      // Only .png or .jpg images
      if (file.type.split('/')[0] !== 'image' && (imageType !== 'png' || imageType !== 'jpeg')) {
        this.notify.error('Pictures can be PNG or JPEG.');
        return;
      // Less than 300KB
      } else if (file.size > 300 * 1024) {
        this.notify.error('Image must be less than 300KB.');
        return;
      }

      this.isUploading = true;
      this.storageRef = this.storage.ref(this.path);
      this.uploadTask = this.storage.upload(this.path, file, { customMetadata: this.metadata });
      this.uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.url = this.storageRef.getDownloadURL();
          this.url.subscribe(url => {
            this.profile.updateAvatar(url)
              .then(() => {
                this.avatar = url;
                this.isUploading = false;
              });
          });
        })
      ).subscribe();
    }
  }

  triggerUploadInput() {
    document.getElementById('avatarUpload').click();
  }

}
