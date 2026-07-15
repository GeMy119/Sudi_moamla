import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'theme';
    private readonly CONTRAST_KEY = 'highContrast';
    private readonly FONT_KEY = 'fontScale';

    isDarkMode = false;
    highContrast = false;
    fontScale = 100; // 90 - 130

    init(): void {
        this.isDarkMode = localStorage.getItem(this.STORAGE_KEY) === 'dark';
        this.highContrast = localStorage.getItem(this.CONTRAST_KEY) === 'true';
        this.fontScale = Number(localStorage.getItem(this.FONT_KEY)) || 100;

        this.applyDarkMode();
        this.applyHighContrast();
        this.applyFontScale();
    }

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem(this.STORAGE_KEY, this.isDarkMode ? 'dark' : 'light');
        this.applyDarkMode();
    }

    toggleHighContrast(): void {
        this.highContrast = !this.highContrast;
        localStorage.setItem(this.CONTRAST_KEY, String(this.highContrast));
        this.applyHighContrast();
    }

    zoomIn(): void {
        if (this.fontScale < 130) {
            this.fontScale += 10;
            this.applyFontScale();
        }
    }

    zoomOut(): void {
        if (this.fontScale > 90) {
            this.fontScale -= 10;
            this.applyFontScale();
        }
    }

    private applyDarkMode(): void {
        document.documentElement.classList.toggle('dark', this.isDarkMode);
    }

    private applyHighContrast(): void {
        document.documentElement.classList.toggle('high-contrast', this.highContrast);
    }

    private applyFontScale(): void {
        document.documentElement.style.fontSize = `${this.fontScale}%`;
        localStorage.setItem(this.FONT_KEY, String(this.fontScale));
    }
}