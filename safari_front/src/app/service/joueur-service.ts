import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { JoueurDto } from '../dto/joueur-dto';
import { JoueurPasswordDto } from '../dto/joueur-password-dto';

@Injectable({
  providedIn: 'root',
})
export class JoueurService {

  private apiUrl: string = '/joueur';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<JoueurDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<JoueurDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<JoueurDto> {
    return this.http.get<JoueurDto>(`${this.apiUrl}/${id}`);
  }

  public save(joueurDto: JoueurDto): void {
    const payload = joueurDto.toJson();

    if (!joueurDto.id) {
      this.http.post<JoueurDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<JoueurDto>(`${this.apiUrl}/${joueurDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public createAsAdmin(joueurDto: JoueurPasswordDto): void {
    const payload = joueurDto.toJson();
    const apiUrlAsAdmin = this.apiUrl + "/admin"

    this.http.post<JoueurPasswordDto>(apiUrlAsAdmin, payload)
        .subscribe(() => this.refresh());
  }

  public updateAsAdmin(joueurDto: JoueurDto): void {
    const payload = joueurDto.toJson();
    const apiUrlAsAdmin = this.apiUrl + "/admin"

    this.http.put<JoueurDto>(`${apiUrlAsAdmin}/${joueurDto.id}`, payload)
        .subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}
