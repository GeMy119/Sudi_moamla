
import { Component, OnInit } from '@angular/core';
import { Worker, WorkersByEmployerResponse } from '../../../core/models/worker.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IqamaInquiryService } from '../../iqama-inquiry/iqama-inquiry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profession-result',
  imports: [CommonModule],
  templateUrl: './profession-result.component.html',
  styleUrl: './profession-result.component.css'
})
export class professionResultComponent implements OnInit {
  result: WorkersByEmployerResponse | null = null;
  selectedWorker: Worker | null = null;
  loading = true;
  errorMsg = '';

  // كل العمال
  allWorkers: Worker[] = [];

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
      this.router.navigate(['/profession-inquiry']);
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
    this.allWorkers = res.data ?? [];
    this.selectedWorker = this.workersWithAlerts[0] ?? null;
    this.loading = false;
  }

  // العمال اللي عندهم بلاغ فعلي بس
  get workersWithAlerts(): Worker[] {
    return this.allWorkers.filter(w => !!w.profession_changes);
  }

  selectWorker(worker: Worker): void {
    this.selectedWorker = worker;
  }

  onPrint(): void {
    window.print();
  }

  onEnd(): void {
    if (!this.selectedWorker) return;
    const confirmed = confirm(`هل تريد إنهاء خدمة ${this.selectedWorker.name}؟`);
    if (confirmed) {
      console.log('تم تأكيد إنهاء الخدمة لـ', this.selectedWorker.iqama_number);
    }
  }

  goBack(): void {
    this.router.navigate(['/profession-inquiry']);
  }
  convertToHijri(dateString: any): string {
    if (!dateString) return '—';

    try {
      const date = new Date(dateString);

      // استخدام Locale إنجليزي لضمان استخدام الأرقام الإنجليزية (1-9)
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      return formatter.format(date); // النتيجة هتبقى زي: 11/18/1445
    } catch (error) {
      return '—';
    }
  }
}