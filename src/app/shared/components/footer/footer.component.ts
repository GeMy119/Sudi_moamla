import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear(); // بيجيب السنة الحالية ديناميكياً

  footerLinks = [
    { text: 'سياسة الخصوصية', url: '#' },
    { text: 'شروط الإستخدام', url: '#' },
    { text: 'خريطة الموقع', url: '#' },
    { text: 'الأخبار', url: '#' },
    { text: 'الأسئلة الشائعة', url: '#' }
  ];
}