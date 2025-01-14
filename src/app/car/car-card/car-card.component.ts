import { Component, Input } from '@angular/core';
import Car from '../../models/Car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  standalone: false,
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() maxVotes!: number; // Maximal votes passed from parent

  constructor(private carService: CarService) {}

  onVote(): void {
    this.carService.updateVotes(this.car.id).subscribe({
      next: (response) => {
        // Update car votes
        this.car.votes = response.car.votes;
      },
      error: (err) => {
        console.error('Error updating votes:', err);
      },
    });

  }
}
