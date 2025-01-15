import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import {Car} from '../models/Car';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private socket: Socket;
  private cars = signal<Car[]>([]);
  private maxVotes = computed(() =>
    Math.max(...this.cars().map(car => car.votes), 0)
  );

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');

    // Fetching initial data
    this.loadInitialData();

    // Listening for real-time updates
    this.socket.on('updateCars', (updatedCars: Car[]) => {
      this.cars.set(updatedCars);
    });
  }

  getCars() : Car[] {
    return this.cars();
  }

  getMaxVotes() : number {
    return this.maxVotes();
  }

  // Updating this specific car votes
  voteForCar(carId: number) : void {
    const updatedCars = this.cars().map(car =>
      car.id === carId ? { ...car, votes: car.votes + 1 } : car
    );
    this.cars.set(updatedCars);
  
    // Sending the PUT request to the server
    this.http.put(`http://localhost:3000/cars/${carId}`, {}).subscribe({
      error: () => {
        // Revert the change if the server fails
        this.loadInitialData();
      },
    });
  }
  
  private loadInitialData() {
    this.http.get<Car[]>('http://localhost:3000/cars').subscribe(data => this.cars.set(data));
  }
}
