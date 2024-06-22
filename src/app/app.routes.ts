import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => 
            import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'list',
        loadChildren: () => 
            import('./list/list.module').then((m) => m.ListModule)
    },
    {
        path: 'statistics',
        loadChildren: () => 
            import('./statistics/statistics.module').then((m) => m.StatisticsModule)
    }
];
