import { Routes } from '@angular/router';
import { NationalitySearchComponent } from './features/nationality-inquiry/nationality-search/nationality-search.component';
import { NationalityResultComponent } from './features/nationality-inquiry/nationality-result/nationality-result.component';
import { MarigeResultComponent } from './features/marige-inquiry/marige-result/marige-result.component';
import { MarigeSearchComponent } from './features/marige-inquiry/marige-search/marige-search.component';
import { IqamaSearchComponent } from './features/iqama-inquiry/iqama-search/iqama-search.component';
import { IqamaResultComponent } from './features/iqama-inquiry/iqama-result/iqama-result.component';
import { FamilyVisasResultComponent } from './features/family-visas-inquiry/family-visas-result/family-visas-result.component';
import { FamilyVisasSearchComponent } from './features/family-visas-inquiry/family-visas-search/family-visas-search.component';
import { VisitResultComponent } from './features/visit-inquiry/visit-result/visit-result.component';
import { VisitSearchComponent } from './features/visit-inquiry/visit-search/visit-search.component';
import { AlertSearchComponent } from './features/alert-inquiry/alert-search/alert-search.component';
import { AlertResultComponent } from './features/alert-inquiry/alert-result/alert-result.component';
import { ProfessionSearchComponent } from './features/profession-inquiry/profession-search/profession-search.component';
import { VisasReviewSearchComponent } from './features/visas-review-inquiry/visas-review-search/visas-review-search.component';
import { VisasReviewResultComponent } from './features/visas-review-inquiry/visas-review-result/visas-review-result.component';
import { MoamlaSearchComponent } from './features/moamla-inquiry/moamla-search/moamla-search.component';
import { MoamlaResultComponent } from './features/moamla-inquiry/moamla-result/moamla-result.component';
import { ProfessionResultComponent } from './features/profession-inquiry/profession-result/profession-result.component';

export const routes: Routes = [
    {
        path: 'pages/home',
        loadComponent: () => import('../app/home/home/home.component').then(m => m.HomeComponent)
        // أو تربطه بـ HomeComponent علطول لو مش شغال بـ Lazy Loading
    },
    {
        path: '',
        loadComponent: () => import('../app/home/home/home.component').then(m => m.HomeComponent)
        // أو تربطه بـ HomeComponent علطول لو مش شغال بـ Lazy Loading
    },
    { path: 'nationality-inquiry', component: NationalitySearchComponent },
    { path: 'nationality-inquiry/result', component: NationalityResultComponent },
    { path: 'marriage-inquiry', component: MarigeSearchComponent },
    { path: 'marriage-inquiry/result', component: MarigeResultComponent },
    { path: 'iqama-inquiry', component: IqamaSearchComponent },
    { path: 'iqama-inquiry/result', component: IqamaResultComponent },
    { path: 'family-visas-inquiry', component: FamilyVisasSearchComponent },
    { path: 'family-visas-inquiry/result', component: FamilyVisasResultComponent },
    { path: 'visit-inquiry', component: VisitSearchComponent },
    { path: 'visit-inquiry/result', component: VisitResultComponent },
    { path: 'alert-inquiry', component: AlertSearchComponent },
    { path: 'alert-inquiry/result', component: AlertResultComponent },
    { path: 'profession-inquiry', component: ProfessionSearchComponent },
    { path: 'profession-inquiry/result', component: ProfessionResultComponent },
    { path: 'visas-review-inquiry', component: VisasReviewSearchComponent },
    { path: 'visas-review-inquiry/result', component: VisasReviewResultComponent },
    { path: 'moamla-inquiry', component: MoamlaSearchComponent },
    { path: 'moamla-inquiry/result', component: MoamlaResultComponent },
];
