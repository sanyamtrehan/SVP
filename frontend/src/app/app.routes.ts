import { Routes } from '@angular/router';

import { AppResolver } from './app.resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./movies').then((r) => r.MoviesRoutes),
    resolve: [AppResolver],
  },
];
