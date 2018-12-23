import { Component, OnInit } from '@angular/core';

import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'Getting Started',
      description: 'NgFireUniversal » Getting Started',
      slug: 'start'
    });
  }

}
