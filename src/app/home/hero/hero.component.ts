import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  // متغير لحفظ التايمر عشان نقدر نوقفه
  intervalId: any;
  // الوقت بالملي ثانية بين كل سلايد والتاني (هنا 4 ثواني)
  autoPlaySpeed: number = 4000;

  slides = [
    { image: 'slide1.png', title: 'لأجل بيئة مستدامة', subtitle: 'أمن بيئتنا من أمن وطننا' },
    { image: 'slide2.png', title: 'الحفاظ على الغطاء النباتي', subtitle: 'معاً لمكافحة التصحر وزيادة المساحات الخضراء' },
    { image: 'slide3.png', title: 'حماية الحياة الفطرية', subtitle: 'نحافظ على الكائنات النادرة لضمان التوازن البيئي' },
    { image: 'slide4.png', title: 'إدارة النفايات الذكية', subtitle: 'إعادة التدوير خطوتنا الأولى نحو مستقبل نظيف' },
    { image: 'slide5.png', title: 'ترشيد استهلاك المياه', subtitle: 'كل قطرة تصنع فارقاً في مستقبل أجيالنا' },
    { image: 'slide6.png', title: 'الطاقة المتجددة والنظيفة', subtitle: 'الاستثمار في طاقة الشمس والرياح لبيئة أفضل' },
    { image: 'slide7.png', title: 'الوعي البيئي والمجتمعي', subtitle: 'مسؤوليتنا جميعاً تبدأ من السلوك اليومي' }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // تشغيل الحركة التلقائية
  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlaySpeed);
  }

  // إيقاف التايمر
  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // التنقل للسلايد التالي بشكل دائري
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  // دالة تغيير السلايد يدويًا عند الضغط على النقطة
  setSlide(index: number) {
    this.currentIndex = index;
    // بنعمل ريستارت للتايمر عشان أول ما المستخدم يضغط بنفسه ميعملش نقلة سريعة مفاجئة
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}