import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
    @Inject(forwardRef(() => AngularFirestore)) private db: AngularFirestore,
    public auth: AuthService
  ) {
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    if (this.auth) {
      this.auth.redirectAfterSignIn();
    }
  }

}
