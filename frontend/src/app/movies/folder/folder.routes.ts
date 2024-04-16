import { Routes } from '@angular/router';

import { FolderResolver } from './folder.resolver';
import { FolderComponent } from './folder.component';

export const FolderRoutes: Routes = [
  {
    path: '',
    component: FolderComponent,
    resolve: { folder: FolderResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];
