import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleTranslateService } from '../../../core/services/google-translate.service';
import { ThemeService } from '../../../core/services/theme.service';

interface NavItem {
  label: string;
  link?: string;                 // ✅ جديد: اللينك بتاع العنصر لو مالوش دروب داون
  hasDropdown?: boolean;
  children?: { label: string; link: string }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ ضفنا RouterModule
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchOpen = false;
  searchQuery = '';
  activeDropdown: string | null = null;
  mobileMenuOpen = false;
  currentLang: 'ar' | 'en' = 'ar';
  verifyPanelOpen = false;

  currentTime = '';
  currentHijriDate = '';
  private clockInterval: any;
  private closeDropdownTimeout: any;

  navItems: NavItem[] = [
    { label: 'الرئيسية', link: 'pages/home' },                       // ✅ ضفنا link
    {
      label: 'عن الوزارة',
      hasDropdown: true,
      children: [
        { label: 'عن الوزارة', link: '/about' },
        { label: 'القطاعات الامنية', link: '/about/vision' },
        { label: 'امارات المناطق', link: '/about/vision' },
        { label: 'أنظمة وتعليمات', link: '/about/regulations' },
      ],
    },
    { label: 'اخبار الوزير', link: '/minister-news' },        // ✅ ضفنا link
    {
      label: 'الخدمات الإلكترونية',
      hasDropdown: true,
      children: [
        { label: 'الاستعلام عن معاملات الاحوال المدنية', link: '/nationality-inquiry' },
        { label: 'الاستعلام عن تصاريح الزواج', link: '/marriage-inquiry' },
        { label: 'الاستعلام عن تجديد الأقامة', link: '/iqama-inquiry' },
        { label: 'الاستعلام عن الزيارات العائلية و تأشيرات الاستقدام', link: '/family-visas-inquiry' },
        { label: 'الاستعلام عن التأشيرات', link: '/visit-inquiry' },
        { label: 'الاستعلام عن بلاغات الوافدين', link: '/alert-inquiry' },
        { label: 'الاستعلام عن تغيير المهنة', link: '/profession-inquiry' },
        { label: 'الاستعلام عن تأشيرات العمالة', link: '/visas-review-inquiry' },
        { label: 'الاستعلام العام عن المعاملات', link: '/moamla-inquiry' },
      ],
    },
    {
      label: 'المركز الإعلامي',
      hasDropdown: true,
      children: [
        { label: 'اخبار', link: '/media/news' },
        { label: 'تصريحات المتحدث الأمني', link: '/media/press' },
        { label: 'فاعليات واعلانات', link: '/media/press' },
        { label: 'مكتبة الصور', link: '/media/press' },
        { label: 'مكتبة الفيديو', link: '/media/press' },
        { label: 'منصة المنقولات', link: '/media/press' },
      ],
    },
  ];

  constructor(
    private translateService: GoogleTranslateService,
    public theme: ThemeService
  ) { }

  ngOnInit() {
    this.theme.init();
    this.translateService.applyDirection();
    this.translateService.loadGoogleTranslate();
    this.currentLang = this.translateService.getCurrentLang();

    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 60_000);
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.closeDropdownTimeout) clearTimeout(this.closeDropdownTimeout);
  }

  toggleLang() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translateService.setLanguage(newLang);
  }

  private updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    this.currentHijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(now);
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (!this.searchOpen) this.searchQuery = '';
  }

  onSearchSubmit() {
    if (!this.searchQuery.trim()) return;
    console.log('البحث عن:', this.searchQuery);
  }

  onNavItemEnter(label: string) {
    if (this.closeDropdownTimeout) clearTimeout(this.closeDropdownTimeout);
    this.activeDropdown = label;
  }

  onNavItemLeave() {
    this.closeDropdownTimeout = setTimeout(() => {
      this.activeDropdown = null;
    }, 200);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) this.activeDropdown = null;
  }

  toggleVerifyPanel() {
    this.verifyPanelOpen = !this.verifyPanelOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper')) {
      this.searchOpen = false;
    }
  }
}