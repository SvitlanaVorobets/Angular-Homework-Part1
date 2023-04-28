import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  link = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.link)
  }

  addUser(user: IUser){
    return this.http.post<IUser[]>(this.link, user)
  }

  deleteUser(id: number){
    return this.http.delete(`${this.link}/${id}`)
  }
}
