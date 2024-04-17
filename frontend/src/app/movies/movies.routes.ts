import { Routes } from '@angular/router';
import { MoviesComponent } from './movies.components';

export const MoviesRoutes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'title',
    loadChildren: () => import('../folder').then((r) => r.FolderRoutes),
  },
  {
    path: 'watch',
    loadChildren: () => import('../player').then((r) => r.PlayerRoutes),
  },
];
