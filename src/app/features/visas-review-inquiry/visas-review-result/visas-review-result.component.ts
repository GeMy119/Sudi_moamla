import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkersByEmployerResponse } from '../../../core/models/worker.model';
import { TicketVisaReview } from '../../../core/models/employer.model';
import { IqamaInquiryService } from '../../iqama-inquiry/iqama-inquiry.service';

@Component({
  selector: 'app-visas-review-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visas-review-result.component.html',
  styleUrl: './visas-review-result.component.css',
})
export class VisasReviewResultComponent implements OnInit {
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
    console.log(this.convertToHijri(this.result?.employer.createdAt))
  }

  private setResult(res: WorkersByEmployerResponse): void {
    this.result = res;
    this.loading = false;
  }

  get ticketVisaReviews(): TicketVisaReview[] {
    return this.result?.employer.ticket_visa_review ?? [];
  }

  goBack(): void {
    this.router.navigate(['/visas-review-inquiry']);
  }
  convertToHijri(dateString: any): string {
    if (!dateString) return '—';

    try {
      const date = new Date(dateString);

      // استخدام نظام أم القرى المدمج في المتصفح لتنسيق التاريخ هجري
      const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      return formatter.format(date); // هيطلعلك النتيجة زي: ١٤٤٥/١١/١٨
    } catch (error) {
      return '—';
    }
  }
  onPrint(): void {
    window.print();
  }
  get emptyRows(): number[] {
    const minRows = 3; // نفس عدد الصفوف في الصورة
    const currentCount = this.ticketVisaReviews?.length ?? 0;
    const remaining = minRows - currentCount;
    return remaining > 0 ? Array(remaining).fill(0) : [];
  }
}