import { Component, OnInit } from '@angular/core';
import Car from '../../models/Car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: false,
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css',
})
export class CarListComponent implements OnInit {
  carList: Car[] = [];
  maxVotes!: number;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Fetch the list of cars
    this.carService.getCars().subscribe((cars) => {
      this.carList = cars;
    });

    // Fetch the maximal votes value
    this.fetchMaximalVotes();
  }

  // Fetch the maximal votes from the backend
  public fetchMaximalVotes(): void {
    this.carService.getMaximalVotes().subscribe({
      next: (maxVotes) => {
        this.maxVotes = maxVotes;
      },
      error: (err) => {
        console.error('Error fetching maximal votes:', err);
      },
    });
  }
}
