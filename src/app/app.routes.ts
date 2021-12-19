import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';

// const APP_ROUTES: Routes = [
//     {
//         path: '/a',
//         children: [
//             { path: '/news', component: NewsComponent},
//             { path: '/archived', component: NewsComponent}
//         ]},
//     { path: '**', redirectTo:'a/news' }
// ];
const APP_ROUTES: Routes = [
    { path: 'news', component: NewsComponent },
    { path: 'archived', component: NewsComponent },
    { path: '**', pathMatch: 'full', redirectTo:'news' }
];

// @NgModule({
//     imports: [RouterModule.forChild(APP_ROUTES)],
//     exports: [RouterModule]
// })
// export class FeatureRoutingModule {}

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });