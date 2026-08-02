import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfessionChangeResponse } from '../../core/models/worker.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionInquiryService {
  lastResult: ProfessionChangeResponse | null = null;

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/workers/profession-changes`;

  search(identityNumber: string, sourceNumber: string): Observable<ProfessionChangeResponse> {
    return this.http
      .get<ProfessionChangeResponse>(this.apiUrl, {
        params: {
          identity_number: identityNumber,
          source_number: sourceNumber
        },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }
}