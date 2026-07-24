import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
// امسح الهيرو والنيوز والستاتس من هنا خلاص، وضف مكون الفوتر لو عندك (مثلاً FooterComponent)

@Component({
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent], // ضيف الـ FooterComponent هنا لما تعمله
  selector: 'app-root',
  templateUrl: "./app.component.html"

})
export class AppComponent { }