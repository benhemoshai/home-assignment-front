import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Car from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://home-assignment-back.onrender.com/cars';

  getCars() : Observable<Car[]>{
    return this.http.get<Car[]>(this.apiUrl);
  }

  getMaximalVotes(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/maxVotes`);
  }

  updateVotes(carId: number): Observable<{ car: Car; maximalVotes: number }>{
    return this.http.put<{ car: Car; maximalVotes: number }>(`${this.apiUrl}/${carId}`, {});
  }
}
