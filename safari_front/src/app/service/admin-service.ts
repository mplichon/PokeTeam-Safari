import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { AdminDto } from '../dto/admin-dto';
import { AdminPasswordDto } from '../dto/admin-password-dto';
@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private apiUrl: string = '/admin';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<AdminDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => this.http.get<AdminDto[]>(this.apiUrl))
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<AdminDto> {
    return this.http.get<AdminDto>(`${this.apiUrl}/${id}`);
  }

  public save(adminDto: AdminPasswordDto): void {
    const payload = adminDto.toJson();

    if (!adminDto.id) {
      this.http.post<AdminPasswordDto>(this.apiUrl, payload)
        .subscribe(() => this.refresh());
    } else {
      this.http.put<AdminPasswordDto>(`${this.apiUrl}/${adminDto.id}`, payload)
        .subscribe(() => this.refresh());
    }
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() => this.refresh());
  }
}