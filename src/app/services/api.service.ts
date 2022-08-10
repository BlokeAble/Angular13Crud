import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

const baseUrl = 'http://localhost:8081/api/person';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  //POST
  postPerson(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // READ
  getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(baseUrl);
  }
 
  //UPDATE
  putPerson(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  //DELETE
  deletePerson(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  
}