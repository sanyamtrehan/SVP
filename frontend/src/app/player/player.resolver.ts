import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { MoviesService } from '../movies';
import { findMovieInfoById } from '../utils';
import { PlayerService } from './player.service';

export const playerResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const id = route.queryParams['id'];
  if (!id) {
    goToMain();
  }

  const moviesInfo = inject(MoviesService).moviesInfo;
  const file = findMovieInfoById(moviesInfo, id);
  if (!file) {
    goToMain();
    return of(false);
  }

  inject(PlayerService).file$.next(file);
  return of(true);
};

const goToMain = () => {
  inject(Router).navigate(['']);
};
