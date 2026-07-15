import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, catchError, of, tap } from 'rxjs';
import { FamilyVisasResponse } from '../../core/models/family-visa.model';
import { environment } from '../../../environments/environment';
export interface FamilyVisasSearchResult {
  familyVisit: FamilyVisasResponse | null;
  familyRecruitment: FamilyVisasResponse | null;
}

@Injectable({ providedIn: 'root' })
export class FamilyVisasInquiryService {
  private readonly apiUrl = `${environment.apiUrl}/families/family-visas`;

  lastResult: FamilyVisasSearchResult | null = null;

  constructor(private http: HttpClient) { }

  search(identityNumber: string, sourceNumber: string): Observable<FamilyVisasSearchResult> {
    const baseParams = { identity_number: identityNumber, source_number: sourceNumber };

    const visit$ = this.http
      .get<FamilyVisasResponse>(this.apiUrl, { params: { ...baseParams, purpose: 'familyVisit' } })
      .pipe(catchError(() => of(null)));

    const recruitment$ = this.http
      .get<FamilyVisasResponse>(this.apiUrl, { params: { ...baseParams, purpose: 'familyRecruitment' } })
      .pipe(catchError(() => of(null)));

    return forkJoin([visit$, recruitment$]).pipe(
      tap(([familyVisit, familyRecruitment]) => {
        this.lastResult = { familyVisit, familyRecruitment };
      }),
      // نحول النتيجة لشكل موحد
      // (forkJoin بيرجع array، بنحوله لـ object هنا)
      // استخدمنا map بدل ما نكرر المنطق فوق
      (source) =>
        new Observable<FamilyVisasSearchResult>((subscriber) => {
          source.subscribe({
            next: ([familyVisit, familyRecruitment]) => {
              subscriber.next({ familyVisit, familyRecruitment });
            },
            error: (err) => subscriber.error(err),
            complete: () => subscriber.complete(),
          });
        })
    );
  }
}