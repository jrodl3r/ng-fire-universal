import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { SystemService } from './system.service';
import { SeoService } from './seo.service';

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
    SystemService,
    AuthService,
    SeoService
  ]
})
export class ServicesModule { }
