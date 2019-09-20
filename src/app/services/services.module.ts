import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { FormsService } from './forms.service';
import { NotifyService } from './notify.service';
import { PlatformService } from './platform.service';
import { UpdateService } from './update.service';
import { SeoService } from './seo.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 1000,
      newestOnTop: true,
      preventDuplicates: true,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  ],
  providers: [
    AuthService,
    FormsService,
    NotifyService,
    PlatformService,
    UpdateService,
    SeoService
  ]
})
export class ServicesModule { }
