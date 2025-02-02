import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DeveloperPageComponent } from './pages/developer-page/developer-page.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    },
    {
        path: 'developer',
        component: DeveloperPageComponent
    }
];
