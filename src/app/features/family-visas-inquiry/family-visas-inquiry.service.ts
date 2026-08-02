import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FamilyVisasResponse } from '../../core/models/family-visa.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FamilyVisasInquiryService {
  private readonly apiUrl = `${environment.apiUrl}/families/family-visas`;

  lastResult: FamilyVisasResponse | null = null;

  constructor(private http: HttpClient) { }

  search(identityNumber: string, sourceNumber: string): Observable<FamilyVisasResponse> {
    return this.http
      .get<FamilyVisasResponse>(this.apiUrl, {
        params: {
          identity_number: identityNumber,
          source_number: sourceNumber
        },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }

}
