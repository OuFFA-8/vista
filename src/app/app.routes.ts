import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
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
        path: 'portfolio/:id',
        loadComponent: () =>
            import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        title: 'Not Found'
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Not Found'
    },

];
