import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>('assets/data/users.json');
  }
}
