import { Routes } from '@angular/router';

export const routes: Routes = [
    

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'الصفحة الرئيسية'
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./pages/about/about.component').then(m => m.AboutComponent),
        title: 'من نحن'
    },
    {
        path: 'portfolio',
        loadComponent: () =>
            import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent),
        title: 'أعمالنا'
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./pages/contact/contact.component').then(m => m.ContactComponent),
        title: 'تواصل معنا'
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Not Found'
    },
    
];
