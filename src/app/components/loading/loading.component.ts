import { Component } from '@angular/core';

import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(public platform: PlatformService) { }

}
