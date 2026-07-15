import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyVisasInquiryService, FamilyVisasSearchResult } from '../family-visas-inquiry.service';
import { FamilyVisa } from '../../../core/models/family-visa.model';

type VisasTab = 'familyVisit' | 'familyRecruitment';

@Component({
  selector: 'app-family-visas-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family-visas-result.component.html',
})
export class FamilyVisasResultComponent implements OnInit {
  result: FamilyVisasSearchResult | null = null;
  loading = true;
  errorMsg = '';
  activeTab: VisasTab = 'familyVisit';

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

  private setResult(res: FamilyVisasSearchResult): void {
    this.result = res;
    this.loading = false;
    this.activeTab = this.familyVisitVisas.length > 0 ? 'familyVisit' : 'familyRecruitment';
  }

  setTab(tab: VisasTab): void {
    this.activeTab = tab;
  }

  /**
   * الباك اند حالياً بيرجع كل التأشيرات لنفس العامل بغض النظر عن الـ purpose
   * (endpoint الاستعلام مش بيفلتر بحقل purpose على FamilyVisas نفسها).
   * فبندمج نتايج الاستدعائين مع بعض ونشيل التكرار بالـ _id، وبعدين نفلتر
   * محلياً بحقل purpose الحقيقي بتاع كل تأشيرة — ده المصدر الصحيح للفلترة،
   * مش تخمين على أساس وجود اسم زائر من عدمه.
   */
  private get allVisas(): FamilyVisa[] {
    const visitData = this.result?.familyVisit?.data ?? [];
    const recruitmentData = this.result?.familyRecruitment?.data ?? [];

    const merged = new Map<string, FamilyVisa>();
    [...visitData, ...recruitmentData].forEach((visa) => merged.set(visa._id, visa));

    return Array.from(merged.values());
  }

  get familyVisitVisas(): FamilyVisa[] {
    return this.allVisas.filter((visa) => visa.purpose === 'familyVisit');
  }

  get familyRecruitmentVisas(): FamilyVisa[] {
    return this.allVisas.filter((visa) => visa.purpose === 'familyRecruitment');
  }

  get activeVisas(): FamilyVisa[] {
    return this.activeTab === 'familyVisit' ? this.familyVisitVisas : this.familyRecruitmentVisas;
  }

  get familyVisitCount(): number {
    return this.familyVisitVisas.length;
  }

  get familyRecruitmentCount(): number {
    return this.familyRecruitmentVisas.length;
  }

  get workerInfo() {
    return this.result?.familyVisit?.worker || this.result?.familyRecruitment?.worker;
  }

  onPrint(): void {
    window.print();
  }

  onEnd(visa: FamilyVisa): void {
    const confirmed = confirm(`هل تريد إنهاء طلب تأشيرة ${visa.visitor_name || 'هذا الطلب'}؟`);
    if (confirmed) {
      console.log('تم تأكيد إنهاء الطلب لـ', visa._id);
    }
  }

  goBack(): void {
    this.router.navigate(['/family-visas-inquiry']);
  }
  getStatusLabel(status: any): string {
    if (!status) return 'قيد الانتظار';

    // تحويل النص لحروف صغيرة لحمايتها من الـ Capital letters
    const cleanStatus = status.toLowerCase().trim();

    if (cleanStatus === 'approved') return 'تمت الموافقة';
    if (cleanStatus === 'rejected') return 'تم الرفض';
    if (cleanStatus === 'pending') return 'قيد الانتظار';

    return status;
  }
}