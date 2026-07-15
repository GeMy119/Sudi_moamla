import { Injectable } from '@angular/core';

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: any;
    }
}

@Injectable({ providedIn: 'root' })
export class GoogleTranslateService {
    private scriptLoaded = false;
    private readonly LANG_KEY = 'appLang';
    private observer: MutationObserver | null = null;

    loadGoogleTranslate(): void {
        if (this.scriptLoaded) return;
        this.scriptLoaded = true;

        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.display = 'none';
        document.body.appendChild(div);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'ar',
                    includedLanguages: 'ar,en',
                    autoDisplay: false,
                },
                'google_translate_element'
            );
            // بعد ما جوجل يخلص تحميله، نفرض الاتجاه تاني فوراً
            this.applyDirection();
        };

        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // نراقب أي تغيير جوجل بيعمله على <html> ونفرض الاتجاه الصح فوراً
        this.watchAndFixDirection();
    }

    setLanguage(lang: 'ar' | 'en'): void {
        const domain = window.location.hostname;

        if (lang === 'ar') {
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        } else {
            document.cookie = `googtrans=/ar/${lang}; path=/;`;
            document.cookie = `googtrans=/ar/${lang}; path=/; domain=${domain}`;
        }

        localStorage.setItem(this.LANG_KEY, lang);
        window.location.reload();
    }

    applyDirection(): void {
        const lang = this.getCurrentLang();
        const html = document.documentElement;
        const dir = lang === 'ar' ? 'rtl' : 'ltr';

        if (html.getAttribute('lang') !== lang) html.setAttribute('lang', lang);
        if (html.getAttribute('dir') !== dir) html.setAttribute('dir', dir);
    }

    /** يراقب أي تعديل جوجل بيعمله على html ويرجع الـ dir الصح فوراً */
    private watchAndFixDirection(): void {
        if (this.observer) return;
        this.observer = new MutationObserver(() => this.applyDirection());
        this.observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style'],   // شيلنا 'dir' و 'lang' من هنا
        });
    }

    getCurrentLang(): 'ar' | 'en' {
        const saved = localStorage.getItem(this.LANG_KEY);
        if (saved === 'en' || saved === 'ar') return saved as 'ar' | 'en';

        const match = document.cookie.match(/googtrans=\/ar\/(\w+)/);
        return match ? (match[1] as 'en') : 'ar';
    }
}