import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons/pokemons.component')
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component')
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing.component')
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component')
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];
