import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { PlatformService } from './platform.service';
import { NotifyService } from './notify.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 500,
      newestOnTop: true,
      preventDuplicates: true,
      positionClass: 'toast-bottom-center'
    })
  ],
  providers: [
    PlatformService,
    NotifyService,
    AuthService
  ]
})
export class ServicesModule { }
