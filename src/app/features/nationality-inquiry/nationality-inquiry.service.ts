import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NationalityRequest } from '../../core/models/nationality-request.model';
import { environment } from '../../../environments/environment';

interface NationalityRequestResponse {
  success: boolean;
  data: NationalityRequest;
}

@Injectable({ providedIn: 'root' })
export class NationalityInquiryService {
  private apiUrl = `${environment.apiUrl}/nationalities/search`;

  lastResult: NationalityRequest | null = null;

  constructor(private http: HttpClient) { }

  search(identityNumber: string, sourceNumber: string): Observable<NationalityRequestResponse> {
    return this.http
      .get<NationalityRequestResponse>(this.apiUrl, {
        params: { identity_number: identityNumber, source_number: sourceNumber },
      })
      .pipe(tap((res) => (this.lastResult = res.data)));
  }
}