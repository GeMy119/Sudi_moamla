import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoamlaTypeResponse } from '../../core/models/worker.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoamlaInquiryService {
  lastResult: MoamlaTypeResponse | null = null;

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/workers/moamla-type`;

  search(identityNumber: string, sourceNumber: string): Observable<MoamlaTypeResponse> {
    return this.http
      .get<MoamlaTypeResponse>(this.apiUrl, {
        params: {
          identity_number: identityNumber,
          source_number: sourceNumber
        },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }
}
