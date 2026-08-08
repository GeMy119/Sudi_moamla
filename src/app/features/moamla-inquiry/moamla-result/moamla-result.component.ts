import { MoamlaData } from './../../../core/models/worker.model';
import { Component, OnInit } from '@angular/core';
import { MoamlaTypeResponse, Worker, WorkersByEmployerResponse } from '../../../core/models/worker.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IqamaInquiryService } from '../../iqama-inquiry/iqama-inquiry.service';
import { CommonModule } from '@angular/common';
import { MoamlaInquiryService } from '../moamla-inquiry.service';

@Component({
  selector: 'app-moamla-result',
  imports: [CommonModule],
  templateUrl: './moamla-result.component.html',
  styleUrl: './moamla-result.component.css'
})
export class MoamlaResultComponent implements OnInit {
  result: MoamlaTypeResponse | null = null;
  loading = true;
  errorMsg = '';


  statusLegendTitle = 'حالة الموافقة';
  statusLegendText = `تشير حالة الموافقة إلى أن المعاملة قد خضعت للمراجعة من قبل الجهة المختصة، وتم التحقق من البيانات والمستندات واستيفاء جميع المتطلبات والإجراءات اللازمة، وصدر قرار بالموافقة عليها وفقاً للأنظمة والتعليمات المعمول بها. ونؤكد هذه الحالة أن المعاملة أجازت مراحل المعالجة بنجاح، وأصبحت مؤهلة لاستكمال الإجراءات اللاحقة أو الاستفادة من الخدمة المرتبطة بها.

كما تتضمن حالة الموافقة جميع المعلومات المرتبطة بالقرار الصادر، بما في ذلك تاريخ الموافقة، والجهة المختصة، وأي ملاحظات أو تعليمات إضافية قد يلزم الالتزام بها. ويهدف عرض هذه الحالة إلى تمكين المستفيد من الاطلاع على آخر مستجدات معاملته بصورة واضحة وموثوقة، وتعزيز الشفافية من خلال توفير معلومات دقيقة ومحدثة تعكس الوضع الفعلي للمعاملة، بما يسهم في تسهيل المتابعة وتقليل الحاجة إلى مراجعة الجهة المختصة للاستفسار عن حالة الطلب.`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moamlaService: MoamlaInquiryService
  ) { }

  ngOnInit(): void {
    if (this.moamlaService.lastResult) {
      this.setResult(this.moamlaService.lastResult);
      return;
    }

    const identityNumber = this.route.snapshot.queryParamMap.get('identity_number');
    const sourceNumber = this.route.snapshot.queryParamMap.get('source_number');

    if (!identityNumber || !sourceNumber) {
      this.router.navigate(['/moamla-inquiry']);
      return;
    }

    this.moamlaService.search(identityNumber, sourceNumber).subscribe({
      next: (res) => this.setResult(res),
      error: () => {
        this.errorMsg = 'تعذر إيجاد بيانات صاحب العمل.';
        this.loading = false;
      },
    });
  }

  private setResult(res: MoamlaTypeResponse): void {
    this.result = res;
    this.loading = false;
  }




  onPrint(): void {
    window.print();
  }

  onEnd(): void {
    if (!this.result) return;
    const confirmed = confirm(`هل تريد إنهاء خدمة ${this.result.data.name}؟`);
    if (confirmed) {
      console.log('تم تأكيد إنهاء الخدمة لـ', this.result.data.iqama_number);
    }
  }

  goBack(): void {
    this.router.navigate(['/moamla-inquiry']);
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