import { Component, OnInit } from '@angular/core';
import { Worker, WorkersByEmployerResponse } from '../../../core/models/worker.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IqamaInquiryService } from '../../iqama-inquiry/iqama-inquiry.service';
import { CommonModule } from '@angular/common';

interface MoamlaRow {
  worker: Worker;
  moamlaId?: string;
  name?: string;
  status?: 'rejected' | 'accepted';
}

@Component({
  selector: 'app-moamla-result',
  imports: [CommonModule],
  templateUrl: './moamla-result.component.html',
  styleUrl: './moamla-result.component.css'
})
export class MoamlaResultComponent implements OnInit {
  result: WorkersByEmployerResponse | null = null;
  selectedRow: MoamlaRow | null = null;
  loading = true;
  errorMsg = '';

  allWorkers: Worker[] = [];

  statusLegendTitle = 'حالة الموافقة';
  statusLegendText = `تشير حالة الموافقة إلى أن المعاملة قد خضعت للمراجعة من قبل الجهة المختصة، وتم التحقق من البيانات والمستندات واستيفاء جميع المتطلبات والإجراءات اللازمة، وصدر قرار بالموافقة عليها وفقاً للأنظمة والتعليمات المعمول بها. ونؤكد هذه الحالة أن المعاملة أجازت مراحل المعالجة بنجاح، وأصبحت مؤهلة لاستكمال الإجراءات اللاحقة أو الاستفادة من الخدمة المرتبطة بها.

كما تتضمن حالة الموافقة جميع المعلومات المرتبطة بالقرار الصادر، بما في ذلك تاريخ الموافقة، والجهة المختصة، وأي ملاحظات أو تعليمات إضافية قد يلزم الالتزام بها. ويهدف عرض هذه الحالة إلى تمكين المستفيد من الاطلاع على آخر مستجدات معاملته بصورة واضحة وموثوقة، وتعزيز الشفافية من خلال توفير معلومات دقيقة ومحدثة تعكس الوضع الفعلي للمعاملة، بما يسهم في تسهيل المتابعة وتقليل الحاجة إلى مراجعة الجهة المختصة للاستفسار عن حالة الطلب.`;

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
      this.router.navigate(['/moamla-inquiry']);
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
    this.selectedRow = this.moamlaRows[0] ?? null;
    this.loading = false;
  }

  get moamlaRows(): MoamlaRow[] {
    const rows: MoamlaRow[] = [];
    for (const worker of this.allWorkers) {
      const types = worker.moamla_type ?? [];
      if (types.length === 0) continue;
      for (const type of types) {
        rows.push({
          worker,
          moamlaId: type._id,
          name: type.name,
          status: type.status,
        });
      }
    }
    return rows;
  }

  selectRow(row: MoamlaRow): void {
    this.selectedRow = row;
  }

  onPrint(): void {
    window.print();
  }

  onEnd(): void {
    if (!this.selectedRow) return;
    const confirmed = confirm(`هل تريد إنهاء خدمة ${this.selectedRow.worker.name}؟`);
    if (confirmed) {
      console.log('تم تأكيد إنهاء الخدمة لـ', this.selectedRow.worker.iqama_number);
    }
  }

  goBack(): void {
    this.router.navigate(['/moamla-inquiry']);
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