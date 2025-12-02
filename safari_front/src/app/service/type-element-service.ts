import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeElementDto } from '../dto/type-element-dto';

@Injectable({
  providedIn: 'root',
})
export class TypeElementService {

  private apiUrl: string = '/type';

  constructor(private http: HttpClient) { }

  findAll(): Observable<TypeElementDto[]> {
    return this.http.get<TypeElementDto[]>(this.apiUrl);
  }
}
