import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NationalityInquiryService } from '../nationality-inquiry.service';
import { NationalityRequest } from '../../../core/models/nationality-request.model';

@Component({
  selector: 'app-nationality-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nationality-result.component.html',
  styleUrl: './nationality-result.component.css',
})
export class NationalityResultComponent implements OnInit {
  result: NationalityRequest | null = null;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nationalityService: NationalityInquiryService
  ) { }

  ngOnInit(): void {
    if (this.nationalityService.lastResult) {
      this.result = this.nationalityService.lastResult;
      this.loading = false;
      return;
    }

    const identityNumber = this.route.snapshot.queryParamMap.get('identity_number');
    const sourceNumber = this.route.snapshot.queryParamMap.get('source_number');

    if (!identityNumber || !sourceNumber) {
      this.router.navigate(['/nationality-inquiry']);
      return;
    }

    this.nationalityService.search(identityNumber, sourceNumber).subscribe({
      next: (res) => {
        this.result = res.data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'تعذر إيجاد بيانات الطلب.';
        this.loading = false;
      },
    });
  }

  get isApproved(): boolean {
    return this.result?.status === 'تمت الموافقة';
  }

  get imageUrl(): string {
    return this.result?.image || this.result?.image_URL || '';
  }

  goBack(): void {
    this.router.navigate(['/nationality-inquiry']);
  }

  printPage() {
    window.print();
  }
}