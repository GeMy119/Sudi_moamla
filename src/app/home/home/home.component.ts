import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { StatsComponent } from "../stats/stats.component";
import { NewsComponent } from "../news/news.component";
import { RoyalStatementBannerComponent } from "../royal-statement-banner/royal-statement-banner.component";
import { EventsSliderComponent } from "../events-slider/events-slider.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, StatsComponent, NewsComponent, RoyalStatementBannerComponent, EventsSliderComponent],
  template: `
    <app-hero></app-hero>
    <app-stats></app-stats>
    <app-royal-statement-banner></app-royal-statement-banner>
    <app-news></app-news>
    <app-events-slider></app-events-slider>
  `
})
export class HomeComponent { }