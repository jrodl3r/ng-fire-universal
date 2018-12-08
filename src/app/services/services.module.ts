import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { SystemService } from './system.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SystemService,
    AuthService
  ]
})
export class ServicesModule { }
