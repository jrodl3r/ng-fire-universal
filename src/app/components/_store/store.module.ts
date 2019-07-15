import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

import { StoreService } from '../../services/store.service';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule
  ],
  declarations: [
    StoreComponent,
    HomeComponent,
    ProductComponent
  ],
  providers: [StoreService]
})
export class StoreModule { }
