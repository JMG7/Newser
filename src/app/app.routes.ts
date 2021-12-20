import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';

const APP_ROUTES: Routes = [
    { path: 'news', component: NewsComponent },
    { path: 'archived', component: NewsComponent },
    { path: '**', pathMatch: 'full', redirectTo:'news' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });