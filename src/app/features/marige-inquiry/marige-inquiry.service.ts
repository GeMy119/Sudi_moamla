import { Injectable } from '@angular/core';
import { ApiResponse, Employer } from '../../core/models/employer.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarigeInquiryService {
  private apiUrl = `${environment.apiUrl}/employers/marriage-permit`;
  constructor(private http: HttpClient) { }

  search(identityNumber: string, sourceNumber: string): Observable<ApiResponse<{ employer: Employer }>> {
    const params = new HttpParams()
      .set('identity_number', identityNumber)
      .set('source_number', sourceNumber);

    return this.http.get<ApiResponse<{ employer: Employer }>>(this.apiUrl, { params });
  }
}

