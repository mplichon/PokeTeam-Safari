import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PokemoncaptureDto } from '../dto/pokemoncapture-dto';

@Injectable({
  providedIn: 'root',
})
export class PokemonCaptureService {

  private apiUrl: string = '/api/pokemon-capture';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PokemoncaptureDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<PokemoncaptureDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PokemoncaptureDto> {
    return this.http.get<PokemoncaptureDto>(`${this.apiUrl}/${id}`);
  }

  public save(pokemoncaptureDto: PokemoncaptureDto): void {
    const payload = pokemoncaptureDto.toJson();

    if (!pokemoncaptureDto.id) {
      this.http.post<PokemoncaptureDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<PokemoncaptureDto>(`${this.apiUrl}/${pokemoncaptureDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}
