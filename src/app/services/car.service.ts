import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import Car from '../models/Car';

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
    this.socket = io('http://localhost:3000'); // Replace with your backend URL

    // Fetch initial data
    this.loadInitialData();

    // Listen for real-time updates
    this.socket.on('updateCars', (updatedCars: Car[]) => {
      this.cars.set(updatedCars);
    });
  }

  getCars() {
    return this.cars();
  }

  getMaxVotes() {
    return this.maxVotes();
  }

  voteForCar(carId: number) {
    this.http.put(`http://localhost:3000/cars/${carId}`, {}).subscribe();
  }

  private loadInitialData() {
    this.http.get<Car[]>('http://localhost:3000/cars').subscribe(data => this.cars.set(data));
  }
}
