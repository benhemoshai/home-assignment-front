import { Component, OnInit } from '@angular/core';
import Car from '../../models/Car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: false,
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  carList: Car[] = [];
  maxVotes!: number;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Subscribe to real-time updates for cars
    this.carService.cars$.subscribe((cars) => {
      this.carList = cars;
    });

    // Subscribe to real-time updates for maximal votes
    this.carService.maxVotes$.subscribe((maxVotes) => {
      this.maxVotes = maxVotes;
    });
  }
}
