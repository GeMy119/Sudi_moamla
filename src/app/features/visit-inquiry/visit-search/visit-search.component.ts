import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitInquiryService } from '../visit-inquiry.service';

@Component({
  selector: 'app-visit-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visit-search.component.html',
})
export class VisitSearchComponent implements OnInit {
  @ViewChild('captchaCanvas') captchaCanvas!: ElementRef<HTMLCanvasElement>;

  visaNo = '';
  sourceNumber = '';
  captchaInput = '';
  captchaCode = '';

  loading = false;
  errorMsg = '';

  constructor(private visitService: VisitInquiryService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.generateCaptcha(), 0);
  }

  generateCaptcha(): void {
    const chars = '0123456789';
    this.captchaCode = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    this.captchaInput = '';
    this.drawCaptcha();
  }

  private drawCaptcha(): void {
    const canvas = this.captchaCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${0.15 + Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    const spacing = canvas.width / (this.captchaCode.length + 1);
    ctx.font = 'bold 28px Arial';
    ctx.textBaseline = 'middle';

    [...this.captchaCode].forEach((char, i) => {
      ctx.save();
      const x = spacing * (i + 1);
      const y = canvas.height / 2 + (Math.random() * 8 - 4);
      ctx.translate(x, y);
      ctx.rotate((Math.random() * 30 - 15) * (Math.PI / 180));
      ctx.fillStyle = '#1f2937';
      ctx.fillText(char, -8, 0);
      ctx.restore();
    });
  }

  onSubmit(): void {
    this.errorMsg = '';

    if (!this.visaNo.trim() || !this.sourceNumber.trim()) {
      this.errorMsg = 'الرجاء إدخال رقم التأشيرة ورقم الصادر.';
      return;
    }
    if (!this.captchaInput.trim()) {
      this.errorMsg = 'الرجاء إدخال الرمز المرئي.';
      return;
    }
    if (this.captchaInput.trim() !== this.captchaCode) {
      this.errorMsg = 'الرمز المرئي غير صحيح.';
      this.generateCaptcha();
      return;
    }

    this.loading = true;
    this.visitService.search(this.visaNo.trim(), this.sourceNumber.trim()).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/visit-inquiry/result'], {
          queryParams: {
            visaNo: this.visaNo.trim(),
            source_number: this.sourceNumber.trim(),
          },
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'حدث خطأ أثناء البحث، حاول مرة أخرى.';
        this.generateCaptcha();
      },
    });
  }

  onClear(): void {
    this.visaNo = '';
    this.sourceNumber = '';
    this.errorMsg = '';
    this.generateCaptcha();
  }
}