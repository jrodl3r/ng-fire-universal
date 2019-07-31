import { Injectable, NgModule } from '@angular/core';
import { IndividualConfig, ToastPackage, ToastRef, ToastrModule } from 'ngx-toastr';

@Injectable()
class MockToastPackage extends ToastPackage {
  constructor() {
    const toastConfig = { toastClass: 'custom-toast' };
    super(1, toastConfig as IndividualConfig, 'test message', 'test title', 'show', new ToastRef(null));
  }
}

@NgModule({
  imports: [ToastrModule.forRoot()],
  providers: [{ provide: ToastPackage, useClass: MockToastPackage }],
  exports: [ToastrModule]
})
export class ToastrTestingModule { }
