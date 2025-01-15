import { Component, Input } from '@angular/core';
import {Car} from '../../models/Car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  standalone: false,
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() maxVotes!: number;

  constructor(private carService: CarService) {}

  vote() : void {
    this.carService.voteForCar(this.car.id);
  }
}
