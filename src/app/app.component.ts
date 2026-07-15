import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
// امسح الهيرو والنيوز والستاتس من هنا خلاص، وضف مكون الفوتر لو عندك (مثلاً FooterComponent)

@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // ضيف الـ FooterComponent هنا لما تعمله
  selector: 'app-root',
  template: `
    <!-- الناف بار ثابت فوق في كل الصفحات -->
    <app-navbar></app-navbar>
    
    <!-- هنا الصفحات بتتغير ديناميكياً بناءً على الرابط -->
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <!-- الفوتر ثابت تحت في كل الصفحات (شيلنا التكرار بتاع الناف بار اللي تحت) -->
    <app-footer></app-footer>
  `,
})
export class AppComponent { }