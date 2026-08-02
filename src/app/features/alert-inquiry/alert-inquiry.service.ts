import { Injectable } from '@angular/core';
import { alertResponse } from '../../core/models/worker.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertInquiryService {
  lastResult: alertResponse | null = null;

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/workers/alerts`;

  search(identityNumber: string, sourceNumber: string): Observable<alertResponse> {
    return this.http
      .get<alertResponse>(this.apiUrl, {
        params: {
          identity_number: identityNumber,
          source_number: sourceNumber
        },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }
}
