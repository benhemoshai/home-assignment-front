import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import Car from '../../models/Car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  standalone: false,
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent {
  constructor(public carService: CarService) {}

  get cars(): Car[] {
    return this.carService.getCars();
  }

  get maxVotes(): number {
    return this.carService.getMaxVotes();
  }
}
