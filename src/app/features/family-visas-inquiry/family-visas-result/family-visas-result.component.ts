import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyVisasInquiryService } from '../family-visas-inquiry.service';
import { FamilyVisa, FamilyVisasResponse } from '../../../core/models/family-visa.model';

@Component({
  selector: 'app-family-visas-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family-visas-result.component.html',
})
export class FamilyVisasResultComponent implements OnInit {
  result: FamilyVisasResponse | null = null;
  loading = true;
  errorMsg = '';

  statusLegend = [
    { label: 'تم استخدامها', desc: 'يقصد بها إحدى الحالتين التاليتين: تم استخدام عمالة عليها التأشيرة ولم يتم الاستخدام عليها وقد تم إنهاء إجراءات الدخول إلى المملكة ويلزم مراجعة السفارة من وزارة الخارجية لتصحيح وضعها أو إلغائها.' },
    { label: 'تمت الموافقة', desc: 'يقصد بها أن التأشيرة صالحة ويمكن الاستخدام عليها وإذا رغبت في إلغائها يلزم مراجعة مكتب الاستقدام أو مكتب العمل التابع لوزارة العمل لإلغائها.' },
    { label: 'انتهت صلاحيتها', desc: 'يقصد بها انتهاء مدة التأشيرة (ستين)، وبعد مضي 100 يوم من انتهاء صلاحيتها ستتغير العبارة إلى حالة عدم تغير العبارة يمكنك تسجيل طلب عبر (آمر) على الرقم (199099) أو الدخول على موقعهم على الإنترنت.' },
    { label: 'تم إلغاؤها', desc: 'يقصد بها أنه تم إلغاؤها من مكتب الاستقدام أو مكتب العمل، وينبغي الانتظار ومتابعتها حتى تتغير حالتها إلى (تم استعادة رسومها). وإذا لم تتغير حالتها بعد مضي (15) يوماً يلزم مراجعة وزارة الخارجية.' },
    { label: 'تم إرسال طلب الإلغاء لوزارة الخارجية ولم يصل الرد', desc: 'يقصد بها أنه تم إرسال طلب الإلغاء لوزارة الخارجية وما يزال تحت الإجراء، وينبغي الانتظار ومتابعتها حتى تتغير حالتها. وإذا لم تتغير حالتها بعد مضي (15) يوماً يلزم مراجعة وزارة الخارجية.' },
    { label: 'تم استعادة رسومها', desc: 'يقصد بها أنه تم استرجاع المبلغ إلى الحساب المسدد منه، وإذا رغبت في الحصول على (رقم هوية المسدد، واسم البنك، وتاريخ رجوع المبلغ) قم بالاتصال بمركز (آمر) على الرقم (199099) مع تجهيز رقم الهوية ورقم التأشيرة. أما في حالة سداد مبلغ التأشيرة نقداً فيتم مراجعة البنك مباشرة لاستلامه.' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private familyVisasService: FamilyVisasInquiryService
  ) { }

  ngOnInit(): void {
    if (this.familyVisasService.lastResult) {
      this.setResult(this.familyVisasService.lastResult);
      return;
    }

    const identityNumber = this.route.snapshot.queryParamMap.get('identity_number');
    const sourceNumber = this.route.snapshot.queryParamMap.get('source_number');

    if (!identityNumber || !sourceNumber) {
      this.router.navigate(['/family-visas-inquiry']);
      return;
    }

    this.familyVisasService.search(identityNumber, sourceNumber).subscribe({
      next: (res) => this.setResult(res),
      error: () => {
        this.errorMsg = 'تعذر إيجاد بيانات هذا الطلب.';
        this.loading = false;
      },
    });
  }

  get workerInfo(): any {
    return this.result?.worker || null;
  }

  // هنا يتم جلب التأشيرة المرجعة كـ Object مفرد
  get visa(): FamilyVisa | null {
    return this.result?.data || null;
  }

  private setResult(res: FamilyVisasResponse): void {
    this.result = res;
    this.loading = false;
  }

  onPrint(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/family-visas-inquiry']);
  }

  getStatusLabel(status: any): string {
    if (!status) return 'تمت الموافقة';

    const cleanStatus = String(status).toLowerCase().trim();

    if (cleanStatus === 'approved' || cleanStatus === 'تمت الموافقه' || cleanStatus === 'تمت الموافقة') return 'تمت الموافقة';
    if (cleanStatus === 'rejected' || cleanStatus === 'مرفوض') return 'تم الرفض';
    if (cleanStatus === 'pending' || cleanStatus === 'قيد الانتظار') return 'قيد الانتظار';

    return status;
  }

  isApproved(status: any): boolean {
    if (!status) return true;
    const cleanStatus = String(status).toLowerCase().trim();
    return cleanStatus === 'approved' || cleanStatus === 'تمت الموافقه' || cleanStatus === 'تمت الموافقة';
  }

  getVisitLabel(purpose?: string): string {
    if (!purpose) return 'استقدام عائلي';
    const clean = purpose.toLowerCase().trim();

    if (clean === 'familyvisit') return 'زيارة عائلية';
    if (clean === 'familyrecruitment') return 'استقدام عائلي';
    return purpose;
  }
}