import { Component, Input } from '@angular/core';
import Car from '../../models/Car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  standalone: false,
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css'],
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() maxVotes!: number; // Maximal votes passed from parent

  constructor(private carService: CarService) {}

  onVote(): void {
    this.carService.updateVotes(this.car.id).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error updating votes:', err);
      },
    });
  }
}
