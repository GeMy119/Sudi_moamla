import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { WorkersByEmployerResponse } from '../../core/models/worker.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IqamaInquiryService {

  lastResult: WorkersByEmployerResponse | null = null;

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/workers/employer`;
  search(identityNumber: string, sourceNumber: string): Observable<WorkersByEmployerResponse> {
    return this.http
      .get<WorkersByEmployerResponse>(this.apiUrl, {
        params: { identity_number: identityNumber, source_number: sourceNumber },
      })
      .pipe(tap((res) => (this.lastResult = res)));
  }
}