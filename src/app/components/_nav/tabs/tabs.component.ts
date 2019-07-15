import { Component, Input } from '@angular/core';

import { ITab } from 'src/app/models/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs: ITab[];
}
