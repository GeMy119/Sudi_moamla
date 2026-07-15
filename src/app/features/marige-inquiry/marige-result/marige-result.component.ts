import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MarigeInquiryService } from '../marige-inquiry.service';
import { Employer } from '../../../core/models/employer.model';

@Component({
  selector: 'app-marige-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marige-result.component.html',
  styleUrl: './marige-result.component.css'
})
export class MarigeResultComponent implements OnInit {
  employerData!: Employer;
  loading = true;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marigeService: MarigeInquiryService
  ) { }

  ngOnInit(): void {
    // قراءة الـ queryParams من الـ URL لدعم الـ Refresh
    this.route.queryParams.subscribe(params => {
      const identityNumber = params['identity_number'];
      const sourceNumber = params['source_number'];

      if (identityNumber && sourceNumber) {
        this.fetchResult(identityNumber, sourceNumber);
      } else {
        this.loading = false;
        this.errorMsg = 'بيانات الاستعلام غير كاملة، يرجى العودة لصفحة البحث.';
      }
    });
  }

  fetchResult(identityNumber: string, sourceNumber: string): void {
    this.loading = true;
    this.errorMsg = '';

    this.marigeService.search(identityNumber, sourceNumber).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data?.employer) {
          this.employerData = res.data.employer;
        } else {
          this.errorMsg = 'لم يتم العثور على بيانات.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'حدث خطأ أثناء جلب البيانات من السيرفر.';
      }
    });
  }

  onPrint(): void {
    window.print();
  }

  onFinish(): void {
    this.router.navigate(['/']); // الانتقال لصفحة البحث أو الرئيسية عند الضغط على إنهاء
  }
}