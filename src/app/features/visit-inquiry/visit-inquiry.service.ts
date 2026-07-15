import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { VisitResponse } from '../../core/models/visit.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VisitInquiryService {
  private readonly apiUrl = `${environment.apiUrl}/visits/searchVisit`; // عدّلها حسب الـ base url عندك

  lastResult: VisitResponse | null = null;

  constructor(private http: HttpClient) { }

  search(visaNo: string, sourceNumber: string): Observable<VisitResponse> {
    return this.http
      .get<VisitResponse>(this.apiUrl, {
        params: { visaNo, source_number: sourceNumber },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }
}