import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Car from '../models/Car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private socket: Socket;
  private carsSubject = new BehaviorSubject<Car[]>([]);
  private maxVotesSubject = new BehaviorSubject<number>(0);

  cars$ = this.carsSubject.asObservable().pipe(distinctUntilChanged());
  maxVotes$ = this.maxVotesSubject.asObservable().pipe(
    distinctUntilChanged(),
    debounceTime(100) // Add debounce to smooth out updates
  );

  constructor(private http: HttpClient) {
    // Initialize the Socket.IO connection
    this.socket = io('http://localhost:3000'); // Replace with your backend URL

    // Fetch initial data
    this.loadInitialData();

    // Listen for real-time updates from the server
    this.socket.on('updateCars', (data: { cars: Car[]; maximalVotes: number }) => {
      this.carsSubject.next(data.cars);
      this.maxVotesSubject.next(data.maximalVotes);
    });

    // Handle connection errors
    this.socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });
  }

  private loadInitialData(): void {
    this.getCars().subscribe({
      next: (cars) => this.carsSubject.next(cars),
      error: (err) => console.error('Error fetching cars:', err),
    });

    this.getMaximalVotes().subscribe({
      next: (maxVotes) => this.maxVotesSubject.next(maxVotes),
      error: (err) => console.error('Error fetching maximal votes:', err),
    });
  }

  getCars() {
    return this.http.get<Car[]>('http://localhost:3000/cars');
  }

  getMaximalVotes() {
    return this.http.get<number>('http://localhost:3000/cars/maxVotes');
  }

  updateVotes(carId: number) {
    return this.http.put<{ car: Car; maximalVotes: number }>(
      `http://localhost:3000/cars/${carId}`,
      {}
    );
  }
}
