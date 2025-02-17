import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsectTypesService {
  private apiUrl = 'https://api.gbif.org/v1/occurrence/search';

  constructor(private http: HttpClient) {}

  getInsects(taxonKey: number, offset: number = 0, limit: number = 8): Observable<any> {
    const url = `${this.apiUrl}?taxonKey=${taxonKey}&offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }
}
