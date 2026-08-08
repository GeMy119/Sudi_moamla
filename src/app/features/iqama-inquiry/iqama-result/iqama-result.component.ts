import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IqamaInquiryService } from '../iqama-inquiry.service';
import { Worker, WorkersByEmployerResponse } from '../../../core/models/worker.model';

@Component({
  selector: 'app-iqama-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iqama-result.component.html',
  styleUrl: './iqama-result.component.css',
})
export class IqamaResultComponent implements OnInit {
  result: WorkersByEmployerResponse | null = null;
  loading = true;
  errorMsg = '';

  statusLegend = [
    { label: 'سارية المفعول', desc: 'يقصد بها إحدى الحالتين التاليتين: 1- لايوجد أي قيود أو بلاغ على الإقامة. 2- الوافد المقيم يعمل بشكل نظامي.' },
    { label: 'تمت الموافقة', desc: 'يقصد بأن التأشيرة صالحة ويمكن الاستخدام عليها وإذا رغبت في إلغائها يلزم مراجعة مكتب الاستقدام أو مكتب العمل التابع لوزارة العمل لإلغائها.' },
    { label: 'انتهت صلاحيتها', desc: 'يقصد بها انتهاء الإقامة (ستين)، وبعد مضي 100 يوم من انتهاء صلاحيتها ستتغير العبارة إلى حالة عدم تغير العبارة يمكنك تسديد طلب على الرقم (199099) أو الدخول على موقعهم على الإنترنت.' },
    { label: 'تم إلغاؤها', desc: 'يقصد بأنه تم إلغاؤها من مكتب الاستقدام أو مكتب العمل ومتابعتها حتى تتغير حالتها (إن لم تتغير حالتها بعد مضي (15) يوماً يلزم مراجعة وزارة الخارجية).' },
    { label: 'تم إرسال طلب الإلغاء لوزارة الخارجية ولم يصل الرد', desc: 'يقصد بأنه تم إرسال طلب الإلغاء لوزارة الخارجية وما يزال تحت الإجراء، وينبغي الانتظار ومتابعتها حتى تتغير حالتها (إن لم تتغير حالتها بعد مضي (15) يوماً يلزم مراجعة وزارة الخارجية).' },
    { label: 'استعادة رسومها', desc: 'يقصد بأنه تم استرجاع المبلغ إلى الحساب المسدد منه، وإذا رغبت في الحصول على (رقم هوية المسدد، واسم البنك، وتاريخ رجوع المبلغ) مع تجهيز رقم الهوية ورقم التأشيرة، أما في حالة سداد مبلغ التأشيرة نقداً فيتم مراجعة البنك مباشرة لاستلامه.' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iqamaService: IqamaInquiryService
  ) { }

  ngOnInit(): void {
    if (this.iqamaService.lastResult) {
      this.setResult(this.iqamaService.lastResult);
      return;
    }

    const identityNumber = this.route.snapshot.queryParamMap.get('identity_number');
    const sourceNumber = this.route.snapshot.queryParamMap.get('source_number');

    if (!identityNumber || !sourceNumber) {
      this.router.navigate(['/iqama-inquiry']);
      return;
    }

    this.iqamaService.search(identityNumber, sourceNumber).subscribe({
      next: (res) => this.setResult(res),
      error: () => {
        this.errorMsg = 'تعذر إيجاد بيانات صاحب العمل.';
        this.loading = false;
      },
    });
  }

  private setResult(res: WorkersByEmployerResponse): void {
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
    this.router.navigate(['/iqama-inquiry']);
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