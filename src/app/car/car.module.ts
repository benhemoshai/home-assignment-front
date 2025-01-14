import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarCardComponent} from './car-card/car-card.component';
import { CarListComponent } from './car-list/car-list.component';


@NgModule({
  declarations: [CarCardComponent, CarListComponent],
  imports: [
    CommonModule  ],
  exports: [CarCardComponent, CarListComponent]
})
export class CarModule { }
