import { Component, Inject, forwardRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(
    @Inject(forwardRef(() => Location)) private location: Location
  ) { }

  goBack() { this.location.back(); }

}
