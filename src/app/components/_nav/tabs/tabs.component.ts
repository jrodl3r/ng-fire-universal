import { Component, Input } from '@angular/core';

import { ITabs } from '../../../models/tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs: ITabs[];
  @Input() flexMdColumn: Boolean = false;
  @Input() justifySmCenter: Boolean = false;

  constructor() { }

}
