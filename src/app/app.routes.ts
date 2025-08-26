import { Routes } from '@angular/router';

export const routes: Routes = [


    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Vsta | الرئيسية'
    },
    {
        path: 'portfolio/:id',
        loadComponent: () =>
            import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        title: 'Vsta | علامات تجارية'
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./pages/about/about.component').then(m => m.AboutComponent),
        title: 'Vsta | من نحن'
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Vsta | الصفحة غير موجودة'
    },

];
