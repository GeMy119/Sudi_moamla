import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Visit } from '../../../core/models/visit.model';
import { VisitInquiryService } from '../visit-inquiry.service';

@Component({
  selector: 'app-visit-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-result.component.html',
})
export class VisitResultComponent implements OnInit {
  visit: Visit | null = null;
  loading = true;
  errorMsg = '';



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private visitService: VisitInquiryService
  ) { }

  ngOnInit(): void {
    if (this.visitService.lastResult) {
      this.visit = this.visitService.lastResult.data;
      this.loading = false;
      console.log('visitService.lastResult.data:', this.visit);
      return;
    }

    const visaNo = this.route.snapshot.queryParamMap.get('visaNo');
    const sourceNumber = this.route.snapshot.queryParamMap.get('source_number');

    if (!visaNo || !sourceNumber) {
      this.router.navigate(['/visit-inquiry']);
      return;
    }

    this.visitService.search(visaNo, sourceNumber).subscribe({

      next: (res) => {
        this.visit = res.data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'تعذر إيجاد تأشيرة بهذه البيانات.';
        this.loading = false;
      },
    });
  }

  get imageUrl(): string {
    return this.visit?.image || this.visit?.image_url || '';
  }

  onPrint(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/visit-inquiry']);
  }
  convertToHijri(dateString: any): string {
    if (!dateString) return '—';

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) return '—';

      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC'
      });

      // تفكيك أجزاء التاريخ (اليوم، الشهر، السنة)
      const parts = formatter.formatToParts(date);
      const day = parts.find(p => p.type === 'day')?.value;
      const month = parts.find(p => p.type === 'month')?.value;
      const year = parts.find(p => p.type === 'year')?.value;

      // تجميع الأجزاء بالترتيب المطلوبة DD/MM/YYYY
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '—';
    }
  }
}