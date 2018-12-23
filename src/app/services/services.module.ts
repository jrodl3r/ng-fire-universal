import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { SystemService } from './system.service';
import { SeoService } from './seo.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SystemService,
    AuthService,
    SeoService
  ]
})
export class ServicesModule { }
