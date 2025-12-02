import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { MapDto } from '../dto/map-dto';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private apiUrl: string = '/map';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<MapDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<MapDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<MapDto> {
    return this.http.get<MapDto>(`${this.apiUrl}/${id}`);
  }

  public save(mapDto: MapDto): void {
    const payload = mapDto.toJson();

    if (!mapDto.id) {
      this.http.post<MapDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<MapDto>(`${this.apiUrl}/${mapDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}
