import { Routes } from '@angular/router';

import { playerResolver } from './player.resolver';
import { PlayerComponent } from './player.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    resolve: [playerResolver],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];
